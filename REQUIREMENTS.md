# 📋 Mülteci Destek Platformu - Gereksinimler

> **Not:** Bu döküman **modüler** yapıdadır. Her bölüm bağımsız olarak güncellenebilir.  
> Feedback'ler için lütfen ilgili bölümü belirtin (örn: "Sayfa Yapısı > Ana Sayfa" veya "Tasarım > Renk Paleti")

---

## 📌 Proje Bilgileri

| Alan | Değer | 🔄 Değiştirilebilir |
|------|-------|-------------------|
| **Son Güncelleme** | 10 Aralık 2025 | ✅ Otomatik |
| **Versiyon** | 2.0 | ✅ |
| **Hedef Kitle** | Hollanda'da yaşayan mülteciler | ✅ Değiştirilebilir |
| **Ana Dil** | Türkçe | ✅ Değiştirilebilir |
| **Gelecek Diller** | İngilizce, Arapça, Hollandaca | ✅ Eklenebilir |

---

## 🎯 Temel Hedef

**Hollanda'da yaşayan mültecilere** yönelik bilgi platformu - **kolay içerik yönetimi** için admin panelli, modern ve kullanıcı dostu bir website.

### 🔄 Değiştirilebilir Parametreler:
- Hedef ülke (şu an: Hollanda)
- Hedef kitle (şu an: Mülteciler)
- İçerik odağı (şu an: Hollanda yasaları ve sistemleri)

---

## 🔧 MODÜLER YAPILANDIRMA REHBERİ

> **Bu bölüm feedback sürecini kolaylaştırmak için eklendi.**

### Nasıl Feedback Vermelisiniz?

Format: `[BÖLÜM ADI] > [ALT BÖLÜM] > Değişiklik önerisi`

**Örnekler:**
- ✅ `[TASARIM] > [Renk Paleti] > Ana rengi turkuaz yapalım`
- ✅ `[SAYFA YAPISI] > [Ana Sayfa] > Slider'ı kaldıralım`
- ✅ `[PERFORMANS] > [Bundle Size] > 200KB'a çıkaralım`
- ✅ `[İÇERİK KATEGORİLERİ] > Eğitim kategorisini iki parçaya bölelim`

### Değiştirilebilir Bileşenler

| Kategori | Bileşen | Kolay Değişiklik | Orta Değişiklik | Zor Değişiklik |
|----------|---------|------------------|-----------------|----------------|
| **Sayfa Yapısı** | Sayfa ekle/çıkar | ✅ | | |
| **Tasarım** | Renk, font | ✅ | | |
| **Tasarım** | Layout yapısı | | 🟡 | |
| **İçerik** | Kategori ekle/çıkar | ✅ | | |
| **Özellikler** | Slider, CTA vb. | ✅ | | |
| **Performans** | Bundle size limitleri | ✅ | | |
| **Teknoloji** | CMS değişikliği | | | 🔴 |
| **Dil** | Yeni dil ekle | | 🟡 | |

### Bölüm İndeksi (Hızlı Erişim)

