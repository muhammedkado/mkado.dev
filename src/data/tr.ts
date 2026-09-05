// Turkish copy for the /v2 (mkOS) page. English lives in site.ts; the UI chrome
// is bilingual inline in the components. Keyed to match site.ts so the two
// stay in step: demos by slug, timeline by index, skills by group name.

export const tr = {
  profile: {
    title: 'Bilgisayar Mühendisi',
    role: 'Full-Stack Geliştirici',
    headline: "30'dan fazla ülkede kullanılan RFID tabanlı sistemlerin web arayüzlerini geliştiriyorum.",
    intro:
      "İstanbul'da yaşayan full-stack bir bilgisayar mühendisiyim. 2023'ten bu yana USTEK RFID bünyesinde, 30'u aşkın ülkede hizmet veren çamaşırhane yönetim platformunun web arayüzlerini ve REST API'lerini PHP, Laravel ve Zend Framework ile geliştiriyorum. Ayrıca, React ve Next.js ile projeler üretiyorum. Aşağıdaki altı uygulama, doğrudan denemeniz için yayında.",
    plain:
      'Kısacası: Otel ve çamaşırhanelerin tekstil envanterlerini RFID teknolojisiyle otomatik takip edebilmeleri için gereken web tabanlı yönetim sistemlerini tasarlayıp geliştiriyorum.',
  },

  demos: {
    pos: {
      summary:
        'Satış noktası (POS) arka ofis sistemi: Ürün, kategori, müşteri yönetimi ve rol tabanlı kullanıcı yetkilendirmesi; İngilizce ve Arapça (RTL) dil desteği.',
      note: 'Demo modu açık. Demo hesaplarından birini kullanabilirsiniz. Veriler her gece sıfırlanır.',
    },
    besttrend: {
      summary:
        'Suriye emlak platformu: Fotoğraflı ve harita destekli ilanlar, gelişmiş arama, favoriler, ilan sahibi istatistikleri ve kapsamlı yönetim paneli. Arapça, İngilizce ve Kürtçe dil desteği.',
      note: 'Özel proje: Kaynak kod istek üzerine paylaşılır.',
    },
    invoice: {
      summary:
        'Faturalandırma ve ödeme takibi: Detaylı fatura oluşturma, canlı toplam hesaplama, ödeme durumu (bekleyen/ödendi/gecikmiş) takibi, PDF çıktısı ve müşteriye e-posta gönderimi.',
      note: "Saf PHP: Prepared statement'lar ve CSRF koruması ile güvenli ve hızlı.",
    },
    findjob: {
      summary:
        "Yapay zeka tabanlı iş eşleştirici: CV'nizi yükleyin, Gemini düzenlenebilir bir profile dönüştürsün; ardından size en uygun iş ilanlarıyla eşleşin.",
      note: "Kayıt gerekmez. Örnek CV'yi deneyin ya da kendi PDF'inizi yükleyin.",
    },
    tireshop: {
      summary:
        'Mobil uyumlu lastikçi yönetim sistemi (PWA): Stok, satış, faturalama, gider ve kâr takibi. Arapça (RTL) dil desteği.',
      note: 'Giriş gerekmez: Yerel demo modunda çalışır, veriler tarayıcınızda kalır.',
    },
  } as Record<string, { summary: string; note: string }>,

  timeline: [
    {
      title: 'Full Stack Geliştirici',
      org: 'USTEK RFID',
      where: 'İstanbul',
      summary:
        "USTEK, ticari çamaşırhaneler, oteller ve sağlık kurumları için RFID tabanlı çamaşır yönetimi çözümleri sunuyor; dünya genelinde 30'dan fazla ülkede kurulu. Ben, okuyucular ve terminallerle entegre çalışan web platformunun geliştirilmesinde görev alıyorum.",
      bullets: [
        "PHP, Laravel ve Zend Framework 1 kullanarak; gerçek zamanlı RFID envanter takibi, otomatik faturalama ve lojistik süreçleri için REST API'ler ve web arayüzleri geliştirdim.",
        'Tekstil yaşam döngüsü yönetimi: Depo takibi, kiralama yönetimi ve forma dağıtım süreçlerini optimize ettim.',
        'UHF RFID terminalleri, okuyucular ve platform arasında kesintisiz ve güvenilir veri akışını sağlamak için donanım ekibiyle koordineli çalıştım.',
        'Kritik modülleri yeniden yapılandırarak global ölçekte sistem hatalarını azalttım.',
      ],
    },
    {
      title: 'Altı canlı uygulama',
      org: 'Bağımsız çalışma',
      where: 'mkado.dev üzerinde yayında',
      summary:
        "POS arka ofisi, fatura sistemi, emlak platformu, yapay zeka destekli iş eşleştirici ve lastikçi PWA'sı: Her biri kendi veritabanıyla uçtan uca geliştirildi ve canlı demo olarak yayımlandı.",
      bullets: [],
    },
    {
      title: 'Bilgisayar Mühendisliği Lisans',
      org: 'Burdur Mehmet Akif Ersoy Üniversitesi',
      where: 'Burdur',
      summary:
        'Bitirme projesi: Kado Job App — Flutter, Bloc ve Firebase kullanılarak geliştirilen; yönetim paneli ile bütünleşik bir Android iş ilanı ve personel kadrolama uygulaması.',
      bullets: [],
    },
  ],

  kind: { work: 'iş', projects: 'projeler', education: 'eğitim' } as Record<string, string>,

  skills: {
    groups: {
      'Back end': 'arka uç',
      'Front end': 'ön yüz',
      Data: 'veri',
      'Cloud & tools': 'bulut ve araçlar',
      Domain: 'alan bilgisi',
      Mobile: 'mobil',
    } as Record<string, string>,
    explain: {
      'Back end': 'sunucu tarafı: ekranların arkasındaki mantık ve veri',
      'Front end': 'insanların tarayıcıda gördüğü ve tıkladığı kısım',
      Data: 'veritabanları: bilginin durduğu yer',
      'Cloud & tools': 'barındırma ve kodu yayına alan araçlar',
      Domain: 'getirdiğim sektör bilgisi',
      Mobile: 'telefon uygulamaları',
    } as Record<string, string>,
    note: "USTEK'te günlük işim: gerçek RFID donanımına karşı PHP, Laravel, Zend Framework 1, MySQL ve REST API'ler.",
  },

  trash: [
    {
      file: 'portfolio-console.astro',
      note: "Bu sitenin ilk tasarımı (tek renkli 'mühendislik konsolu'). 3 Eylül 2026'da emekli edildi.",
    },
    {
      file: 'portfolio-blueprint.astro',
      note: 'Teknik çizim temalı ikinci deneme. İlk incelemeyi atlatamadı.',
    },
    {
      file: 'invoice-ui-bootstrap.css',
      note: "Fatura sisteminin eski Bootstrap + jQuery arayüzü; 2026'da elle yazılmış CSS ile değiştirildi.",
    },
  ],
};
