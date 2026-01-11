import NewsCard from '@/src/components/NewsCard'
import { getNews } from '@/src/lib/payload'
import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'

export const revalidate = 120

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}

export default async function HaberlerPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const { category } = await searchParams
  const dict = await getDictionary(locale as Locale)

  const allNews = await getNews(100, locale)

  const filteredNews = category
    ? allNews.filter((news: any) => news.category === category)
    : allNews

  const categories = [
    { key: 'asylum', label: dict.categories.asylum },
    { key: 'health', label: dict.categories.health },
    { key: 'education', label: dict.categories.education },
    { key: 'work', label: dict.categories.work },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{dict.nav.news}</h1>

        {/* Kategori Filtreleri */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href={`/${locale}/haberler`}
            className={`px-4 py-2 rounded-full transition ${
              !category
                ? 'bg-sky-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {dict.faq.allCategories}
          </a>
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={`/${locale}/haberler?category=${cat.key}`}
              className={`px-4 py-2 rounded-full transition ${
                category === cat.key
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.label}
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
                locale={locale}
                categoryLabels={dict.categories}
                readMore={dict.common.readMore}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{dict.faq.noResults}</p>
          </div>
        )}
      </div>
    </div>
  )
}
