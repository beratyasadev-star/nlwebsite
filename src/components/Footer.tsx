import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">NL Onderwijs</h3>
            <p className="text-gray-400">
              Hollanda'da yaşayan mülteciler için bilgi platformu
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/haberler" className="text-gray-400 hover:text-white transition">
                  Haberler
                </Link>
              </li>
              <li>
                <Link href="/sss" className="text-gray-400 hover:text-white transition">
                  SSS
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="text-gray-400 hover:text-white transition">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Faydalı Linkler</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://ind.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition">
                  IND
                </a>
              </li>
              <li>
                <a href="https://coa.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition">
                  COA
                </a>
              </li>
              <li>
                <a href="https://digid.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition">
                  DigiD
                </a>
              </li>
              <li>
                <a href="https://www.uwv.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition">
                  UWV
                </a>
              </li>
              <li>
                <a href="https://duo.nl" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition">
                  DUO
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <Link href="/iletisim" className="text-gray-400 hover:text-white transition inline-block">
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
