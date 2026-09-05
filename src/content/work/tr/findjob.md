---
title: Find Job with AI
tagline: Bir CV yükleyin, Gemini onu düzenlenebilir bir profile ayrıştırsın, sonra canlı iş ilanlarına göre puanlansın — herkese açık bir demonun maliyeti tasmada tutularak.
period: "2025"
order: 5
problem: Bir CV'yi iş ilanlarıyla elle eşleştirmek yavaş ve belirsiz. Uygulama bir PDF'i yapılandırılmış veriye çeviriyor, düzeltmenize izin veriyor ve bir dil modelinden her ilanı gerekçesiyle puanlamasını istiyor — bu arada girişsiz, herkese açık bir demonun API faturası şişirmesine izin verilemez.
built:
  - Üç adımlı Laravel 12 sihirbazı (Blade + Alpine.js, Vite ile Tailwind) — yükleme, düzenlenebilir profil, eşleşmeler — SPA framework'ü ve ayrı bir JSON API olmadan.
  - smalot/pdfparser ile PDF metin çıkarımı; yüklenen dosya hiçbir zaman saklanmıyor.
  - Ayrıştırma, "AI ile iyileştir" yeniden yazımları ve eşleşme puanlaması için Gemini çağrıları; modelin düşünme bütçesi sıfır, böylece token limiti cevaba kalıyor.
  - JSearch API'den canlı ilanlar; anahtar tanımlı değilse örnek veriye düşüş.
  - Maliyet kontrolü — ziyaretçi başına saatte 20 AI isteği ve ortak bir günlük bütçe; bütçe bitince uygulama hata vermek yerine örnek veri sunuyor.
tryIt:
  - Üç adımı sıfır maliyetle gezmek için "Örnek CV ile dene"ye tıklayın.
  - Kendi PDF'inizi yükleyin ve ayrıştırılan profili düzeltin.
  - Özette "AI ile iyileştir"e basın, sonra Eşleşmeler'i açıp gerekçeleri okuyun.
---

## Yaparken öğrendiklerim

**Önce bütçe, sonra özellik.** Her ziyaretçi Gemini ve JSearch çağrıları için tek bir günlük hakkı paylaşıyor; üstüne IP başına bir kısıt var. Hak bitince uygulama örnek veriye geçiyor ve bunu söylüyor — demonun girişsiz açık kalabilmesinin nedeni bu.

**Düşünme token'ları da sayılıyor.** Gemini 2.5, `maxOutputTokens`'ın bir kısmını akıl yürütmeye harcıyor; küçük bir limitle akıl yürütme neredeyse hepsini yiyor ve cevap boş dönüyordu. Bu yapılandırılmış görevler için düşünme bütçesini sıfıra çekmek "CV işlenemedi" hatasını kalıcı olarak çözdü.

**Tasarım gereği durumsuz.** SQLite yalnızca oturumları tutuyor. CV metni sihirbaz süresince oturumda yaşıyor, başka hiçbir yerde değil.
