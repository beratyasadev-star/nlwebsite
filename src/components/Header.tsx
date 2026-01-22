'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, memo } from 'react'
import { usePathname } from 'next/navigation'
import { Locale, locales, localeNames } from '@/src/lib/i18n'
import { Dictionary } from '@/src/dictionaries'
import { socialMediaLinks } from '@/src/config/socialMedia'

// Memoized logo component - pathname değişimlerinde yeniden render olmaz
const HeaderLogo = memo(function HeaderLogo() {
  return (
    <Image
      src="/logo-small.jpg"
      alt="Diaspora & Azadî Logo"
      width={200}
      height={200}
      sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 88px"
      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[88px] lg:h-[88px]
                 rounded-xl shadow-lg object-cover
                 ring-2 ring-amber-100 hover:ring-amber-300 transition-all"
      priority
    />
  )
})

interface HeaderProps {
  locale: Locale
  dict: Dictionary
}

export default function Header({ locale, dict }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const pathname = usePathname()

  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  // Kısa dil kodları
  const shortLocaleNames: Record<Locale, string> = {
    tr: 'TR',
    ku: 'KU',
    ar: 'AR',
    nl: 'NL',
    en: 'EN',
  }

  return (
    <header className="bg-white sticky top-0 z-50 shadow-lg">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Menü"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo + Branding */}
          <Link href={`/${locale}`} className="flex items-center gap-3 md:gap-4">
            <div className="relative flex-shrink-0">
              <HeaderLogo />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[28px] font-bold
                             text-gray-900 leading-tight tracking-tight">
                Diaspora & Azadî
              </h1>
              <p className="hidden sm:block text-[10px] md:text-[11px] lg:text-[13px]
                            text-amber-700/80 font-medium mt-0.5">
                {locale === 'tr' ? 'Göç ve Entegrasyon Dayanışma Platformu' :
                 locale === 'ku' ? 'Platforma Hevgirtina Koçberî û Entegrasyonê' :
                 locale === 'ar' ? 'منصة تضامن الهجرة والاندماج' :
                 locale === 'nl' ? 'Migratie en Integratie Solidariteitsplatform' :
                 'Migration and Integration Solidarity Platform'}
              </p>
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-3">

            {/* Desktop Language Selector */}
            <div className="hidden md:flex items-center gap-1 bg-gray-50 rounded-lg p-1">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}${pathnameWithoutLocale}`}
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all
                    ${locale === loc
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  {shortLocaleNames[loc]}
                </Link>
              ))}
            </div>

            {/* Acil Yardım Button - Desktop */}
            <Link
              href={`/${locale}/acil`}
              className="hidden lg:flex items-center gap-2 px-4 py-2.5
                         bg-red-500 hover:bg-red-600 text-white text-sm font-semibold
                         rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {dict.nav.emergency}
            </Link>

            {/* Mobile Language Button */}
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Dil Seç"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center -mx-1">
            <li>
              <Link
                href={`/${locale}`}
                className={`block px-5 py-3 text-sm font-medium transition border-b-2 -mb-[1px]
                  ${pathname === `/${locale}`
                    ? 'border-sky-500 text-sky-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'}`}
              >
                {dict.nav.home}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/rehber`}
                className={`block px-5 py-3 text-sm font-medium transition border-b-2 -mb-[1px]
                  ${pathname.includes('/rehber')
                    ? 'border-emerald-500 text-emerald-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'}`}
              >
                {dict.nav.guides}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/haberler`}
                className={`block px-5 py-3 text-sm font-medium transition border-b-2 -mb-[1px]
                  ${pathname.includes('/haberler')
                    ? 'border-sky-500 text-sky-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'}`}
              >
                {dict.nav.news}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/sss`}
                className={`block px-5 py-3 text-sm font-medium transition border-b-2 -mb-[1px]
                  ${pathname.includes('/sss')
                    ? 'border-amber-500 text-amber-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'}`}
              >
                {dict.nav.faq}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/duyurular`}
                className={`block px-5 py-3 text-sm font-medium transition border-b-2 -mb-[1px]
                  ${pathname.includes('/duyurular')
                    ? 'border-sky-500 text-sky-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'}`}
              >
                {dict.nav.announcements}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/hakkimizda`}
                className={`block px-5 py-3 text-sm font-medium transition border-b-2 -mb-[1px]
                  ${pathname.includes('/hakkimizda')
                    ? 'border-sky-500 text-sky-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'}`}
              >
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/iletisim`}
                className={`block px-5 py-3 text-sm font-medium transition border-b-2 -mb-[1px]
                  ${pathname.includes('/iletisim')
                    ? 'border-sky-500 text-sky-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'}`}
              >
                {dict.nav.contact}
              </Link>
            </li>

            {/* Acil - Nav'da da görünsün (tablet için) */}
            <li className="lg:hidden ml-auto">
              <Link
                href={`/${locale}/acil`}
                className="flex items-center gap-2 px-4 py-2 my-1 mr-1
                           bg-red-500 hover:bg-red-600 text-white text-sm font-semibold
                           rounded-lg transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {dict.nav.emergency}
              </Link>
            </li>

            {/* Sosyal Medya İkonları - Desktop */}
            <li className="ml-auto hidden md:flex items-center gap-2 px-4">
              {socialMediaLinks.facebook.enabled && (
                <a
                  href={socialMediaLinks.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all hover:scale-110"
                  aria-label={socialMediaLinks.facebook.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {socialMediaLinks.instagram.enabled && (
                <a
                  href={socialMediaLinks.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-700 hover:to-pink-600 transition-all hover:scale-110"
                  aria-label={socialMediaLinks.instagram.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
              )}
              {socialMediaLinks.whatsapp.enabled && (
                <a
                  href={socialMediaLinks.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-all hover:scale-110"
                  aria-label={socialMediaLinks.whatsapp.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              )}
              {socialMediaLinks.telegram.enabled && (
                <a
                  href={socialMediaLinks.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-all hover:scale-110"
                  aria-label={socialMediaLinks.telegram.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              )}
              {socialMediaLinks.twitter.enabled && (
                <a
                  href={socialMediaLinks.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center text-white hover:bg-sky-500 transition-all hover:scale-110"
                  aria-label={socialMediaLinks.twitter.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Language Dropdown */}
      {isLangMenuOpen && (
        <div className="md:hidden absolute right-4 top-16 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 min-w-[140px]">
          {locales.map((loc) => (
            <Link
              key={loc}
              href={`/${loc}${pathnameWithoutLocale}`}
              onClick={() => setIsLangMenuOpen(false)}
              className={`block px-4 py-2.5 text-sm font-medium transition
                ${locale === loc
                  ? 'bg-sky-50 text-sky-700'
                  : 'text-gray-700 hover:bg-gray-50'}`}
            >
              {localeNames[loc]}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-gray-50">
          <div className="px-4 py-4">

            {/* Acil Yardım - Mobilde En Üstte */}
            <Link
              href={`/${locale}/acil`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 mb-4
                         bg-red-500 hover:bg-red-600 text-white font-semibold
                         rounded-xl shadow-md transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {dict.nav.emergency}
            </Link>

            {/* Dil Seçici */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-1">
                {locale === 'tr' ? 'Dil Seçin' :
                 locale === 'ku' ? 'Ziman Hilbijêrin' :
                 locale === 'ar' ? 'اختر اللغة' :
                 locale === 'nl' ? 'Kies Taal' :
                 'Select Language'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}${pathnameWithoutLocale}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition
                      ${locale === loc
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-sky-300'}`}
                  >
                    {localeNames[loc]}
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigasyon Linkleri */}
            <nav className="space-y-1">
              <Link
                href={`/${locale}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition
                  ${pathname === `/${locale}`
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-700 hover:bg-white'}`}
              >
                {dict.nav.home}
              </Link>
              <Link
                href={`/${locale}/rehber`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition
                  ${pathname.includes('/rehber')
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-700 hover:bg-white'}`}
              >
                {dict.nav.guides}
              </Link>
              <Link
                href={`/${locale}/sss`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition
                  ${pathname.includes('/sss')
                    ? 'bg-amber-100 text-amber-700'
                    : 'text-gray-700 hover:bg-white'}`}
              >
                {dict.nav.faq}
              </Link>
              <Link
                href={`/${locale}/haberler`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition
                  ${pathname.includes('/haberler')
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-700 hover:bg-white'}`}
              >
                {dict.nav.news}
              </Link>
              <Link
                href={`/${locale}/duyurular`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition
                  ${pathname.includes('/duyurular')
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-700 hover:bg-white'}`}
              >
                {dict.nav.announcements}
              </Link>
              <Link
                href={`/${locale}/hakkimizda`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition
                  ${pathname.includes('/hakkimizda')
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-700 hover:bg-white'}`}
              >
                {dict.nav.about}
              </Link>
              <Link
                href={`/${locale}/iletisim`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition
                  ${pathname.includes('/iletisim')
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-700 hover:bg-white'}`}
              >
                {dict.nav.contact}
              </Link>
            </nav>

            {/* Sosyal Medya - Mobile */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
                {locale === 'tr' ? 'Sosyal Medya' :
                 locale === 'ku' ? 'Medyaya Civakî' :
                 locale === 'ar' ? 'وسائل التواصل الاجتماعي' :
                 locale === 'nl' ? 'Sociale Media' :
                 'Social Media'}
              </h3>
              <div className="flex items-center justify-center gap-3">
                {socialMediaLinks.facebook.enabled && (
                  <a
                    href={socialMediaLinks.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all hover:scale-110 shadow-md"
                    aria-label={socialMediaLinks.facebook.label}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {socialMediaLinks.instagram.enabled && (
                  <a
                    href={socialMediaLinks.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:from-purple-700 hover:to-pink-600 transition-all hover:scale-110 shadow-md"
                    aria-label={socialMediaLinks.instagram.label}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                    </svg>
                  </a>
                )}
                {socialMediaLinks.whatsapp.enabled && (
                  <a
                    href={socialMediaLinks.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-all hover:scale-110 shadow-md"
                    aria-label={socialMediaLinks.whatsapp.label}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                )}
                {socialMediaLinks.telegram.enabled && (
                  <a
                    href={socialMediaLinks.telegram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-all hover:scale-110 shadow-md"
                    aria-label={socialMediaLinks.telegram.label}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                )}
                {socialMediaLinks.twitter.enabled && (
                  <a
                    href={socialMediaLinks.twitter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center text-white hover:bg-sky-500 transition-all hover:scale-110 shadow-md"
                    aria-label={socialMediaLinks.twitter.label}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
