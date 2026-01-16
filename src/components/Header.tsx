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

  // Pathname'den locale'i çıkar
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  return (
    <header className="bg-white border-b-2 border-sky-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-7 relative">
          {/* Mobile Menu Button - Sol üst */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden -ml-2"
            aria-label="Menü"
          >
            <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href={`/${locale}`} className="flex items-center gap-3 md:ml-0">
            <Image
              src="/logo.jpeg"
              alt="Diaspora & Azadî Logo"
              width={56}
              height={56}
              className="w-12 h-12 md:w-14 md:h-14 rounded-lg shadow-md object-cover"
              priority
            />
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Diaspora & Azadî</h1>
              <p className="text-[10px] md:text-xs text-gray-500 hidden sm:block">
                {locale === 'tr' ? 'Göç ve Entegrasyon Dayanışma Platformu' :
                 locale === 'ku' ? 'Platforma Hevgirtina Koçberî û Entegrasyonê' :
                 locale === 'ar' ? 'منصة تضامن الهجرة والاندماج' :
                 locale === 'nl' ? 'Platform voor Migratie en Integratie Solidariteit' :
                 'Migration and Integration Solidarity Platform'}
              </p>
            </div>
          </Link>

          {/* Language Selector - Desktop */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="text-sm font-medium text-gray-700">{localeNames[locale]}</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangMenuOpen && (
              <div className="absolute end-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}${pathnameWithoutLocale}`}
                    onClick={() => setIsLangMenuOpen(false)}
                    className={`block px-4 py-2 text-sm hover:bg-sky-50 transition ${
                      locale === loc ? 'text-sky-600 font-semibold bg-sky-50' : 'text-gray-700'
                    }`}
                  >
                    {localeNames[loc]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="md:hidden w-7"></div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex border-t border-gray-100">
          <Link href={`/${locale}`} className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            {dict.nav.home}
          </Link>
          <Link href={`/${locale}/rehber`} className="px-6 py-5 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition font-medium border-b-2 border-transparent hover:border-emerald-600">
            {dict.nav.guides}
          </Link>
          <Link href={`/${locale}/acil`} className="px-6 py-5 text-gray-700 hover:text-red-600 hover:bg-red-50 transition font-medium border-b-2 border-transparent hover:border-red-600">
            {dict.nav.emergency}
          </Link>
          <Link href={`/${locale}/haberler`} className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            {dict.nav.news}
          </Link>
          <Link href={`/${locale}/duyurular`} className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            {dict.nav.announcements}
          </Link>
          <Link href={`/${locale}/sss`} className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            {dict.nav.faq}
          </Link>
          <Link href={`/${locale}/hakkimizda`} className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            {dict.nav.about}
          </Link>
          <Link href={`/${locale}/iletisim`} className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            {dict.nav.contact}
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            {/* Language Selector - Mobile */}
            <div className="px-4 pb-4 mb-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-700 uppercase tracking-wider mb-3">
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
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      locale === loc
                        ? 'bg-sky-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {localeNames[loc]}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sayfalar */}
            <div className="mb-4">
              <h3 className="px-4 text-base font-bold text-gray-700 uppercase tracking-wider mb-3">
                {dict.nav.pages}
              </h3>
              <Link
                href={`/${locale}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === `/${locale}` ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                {dict.nav.home}
              </Link>
              <Link
                href={`/${locale}/haberler`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === `/${locale}/haberler` ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                {dict.nav.news}
              </Link>

              {/* SSS - Özel Vurgulu */}
              <Link
                href={`/${locale}/sss`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mx-4 my-2 px-4 py-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                  pathname === `/${locale}/sss`
                    ? 'bg-sky-600 border-sky-600 text-white font-bold shadow-lg'
                    : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 hover:border-amber-400 hover:shadow-md'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="flex-1">{dict.nav.faq}</span>
              </Link>

              {/* Giriş Rehberi - Özel Vurgulu */}
              <Link
                href={`/${locale}/rehber`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mx-4 my-2 px-4 py-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                  pathname === `/${locale}/rehber`
                    ? 'bg-emerald-600 border-emerald-600 text-white font-bold shadow-lg'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-md'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="flex-1">{dict.nav.guides}</span>
              </Link>

              {/* Acil Durumlar - Kırmızı Vurgulu */}
              <Link
                href={`/${locale}/acil`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mx-4 my-2 px-4 py-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                  pathname === `/${locale}/acil`
                    ? 'bg-red-600 border-red-600 text-white font-bold shadow-lg'
                    : 'bg-red-50 border-red-300 text-red-900 hover:bg-red-100 hover:border-red-400 hover:shadow-md'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="flex-1">{dict.nav.emergency}</span>
              </Link>

              <Link
                href={`/${locale}/duyurular`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === `/${locale}/duyurular` ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                {dict.nav.announcements}
              </Link>
              <Link
                href={`/${locale}/hakkimizda`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === `/${locale}/hakkimizda` ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                {dict.nav.about}
              </Link>
              <Link
                href={`/${locale}/iletisim`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === `/${locale}/iletisim` ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                {dict.nav.contact}
              </Link>
            </div>

            {/* Hızlı Erişim */}
            <div>
              <h3 className="px-4 text-base font-bold text-gray-700 uppercase tracking-wider mb-3">
                {dict.nav.quickAccess}
              </h3>
              <Link
                href={`/${locale}/haberler?category=asylum`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition"
              >
                {dict.categories.asylum}
              </Link>
              <Link
                href={`/${locale}/haberler?category=health`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition"
              >
                {dict.categories.health}
              </Link>
              <Link
                href={`/${locale}/haberler?category=education`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition"
              >
                {dict.categories.education}
              </Link>
              <Link
                href={`/${locale}/haberler?category=work`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition"
              >
                {dict.categories.work}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
