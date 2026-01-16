'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Locale, locales, localeNames } from '@/src/lib/i18n'
import { Dictionary } from '@/src/dictionaries'

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
              <Image
                src="/logo.jpeg"
                alt="Diaspora & Azadî Logo"
                width={88}
                height={88}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[88px] lg:h-[88px]
                           rounded-xl shadow-lg object-cover
                           ring-2 ring-amber-100 hover:ring-amber-300 transition-all"
                priority
              />
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
      <nav className="hidden md:block bg-gradient-to-r from-sky-600 to-sky-700 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center -mx-1">
            <li>
              <Link
                href={`/${locale}`}
                className={`block px-5 py-3.5 text-sm font-medium transition
                  ${pathname === `/${locale}`
                    ? 'bg-sky-800/50 text-white'
                    : 'text-white/90 hover:bg-sky-800/30 hover:text-white'}`}
              >
                {dict.nav.home}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/rehber`}
                className={`block px-5 py-3.5 text-sm font-medium transition
                  ${pathname.includes('/rehber')
                    ? 'bg-sky-800/50 text-white'
                    : 'text-white/90 hover:bg-sky-800/30 hover:text-white'}`}
              >
                {dict.nav.guides}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/haberler`}
                className={`block px-5 py-3.5 text-sm font-medium transition
                  ${pathname.includes('/haberler')
                    ? 'bg-sky-800/50 text-white'
                    : 'text-white/90 hover:bg-sky-800/30 hover:text-white'}`}
              >
                {dict.nav.news}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/sss`}
                className={`block px-5 py-3.5 text-sm font-medium transition
                  ${pathname.includes('/sss')
                    ? 'bg-sky-800/50 text-white'
                    : 'text-white/90 hover:bg-sky-800/30 hover:text-white'}`}
              >
                {dict.nav.faq}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/duyurular`}
                className={`block px-5 py-3.5 text-sm font-medium transition
                  ${pathname.includes('/duyurular')
                    ? 'bg-sky-800/50 text-white'
                    : 'text-white/90 hover:bg-sky-800/30 hover:text-white'}`}
              >
                {dict.nav.announcements}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/hakkimizda`}
                className={`block px-5 py-3.5 text-sm font-medium transition
                  ${pathname.includes('/hakkimizda')
                    ? 'bg-sky-800/50 text-white'
                    : 'text-white/90 hover:bg-sky-800/30 hover:text-white'}`}
              >
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/iletisim`}
                className={`block px-5 py-3.5 text-sm font-medium transition
                  ${pathname.includes('/iletisim')
                    ? 'bg-sky-800/50 text-white'
                    : 'text-white/90 hover:bg-sky-800/30 hover:text-white'}`}
              >
                {dict.nav.contact}
              </Link>
            </li>

            {/* Acil - Nav'da da görünsün (tablet için) */}
            <li className="lg:hidden ml-auto">
              <Link
                href={`/${locale}/acil`}
                className="flex items-center gap-2 px-4 py-2.5 my-1 mr-1
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
          </div>
        </div>
      )}
    </header>
  )
}
