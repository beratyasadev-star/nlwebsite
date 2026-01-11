import Link from 'next/link'
import Image from 'next/image'
import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'
import { getBlogPosts } from '@/src/lib/payload'
import { formatDate } from '@/src/lib/utils'

export const revalidate = 120

interface PageProps {
  params: Promise<{ locale: string }>
}

function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const articles = await getBlogPosts(100, locale)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{dict.nav.blog}</h1>
          <p className="text-lg text-gray-600">
            {dict.home.blogDescription}
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{dict.faq.noResults}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Article - First Article Large */}
            {articles[0] && (
              <Link
                href={`/${locale}/blog/${articles[0].slug}`}
                className="block group"
              >
                <article className="relative bg-white overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition">
                  <div className="md:flex md:items-center">
                    <div className="md:w-1/3 relative h-48 md:h-64">
                      <Image
                        src={articles[0].featuredImage?.url || '/placeholder.jpg'}
                        alt={articles[0].featuredImage?.alt || articles[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span className="font-semibold text-sky-600 uppercase tracking-wide text-xs">{dict.common.featured}</span>
                        <span className="mx-3">•</span>
                        <span>{formatDate(articles[0].publishedDate, locale)}</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition leading-tight">
                        {articles[0].title}
                      </h2>
                      {articles[0].excerpt && (
                        <p className="text-base text-gray-600 mb-4">{truncateText(articles[0].excerpt, 150)}</p>
                      )}
                      <div className="flex items-center text-sm">
                        <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center me-3">
                          <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{articles[0].author}</p>
                          <p className="text-gray-500 text-xs">{dict.common.columnist}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Grid of Other Articles */}
            {articles.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(1).map((article: any, index: number) => (
                  <Link
                    key={article.id}
                    href={`/${locale}/blog/${article.slug}`}
                    className="group"
                  >
                    <article className="bg-white border border-gray-200 hover:shadow-md transition h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={article.featuredImage?.url || '/placeholder.jpg'}
                          alt={article.featuredImage?.alt || article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 start-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs font-semibold text-gray-700">#{index + 2}</span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center text-xs text-gray-500 mb-3">
                          <span>{formatDate(article.publishedDate, locale)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition line-clamp-2 leading-tight">
                          {article.title}
                        </h3>
                        {article.excerpt && (
                          <p className="text-sm text-gray-600 mb-4 flex-1">{truncateText(article.excerpt, 100)}</p>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center me-2">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{article.author}</span>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-sky-600 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
