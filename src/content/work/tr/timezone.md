---
title: TimeZone.tools
tagline: Beş küçük zaman aracı — saat dilimi dönüştürücü, toplantı planlayıcı, tarih farkı, geri sayım ve iş günü — yedi dilde, hızlı ve tamamen tarayıcıda.
period: "2025"
order: 7
problem: Farklı saat dilimlerindeki uzaktan ekipler ve iş arayanlar hep aynı üç soruyu soruyor — orada saat kaç, ne zaman hep birlikte toplanabiliriz ve bir tarihe kaç iş günü var. Mevcut siteler bunları yavaş, reklam ve çerez duvarlarının arkasında ve nadiren Arapça ya da Kürtçe cevaplıyor. Bunun anında, linkle paylaşılabilir ve gerektiğinde sağdan sola olması gerekiyordu.
built:
  - Hiç backend'i olmayan React 19 + TypeScript tek sayfa uygulaması (Vite, Tailwind 4, yönlendirme için wouter) — dönüşümler ve takvimler tarayıcının Intl API'sinden geliyor.
  - Çalışma anında yüklenen çeviri dosyalarıyla i18next üzerinden yedi dil; tam sağdan sola yerleşimli Arapça dahil.
  - Paylaşılabilir durum — seçilen dilimler, saatler ve tarihler URL'de yaşıyor; bir toplantı önerisi tek bir link.
  - "SEO'ya hazır statik derleme: araç başına sayfalar, Open Graph etiketleri, sitemap ve robots; Cloudflare arkasında önbellekli statik dosyalar olarak servis ediliyor."
tryIt:
  - Dönüştürücüyü açın, iki üç şehir ekleyin ve saati değiştirin — her dilim birlikte güncellenir.
  - Başlıktan dili العربية yapın ve bütün yerleşimin aynalanmasını izleyin.
  - Bir toplantı saati ayarladıktan sonra linki kopyalayıp başka bir sekmede açın; durum linkle birlikte gelir.
---

## Yaparken öğrendiklerim

**Bilerek backend yok.** Bir saat dilimi aracının ihtiyacı olan her şey — dilim verisi, yaz saati kuralları, yerel ayara göre tarih biçimlendirme — her modern tarayıcıda Intl API olarak zaten var. Sunucuyu atlamak uygulamayı daha ucuz barındırılır (nginx'te bir klasör), daha hızlı (beklenecek bir şey yok) ve daha güvenilir (sayfadan hiçbir şey çıkmıyor) yaptı.

**Durum URL'de.** Toplantı planlayıcının amacı birine göndermek. Seçimi sorgu dizesine serileştirmek, paylaş düğmesini "adresi kopyala"ya indirgiyor ve geri düğmesi insanların beklediği gibi çalışıyor.

**Windows'ta derlenen bir Replit monorepo'su.** Depo Replit'in çalışma alanı düzeninden geliyordu; bu düzen Linux dışı her build ikilisini dışlıyor. Portfolyo deploy'u bir Windows iş istasyonunda derlendiği için çalışma alanı artık win32 ikililerine de izin veriyor — kırmızı bir derlemeyi yeşile çeviren iki satırlık bir değişiklik.
