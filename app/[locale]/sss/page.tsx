import SSSClient from '@/src/components/SSSClient'
import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'
import { getFAQs } from '@/src/lib/payload'

export const revalidate = 300

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function SSSPage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const faqs = await getFAQs(locale)

  return <SSSClient faqs={faqs} dict={dict} locale={locale} />
}
