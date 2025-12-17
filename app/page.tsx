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
      {/* Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 relative z-10">
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
