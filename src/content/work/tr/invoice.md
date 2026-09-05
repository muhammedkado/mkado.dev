---
title: Fatura Sistemi
tagline: Kalemli ve canlı toplamlı faturalar oluşturun; bekleyen, ödenmiş ve gecikmiş ödemeleri izleyin; PDF'e yazdırın ve müşteriye e-postayla gönderin — düz PHP, framework yok.
period: "2025"
order: 4
problem: Küçük bir işletmenin düzgün görünen faturalara ve kimin hâlâ borçlu olduğunu gösteren bir listeye ihtiyacı var. Bunu framework'süz yapmak işin özüydü — oturumların, CSRF korumasının, prepared statement'ların ve temiz bir arayüzün birkaç bin satırda elle kurulabileceğini göstermek için.
built:
  - Her yerde PDO prepared statement'lı düz PHP 8, kullanıcı başına veri kapsamı, ID yenilemeli oturum girişi ve her formda CSRF token'ı.
  - Vanilla JavaScript ile dinamik kalemler ve canlı ara toplam, vergi ve toplam hesaplayan bir fatura editörü — jQuery yok, build adımı yok.
  - TCPDF ile sunucu tarafı PDF üretimi (yazdır ya da indir) ve PHPMailer ile e-posta; herkese açık demoda gönderim kapalı, uygulama ne gideceğini gösteriyor.
  - Durum filtreli (bekleyen, ödenmiş, gecikmiş) bir defter görünümü ve elle yazılmış CSS — Fraunces ve Public Sans, Bootstrap yok.
tryIt:
  - Üç kalemli bir fatura oluşturun ve yazdıkça toplamların güncellenmesini izleyin.
  - Ödendi olarak işaretleyin, sonra defteri duruma göre filtreleyin.
  - Birini yazdırın — PDF aynı veriden sunucuda üretilir.
---

## Yaparken öğrendiklerim

**Framework'süz olmak kestirme değil, disiplin.** Her sorgu bir prepared statement, her yazma sahibi denetliyor, her form sabit zamanlı karşılaştırmayla doğrulanan bir token taşıyor. Bütün sistem tek oturuşta okunacak kadar küçük; amaç da buydu.

**.env dosyası olmadan yapılandırma.** Sunucuda PHP-FPM havuzu kimlik bilgilerini gerçek ortam değişkenleri olarak geçiriyor; yerelde gitignore'lanmış bir `config.php` aynı sabitleri tanımlıyor. Bootstrap'teki tek satır hangisinin kullanılacağına karar veriyor ve gizli hiçbir şey deploy edilmiyor.

**Demo e-posta konusunda bilerek yalan söylüyor.** Giden posta kapalı; "faturayı gönder" mesajı oluşturuyor ve gönderilmiş olacağını söylüyor — bir demo asla yabancılara e-posta atmamalı.
