import SSSClient from '@/src/components/SSSClient'

export const revalidate = 300

interface FAQ {
  id: string
  question: string
  answer: any
  category: string
  order: number
}

async function getFAQs(): Promise<FAQ[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'}/api/sss?limit=100&sort=order`
    
    const res = await fetch(url, { 
      next: { revalidate: 300 }
    })
    
    if (!res.ok) {
      return []
    }
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}

export default async function SSSPage() {
  const faqs = await getFAQs()

  return <SSSClient faqs={faqs} />
}
