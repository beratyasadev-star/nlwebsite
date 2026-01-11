import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale, Locale } from '@/src/lib/i18n'

// Locale algılanmayacak path'ler
const publicFiles = [
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/logo.svg',
]

function getLocaleFromRequest(request: NextRequest): Locale {
  // 1. Cookie'den kontrol et
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value as Locale
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // 2. Accept-Language header'ından kontrol et
  const acceptLanguage = request.headers.get('Accept-Language')
  if (acceptLanguage) {
    // Basit parsing
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase())

    for (const lang of languages) {
      // Tam eşleşme
      if (locales.includes(lang as Locale)) {
        return lang as Locale
      }
      // Prefix eşleşme (tr-TR -> tr)
      const prefix = lang.split('-')[0]
      if (locales.includes(prefix as Locale)) {
        return prefix as Locale
      }
    }
  }

  // 3. Varsayılan dil
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public dosyaları atla
  if (publicFiles.some(file => pathname.startsWith(file))) {
    return NextResponse.next()
  }

  // API route'larını atla
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Admin panelini atla (Payload CMS)
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Media dosyalarını atla
  if (pathname.startsWith('/media/')) {
    return NextResponse.next()
  }

  // Static dosyaları atla
  if (pathname.includes('.')) {
    return NextResponse.next()
  }

  // Pathname'de locale var mı kontrol et
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Locale varsa devam et
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Locale yoksa, algıla ve yönlendir
  const locale = getLocaleFromRequest(request)

  // Yeni URL oluştur
  const newUrl = new URL(request.url)
  newUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  // Redirect yap
  const response = NextResponse.redirect(newUrl)

  // Cookie'ye kaydet
  response.cookies.set('NEXT_LOCALE', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 yıl
    path: '/',
  })

  return response
}

export const config = {
  matcher: [
    // Skip internal paths
    '/((?!_next|api|admin|media|.*\\..*).*)',
  ],
}
