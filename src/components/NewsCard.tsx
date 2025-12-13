import Link from 'next/link'
import Image from 'next/image'
import { formatDate, getCategoryName } from '@/src/lib/utils'

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
}

export default function NewsCard({ 
  title, 
  excerpt, 
  slug, 
  category, 
  publishedDate,
  featuredImage 
}: NewsCardProps) {
  // Payload URL'lerini düzelt: /medya -> /media
  const imageUrl = featuredImage?.url 
    ? featuredImage.url.replace('/medya/', '/media/').replace('http://localhost:3000', '').replace('http://localhost:3001', '')
    : '/placeholder.jpg'
  
  return (
    <Link href={`/haberler/${slug}`} className="group">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full bg-gray-200">
          {featuredImage?.url && (
            <Image
              src={imageUrl}
              alt={featuredImage.alt || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
              {getCategoryName(category)}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(publishedDate)}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-600 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="mt-4 flex items-center text-sky-600 font-medium">
            Devamını Oku
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
