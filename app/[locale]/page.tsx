import HeroSlider from '@/src/components/HeroSlider'
import NewsCard from '@/src/components/NewsCard'
import WhatsAppJoinForm from '@/src/components/WhatsAppJoinForm'
import { getNews, getGuides } from '@/src/lib/payload'
import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'
import { formatDate } from '@/src/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

interface PageProps {
  params: Promise<{ locale: string }>
}

function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const sliderNews = await getNews(5, locale)
  const latestNews = await getNews(6, locale)
  const guides = await getGuides(4, locale)

  return (
    <div className="min-h-screen relative">
      {/* Sayfalar ve Hızlı Erişim - Sadece Web */}
      <section className="hidden md:block bg-white/80 backdrop-blur-sm border-b border-sky-100/50 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{dict.home.quickAccess}</h2>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
            <Link href={`/${locale}/haberler?category=asylum`} className="bg-gradient-to-br from-sky-50 to-sky-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(14,165,233,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-sky-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-sky-700 transition-colors">{dict.categories.asylum}</h3>
            </Link>

            <Link href={`/${locale}/haberler?category=health`} className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(34,197,94,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-green-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors">{dict.categories.health}</h3>
            </Link>

            <Link href={`/${locale}/haberler?category=education`} className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(59,130,246,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-blue-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{dict.categories.education}</h3>
            </Link>

            <Link href={`/${locale}/haberler?category=work`} className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(249,115,22,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-orange-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-orange-700 transition-colors">{dict.categories.work}</h3>
            </Link>

            <Link href={`/${locale}/haberler`} className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl hover:shadow-[0_8px_30px_rgb(168,85,247,0.2)] hover:-translate-y-1 transition-all duration-300 group border border-purple-200/50">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{dict.categories.all}</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 relative z-10">
        <HeroSlider items={sliderNews} locale={locale} />
      </section>

      {/* Newsletter + WhatsApp */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-[0_8px_30px_rgba(14,165,233,0.12)] border border-sky-100/50 flex flex-col hover:shadow-[0_12px_40px_rgba(14,165,233,0.18)] transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-4 flex-1">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{dict.home.contactUs}</h3>
                  <p className="text-sky-700 text-sm">{dict.home.contactDescription}</p>
                </div>
              </div>
              <Link
                href={`/${locale}/iletisim`}
                className="w-full bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-700 transition text-center flex items-center justify-center gap-2 mt-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {dict.home.contactForm}
              </Link>
            </div>

            {/* WhatsApp Join Form */}
            <WhatsAppJoinForm dict={dict.whatsapp} />
          </div>
        </div>
      </section>

      {/* Giriş Rehberi */}
      {guides.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">{dict.nav.guides}</h2>
            <Link href={`/${locale}/rehber`} className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 group">
              {dict.home.viewAll}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="space-y-6">
            {/* Featured Guide - First Guide Large */}
            {guides[0] && (
              <Link
                href={`/${locale}/rehber/${guides[0].slug}`}
                className="block group"
              >
                <article className="relative bg-white overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition rounded-2xl">
                  <div className="md:flex md:items-center">
                    <div className="md:w-2/5 relative h-48 md:h-56">
                      <Image
                        src={guides[0].featuredImage?.url || '/placeholder.jpg'}
                        alt={guides[0].featuredImage?.alt || guides[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="font-semibold text-emerald-600 uppercase tracking-wide text-xs">{dict.common.featured}</span>
                        <span className="mx-3">•</span>
                        <span>{formatDate(guides[0].publishedDate, locale)}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition leading-tight">
                        {guides[0].title}
                      </h3>
                      {guides[0].excerpt && (
                        <p className="text-base text-gray-600 mb-4">{truncateText(guides[0].excerpt, 120)}</p>
                      )}
                      <div className="flex items-center text-sm">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center me-3">
                          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="font-semibold text-gray-900">{dict.nav.guides}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Grid of Other Guides */}
            {guides.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {guides.slice(1, 4).map((guide: any) => (
                  <Link
                    key={guide.id}
                    href={`/${locale}/rehber/${guide.slug}`}
                    className="group"
                  >
                    <article className="bg-white border border-gray-200 hover:shadow-md transition h-full flex flex-col rounded-xl overflow-hidden">
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={guide.featuredImage?.url || '/placeholder.jpg'}
                          alt={guide.featuredImage?.alt || guide.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span>{formatDate(guide.publishedDate, locale)}</span>
                        </div>
                        <h4 className="text-base font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition line-clamp-2 leading-tight">
                          {guide.title}
                        </h4>
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center me-2">
                              <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-600">{dict.nav.guides}</span>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Son Eklenenler */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 relative z-10">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">{dict.home.latestNews}</h2>
          <Link href={`/${locale}/haberler`} className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2 group">
            {dict.home.viewAll}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              locale={locale}
              categoryLabels={dict.categories}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
