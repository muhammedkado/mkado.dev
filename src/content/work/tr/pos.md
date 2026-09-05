---
title: POS Yönetim Paneli
tagline: Küçük bir perakende dükkânı için arka ofis — ürünler, kategoriler, müşteriler ve rol bazlı yetkilerle personel; İngilizce ve Arapça.
period: "2024"
order: 1
problem: Bir dükkânın, personelin raftakileri ve kime sattığını yönettiği tek bir yere ihtiyacı var; kasiyer ürün kataloğunu silememeli, dükkân sahibi stok ve envanter değerini bir bakışta görmeli. Üstelik ikinci bir kod tabanı olmadan Arapça ve sağdan sola çalışması gerekiyordu.
built:
  - AdminLTE üzerinde Laravel 12 arka ofisi — ürünler, kategoriler, müşteriler ve kullanıcılar için tam CRUD, yeniden boyutlandırmalı görsel yükleme, düşük stok ve envanter değeri için pano widget'ları.
  - Laratrust ile roller ve yetkiler — süper admin, admin ve salt okunur bir görüntüleyici — yalnızca menüde gizlenmiş değil, controller'larda her işlem için denetleniyor.
  - mcamara/laravel-localization ile İngilizce ve Arapça — dil ön ekli URL'ler, AdminLTE için bir RTL stil katmanı, çevrilmiş doğrulama mesajları.
  - Herkese açık bir kurulum için demo sertleştirmesi — middleware ile korunan seed hesaplar, kapalı kayıt, tek tıkla giriş rotası, her gece yeniden seed.
tryIt:
  - Panoyu admin olarak açın ve bir ürünün fiyatını ya da stoğunu değiştirin — widget'lar güncellenir.
  - Üst çubuktan dili عربي yapın; her ekran sağdan sola döner.
  - Görüntüleyici olarak girin (user@app.com / password) ve nelerin gizlendiğine bakın.
---

## Yaparken öğrendiklerim

**Hiç planlanmamış bir framework'te RTL.** AdminLTE 2 yalnızca soldan sağa gelir. Fork etmek yerine, dil Arapça olduğunda layout bir RTL stil dosyası ve küçük bir script yüklüyor; kenar çubuğu, breadcrumb'lar ve form hizaları hep bu katmandan geliyor, İngilizce sürüme dokunulmuyor.

**Dil ön ekli URL'ler ile route cache bir arada olmuyor.** mcamara/laravel-localization rotaları çalışma anında dil başına kurar; `php artisan route:cache` `/ar/...` rotalarını sessizce düşürür ve her Arapça sayfa 404 verir. Deploy scripti route cache'i kurmak yerine temizliyor — bir öğleden sonraya mal olan küçük bir satır.

**Herkese açık bir demonun korkuluklara ihtiyacı var.** Herkes admin olarak girebildiği için bir middleware üç seed hesapta düzenleme ve silmeyi engelliyor, kayıt kapalı ve veritabanı her gece yeniden seed ediliyor. Gerisi — ürünler, müşteriler, ek kullanıcılar — bozmanız için sizin.
