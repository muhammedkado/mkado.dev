---
title: BestTrend SY
tagline: Suriye için bir emlak platformu — fotoğraflı ve haritalı ilanlar, kayıtlı aramalar ve favorilerle arama, ilan sahibi analitiği — Arapça, İngilizce ve Kürtçe.
period: "Tem – Eki 2025"
order: 2
problem: Suriye'de mülk sahipleri ve emlakçılar ilanlarını Facebook gruplarına veriyor, alıcılar saatlerce kaydırıyor. Platformun yapılandırılmış ilanlara (il → şehir → mahalle), CDN'de fotoğraflara, sağdan sola Arapça dahil üç dile ve sahte ilanların halka hiç ulaşmaması için moderasyona ihtiyacı vardı.
built:
  - Arapça (RTL), İngilizce ve Kürtçe için i18next ile React 19 + TypeScript tek sayfa uygulaması (Vite, Tailwind, shadcn/ui) ve görsel yüklemeli çok adımlı ilan formu.
  - Sanctum token kimlik doğrulamalı Laravel 12 REST API; girişte ve yıkıcı rotalarda hız sınırı, /api/v1 altında sürümlenmiş, eski istemciler için legacy takma adlar korunmuş.
  - İl → şehir → mahalle hiyerarşisi etrafında PostgreSQL modeli; mülk tipleri, özellikler ve altyapı hizmetleri çoktan çoğa, kullanıcı başına favoriler ve kayıtlı aramalar.
  - Spatie Media Library üzerinden Bunny Storage'da (bir CDN) ilan fotoğrafları — API sunucusu hiçbir zaman görsel servis etmiyor.
  - İlan sahibi panosunu besleyen istatistikler — görüntülenme, favori, talep.
tryIt:
  - Giriş yapmadan ilanları gezin ve filtreleyin; dili başlıktan değiştirin.
  - Mülk sahibi olarak girin (demo@besttrend.mkado.dev / demo1234) ve fotoğraflı bir ilan ekleyin.
  - Aynı sistemin moderasyon tarafını görmek için yönetim paneli vaka çalışmasını açın.
---

## Yaparken öğrendiklerim

**Tek API, birbirinden çok farklı iki istemci.** Uygulama bearer token'larla JSON konuşuyor; personel arka ofisi (kendi vaka çalışması var) oturum ve yetkiler kullanıyor. İkisi de aynı Laravel çekirdeğinde; API'nin sürümlenmesinin ve yönetim panelinin uygulamanın içinde değil API host'unda yaşamasının nedeni bu.

**Sadece arayüz değil, veri de dile duyarlı.** Her konum ve sınıflandırma tablosunda adlar `name_ar` / `name_en` / `name_ku` olarak tutuluyor; ön yüz bunları etkin dil için düz metne indirgiyor, böylece bileşenler üç dil olduğunu hiç bilmiyor.

**Görseller uygulama sunucusunun dışında.** Yüklemeler doğrudan Bunny Storage'a gidiyor ve CDN'den servis ediliyor; API yalnızca yolu tutuyor. Laravel host'unu ücretsiz katman bir VM'e sığacak kadar küçük tutan şey bu.

**Özel depo.** Kod istek üzerine paylaşılıyor; yönetim paneli ve API demoda denemeye açık.
