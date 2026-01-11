import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HakkimizdaPage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  return (
    <div className="min-h-screen relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgba(14,165,233,0.12)] overflow-hidden border border-sky-100/50">
          <div className="p-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-10">
              {dict.about.title}
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>NL Onderwijs</strong>, {dict.about.description}
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                {dict.about.foundation}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{dict.about.purposeTitle}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {dict.about.purpose}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{dict.about.missionTitle}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {dict.about.mission}
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{dict.about.offerTitle}</h2>
              <ul className="space-y-3 mb-6">
                {dict.about.offers.map((offer: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-sky-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{offer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
