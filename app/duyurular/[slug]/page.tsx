import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serializeRichText } from '@/src/lib/richtext'

export const revalidate = 3600
export const dynamicParams = true

async function getAnnouncements() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/duyurular?limit=100&sort=-publishedDate`, {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.warn('getAnnouncements: Could not fetch announcements')
    return []
  }
}

export async function generateStaticParams() {
  try {
    const announcements = await getAnnouncements()
    
    return announcements.map((item: any) => ({
      slug: item.slug,
    }))
  } catch (error) {
    console.warn('generateStaticParams: Could not fetch announcements, returning empty array')
    return []
  }
}

interface Announcement {
  id: string
  title: string
  slug: string
  publishedDate: string
  featuredImage: {
    url: string
    alt?: string
  }
  content: any
  urgent: boolean
}

async function getAnnouncement(slug: string): Promise<Announcement | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/duyurular?where[slug][equals]=${slug}&where[status][equals]=published`,
    { next: { revalidate: 3600 } }
  )
  
  if (!res.ok) {
    return null
  }
  
  const data = await res.json()
  return data.docs?.[0] || null
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export default async function AnnouncementDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const announcement = await getAnnouncement(slug)

  if (!announcement) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`rounded-lg shadow-lg overflow-hidden ${announcement.urgent ? 'bg-red-50 border-l-4 border-red-600' : 'bg-white'}`}>
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
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mr-3">
                    Acil Duyuru
                  </span>
                )}
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">{formatDate(announcement.publishedDate)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{announcement.title}</h1>
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: serializeRichText(announcement.content) }}
            />
          </div>
        </div>
      </article>
    </div>
  )
}
