import HeroSlider from '@/src/components/HeroSlider'
import NewsCard from '@/src/components/NewsCard'
import WhatsAppJoinForm from '@/src/components/WhatsAppJoinForm'
import { getNews } from '@/src/lib/payload'
import Link from 'next/link'

export const revalidate = 60

export default async function Home() {
  const sliderNews = await getNews(5)
  const latestNews = await getNews(6)
  
  return (
    <div className="min-h-screen relative">
      {/* Hızlı Erişim - Tüm Kategoriler */}
      <section className="bg-white/80 backdrop-blur-sm border-b border-sky-100/50 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Hızlı Erişim</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Link href="/haberler?category=asylum" className="bg-gradient-to-br from-sky-50 to-sky-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(14,165,233,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-sky-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-sky-700 transition-colors">İltica ve Resmi İşlemler</h3>
            </Link>

            <Link href="/haberler?category=health" className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(34,197,94,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-green-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors">Sağlık</h3>
            </Link>

            <Link href="/haberler?category=education" className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(59,130,246,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-blue-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Eğitim</h3>
            </Link>

            <Link href="/haberler?category=work" className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(249,115,22,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-orange-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-orange-700 transition-colors">İş & Çalışma</h3>
            </Link>

            <Link href="/haberler" className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(168,85,247,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-purple-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Tüm Gönderiler</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <HeroSlider items={sliderNews} />
      </section>

      {/* Newsletter + WhatsApp */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-[0_8px_30px_rgba(14,165,233,0.12)] border border-sky-100/50 flex flex-col hover:shadow-[0_12px_40px_rgba(14,165,233,0.18)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Bize Ulaşın</h3>
                  <p className="text-sky-700 text-sm">Soru, görüş ve önerileriniz için</p>
                </div>
              </div>
              <Link
                href="/iletisim"
                className="w-full bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition text-center flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                İletişim Formu
              </Link>
            </div>

            {/* WhatsApp Join Form */}
            <WhatsAppJoinForm />
          </div>
        </div>
      </section>

      {/* Son Eklenenler */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Son Eklenenler</h2>
          <Link href="/haberler" className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2 group">
            Tümünü Gör
            <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((news: any) => (
            <NewsCard
              key={news.id}
              title={news.title}
              excerpt={news.excerpt}
              slug={news.slug}
              category={news.category}
              publishedDate={news.publishedDate}
              featuredImage={news.featuredImage}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
