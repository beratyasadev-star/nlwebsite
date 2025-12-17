'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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

          <Link href="/" className="flex items-center gap-3 md:ml-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">NL Onderwijs</h1>
              <p className="text-xs text-gray-500">Mülteci Dayanışma Platformu</p>
            </div>
          </Link>

          <div className="md:hidden w-7"></div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex border-t border-gray-100">
          <Link href="/" className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            Ana Sayfa
          </Link>
          <Link href="/haberler" className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            Bilgi Bankası
          </Link>
          <Link href="/blog" className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            Blog
          </Link>
          <Link href="/duyurular" className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            Duyurular
          </Link>
          <Link href="/sss" className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            Sık Sorulan Sorular
          </Link>
          <Link href="/hakkimizda" className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            Hakkımızda
          </Link>
          <Link href="/iletisim" className="px-6 py-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition font-medium border-b-2 border-transparent hover:border-sky-600">
            İletişim
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            {/* Sayfalar */}
            <div className="mb-4">
              <h3 className="px-4 text-base font-bold text-gray-700 uppercase tracking-wider mb-3">
                Sayfalar
              </h3>
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === '/' ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                Ana Sayfa
              </Link>
              <Link
                href="/haberler"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === '/haberler' ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                Bilgi Bankası
              </Link>

              {/* SSS - Özel Vurgulu */}
              <Link
                href="/sss"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mx-4 my-2 px-4 py-3 rounded-lg border-2 flex items-center gap-3 transition-all ${
                  pathname === '/sss'
                    ? 'bg-sky-600 border-sky-600 text-white font-bold shadow-lg'
                    : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 hover:border-amber-400 hover:shadow-md'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="flex-1">Sık Sorulan Sorular</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-200 text-amber-800">
                  Popüler
                </span>
              </Link>

              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === '/blog' ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                Blog
              </Link>
              <Link
                href="/duyurular"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === '/duyurular' ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                Duyurular
              </Link>
              <Link
                href="/hakkimizda"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === '/hakkimizda' ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                Hakkımızda
              </Link>
              <Link
                href="/iletisim"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 hover:bg-sky-50 transition ${
                  pathname === '/iletisim' ? 'text-sky-600 font-bold' : 'text-gray-700 hover:text-sky-600'
                }`}
              >
                İletişim
              </Link>
            </div>

            {/* Hızlı Erişim */}
            <div>
              <h3 className="px-4 text-base font-bold text-gray-700 uppercase tracking-wider mb-3">
                Hızlı Erişim
              </h3>
              <Link
                href="/haberler?category=asylum"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition"
              >
                İltica ve Resmi İşlemler
              </Link>
              <Link
                href="/haberler?category=health"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition"
              >
                Sağlık
              </Link>
              <Link
                href="/haberler?category=education"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition"
              >
                Eğitim
              </Link>
              <Link
                href="/haberler?category=work"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition"
              >
                İş & Çalışma
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
