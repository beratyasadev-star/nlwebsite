import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/src/lib/utils'

interface CategoryLabels {
  asylum: string
  health: string
  education: string
  work: string
  general?: string
}

interface NewsCardProps {
  title: string
  excerpt: string
  slug: string
  category: string
  publishedDate: string
  featuredImage?: {
    url: string
    alt?: string
  }
  locale: string
  categoryLabels: CategoryLabels
  readMore?: string
}

export default function NewsCard({
  title,
  excerpt,
  slug,
  category,
  publishedDate,
  featuredImage,
  locale,
  categoryLabels,
  readMore = 'Devamını Oku'
}: NewsCardProps) {
  // Payload URL'lerini düzelt: /medya -> /media
  const imageUrl = featuredImage?.url
    ? featuredImage.url.replace('/medya/', '/media/').replace('http://localhost:3000', '').replace('http://localhost:3001', '')
    : '/placeholder.jpg'

  const getCategoryLabel = (cat: string) => {
    return categoryLabels[cat as keyof CategoryLabels] || cat
  }

  return (
    <Link href={`/${locale}/haberler/${slug}`} className="group block h-full">
      <article className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0_20px_40px_-8px_rgba(14,165,233,0.25)] hover:-translate-y-1 transition-all duration-500 border border-sky-50/50 h-full flex flex-col">
        <div className="relative h-48 w-full bg-gradient-to-br from-sky-50 to-blue-50 overflow-hidden">
          {featuredImage?.url && (
            <Image
              src={imageUrl}
              alt={featuredImage.alt || title}
              fill
              className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-semibold text-sky-700 bg-gradient-to-r from-sky-50 to-blue-50 px-3 py-1.5 rounded-full border border-sky-100 shadow-sm">
              {getCategoryLabel(category)}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {formatDate(publishedDate, locale)}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors duration-300 line-clamp-2 leading-snug">
            {title}
          </h3>

          <p className="text-gray-600 line-clamp-3 leading-relaxed flex-1">
            {excerpt}
          </p>

          <div className="mt-5 flex items-center text-sky-600 font-semibold group-hover:text-sky-700 transition-colors">
            {readMore}
            <svg className="w-4 h-4 ms-2 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
