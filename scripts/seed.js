import fetch from 'node-fetch';

const PAYLOAD_URL = 'http://localhost:3001';

// Önce admin kullanıcısı oluştur
async function createAdmin() {
  try {
    const response = await fetch(`${PAYLOAD_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@hollandarehberi.com',
        password: 'admin123',
        name: 'Admin',
      }),
    });
    
    const data = await response.json();
    console.log('✅ Admin kullanıcı oluşturuldu:', data);
    return data;
  } catch (error) {
    console.log('ℹ️ Admin zaten var veya oluşturulamadı');
  }
}

// Login yap ve token al
async function login() {
  const response = await fetch(`${PAYLOAD_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'admin@hollandarehberi.com',
      password: 'admin123',
    }),
  });
  
  const data = await response.json();
  console.log('✅ Login başarılı');
  return data.token;
}

// Örnek haberler
const sampleNews = [
  {
    title: 'IND Randevu Sistemi Yenilendi - 2025 Değişiklikleri',
    slug: 'ind-randevu-sistemi-yenilendi-2025',
    excerpt: 'IND (Immigratie- en Naturalisatiedienst) randevu sistemi 2025 yılında yenilendi. Yeni sistemle randevu almak artık daha kolay.',
    content: JSON.stringify([
      {
        children: [
          {
            text: 'IND Randevu Sistemi Güncellendi'
          }
        ],
        type: 'h1'
      },
      {
        children: [
          {
            text: 'IND (Immigratie- en Naturalisatiedienst) 2025 yılı başında randevu sistemini güncelledi. Yeni sistemle birlikte randevu almak artık çok daha kolay ve hızlı.'
          }
        ]
      },
      {
        children: [
          {
            text: 'Yeni Sistemin Özellikleri:'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: '• Online randevu sistemi 7/24 aktif\n• SMS ile randevu hatırlatması\n• Tercüman desteği randevu sırasında talep edilebilir\n• Dijital belge yükleme imkanı\n• Randevu değişikliği 48 saat öncesine kadar ücretsiz'
          }
        ]
      },
      {
        children: [
          {
            text: 'Randevu almak için ind.nl adresini ziyaret edebilirsiniz.'
          }
        ]
      }
    ]),
    category: 'ind',
    publishedDate: new Date('2025-01-15').toISOString(),
    featured: true,
    status: 'published',
  },
  {
    title: 'DigiD Başvurusu Nasıl Yapılır? Detaylı Rehber',
    slug: 'digid-basvurusu-nasil-yapilir',
    excerpt: 'DigiD, Hollanda\'da birçok resmi işlem için gerekli olan dijital kimlik sistemidir. Başvuru süreci ve gerekli belgeler hakkında bilgi.',
    content: JSON.stringify([
      {
        children: [
          {
            text: 'DigiD Nedir ve Neden Önemlidir?'
          }
        ],
        type: 'h1'
      },
      {
        children: [
          {
            text: 'DigiD (Digitale Identiteit), Hollanda hükümetinin sunduğu dijital kimlik sistemidir. Vergi, sağlık sigortası, sosyal yardımlar gibi birçok resmi işlem için DigiD kullanmanız gerekmektedir.'
          }
        ]
      },
      {
        children: [
          {
            text: 'DigiD Başvuru Adımları'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: '1. BSN (Burgerservicenummer) almanız gerekiyor\n2. digid.nl adresine gidin\n3. "DigiD aanvragen" butonuna tıklayın\n4. BSN numaranızı ve kişisel bilgilerinizi girin\n5. 5 iş günü içinde posta ile aktivasyon kodu gelecek\n6. Kodu kullanarak hesabınızı aktif edin'
          }
        ]
      },
      {
        children: [
          {
            text: 'DigiD başvurusu tamamen ücretsizdir.'
          }
        ]
      }
    ]),
    category: 'official',
    publishedDate: new Date('2025-01-10').toISOString(),
    featured: true,
    status: 'published',
  },
  {
    title: 'Hollanda Sağlık Sigortası (Zorgverzekering) 2025 Fiyatları',
    slug: 'hollanda-saglik-sigortasi-2025-fiyatlari',
    excerpt: 'Hollanda\'da yaşayan herkes için zorunlu olan sağlık sigortası hakkında bilmeniz gerekenler ve 2025 yılı güncel fiyatları.',
    content: JSON.stringify([
      {
        children: [
          {
            text: 'Hollanda Sağlık Sigortası Zorunludur'
          }
        ],
        type: 'h1'
      },
      {
        children: [
          {
            text: 'Hollanda\'da yaşayan 18 yaş üstü herkes sağlık sigortası yaptırmak zorundadır. Sigorta yaptırmamanın ciddi cezaları vardır.'
          }
        ]
      },
      {
        children: [
          {
            text: '2025 Ortalama Fiyatlar'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: '• Temel paket (basisverzekering): €130-150/ay\n• Diş bakımı paketi: +€15-25/ay\n• Fizik tedavi paketi: +€10-20/ay\n• Yıllık own risk (eigen risico): €385 (zorunlu)'
          }
        ]
      },
      {
        children: [
          {
            text: 'Popüler Sigorta Şirketleri'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: 'Zilveren Kruis, VGZ, CZ, Menzis ve ONVZ en çok tercih edilen sigorta şirketleridir. independer.nl sitesinden karşılaştırma yapabilirsiniz.'
          }
        ]
      }
    ]),
    category: 'health',
    publishedDate: new Date('2025-01-08').toISOString(),
    featured: true,
    status: 'published',
  },
  {
    title: 'NT2 Sınavı Hazırlık Rehberi - Hollandaca Öğrenin',
    slug: 'nt2-sinavi-hazirlik-rehberi',
    excerpt: 'NT2 (Nederlands als Tweede Taal) sınavı Hollanda\'da çalışmak veya eğitim görmek isteyenler için önemlidir. Hazırlık ipuçları.',
    content: JSON.stringify([
      {
        children: [
          {
            text: 'NT2 Sınavı Nedir?'
          }
        ],
        type: 'h1'
      },
      {
        children: [
          {
            text: 'NT2 (Nederlands als Tweede Taal), Hollandaca\'yı ikinci dil olarak öğrenenler için yapılan dil sınavıdır. İki seviyesi vardır: NT2-I (Staatsexamen I) ve NT2-II (Staatsexamen II).'
          }
        ]
      },
      {
        children: [
          {
            text: 'Sınav Bölümleri'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: '• Dinleme (Luisteren)\n• Okuma (Lezen)\n• Yazma (Schrijven)\n• Konuşma (Spreken)'
          }
        ]
      },
      {
        children: [
          {
            text: 'Ücretsiz Hazırlık Kaynakları'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: '• duo.nl - Resmi pratik sınavları\n• learndutch.org - Online dersler\n• Nederlandse taal (app) - Mobil uygulama\n• Kütüphaneler ücretsiz NT2 kursları düzenliyor'
          }
        ]
      }
    ]),
    category: 'education',
    publishedDate: new Date('2025-01-05').toISOString(),
    featured: true,
    status: 'published',
  },
  {
    title: 'Hollanda\'da İş Bulma İpuçları - 2025 İş Piyasası',
    slug: 'hollanda-is-bulma-ipuclari-2025',
    excerpt: 'Hollanda\'da iş aramak için bilmeniz gereken ipuçları, CV hazırlama ve başvuru süreci hakkında detaylı bilgi.',
    content: JSON.stringify([
      {
        children: [
          {
            text: 'Hollanda İş Piyasası 2025'
          }
        ],
        type: 'h1'
      },
      {
        children: [
          {
            text: 'Hollanda, özellikle teknoloji, lojistik ve sağlık sektörlerinde sürekli eleman arıyor. Doğru strateji ile iş bulmak mümkün.'
          }
        ]
      },
      {
        children: [
          {
            text: 'En İyi İş Arama Siteleri'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: '• Indeed.nl\n• Linkedin.com\n• Werk.nl (UWV resmi sitesi)\n• Nationalevacaturebank.nl\n• Monsterboard.nl'
          }
        ]
      },
      {
        children: [
          {
            text: 'Hollanda Usulü CV Hazırlama'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: 'Hollanda\'da CV maksimum 2 sayfa olmalıdır. Fotoğraf eklemek zorunlu değildir. Motivasyon mektubu (motivatiebrief) çok önemlidir. europass.eu sitesinden standart CV formatı kullanabilirsiniz.'
          }
        ]
      }
    ]),
    category: 'work',
    publishedDate: new Date('2025-01-03').toISOString(),
    featured: false,
    status: 'published',
  },
  {
    title: 'COA Barınma Sistemi Hakkında Bilmeniz Gerekenler',
    slug: 'coa-barinma-sistemi-bilgiler',
    excerpt: 'COA (Centraal Orgaan opvang asielzoekers) sığınmacı kabul merkezleri hakkında detaylı bilgi ve haklar.',
    content: JSON.stringify([
      {
        children: [
          {
            text: 'COA Nedir?'
          }
        ],
        type: 'h1'
      },
      {
        children: [
          {
            text: 'COA (Centraal Orgaan opvang asielzoekers), Hollanda\'da sığınmacıların barınmasından ve temel ihtiyaçlarının karşılanmasından sorumlu kurumdur.'
          }
        ]
      },
      {
        children: [
          {
            text: 'COA\'da Sunulan Hizmetler'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: '• Barınma\n• Yemek (günde 3 öğün)\n• Temel sağlık hizmetleri\n• Cep harçlığı (haftalık)\n• Hollandaca dersleri\n• Hukuki danışmanlık\n• Çocuklar için okul'
          }
        ]
      },
      {
        children: [
          {
            text: 'Daha fazla bilgi için coa.nl adresini ziyaret edebilirsiniz.'
          }
        ]
      }
    ]),
    category: 'official',
    publishedDate: new Date('2025-01-01').toISOString(),
    featured: false,
    status: 'published',
  },
  {
    title: 'BSN Numarası Nasıl Alınır? Adım Adım Rehber',
    slug: 'bsn-numarasi-nasil-alinir',
    excerpt: 'BSN (Burgerservicenummer) Hollanda\'da yaşamak için zorunlu olan kimlik numarasıdır. Alma süreci hakkında detaylar.',
    content: JSON.stringify([
      {
        children: [
          {
            text: 'BSN Numarası Nedir?'
          }
        ],
        type: 'h1'
      },
      {
        children: [
          {
            text: 'BSN (Burgerservicenummer), Hollanda\'daki TC kimlik numarasının karşılığıdır. Bankacılık, sağlık sigortası, iş başvurusu gibi tüm işlemlerde bu numara gereklidir.'
          }
        ]
      },
      {
        children: [
          {
            text: 'BSN Nasıl Alınır?'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: '1. Yaşadığınız şehrin belediyesine (gemeente) gidin\n2. Adres kayıt randevusu (inschrijving) alın\n3. Pasaport/kimlik ve ikamet izni belgeleri ile randevuya gidin\n4. Aynı gün BSN numaranız verilir\n5. 2-3 hafta içinde posta ile resmi belge gelir'
          }
        ]
      },
      {
        children: [
          {
            text: 'BSN almak ücretsizdir ve aynı gün verilir.'
          }
        ]
      }
    ]),
    category: 'official',
    publishedDate: new Date('2024-12-28').toISOString(),
    featured: false,
    status: 'published',
  },
  {
    title: 'Hollanda Sosyal Yardımları (Toeslagen) 2025 Rehberi',
    slug: 'hollanda-sosyal-yardimlari-toeslagen-2025',
    excerpt: 'Hollanda\'da düşük gelirli aileler için sunulan sosyal yardımlar (toeslagen) hakkında kapsamlı bilgi.',
    content: JSON.stringify([
      {
        children: [
          {
            text: 'Toeslagen Nedir?'
          }
        ],
        type: 'h1'
      },
      {
        children: [
          {
            text: 'Toeslagen, Hollanda hükümetinin düşük ve orta gelirli ailelere sağladığı finansal desteklerdir. Doğru başvuru ile yüzlerce euro yardım alabilirsiniz.'
          }
        ]
      },
      {
        children: [
          {
            text: 'Toeslag Türleri'
          }
        ],
        type: 'h2'
      },
      {
        children: [
          {
            text: '1. Zorgtoeslag (Sağlık sigortası yardımı): Max €150/ay\n2. Huurtoeslag (Kira yardımı): Max €450/ay\n3. Kinderopvangtoeslag (Çocuk bakım yardımı): %95\'e kadar\n4. Kindgebonden budget (Çocuk parası): €1.000-2.000/yıl'
          }
        ]
      },
      {
        children: [
          {
            text: 'Başvuru toeslagen.nl adresinden online yapılmaktadır. DigiD ile giriş yapmanız gerekmektedir.'
          }
        ]
      }
    ]),
    category: 'general',
    publishedDate: new Date('2024-12-25').toISOString(),
    featured: false,
    status: 'published',
  }
];

async function seedData() {
  try {
    // Admin oluştur
    await createAdmin();
    
    // Login ol
    const token = await login();
    
    console.log('\n📝 İçerikler ekleniyor...\n');
    
    // Her haber için
    for (const news of sampleNews) {
      try {
        const response = await fetch(`${PAYLOAD_URL}/api/news`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
          body: JSON.stringify(news),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          console.log(`✅ Eklendi: ${news.title}`);
        } else {
          console.log(`❌ Hata: ${news.title}`, data);
        }
      } catch (error) {
        console.log(`❌ Hata: ${news.title}`, error.message);
      }
    }
    
    console.log('\n🎉 Tüm içerikler eklendi!');
    console.log('👉 http://localhost:3001/admin adresine gidin\n');
    
  } catch (error) {
    console.error('❌ Genel hata:', error);
  }
}

seedData();
