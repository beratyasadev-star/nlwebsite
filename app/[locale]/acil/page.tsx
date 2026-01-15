import { getDictionary } from '@/src/dictionaries'
import { Locale } from '@/src/lib/i18n'
import Link from 'next/link'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function EmergencyPage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const e = dict.emergency

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero - Ana Acil Numara */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{e.title}</h1>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">{e.subtitle}</p>

            {/* 112 Büyük Buton */}
            <a
              href="tel:112"
              className="inline-flex items-center gap-4 bg-white text-red-600 px-10 py-6 rounded-2xl text-3xl font-bold hover:bg-red-50 transition-all hover:scale-105 shadow-2xl"
            >
              <svg className="w-10 h-10 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              112
            </a>
            <p className="mt-4 text-red-200 text-sm">{e.emergencyDescription}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* İkincil Acil Numaralar */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Polis (Acil Olmayan) */}
          <a href="tel:0900-8844" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all h-full">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{e.policeNonEmergency}</h3>
                  <p className="text-sm text-gray-500">{e.policeNonEmergencyDesc}</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">0900-8844</div>
              </div>
            </div>
          </a>

          {/* Mülteci Sağlık Hattı */}
          <a href="tel:088-1122112" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all h-full">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{e.refugeeHealth}</h3>
                  <p className="text-sm text-gray-500">{e.refugeeHealthDesc}</p>
                </div>
                <div className="text-2xl font-bold text-green-600">088-112 2 112</div>
              </div>
            </div>
          </a>
        </div>

        {/* Kategori Bölümleri */}
        <div className="space-y-8">

          {/* Ruh Sağlığı & Kriz */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{e.mentalHealthTitle}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <ContactCard
                icon="heart"
                color="purple"
                title={e.suicidePrevention}
                description={e.suicidePreventionDesc}
                phone="113"
                badge="24/7"
              />
              <ContactCard
                icon="chat"
                color="purple"
                title={e.listeningLine}
                description={e.listeningLineDesc}
                phone="088-0767000"
                badge="24/7"
              />
              <ContactCard
                icon="support"
                color="purple"
                title={e.mindKorrelatie}
                description={e.mindKorrelatieDesc}
                phone="0900-1450"
              />
            </div>
          </div>

          {/* Aile İçi Şiddet & Güvenlik */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{e.domesticViolenceTitle}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ContactCard
                icon="shield"
                color="orange"
                title={e.safeHome}
                description={e.safeHomeDesc}
                phone="0800-2000"
                badge={e.free}
                highlight
              />
              <ContactCard
                icon="alert"
                color="orange"
                title={e.fier}
                description={e.fierDesc}
                phone="058-2157084"
                badge="24/7"
              />
              <ContactCard
                icon="child"
                color="orange"
                title={e.childLine}
                description={e.childLineDesc}
                phone="0800-0432"
                badge={e.free}
              />
              <ContactCard
                icon="support"
                color="orange"
                title={e.victimSupport}
                description={e.victimSupportDesc}
                phone="0900-0101"
              />
            </div>
          </div>

          {/* Mülteci Hizmetleri */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{e.refugeeServicesTitle}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <ContactCard
                icon="document"
                color="sky"
                title="IND"
                description={e.indDesc}
                phone="088-0430430"
              />
              <ContactCard
                icon="users"
                color="sky"
                title="VluchtelingenWerk"
                description={e.vluchtelingenWerkDesc}
                phone="020-3467200"
              />
              <ContactCard
                icon="scale"
                color="sky"
                title="ASKV"
                description={e.askvDesc}
                phone="020-6272408"
              />
            </div>
          </div>

          {/* Hukuki Yardım & Ayrımcılık */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{e.legalTitle}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <ContactCard
                icon="scale"
                color="emerald"
                title={e.legalAid}
                description={e.legalAidDesc}
                phone="0800-8020"
                badge={e.free}
                highlight
              />
              <ContactCard
                icon="flag"
                color="emerald"
                title={e.discrimination}
                description={e.discriminationDesc}
                phone="0800-0880"
                badge={e.free}
              />
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-amber-900 mb-1">{e.importantNote}</h3>
              <p className="text-amber-800 text-sm">{e.importantNoteDesc}</p>
            </div>
          </div>
        </div>

        {/* İletişim CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">{e.needMoreHelp}</p>
          <Link
            href={`/${locale}/iletisim`}
            className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-700 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {e.contactUs}
          </Link>
        </div>
      </div>
    </div>
  )
}

// Contact Card Component
function ContactCard({
  icon,
  color,
  title,
  description,
  phone,
  badge,
  highlight
}: {
  icon: string
  color: string
  title: string
  description: string
  phone: string
  badge?: string
  highlight?: boolean
}) {
  const colorClasses: Record<string, { bg: string, text: string, hover: string, border: string }> = {
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:border-purple-300', border: 'border-purple-200' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:border-orange-300', border: 'border-orange-200' },
    sky: { bg: 'bg-sky-100', text: 'text-sky-600', hover: 'hover:border-sky-300', border: 'border-sky-200' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', hover: 'hover:border-emerald-300', border: 'border-emerald-200' },
  }

  const icons: Record<string, JSX.Element> = {
    heart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    chat: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
    support: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    alert: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    child: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
    document: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    scale: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />,
    flag: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />,
  }

  const c = colorClasses[color]

  return (
    <a
      href={`tel:${phone.replace(/[^0-9]/g, '')}`}
      className={`group block bg-white rounded-xl p-5 border transition-all hover:shadow-md ${highlight ? c.border + ' ' + c.hover : 'border-gray-200 ' + c.hover}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition`}>
          <svg className={`w-5 h-5 ${c.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icons[icon]}
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-gray-900 truncate">{title}</h3>
            {badge && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${c.bg} ${c.text} font-medium`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{description}</p>
          <div className={`text-lg font-bold ${c.text} group-hover:underline`}>
            {phone}
          </div>
        </div>
      </div>
    </a>
  )
}
