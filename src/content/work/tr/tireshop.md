---
title: Lastikçi PWA
tagline: Bir oto lastik dükkânını yönetmek için mobil öncelikli, kurulabilir bir uygulama — envanter, satışlar ve faturalar, giderler ve kâr raporları — Arapça, sağdan sola.
period: "2025"
order: 6
problem: Küçük bir lastikçi masaüstünde değil, telefonda çalışır. Dükkân sahibi günün satışını ve kârını bir bakışta görmek, düşük stok uyarısı almak, gider kaydedebilmek istiyor — ilk gün giriş ekranı olmadan, ileride ortak bir bulut veritabanına geçiş yoluyla.
built:
  - React 19 + TypeScript + Vite progressive web app — kurulabilir, service worker, Tailwind 4, tüm arayüz Arapça ve sağdan sola yerleşimli.
  - Seed verili yerel öncelikli bir veri deposu (React Context + localStorage); portfolyo derlemesi bu modda çalışıyor, yani hiçbir şey tarayıcınızdan çıkmıyor.
  - İsteğe bağlı bulut modu — Supabase kimlik doğrulama ve PostgreSQL, artı düşük stok uyarılarını bir Telegram botuna gönderen edge function; aynı kod, iki ortam değişkeniyle değişiyor.
  - recharts ile raporlar — günlük satış, gider ve net kâr — ve fotoğraf ekli, yazdırılabilir faturalı bir satış akışı.
tryIt:
  - بيع ekranından bir şey satın ve ana ekranda günün kârının değişmesini izleyin.
  - Bir gider ekleyin, sonra günün netini görmek için التقارير'i açın.
  - Telefonda "Ana ekrana ekle"yi kullanın — kuruluyor ve çevrimdışı çalışıyor.
---

## Yaparken öğrendiklerim

**Önce yerel, sonra bulut.** Depo soyutlaması iki modda da aynı; Supabase değişkenleri varsa uygulama giriş yapıp eşitliyor, yoksa kimlik doğrulama kapısı atlanıyor ve veri localStorage'da kalıyor. Portfolyo, ziyaretçiden hiç kayıt istenmesin diye bilerek yerel derlemeyi yayınlıyor.

**Tek başparmak için tasarlandı.** Alt gezinme, büyük dokunma alanları, ekran başına tek ana eylem, Türk lirası cinsinden rakamlar. Masaüstü görünümü sadece ortalanmış telefon yerleşimi — hedef kitle masa başında değil.

**İlk commit'ten itibaren RTL.** left/right yerine Tailwind'in mantıksal özellikleri (`ms-`, `pe-`, `text-start`); böylece yerleşim ikinci bir stil dosyası olmadan doğru şekilde aynalandı.
