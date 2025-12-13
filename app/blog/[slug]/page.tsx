import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { serializeRichText } from '@/src/lib/richtext'

export const revalidate = 3600

interface Article {
  id: string
  title: string
  slug: string
  author: string
  publishedDate: string
  featuredImage: {
    url: string
    alt?: string
  }
  content: any
}

async function getArticle(slug: string): Promise<Article | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/blog?where[slug][equals]=${slug}&where[status][equals]=published`,
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

export default async function ArticleDetail({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)

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
                <svg className="w-5 h-5 mr-2 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-semibold text-sky-600">{article.author}</span>
                <span className="mx-3">•</span>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(article.publishedDate)}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
            </div>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: serializeRichText(article.content) }}
            />
          </div>
        </div>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/blog?limit=100&where[status][equals]=published`,
      { next: { revalidate: 3600 } }
    )
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    const articles = data.docs || []
    
    return articles.map((article: Article) => ({
      slug: article.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
