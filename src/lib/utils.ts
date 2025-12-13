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

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}
