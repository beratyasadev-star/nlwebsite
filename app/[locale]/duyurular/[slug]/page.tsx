import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serializeRichText } from '@/src/lib/richtext'
import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'
import { getAnnouncementBySlug } from '@/src/lib/payload'
import { formatDate } from '@/src/lib/utils'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  return []
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function AnnouncementDetail({ params }: PageProps) {
  const { locale, slug } = await params
  const dict = await getDictionary(locale as Locale)
  const announcement = await getAnnouncementBySlug(slug, locale)

  if (!announcement) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`rounded-lg shadow-lg overflow-hidden ${announcement.urgent ? 'bg-red-50 border-s-4 border-red-600' : 'bg-white'}`}>
          <div className="relative h-96">
            <Image
              src={announcement.featuredImage?.url || '/placeholder.jpg'}
              alt={announcement.featuredImage?.alt || announcement.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center text-sm mb-4">
                {announcement.urgent && (
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase me-3">
                    {dict.common.urgentAnnouncement}
                  </span>
                )}
                <svg className="w-5 h-5 me-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">{formatDate(announcement.publishedDate, locale)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{announcement.title}</h1>
            </div>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: serializeRichText(announcement.content) }}
            />

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href={`/${locale}/duyurular`}
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
