---
title: BestTrend Yönetim Paneli ve API
tagline: BestTrend uygulamasının arkasındaki arka ofis ve REST API — ilan moderasyonu, kullanıcılar ve roller, talepler ve site içeriği, artı herkese açık bir JSON API.
period: "2025"
order: 3
problem: Aynı Laravel çekirdeği zıt ihtiyaçları olan iki istemciye hizmet etmek zorundaydı — uygulama için bir JSON API (token'lar, hız sınırları, sürümleme) ve bir personel arka ofisi (oturumlar, ince taneli yetkiler, sağdan sola Arapça arayüz). Üstelik herkesin yönetici olarak giriş yaptığı herkese açık bir demo olarak ayakta kalması gerekiyor.
built:
  - AdminLTE 3 arka ofisi — toplu işlemler ve CSV içe aktarmalı ilan moderasyonu, Spatie rol ve yetkileriyle kullanıcılar ve emlakçılar, talepler, iletişim mesajları, site içeriği ve ana sayfa istatistikleri.
  - Resmi RTL sürümü olmayan AdminLTE için bir Arapça RTL katmanı — kenar çubuğu geometrisi, RTL stil dosyaları ve tam bir çeviri dosyası.
  - /api/v1 altında özel hız sınırlayıcılı herkese açık REST API, veritabanı destekli sağlık uç noktası ve görsel yükleme uç noktaları; API için feature ve unit testleri.
  - Herkese açık bir yönetim paneli için demo güvenliği — seed hesapları değiştirilemez tutan bir middleware, kısıtlanmış giriş, tek tıkla demo giriş rotası ve her gece yeniden seed.
tryIt:
  - Paneli giriş yapmış olarak açın ve İlanlar → toplu işlemleri deneyin ya da bir CSV içe aktarın.
  - Üst çubuktan عربي'ye geçin ve gezin — panelin tamamı sağdan sola.
  - API'yi doğrudan çağırın — GET /api/v1/properties uygulamanın gösterdiği ilanların aynısını döner.
---

## Yaparken öğrendiklerim

**İki kapı, tek çekirdek.** Oturum tabanlı yönetim rotaları ve token tabanlı API rotaları aynı uygulamada ayrı gruplar; modelleri, policy'leri ve veritabanını paylaşıyorlar. Yetkiler Spatie'nin `can:` middleware'iyle ve işlemin yıkıcı olduğu yerlerde bir kez daha controller'larda denetleniyor.

**RTL bir çeviri değil, yerleşim problemi.** Metinleri çevirmek kolay yarısıydı. AdminLTE, "daraltılınca mini bir ray göster" anlamında `sidebar-mini` sınıfını body'de kalıcı tutar; önceki bir RTL stil dosyası bunu mevcut durum olarak okuyup açık kenar çubuğuna mini genişlik kaydırması veriyor, içerik altına kayıyordu. Çözüm gerçek durum sınıfını okumaktı — ve Leaflet RTL'den haberdar olmadığı için harita kabını soldan sağa sabitlemek.

**Herkese açık yönetim demolarının tehdit modeli farklı.** Ziyaretçi zaten yöneticinin ta kendisi; o yüzden alışıldık soru — "içeri girebilirler mi?" — "bir sonraki kişi için neyi bozabilirler?" olur. Cevap: seed hesaplarda şifre, e-posta, durum ve rol değişikliğini reddeden bir middleware, bir giriş kısıtı ve geri kalan her şey için gece sıfırlama.
