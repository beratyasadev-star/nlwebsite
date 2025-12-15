import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">NL Onderwijs</h3>
            <p className="text-gray-400 leading-relaxed">
              Hollanda'da yaşayan mülteciler için bilgi platformu
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg text-white">Hızlı Erişim</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/haberler" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  Haberler
                </Link>
              </li>
              <li>
                <Link href="/sss" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  SSS
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg text-white">Faydalı Linkler</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://ind.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  IND
                </a>
              </li>
              <li>
                <a href="https://coa.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  COA
                </a>
              </li>
              <li>
                <a href="https://digid.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  DigiD
                </a>
              </li>
              <li>
                <a href="https://www.uwv.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  UWV
                </a>
              </li>
              <li>
                <a href="https://duo.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  DUO
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg text-white">İletişim</h4>
            <Link href="/iletisim" className="text-gray-400 hover:text-sky-400 transition-colors duration-200 hover:translate-x-1 inline-block">
              Lütfen iletişim formunu doldurun
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NL Onderwijs. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
