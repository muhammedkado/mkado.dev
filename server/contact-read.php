<?php

declare(strict_types=1);

/**
 * Read the contact-form messages from the terminal. The sqlite3 CLI is not
 * installed on the server, so this is the way in:
 *
 *   sudo -u www-data php /var/www/mkado.dev/server/contact-read.php        last 10
 *   sudo -u www-data php /var/www/mkado.dev/server/contact-read.php 50     last 50
 *
 * E-mail (or Telegram) is the live channel; this is the archive and the
 * fallback for when a notification did not go out.
 */

const DB_PATH = '/var/lib/mkado/contact.sqlite';

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

if (!file_exists(DB_PATH)) {
    fwrite(STDERR, "No database yet at " . DB_PATH . " — nobody has written.\n");
    exit(1);
}

$limit = max(1, min(500, (int) ($argv[1] ?? 10)));

$db = new PDO('sqlite:' . DB_PATH, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$rows = $db->query('SELECT * FROM (SELECT * FROM messages ORDER BY id DESC LIMIT ' . $limit . ') ORDER BY id ASC')
    ->fetchAll(PDO::FETCH_ASSOC);

$total = (int) $db->query('SELECT COUNT(*) FROM messages')->fetchColumn();

foreach ($rows as $row) {
    printf(
        "\n#%d  %s  [%s]\n  %s <%s>\n  ip %s\n\n%s\n%s\n",
        $row['id'],
        $row['created_at'],
        $row['locale'],
        $row['name'],
        $row['email'],
        $row['ip'],
        preg_replace('/^/m', '  ', (string) $row['message']),
        str_repeat('-', 72)
    );
}

printf("\n%d of %d message(s).\n", count($rows), $total);
