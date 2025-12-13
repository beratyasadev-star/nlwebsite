import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-sky-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-7">
          <Link href="/" className="flex items-center gap-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NL Onderwijs</h1>
              <p className="text-xs text-gray-500">Mülteci Dayanışma Platformu</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
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

        {/* Mobile Menu Button */}
        <button className="md:hidden absolute top-6 right-4">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
