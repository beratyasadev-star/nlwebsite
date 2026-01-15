import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serializeRichText } from '@/src/lib/richtext'
import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'
import { getGuideBySlug } from '@/src/lib/payload'
import { formatDate } from '@/src/lib/utils'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function GuideDetail({ params }: PageProps) {
  const { locale, slug } = await params
  const dict = await getDictionary(locale as Locale)
  const guide = await getGuideBySlug(slug, locale)

  if (!guide) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={guide.featuredImage?.url || '/placeholder.jpg'}
              alt={guide.featuredImage?.alt || guide.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-5 h-5 me-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="font-semibold text-emerald-600">{dict.nav.guides}</span>
                <span className="mx-3">•</span>
                <svg className="w-5 h-5 me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(guide.publishedDate, locale)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{guide.title}</h1>
            </div>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: serializeRichText(guide.content) }}
            />

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href={`/${locale}/rehber`}
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
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
