<?php

declare(strict_types=1);

/**
 * POST /api/contact — the contact form behind https://mkado.dev/#contact.
 *
 * Deployed to /var/www/mkado.dev/server/contact.php (outside dist/, which every
 * deploy replaces) and reached through an exact-match nginx location that also
 * rate-limits. The browser side is src/components/Contact.astro +
 * src/scripts/contact.ts; this file re-validates everything and is the authority.
 *
 * Order matters: store first, notify second. A message is never lost because an
 * e-mail provider had a bad minute.
 *
 * Config: /etc/mkado/contact.env (0640 root:www-data), never in git.
 *   TURNSTILE_SECRET=   Cloudflare Turnstile secret for the widget on the page
 *   CONTACT_TO=         where notifications go
 *   RESEND_API_KEY=     optional; if set, notify by e-mail
 *   CONTACT_FROM=       optional sender, defaults to onboarding@resend.dev
 *   TELEGRAM_BOT_TOKEN= optional; used when there is no Resend key
 *   TELEGRAM_CHAT_ID=   optional, with the token above
 * With none of the notification keys set the message is still stored and logged.
 */

const DB_PATH  = '/var/lib/mkado/contact.sqlite';
const LOG_PATH = '/var/log/mkado/contact.log';
const ENV_PATH = '/etc/mkado/contact.env';

const MAX_BODY      = 16384; // bytes; the form cannot legitimately be larger
const MAX_PER_IP    = 5;     // messages per IP per day
const NAME_MIN      = 2;
const NAME_MAX      = 80;
const EMAIL_MAX     = 160;
const MESSAGE_MIN   = 20;
const MESSAGE_MAX   = 2000;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

/** Answer with JSON and stop. */
function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function logLine(string $line): void
{
    @file_put_contents(LOG_PATH, sprintf("%s %s\n", gmdate('c'), $line), FILE_APPEND | LOCK_EX);
}

/** Remove control characters that have no business in a name or a message. */
function clean(string $value): string
{
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    return trim($value);
}

// ---------------------------------------------------------------- request ---

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'server']);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY + 1);
if ($raw === false || $raw === '' || strlen($raw) > MAX_BODY) {
    respond(400, ['ok' => false, 'error' => 'server']);
}

$input = json_decode($raw, true);
if (!is_array($input)) {
    respond(400, ['ok' => false, 'error' => 'server']);
}

$name    = clean((string) ($input['name'] ?? ''));
$email   = clean((string) ($input['email'] ?? ''));
$message = clean((string) ($input['message'] ?? ''));
$website = trim((string) ($input['website'] ?? ''));   // honeypot
$token   = (string) ($input['token'] ?? '');
$locale  = in_array($input['locale'] ?? '', ['en', 'tr'], true) ? (string) $input['locale'] : 'en';

// A bot filled the hidden field. Answer exactly like success so it learns nothing.
if ($website !== '') {
    logLine('honeypot hit');
    respond(200, ['ok' => true]);
}

// ------------------------------------------------------------- validation ---

$errors = [];

if ($name === '') {
    $errors['name'] = 'required';
} elseif (mb_strlen($name) < NAME_MIN) {
    $errors['name'] = 'nameShort';
} elseif (mb_strlen($name) > NAME_MAX) {
    $errors['name'] = 'nameShort';
}

if ($email === '') {
    $errors['email'] = 'required';
} elseif (mb_strlen($email) > EMAIL_MAX || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'emailInvalid';
}

if ($message === '') {
    $errors['message'] = 'required';
} elseif (mb_strlen($message) < MESSAGE_MIN) {
    $errors['message'] = 'messageShort';
} elseif (mb_strlen($message) > MESSAGE_MAX) {
    $errors['message'] = 'messageLong';
}

if ($errors) {
    respond(422, ['ok' => false, 'errors' => $errors]);
}

// ------------------------------------------------------------------ config ---

$config = is_readable(ENV_PATH) ? (parse_ini_file(ENV_PATH, false, INI_SCANNER_RAW) ?: []) : [];
// Arrow functions capture $config by value, so this stays correct if the file is reordered.
$cfg = static fn (string $key): string => trim((string) ($config[$key] ?? ''));

// ----------------------------------------------------------- captcha check ---

$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? '';

