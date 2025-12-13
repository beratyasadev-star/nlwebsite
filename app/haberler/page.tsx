import NewsCard from '@/src/components/NewsCard'
import { getNews } from '@/src/lib/payload'
import { CATEGORIES } from '@/src/lib/utils'

export const revalidate = 120 // ISR: 120 saniye

export default async function HaberlerPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await searchParamsPromise
  const allNews = await getNews(100)
  
  // Kategori filtreleme
  const filteredNews = searchParams.category
    ? allNews.filter((news: any) => news.category === searchParams.category)
    : allNews
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Bilgi Bankası</h1>
        
        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href="/haberler"
            className={`px-4 py-2 rounded-full transition ${
              !searchParams.category
                ? 'bg-sky-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tümü
          </a>
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <a
              key={key}
              href={`/haberler?category=${key}`}
              className={`px-4 py-2 rounded-full transition ${
                searchParams.category === key
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {label}
            </a>
          ))}
        </div>
        
        {/* Haberler Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news: any) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Bu kategoride henüz haber bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  )
}
