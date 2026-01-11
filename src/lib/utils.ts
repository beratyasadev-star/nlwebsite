export const CATEGORIES = {
  asylum: 'İltica ve Resmi İşlemler',
  health: 'Sağlık',
  education: 'Eğitim',
  work: 'İş ve Çalışma',
  general: 'Genel',
} as const;

export type CategoryKey = keyof typeof CATEGORIES

export function getCategoryName(key: string): string {
  return CATEGORIES[key as CategoryKey] || key
}

const localeMap: Record<string, string> = {
  tr: 'tr-TR',
  ku: 'ku',
  ar: 'ar-SA'
}

export function formatDate(dateString: string, locale: string = 'tr'): string {
  const date = new Date(dateString)
  const localeCode = localeMap[locale] || 'tr-TR'

  try {
    return new Intl.DateTimeFormat(localeCode, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  } catch {
    // Fallback for Kurdish which may not be supported
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
}
