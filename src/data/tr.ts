// Turkish copy for the /v2 (mkOS) page. English lives in site.ts; the UI chrome
// is bilingual inline in the components. Keyed to match site.ts so the two
// stay in step: demos by slug, timeline by index, skills by group name.

export const tr = {
  profile: {
    title: 'Bilgisayar Mühendisi',
    role: 'Full-Stack Geliştirici',
    headline: "30'dan fazla ülkede çalışan RFID sistemlerinin web tarafını geliştiriyorum.",
    intro:
      "İstanbul'da yaşayan, full-stack çalışan bir bilgisayar mühendisiyim. 2023'ten beri USTEK RFID'de PHP, Laravel ve " +
      "Zend Framework ile REST API'ler ve web arayüzleri geliştiriyorum; ürün, 30'dan fazla ülkede ticari çamaşırhaneler, " +
      'oteller ve hastaneler tarafından kullanılan bir çamaşır yönetim platformu. Kendi zamanımda React ve Next.js ile ' +
      'üretiyorum. Aşağıdaki altı uygulama yayında ve denemeniz için açık.',
    plain:
      'Sade anlatımıyla: otellerin ve çamaşırhanelerin her bir parçayı otomatik takip edebilmesi için RFID donanımının ' +
      'üstünde çalışan web sistemlerini yazıyorum.',
  },

  demos: {
    pos: {
      summary:
        'Bir satış noktası sisteminin arka ofisi: ürünler, kategoriler, müşteriler ve rol bazlı yetkilerle kullanıcılar; İngilizce ve Arapça (sağdan sola).',
      note: 'Kayıt kapalı; yukarıdaki hesaplardan birini kullanın. Veriler her gece sıfırlanır.',
    },
    besttrend: {
      summary:
        'Suriye için emlak platformu: fotoğraflı ve haritalı ilanlar, arama ve kayıtlı aramalar, favoriler, ilan sahibi istatistikleri ve moderasyon için yönetim paneli. Arapça, İngilizce ve Kürtçe.',
      note: 'Özel depo — kod istek üzerine paylaşılır.',
    },
    invoice: {
      summary:
        'Kalem kalem faturalar ve canlı toplamlar, bekleyen / ödenmiş / geciken ödemelerin takibi, PDF çıktısı ve müşteriye e-posta.',
      note: "Framework'süz sade PHP: prepared statement'lar, CSRF token'ları, kullanıcıya özel veri.",
    },
    findjob: {
      summary:
        'CV yükleyin, Gemini onu düzenlenebilir bir profile dönüştürsün, sonra gerçek iş ilanlarıyla puanlanmış eşleşmeleri görün.',
      note: "Giriş yok. Örnek CV'yi deneyin ya da kendi PDF'inizi yükleyin.",
    },
    tireshop: {
      summary:
        'Lastikçi işletmek için mobil öncelikli PWA: stok, satış ve fatura, giderler ve kâr raporları. Arapça, sağdan sola.',
      note: 'Giriş yok — yerel demo modunda çalışır, veriler tarayıcınızda kalır.',
    },
  } as Record<string, { summary: string; note: string }>,

  timeline: [
    {
      title: 'Full Stack Geliştirici',
      org: 'USTEK RFID',
      where: 'İstanbul',
      summary:
        "USTEK, ticari çamaşırhaneler, oteller ve sağlık kurumları için RFID tabanlı çamaşır yönetimi geliştiriyor; 30'dan fazla ülkede kurulu. Ben okuyucuların ve terminallerin üstünde çalışan web platformunda çalışıyorum.",
      bullets: [
        "Gerçek zamanlı RFID envanter takibi, otomatik faturalama ve lojistik için PHP, Laravel ve Zend Framework 1 ile REST API'ler ve web arayüzleri geliştirdim.",
        'Çarşaf ve üniforma yaşam döngüsü özellikleri: depo izleme, üniforma kiralama yönetimi ve forma dağıtımı.',
        'UHF RFID terminalleri, okuyucular ve platform arasında verinin güvenilir akması için donanım ekibiyle çalıştım.',
        'Hataya açık modülleri yeniden yazarak dünya genelindeki müşterilerde üretim olaylarını azalttım.',
      ],
    },
    {
      title: 'Üretim kalitesinde beş uygulama',
      org: 'Bağımsız çalışma',
      where: 'mkado.dev üzerinde yayında',
      summary:
        "Bir POS arka ofisi, bir fatura sistemi, bir emlak platformu, yapay zekâlı bir iş eşleştirici ve bir lastikçi PWA'sı — her biri kendi veritabanıyla uçtan uca geliştirildi ve herkesin giriş yapabileceği canlı demo olarak yayınlandı.",
      bullets: [],
    },
    {
      title: 'Bilgisayar Mühendisliği Lisans',
      org: 'Burdur Mehmet Akif Ersoy Üniversitesi',
      where: 'Burdur',
      summary:
        'Bitirme projesi: Kado Job App — Flutter, Bloc ve Firebase ile geliştirilmiş, yönetim paneli olan bir iş ilanı ve proje kadrolama Android uygulaması.',
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
