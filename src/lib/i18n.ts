export const locales = ['tr', 'ku', 'ar', 'nl', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'tr'

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  ku: 'Kurdî',
  ar: 'العربية',
  nl: 'Nederlands',
  en: 'English',
}

export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  tr: 'ltr',
  ku: 'ltr',
  ar: 'rtl',
  nl: 'ltr',
  en: 'ltr',
}

// Dil algılama için
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/')
  const potentialLocale = segments[1] as Locale

  if (locales.includes(potentialLocale)) {
    return potentialLocale
  }

  return defaultLocale
}

// Pathname'den locale'i çıkar
export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/')
  const potentialLocale = segments[1] as Locale

  if (locales.includes(potentialLocale)) {
    return '/' + segments.slice(2).join('/')
  }

  return pathname
}

// Pathname'e locale ekle
export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPathname(pathname)
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}
