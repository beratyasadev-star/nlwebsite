const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3001/api'

export async function getNews(limit?: number) {
  try {
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit.toString())
    params.append('sort', '-publishedDate')
    params.append('depth', '2') // Populate featuredImage
    
    const res = await fetch(`${PAYLOAD_API_URL}/haber?${params}`, {
      next: { revalidate: 60 } // ISR: 60 saniye
    })
    
    if (!res.ok) throw new Error('Failed to fetch news')
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    const params = new URLSearchParams()
    params.append('where[slug][equals]', slug)
    params.append('depth', '2') // Populate featuredImage
    
    const res = await fetch(`${PAYLOAD_API_URL}/haber?${params}`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) throw new Error('Failed to fetch news')
    
    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }
}

export async function getNewsByCategory(category: string, limit?: number) {
  try {
    const params = new URLSearchParams()
    params.append('where[category][equals]', category)
    if (limit) params.append('limit', limit.toString())
    params.append('sort', '-publishedDate')
    params.append('depth', '2') // Populate featuredImage
    
    const res = await fetch(`${PAYLOAD_API_URL}/haber?${params}`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) throw new Error('Failed to fetch news by category')
    
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching news by category:', error)
    return []
  }
}