$secret = $cfg('TURNSTILE_SECRET');
if ($secret !== '') {
    $verify = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($verify, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => http_build_query(['secret' => $secret, 'response' => $token, 'remoteip' => $ip]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
    ]);
    $body = curl_exec($verify);
    $curlError = curl_error($verify);
    curl_close($verify);

    $outcome = is_string($body) ? json_decode($body, true) : null;
    if (!is_array($outcome) || ($outcome['success'] ?? false) !== true) {
        logLine(sprintf('turnstile failed ip=%s codes=%s curl=%s', $ip, implode(',', $outcome['error-codes'] ?? []), $curlError));
        respond(400, ['ok' => false, 'error' => 'captcha']);
    }
} else {
    logLine('warning: TURNSTILE_SECRET is not set, captcha not verified');
}

// -------------------------------------------------------------- store first ---

try {
    if (!is_dir(dirname(DB_PATH))) {
        @mkdir(dirname(DB_PATH), 0770, true);
    }

    $db = new PDO('sqlite:' . DB_PATH, null, null, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    $db->exec('CREATE TABLE IF NOT EXISTS messages (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        name       TEXT NOT NULL,
        email      TEXT NOT NULL,
        message    TEXT NOT NULL,
        locale     TEXT NOT NULL,
        ip         TEXT NOT NULL,
        user_agent TEXT NOT NULL
    )');
    $db->exec('CREATE INDEX IF NOT EXISTS messages_created_at ON messages (created_at)');

    // Per-IP daily cap, on top of the nginx rate limit: that one stops bursts,
    // this one stops someone patiently sending all day.
    $seen = $db->prepare('SELECT COUNT(*) FROM messages WHERE ip = ? AND created_at >= ?');
    $seen->execute([$ip, gmdate('c', time() - 86400)]);
    if ((int) $seen->fetchColumn() >= MAX_PER_IP) {
        logLine('rate limit hit ip=' . $ip);
        respond(429, ['ok' => false, 'error' => 'rate']);
    }

    $insert = $db->prepare('INSERT INTO messages (created_at, name, email, message, locale, ip, user_agent)
                            VALUES (?, ?, ?, ?, ?, ?, ?)');
    $insert->execute([
        gmdate('c'),
        $name,
        $email,
        $message,
        $locale,
        $ip,
        mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
    ]);
} catch (Throwable $e) {
    logLine('storage failed: ' . $e->getMessage());
    respond(500, ['ok' => false, 'error' => 'server']);
}

// ------------------------------------------------------------ notify second ---

$to      = $cfg('CONTACT_TO');
$subject = sprintf('mkado.dev — %s', $name);
$text    = sprintf(
    "New message from the mkado.dev contact form.\n\nName:  %s\nEmail: %s\nLang:  %s\nIP:    %s\nTime:  %s\n\n%s\n",
    $name,
    $email,
    $locale,
    $ip,
    gmdate('c'),
    $message
);

/** Fire an HTTP request and report whether it looked successful. */
function post(string $url, array $headers, string $payload): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
    ]);
    $body   = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $err    = curl_error($ch);
    curl_close($ch);

    return [$status >= 200 && $status < 300, $status, is_string($body) ? substr($body, 0, 300) : $err];
}

$resendKey = $cfg('RESEND_API_KEY');
$tgToken   = $cfg('TELEGRAM_BOT_TOKEN');
$tgChat    = $cfg('TELEGRAM_CHAT_ID');

$notified = false;

if ($resendKey !== '' && $to !== '') {
    [$sent, $status, $detail] = post(
        'https://api.resend.com/emails',
        ['Authorization: Bearer ' . $resendKey, 'Content-Type: application/json'],
        json_encode([
            'from'     => $cfg('CONTACT_FROM') !== '' ? $cfg('CONTACT_FROM') : 'mkado.dev <onboarding@resend.dev>',
            'to'       => [$to],
            'reply_to' => $email,          // hitting reply answers the visitor
            'subject'  => $subject,
            'text'     => $text,
        ], JSON_UNESCAPED_UNICODE)
    );
    logLine($sent ? 'email sent' : sprintf('email FAILED status=%d %s', $status, $detail));
    $notified = $notified || $sent;
}

// Both channels can be on at once: e-mail is the record, Telegram is the push.
if ($tgToken !== '' && $tgChat !== '') {
    [$sent, $status, $detail] = post(
        sprintf('https://api.telegram.org/bot%s/sendMessage', $tgToken),
        ['Content-Type: application/json'],
        json_encode(['chat_id' => $tgChat, 'text' => $subject . "\n\n" . $text, 'disable_web_page_preview' => true], JSON_UNESCAPED_UNICODE)
    );
    logLine($sent ? 'telegram sent' : sprintf('telegram FAILED status=%d %s', $status, $detail));
    $notified = $notified || $sent;
}

if (!$notified) {
    logLine('stored but NOT notified: ' . $email);
}

respond(200, ['ok' => true]);
