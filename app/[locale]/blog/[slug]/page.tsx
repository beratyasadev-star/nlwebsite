import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serializeRichText } from '@/src/lib/richtext'
import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'
import { getBlogBySlug } from '@/src/lib/payload'
import { formatDate } from '@/src/lib/utils'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ArticleDetail({ params }: PageProps) {
  const { locale, slug } = await params
  const dict = await getDictionary(locale as Locale)
  const article = await getBlogBySlug(slug, locale)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={article.featuredImage?.url || '/placeholder.jpg'}
              alt={article.featuredImage?.alt || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-5 h-5 me-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-semibold text-sky-600">{article.author}</span>
                <span className="mx-3">•</span>
                <svg className="w-5 h-5 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(article.publishedDate, locale)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
            </div>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: serializeRichText(article.content) }}
            />

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href={`/${locale}/blog`}
                className="text-sky-600 hover:text-sky-700 font-medium flex items-center"
              >
                <svg className="w-5 h-5 me-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {dict.common.backToList}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
