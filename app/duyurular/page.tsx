import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 120

interface Announcement {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedDate: string
  featuredImage: {
    url: string
    alt?: string
  }
  urgent: boolean
  status: string
}

async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/duyurular?limit=100&where[status][equals]=published&sort=-publishedDate`, {
      next: { revalidate: 120 }
    })
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.warn('getAnnouncements: Could not fetch announcements:', error)
    return []
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export default async function DuyurularPage() {
  const announcements = await getAnnouncements()
  const urgentAnnouncements = announcements.filter(a => a.urgent)
  const regularAnnouncements = announcements.filter(a => !a.urgent)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Duyurular</h1>
          <p className="text-lg text-gray-600">
            Hollanda'daki mülteciler için önemli duyuru ve bildirimler
          </p>
        </div>

        {urgentAnnouncements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Acil Duyurular
            </h2>
            <div className="space-y-6">
              {urgentAnnouncements.map((announcement) => (
                <Link
                  key={announcement.id}
                  href={`/duyurular/${announcement.slug}`}
                  className="block bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-48 flex-shrink-0">
                      <Image
                        src={announcement.featuredImage?.url || '/placeholder.jpg'}
                        alt={announcement.featuredImage?.alt || announcement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                          Acil
                        </span>
                        <span className="ml-3 text-sm text-gray-500">{formatDate(announcement.publishedDate)}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-red-600 transition">
                        {announcement.title}
                      </h2>
                      {announcement.excerpt && (
                        <p className="text-gray-700 line-clamp-2">{announcement.excerpt}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {regularAnnouncements.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Genel Duyurular</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularAnnouncements.map((announcement) => (
                <Link
                  key={announcement.id}
                  href={`/duyurular/${announcement.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={announcement.featuredImage?.url || '/placeholder.jpg'}
                      alt={announcement.featuredImage?.alt || announcement.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(announcement.publishedDate)}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition line-clamp-2">
                      {announcement.title}
                    </h2>
                    {announcement.excerpt && (
                      <p className="text-gray-600 line-clamp-3">{announcement.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {announcements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Henüz duyuru bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  )
}
