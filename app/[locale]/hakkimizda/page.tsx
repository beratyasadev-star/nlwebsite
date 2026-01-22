import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ locale: string }>
}

// Icon components
function DocumentIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function AcademicIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )
}

function CommunityIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}

function getIcon(iconName: string) {
  switch (iconName) {
    case 'document':
      return <DocumentIcon />
    case 'academic':
      return <AcademicIcon />
    case 'users':
      return <UsersIcon />
    case 'community':
      return <CommunityIcon />
    case 'link':
      return <LinkIcon />
    default:
      return <DocumentIcon />
  }
}

export default async function HakkimizdaPage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  return (
    <div className="min-h-screen relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgba(14,165,233,0.12)] overflow-hidden border border-sky-100/50">
          <div className="p-8 sm:p-12">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              {dict.about.title}
            </h1>

            {/* Intro */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong className="text-sky-700">Diaspora & Azadî</strong>, {dict.about.intro.replace('Diaspora & Azadî, ', '')}
              </p>

              {/* Challenge */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {dict.about.challenge}
              </p>

              {/* Movement */}
              <p className="text-gray-700 leading-relaxed mb-10">
                {dict.about.movement}
              </p>

              {/* Vision */}
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-8 border border-sky-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <svg className="w-7 h-7 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {dict.about.visionTitle}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {dict.about.vision}
                </p>
              </div>

              {/* Mission */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 sm:p-8 mb-10 border border-emerald-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  {dict.about.missionTitle}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {dict.about.mission}
                </p>
              </div>

              {/* Offers */}
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{dict.about.offerTitle}</h2>
              <div className="grid gap-6 sm:grid-cols-2 mb-10">
                {dict.about.offers.map((offer: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:border-sky-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                        {getIcon(offer.icon)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">
                          {offer.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {offer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-amber-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {dict.about.contactTitle}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {dict.about.contactText}
                </p>
                <Link
                  href={`/${locale}/iletisim`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {dict.contact.title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
