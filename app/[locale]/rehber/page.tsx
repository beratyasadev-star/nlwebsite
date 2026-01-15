import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'
import { getGuides } from '@/src/lib/payload'
import { formatDate } from '@/src/lib/utils'

export const revalidate = 120

interface PageProps {
  params: Promise<{ locale: string }>
}

function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export default async function GuidesPage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const guides = await getGuides(100, locale)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{dict.nav.guides}</h1>
          <p className="text-lg text-gray-600">
            {dict.home.guidesDescription}
          </p>
        </div>

        {guides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{dict.faq.noResults}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Guide - First Guide Large */}
            {guides[0] && (
              <Link
                href={`/${locale}/rehber/${guides[0].slug}`}
                className="block group"
              >
                <article className="relative bg-white overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition">
                  <div className="md:flex md:items-center">
                    <div className="md:w-1/3 relative h-48 md:h-64">
                      <Image
                        src={guides[0].featuredImage?.url || '/placeholder.jpg'}
                        alt={guides[0].featuredImage?.alt || guides[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="font-semibold text-emerald-600 uppercase tracking-wide text-xs">{dict.common.featured}</span>
                        <span className="mx-3">•</span>
                        <span>{formatDate(guides[0].publishedDate, locale)}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition leading-tight">
                        {guides[0].title}
                      </h2>
                      {guides[0].excerpt && (
                        <p className="text-base text-gray-600 mb-4">{truncateText(guides[0].excerpt, 150)}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.slice(1).map((guide: any, index: number) => (
                  <Link
                    key={guide.id}
                    href={`/${locale}/rehber/${guide.slug}`}
                    className="group"
                  >
                    <article className="bg-white border border-gray-200 hover:shadow-md transition h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={guide.featuredImage?.url || '/placeholder.jpg'}
                          alt={guide.featuredImage?.alt || guide.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 start-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs font-semibold text-gray-700">#{index + 2}</span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <span>{formatDate(guide.publishedDate, locale)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition line-clamp-2 leading-tight">
                          {guide.title}
                        </h3>
                        {guide.excerpt && (
                          <p className="text-sm text-gray-600 mb-4 flex-1">{truncateText(guide.excerpt, 100)}</p>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center me-2">
                              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{dict.nav.guides}</span>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        )}
      </div>
    </div>
  )
}
