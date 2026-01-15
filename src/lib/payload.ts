const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3001/api'

export async function getNews(limit?: number, locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit.toString())
    params.append('sort', '-publishedDate')
    params.append('depth', '2') // Populate featuredImage
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

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

export async function getNewsBySlug(slug: string, locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    params.append('where[slug][equals]', slug)
    params.append('depth', '2') // Populate featuredImage
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

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

export async function getNewsByCategory(category: string, limit?: number, locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    params.append('where[category][equals]', category)
    if (limit) params.append('limit', limit.toString())
    params.append('sort', '-publishedDate')
    params.append('depth', '2') // Populate featuredImage
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

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

// Blog için
export async function getBlogPosts(limit?: number, locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit.toString())
    params.append('sort', '-publishedDate')
    params.append('depth', '2')
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

    const res = await fetch(`${PAYLOAD_API_URL}/blog?${params}`, {
      next: { revalidate: 60 }
    })

    if (!res.ok) throw new Error('Failed to fetch blog posts')

    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getBlogBySlug(slug: string, locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    params.append('where[slug][equals]', slug)
    params.append('depth', '2')
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

    const res = await fetch(`${PAYLOAD_API_URL}/blog?${params}`, {
      next: { revalidate: 60 }
    })

    if (!res.ok) throw new Error('Failed to fetch blog post')

    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching blog by slug:', error)
    return null
  }
}

// Duyurular için
export async function getAnnouncements(limit?: number, locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit.toString())
    params.append('sort', '-publishedDate')
    params.append('depth', '2')
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

    const res = await fetch(`${PAYLOAD_API_URL}/duyurular?${params}`, {
      next: { revalidate: 60 }
    })

    if (!res.ok) throw new Error('Failed to fetch announcements')

    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return []
  }
}

export async function getAnnouncementBySlug(slug: string, locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    params.append('where[slug][equals]', slug)
    params.append('depth', '2')
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

    const res = await fetch(`${PAYLOAD_API_URL}/duyurular?${params}`, {
      next: { revalidate: 60 }
    })

    if (!res.ok) throw new Error('Failed to fetch announcement')

    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching announcement by slug:', error)
    return null
  }
}

// Giriş Rehberi için
export async function getGuides(limit?: number, locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    if (limit) params.append('limit', limit.toString())
    params.append('sort', '-publishedDate')
    params.append('depth', '2')
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

    const res = await fetch(`${PAYLOAD_API_URL}/rehber?${params}`, {
      next: { revalidate: 60 }
    })

    if (!res.ok) throw new Error('Failed to fetch guides')

    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching guides:', error)
    return []
  }
}

export async function getGuideBySlug(slug: string, locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    params.append('where[slug][equals]', slug)
    params.append('depth', '2')
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

    const res = await fetch(`${PAYLOAD_API_URL}/rehber?${params}`, {
      next: { revalidate: 60 }
    })

    if (!res.ok) throw new Error('Failed to fetch guide')

    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching guide by slug:', error)
    return null
  }
}

// SSS için
export async function getFAQs(locale: string = 'tr') {
  try {
    const params = new URLSearchParams()
    params.append('limit', '100')
    params.append('sort', 'order')
    params.append('locale', locale)
    params.append('fallbackLocale', 'tr')

    const res = await fetch(`${PAYLOAD_API_URL}/sss?${params}`, {
      next: { revalidate: 300 }
    })

    if (!res.ok) throw new Error('Failed to fetch FAQs')

    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }
}