1. [Proje Bilgileri](#-proje-bilgileri) - Genel bilgiler
2. [Sayfa Yapısı](#-sayfa-yapısı) - Hangi sayfalar var
3. [İçerik Kategorileri](#içerik-kategorileri) - Haber/yazı kategorileri
4. [Tasarım](#-tasarım-gereksinimleri) - Renkler, fontlar, görünüm
5. [Admin Panel](#-admin-panel-özellikleri) - Yönetim arayüzü
6. [Performans](#-performans-gereksinimleri-kritik) - Hız, optimizasyon
7. [Teknoloji](#-teknik-gereksinimler) - CMS, framework seçimleri
8. [Deployment](#-deployment-yayınlama) - Hosting, yayınlama

---

## ✅ Kesin Gereksinimler

### 1. Hedef Kitle ve Dil
- ✅ **Hedef**: Hollanda'da yaşayan mülteciler
- ✅ **Ana Dil**: Türkçe (çoklu dil şimdilik YOK)
- ✅ **İçerik Odağı**: Hollanda özelinde bilgiler
  - Hollanda göç yasaları
  - IND (Immigratie- en Naturalisatiedienst) başvuruları
  - Hollanda'da ikamet izinleri (verblijfsvergunning)
  - COA (Centraal Orgaan opvang asielzoekers) bilgileri
  - DigiD, BSN numarası
  - Hollanda sosyal yardımları (bijstand, toeslagen)
  - Hollanda sağlık sistemi (zorgverzekering)
  - Hollanda eğitim sistemi
  - NT2 (Nederlands als tweede taal) kursları
  - Hollanda'da iş bulma

### 2. İçerik Yönetimi
- ✅ **Admin Panel ZORUNLU**
- Teknik bilgisi olmayan kişiler kolayca içerik ekleyebilmeli
- Markdown/kod bilgisi GEREKMEMELİ
- Görsel yükleme kolay ve sezgisel olmalı

### 3. Görseller
- ✅ **Her içeriğin bir görseli OLMALI**
- Görsel yükleme: Drag & drop veya dosya seçimi
- Otomatik görsel optimizasyonu
- Görsel önizleme özelliği

### 4. Ana Sayfa Slider
- ✅ **Son eklenen içeriklerin görselleri slider'da otomatik dönsün**
- Slider öğeleri: Son 5 içerik
- Otomatik geçiş: 5 saniye
- Manuel geçiş ok tuşları
- Her slide'da: Görsel, başlık, kısa açıklama, "Devamını Oku" butonu

---

## 📄 Sayfa Yapısı

### 1. Ana Sayfa (`/`)
```
- Header (Logo, Navigasyon, Dil seçici YOK)
- Hero Slider (Son içeriklerden otomatik)
- Hızlı Erişim Kartları (SSS, Haberler, İletişim vs.)
- Son Haberler (3 kart - görsel + başlık + özet)
- WhatsApp Grubu CTA
- Newsletter Kayıt Formu
- Footer
- Floating WhatsApp/Telegram Butonları
```

### 2. Haberler (`/haberler`)
- Liste görünümü (kart formatı)
- Her kart: Görsel + Başlık + Tarih + Özet + Kategori
- Sayfalama (12 haber/sayfa)
- Kategori filtreleme
- Detay sayfası: `/haberler/[id]`

### 3. Köşe Yazıları (`/kose-yazilari`)
- Liste görünümü
- Her kart: Görsel + Başlık + Yazar + Tarih + Özet
- Detay sayfası: `/kose-yazilari/[id]`

### 4. Duyurular (`/duyurular`)
- Kronolojik liste
- Acil/önemli vurgusu
- Her kart: Görsel + Başlık + Tarih + Özet
- Detay sayfası: `/duyurular/[id]`

### 5. Sık Sorulan Sorular (`/sss`)
- Accordion (genişleyen/kapanan) yapısı
- Kategori bazlı gruplandırma
- Arama fonksiyonu
- Görsel eklenebilir (opsiyonel)

### 6. Hakkımızda (`/hakkimizda`)
- Statik sayfa
- Admin panelden düzenlenebilir
- Görsel + metin içerik

### 7. İletişim (`/iletisim`)
- İletişim formu
- Harita (opsiyonel)
- İletişim bilgileri
- Sosyal medya linkleri

---

## 🎨 Admin Panel Özellikleri

### Giriş Sistemi
- ✅ Email + Şifre ile giriş
- "Beni Hatırla" özelliği
- Şifre sıfırlama (email)

### Dashboard (Ana Sayfa)
- Toplam içerik sayıları (haberler, yazılar, duyurular, SSS)
- Son eklenen içerikler
- Hızlı işlemler (yeni içerik ekle)

### İçerik Yönetimi

#### Haberler
**Ekleme/Düzenleme Formu:**
- Başlık (zorunlu)
- Kategori (dropdown: 
  - IND/İkamet İzni
  - COA/Barınma
  - Sağlık (Zorgverzekering)
  - Eğitim/NT2
  - İş ve Çalışma
  - Sosyal Yardımlar
  - Hukuk
  - DigiD/BSN
  - Genel
  - Diğer)
- Görsel (zorunlu - drag & drop yükleme)
- Özet (max 200 karakter)
- İçerik (WYSIWYG editör - zengin metin editörü)
- Yazar adı
- İlgili linkler (IND, COA, gemeente websiteleri)
- Yayın durumu (Taslak / Yayında)
- Tarih (otomatik veya manuel)

**Liste Görünümü:**
- Tablo formatı
- Sütunlar: Görsel (küçük), Başlık, Kategori, Tarih, Durum
- Aksiyonlar: Düzenle, Sil, Önizle
- Arama ve filtreleme
- Sıralama (tarih, başlık)

#### Köşe Yazıları
(Haberler ile aynı yapı + Yazar bilgisi vurgulanmış)

#### Duyurular
(Haberler ile aynı yapı + "Acil Duyuru" checkbox'ı)

#### SSS
**Ekleme/Düzenleme Formu:**
- Soru (zorunlu)
- Cevap (WYSIWYG editör)
- Kategori (dropdown)
- Sıralama numarası
- Görsel (opsiyonel)

#### Hakkımızda / İletişim Sayfaları
- WYSIWYG editör
- Görsel yükleme
- Meta bilgileri (SEO)

### Medya Yönetimi
- Tüm yüklenen görseller bir havuzda
- Görsel arama
- Görsel silme
- Otomatik thumbnail oluşturma
- Maksimum dosya boyutu: 5MB
- İzin verilen formatlar: JPG, PNG, WebP

### Ayarlar
- Site bilgileri (site adı, logo)
- İletişim bilgileri (Hollanda telefon numarası, adres)
- Sosyal medya linkleri
- WhatsApp/Telegram grup linkleri
- Faydalı linkler:
  - IND website
  - COA website
  - Gemeente websites
  - DigiD
  - DUO (eğitim)
  - UWV (iş)
- SEO ayarları (meta description, keywords)

---

## 🛠 Teknik Gereksinimler

### Teknoloji Seçenekleri

#### Öneri 1: Payload CMS + Next.js (ÖNERİLEN)
**Artıları:**
- ✅ Tam TypeScript desteği
- ✅ Yerleşik admin paneli
- ✅ Kolay kurulum
- ✅ Modern WYSIWYG editör
- ✅ Görsel yükleme ve yönetimi dahili
- ✅ Next.js ile tam entegrasyon
- ✅ Self-hosted (kendi sunucunuzda)
- ✅ Ücretsiz ve açık kaynak

**Eksileri:**
- İlk kurulum biraz zaman alır

#### Öneri 2: Strapi + Next.js
**Artıları:**
- ✅ Çok popüler
- ✅ Güçlü admin paneli
- ✅ İyi dokümantasyon
- ✅ Medya yönetimi mükemmel

**Eksileri:**
- Daha fazla yapılandırma gerekir

#### Öneri 3: Sanity CMS + Next.js
**Artıları:**
- ✅ Çok güçlü WYSIWYG editör
- ✅ Real-time güncelleme
- ✅ Hosted (barındırma yok)
- ✅ Ücretsiz plan (küçük projeler için)

**Eksileri:**
- Cloud-based (3. parti servise bağımlı)

### Önerilen Teknoloji Stack (Payload CMS)

```
Frontend:
- Next.js 15
- TypeScript
- Tailwind CSS
- Swiper.js (slider)

Backend/CMS:
- Payload CMS
- MongoDB (veritabanı)
- Node.js

Hosting:
- Vercel (frontend)
- MongoDB Atlas (database - ücretsiz tier)
- Vercel/Railway (CMS backend)
```

---

## 📁 Proje Yapısı (Payload CMS ile)

```
/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── (frontend)/
│   │   │   ├── page.tsx        # Ana sayfa
│   │   │   ├── haberler/
│   │   │   ├── kose-yazilari/
│   │   │   ├── duyurular/
│   │   │   ├── sss/
│   │   │   └── ...
│   │   └── (payload)/
│   │       └── admin/          # Admin panel rotası
│   ├── components/
│   │   ├── sections/
│   │   ├── ui/
│   │   └── layout/
│   ├── payload/
│   │   ├── collections/        # CMS koleksiyonları
│   │   │   ├── Haberler.ts
│   │   │   ├── KoseYazilari.ts
│   │   │   ├── Duyurular.ts
│   │   │   ├── SSS.ts
│   │   │   └── Media.ts
│   │   └── payload.config.ts
│   └── lib/
├── public/
│   └── media/                  # Yüklenen görseller
└── payload.config.ts
```

---

## 🎨 Tasarım Gereksinimleri

### Genel
- Non-profit friendly, temiz, profesyonel
- Mobil öncelikli (responsive)
- Erişilebilir (WCAG AA standartları)
- Hızlı yükleme (<2 saniye)

### Renk Paleti
- **Ana renk**: Güven veren mavi (#0ea5e9)
- **Vurgu rengi**: Sıcak turuncu (#f97316)
- **Metin**: Koyu gri (#171717)
- **Arka plan**: Beyaz, açık gri tonları

### Tipografi
- Ana font: Modern sans-serif (Inter, Geist)
- Başlıklar: Kalın, okunabilir
- Paragraflar: Yüksek satır aralığı (1.7)

### Slider Tasarımı
- Full-width veya container-içi
- Görsel overlay (başlık okunabilirliği için)
- Smooth geçişler
- Mobilde swipe desteği
- İndikatör noktaları (dots)
- Ok tuşları (arrows)

---

## ⚡ Performans Gereksinimleri (KRİTİK)

### Yükleme Hızı Hedefleri
- ✅ **İlk sayfa yükleme**: < 1.5 saniye (3G bağlantıda)
- ✅ **Time to Interactive (TTI)**: < 2 saniye
- ✅ **Largest Contentful Paint (LCP)**: < 2.5 saniye
- ✅ **First Input Delay (FID)**: < 100ms
- ✅ **Cumulative Layout Shift (CLS)**: < 0.1

### Google PageSpeed Scores
- **Mobil**: > 90/100
- **Desktop**: > 95/100

### Optimizasyon Stratejileri

#### 1. Görsel Optimizasyonu (EN ÖNEMLİ)
- ✅ **Otomatik WebP/AVIF dönüşümü** (upload sırasında)
- ✅ **Lazy loading** (görünür alandaki görseller hariç)
- ✅ **Responsive images** (farklı ekran boyutları için farklı boyutlar)
- ✅ **Blur placeholder** (yüklenirken)
- ✅ **CDN kullanımı** (Cloudinary veya Vercel Image Optimization)
- ✅ **Maksimum kalite/boyut dengesi**:
  - Ana görsel: Max 1920px genişlik, 200KB
  - Thumbnail: Max 400px genişlik, 50KB
  - Slider görselleri: Max 1920px, 300KB
- ✅ **Sharp/ImageMagick** ile otomatik sıkıştırma

#### 2. Kod Optimizasyonu
- ✅ **Code splitting** (sayfa bazlı)
- ✅ **Tree shaking** (kullanılmayan kod temizleme)
- ✅ **Minification** (JS/CSS sıkıştırma)
- ✅ **Critical CSS** (ilk yükleme için)
- ✅ **Font optimization**:
  - System fonts kullanımı (fallback)
  - Font subsetting (sadece kullanılan karakterler)
  - Font display: swap

#### 3. Caching Stratejisi
- ✅ **Static Generation (SSG)** tüm sayfalarda
- ✅ **ISR (Incremental Static Regeneration)**:
  - Ana sayfa: 60 saniye revalidate
  - Haberler listesi: 120 saniye
  - Detay sayfaları: On-demand (webhook ile)
- ✅ **CDN edge caching** (Vercel Edge Network)
- ✅ **Browser caching** (uzun süreli cache headers)

#### 4. JavaScript Optimizasyonu
- ✅ **Minimal dependencies** (sadece gerekli kütüphaneler)
- ✅ **Dynamic imports** (sayfa geçişlerinde)
- ✅ **No jQuery** (vanilla JS veya React)
- ✅ **Preload kritik resources**
- ✅ **Defer non-critical scripts**

#### 5. API/Database Optimizasyonu
- ✅ **GraphQL** (sadece gerekli data)
- ✅ **Database indexing** (MongoDB)
- ✅ **Query optimization**
- ✅ **Data caching** (Redis opsiyonel)
- ✅ **Pagination** (sonsuz yükleme yerine)

#### 6. Mobil Optimizasyon
- ✅ **Touch-friendly** (minimum 44x44px butonlar)
- ✅ **Viewport optimization**
- ✅ **No horizontal scroll**
- ✅ **Optimized tap targets**
- ✅ **Reduced animations** (mobilde)
- ✅ **Service Worker** (offline destek - opsiyonel)

#### 7. Third-party Scripts
- ✅ **Async/defer** tüm 3rd party scriptler
- ✅ **Minimal tracking** (sadece Google Analytics veya Plausible)
- ✅ **No blocking resources**
- ✅ **DNS prefetch** kritik domainler için

### Bundle Size Limits
- **Initial JS bundle**: < 170KB (gzipped)
- **Total page weight**: < 500KB (görsellerle birlikte < 1.5MB)
- **CSS bundle**: < 50KB (gzipped)

### Performance Monitoring
- ✅ **Google Lighthouse CI** (her deployment'ta)
- ✅ **Web Vitals** tracking (gerçek kullanıcı metrikleri)
- ✅ **Vercel Analytics** (varsayılan)
- ✅ **Performans budgets** (CI/CD pipeline'da)

### Teknolojik Seçimler (Performans Odaklı)

**Slider Kütüphanesi:**
- ❌ Swiper.js (çok ağır - ~140KB)
- ✅ **Embla Carousel** (~20KB) veya
- ✅ **Keen Slider** (~15KB) veya
- ✅ Custom lightweight slider

**Icon Kütüphanesi:**
- ❌ FontAwesome (tüm set)
- ✅ **Lucide React** (sadece kullanılanlar - tree-shakeable)
- ✅ Veya SVG sprites

**CSS Framework:**
- ✅ **Tailwind CSS** (PurgeCSS ile)
- ✅ Sadece kullanılan classlar
- ✅ JIT mode

**Form Validation:**
- ✅ **React Hook Form** (minimal) + **Zod**
- ❌ Formik (daha ağır)

### Performans Test Checklist
- [ ] Lighthouse score > 90 (mobil/desktop)
- [ ] WebPageTest: A grade (tüm kategoriler)
- [ ] GTmetrix: A grade
- [ ] Pingdom: < 2 saniye yükleme
- [ ] 3G bağlantıda test
- [ ] Throttling ile test (Chrome DevTools)

---

## 🔒 Güvenlik (Temel Seviye Koruma)

> **Hedef:** Dışarıdan gelen temel saldırılara karşı korunma

### 🔄 Değiştirilebilir: Güvenlik Seviyesi
- **Şu an:** Temel/Orta seviye (non-profit siteler için yeterli)
- **İlerisi:** Gelişmiş (ek maliyetle)

### Zorunlu Güvenlik Önlemleri

#### 1. Kimlik Doğrulama & Yetkilendirme
- ✅ **Admin paneli şifre korumalı**
  - Minimum 8 karakter
  - En az 1 büyük harf, 1 rakam
  - Brute force koruması (5 yanlış denemeden sonra 15 dk bekleme)
- ✅ **2FA (İki faktörlü doğrulama)** - Opsiyonel ama önerilen
- ✅ **Session timeout** (30 dakika hareketsizlik)
- ✅ **Güvenli şifre saklama** (bcrypt/argon2)

#### 2. Web Uygulama Güvenliği
- ✅ **HTTPS zorunlu** (SSL/TLS sertifikası)
  - HTTP → HTTPS otomatik yönlendirme
  - HSTS (HTTP Strict Transport Security) header
- ✅ **XSS (Cross-Site Scripting) koruması**
  - Input validation (tüm kullanıcı girdileri)
  - Output encoding
  - Content sanitization
- ✅ **CSRF (Cross-Site Request Forgery) koruması**
  - CSRF token'ları
  - SameSite cookie attribute
- ✅ **SQL Injection koruması**
  - Parameterized queries
  - ORM kullanımı (Payload CMS zaten korumalı)
- ✅ **Content Security Policy (CSP)**
  - Inline script engelleme
  - Güvenilir kaynaklardan resource yükleme

#### 3. DDoS & Spam Koruması
- ✅ **Rate Limiting**
  - Login: Max 5 deneme/15 dakika
  - API: Max 100 istek/dakika/IP
  - Form submission: Max 3 form/dakika/IP
- ✅ **reCAPTCHA v3** (iletişim formu, newsletter)
- ✅ **IP blocking** (şüpheli IP'ler için)
- ✅ **Cloudflare** veya benzeri CDN kullanımı (DDoS koruması)

#### 4. Dosya Yükleme Güvenliği
- ✅ **Dosya tipi kontrolü**
  - Sadece izin verilen formatlar (JPG, PNG, WebP)
  - MIME type validation
  - Magic number kontrolü
- ✅ **Dosya boyutu limiti** (Max 5MB)
- ✅ **Dosya adı sanitization** (tehlikeli karakterleri temizle)
- ✅ **Virüs taraması** (Opsiyonel - ClamAV entegrasyonu)
- ✅ **Yüklenen dosyalar execute edilemesin**

#### 5. API & Database Güvenliği
- ✅ **Environment variables** (.env dosyası)
  - API keys, database credentials asla kod içinde değil
  - .gitignore'da .env
- ✅ **Database şifreleme** (at-rest encryption)
- ✅ **Güvenli API endpoints**
  - Authentication required
  - Input validation
- ✅ **MongoDB injection koruması**

#### 6. Headers & Cookies
```
Security Headers:
- X-Frame-Options: DENY (clickjacking koruması)
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: geolocation=(), microphone=(), camera=()

Secure Cookies:
- HttpOnly: true
- Secure: true
- SameSite: Strict
```

#### 7. Monitoring & Logging
- ✅ **Güvenlik logları**
  - Başarısız login denemeleri
  - Şüpheli aktiviteler
  - Admin panel erişimleri
- ✅ **Error handling**
  - Kullanıcıya detaylı hata mesajı gösterme
  - Log'larda detaylı bilgi
- ✅ **Uptime monitoring** (UptimeRobot, Pingdom)

#### 8. Dependency Güvenliği
- ✅ **npm audit** düzenli çalıştırma
- ✅ **Dependabot** (GitHub - otomatik güvenlik güncellemeleri)
- ✅ **Package version locking** (package-lock.json)

#### 9. Backup & Recovery
- ✅ **Otomatik günlük backup** (database + media)
- ✅ **Backup şifreleme**
- ✅ **Recovery planı** (disaster recovery)

### Opsiyonel İleri Seviye (Gelecek)
- [ ] Web Application Firewall (WAF)
- [ ] Penetration testing (yıllık)
- [ ] Security audit (kod review)
- [ ] Bug bounty program
- [ ] Advanced DDoS mitigation

### 🔄 Güvenlik Test Checklist
- [ ] OWASP Top 10 kontrolü
- [ ] SSL Labs test (A+ rating)
- [ ] Security Headers test
- [ ] XSS test
- [ ] CSRF test
- [ ] Rate limiting test

### 🚨 Güvenlik İhlali Durumunda
1. Tüm kullanıcıları çıkış yaptır
2. Şifre sıfırlama e-postası gönder
3. Güvenlik açığını kapat
4. Affected kullanıcıları bilgilendir
5. İnceleme raporu hazırla

---

## 📊 SEO Gereksinimleri

- Her sayfa için meta title/description
- Open Graph tags (sosyal medya paylaşımı)
- Sitemap.xml otomatik oluşturma
- Robots.txt
- Görsel alt text (erişilebilirlik)
- Structured data (Schema.org JSON-LD)
- Canonical URLs
- Mobil uyumlu (mobile-first indexing)

---

## 🚀 Deployment (Yayınlama)

### Seçenek 1: Vercel + MongoDB Atlas (ÖNERİLEN - ÜCRETSİZ)
- Frontend: Vercel
- Database: MongoDB Atlas (ücretsiz 512MB)
- Media: Vercel (veya Cloudinary ücretsiz)

### Seçenek 2: Railway (Hepsi bir arada)
- Full-stack hosting
- Kolay deployment
- Düşük maliyetli

### Seçenek 3: DigitalOcean/Hetzner VPS
- Tam kontrol
- Aylık ~$5-10
- Teknik bilgi gerektirir

---

## ✅ Başarı Kriterleri

1. ✅ Teknik bilgisi olmayan kişi 5 dakikada içerik ekleyebilmeli
2. ✅ Görsel yükleme süresi < 10 saniye
3. ✅ Slider'da yeni içerik hemen görünmeli (ISR ile max 60 saniye)
4. ✅ **Mobil kullanılabilirlik > 90/100 (Google PageSpeed)**
5. ✅ **Desktop kullanılabilirlik > 95/100 (Google PageSpeed)**
6. ✅ **İlk sayfa yükleme < 1.5 saniye (3G bağlantıda)**
7. ✅ Admin paneli sezgisel ve kullanımı kolay olmalı
8. ✅ **Total page weight < 1.5MB (görsellerle)**
9. ✅ **Core Web Vitals: Tüm yeşil (Good)**
10. ✅ **Lighthouse Performance score > 90**

---

## 📝 Geliştirme Aşamaları

### Faz 1: Kurulum (Gün 1)
- [ ] Payload CMS + Next.js kurulumu
- [ ] MongoDB bağlantısı
- [ ] Temel koleksiyonlar oluşturma
- [ ] Admin paneli yapılandırma

### Faz 2: CMS Koleksiyonları (Gün 1-2)
- [ ] Haberler koleksiyonu
- [ ] Köşe Yazıları koleksiyonu
- [ ] Duyurular koleksiyonu
- [ ] SSS koleksiyonu
- [ ] Media (görsel) yönetimi

### Faz 3: Frontend Sayfalar (Gün 2-3)
- [ ] Ana sayfa + slider (dinamik)
- [ ] Haberler listesi ve detay
- [ ] Köşe yazıları listesi ve detay
- [ ] Duyurular listesi ve detay
- [ ] SSS sayfası (accordion)
- [ ] Statik sayfalar (Hakkımızda, İletişim)

### Faz 4: Tasarım ve UI (Gün 3-4)
- [ ] Responsive tasarım
- [ ] Slider animasyonları
- [ ] Görsel optimizasyonu
- [ ] Floating butonlar
- [ ] Newsletter formu

### Faz 5: Test ve Deployment (Gün 4-5)
- [ ] İçerik ekleme testleri
- [ ] Mobil test
- [ ] SEO optimizasyonu
- [ ] Production deployment
- [ ] Domain bağlama

---

## 💰 Maliyet Tahmini

### Geliştirme (Tek seferlik)
- **Yazılım**: $0 (açık kaynak)
- **Geliştirme**: Kendi yaparsanız $0, yaptırırsanız ~$1000-2000

### Aylık İşletme
- **Hosting (Vercel)**: $0 (hobby plan yeterli)
- **Database (MongoDB Atlas)**: $0 (ücretsiz tier)
- **Domain**: ~$10-15/yıl
- **TOPLAM**: ~$1-2/ay

---

## 🎓 Kullanıcı Eğitimi

Admin paneli için basit video eğitim veya döküman hazırlanmalı:
1. Giriş yapma
2. Yeni haber ekleme
3. Görsel yükleme
4. İçerik düzenleme
5. İçerik silme

---

## 🔄 Gelecek Özellikler (V3)

- [ ] Çoklu dil desteği (EN, AR)
- [ ] Yorum sistemi
- [ ] Kullanıcı kayıt sistemi
- [ ] PDF döküman yükleme
- [ ] Video embed (YouTube)
- [ ] Push notification
- [ ] Analytics dashboard

---

**Sonuç:** Bu yapı ile hem kullanıcı dostu hem de yönetilebilir bir platform elde edersiniz. Payload CMS sayesinde admin paneli hazır gelir, siz sadece tasarım ve içeriğe odaklanırsınız.

**Tahmini Tamamlanma Süresi:** 4-5 gün (tam zamanlı çalışma)

**Önerilen Başlangıç:** Payload CMS + Next.js
