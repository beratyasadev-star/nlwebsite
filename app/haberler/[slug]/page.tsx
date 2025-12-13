import { getNewsBySlug, getNews } from '@/src/lib/payload'
import { formatDate, getCategoryName } from '@/src/lib/utils'
import { renderRichText } from '@/src/lib/richtext'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const news = await getNews(100)
  
  return news.map((item: any) => ({
    slug: item.slug,
  }))
}

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const news = await getNewsBySlug(params.slug)
  
  if (!news) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-sky-600">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/haberler" className="hover:text-sky-600">Haberler</Link>
          <span>/</span>
          <span className="text-gray-900">{news.title}</span>
        </nav>
        
        {/* Category & Date */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium text-sky-600 bg-sky-50 px-4 py-2 rounded-full">
            {getCategoryName(news.category)}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(news.publishedDate)}
          </span>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {news.title}
        </h1>
        
        {/* Excerpt */}
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          {news.excerpt}
        </p>
        
        {/* Featured Image */}
        {news.featuredImage?.url && (
          <div className="relative h-96 w-full rounded-xl overflow-hidden mb-12">
            <Image
              src={news.featuredImage.url}
              alt={news.featuredImage.alt || news.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {renderRichText(news.content)}
        </div>
        
        {/* Share & Back */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link 
            href="/haberler" 
            className="text-sky-600 hover:text-sky-700 font-medium flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tüm Haberlere Dön
          </Link>
          
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}
