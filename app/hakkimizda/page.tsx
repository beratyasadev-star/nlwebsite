export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgba(14,165,233,0.12)] overflow-hidden border border-sky-100/50">
          <div className="p-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-10">
              Hakkımızda
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>NL Onderwijs</strong>, Hollanda'ya iyi bir başlangıç için birbirlerini bilgilendirmek,
                tavsiyelerde bulunmak ve desteklemek amacıyla bir grup mülteci Kürt aktivistin kurduğu girişimdir.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Ağırlıklı olarak Türkiye ve Kürdistan halklarından oluşan özgürleştirici, dayanışmacı ve
                tabandan gelen bir oluşumdur.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Amacımız</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Girişimimiz, Hollanda'da yeni gelen göçmenlerin ve ilticaya başvurmuş insanların,
                Hollanda'daki günlük yaşama uyum sağlamalarına yardımcı olmak, bilgi ve becerilerini
                topluma kazandırmayı amaçlamaktadır.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Misyonumuz</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                İlticacıların ve göçmenlerin isteklerini, hedeflerini, engelleri ve imkânları değerlendirmek
                ve şartları göze alarak onlara yardım sağlamak misyonunda olan NL Onderwijs, farklı sivil
                toplum kuruluşlarıyla iş birliği içerisinde etkinlikler yapmaktadır.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Ne Sunuyoruz?</h2>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-sky-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">İltica ve resmi işlemler hakkında güncel bilgiler</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-sky-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Eğitim ve kariyer geliştirme desteği</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-sky-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Entegrasyon sürecinde rehberlik</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-sky-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Aktif topluluk ve deneyim paylaşımı</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-sky-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Sivil toplum kuruluşlarıyla işbirliği ve etkinlikler</span>
                </li>
              </ul>

              <div className="bg-gradient-to-r from-sky-50 to-blue-50 border-l-4 border-sky-600 rounded-r-2xl p-8 mt-10 shadow-sm">
                <p className="text-gray-800 font-semibold text-lg leading-relaxed">
                  🤝 Birlikte daha güçlüyüz! Hollanda'daki yeni yaşamınızda size destek olmaktan mutluluk duyuyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
