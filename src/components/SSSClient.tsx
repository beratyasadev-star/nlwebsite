'use client'

import { useState } from 'react'
import { Dictionary } from '@/src/dictionaries'

interface FAQ {
  id: string
  question: string
  answer: any
  category: string
  order: number
}

interface SSSPageProps {
  faqs: FAQ[]
  dict: Dictionary
  locale: string
}

function serializeContent(content: any): string {
  if (!content || !Array.isArray(content)) return ''

  return content.map((node: any) => {
    const text = node.children?.map((child: any) => {
      let t = child.text || ''
      if (child.bold) t = `<strong>${t}</strong>`
      if (child.italic) t = `<em>${t}</em>`
      if (child.underline) t = `<u>${t}</u>`
      return t
    }).join('') || ''

    if (node.type === 'ul') return `<ul class="list-disc list-inside my-2 space-y-1">${text}</ul>`
    if (node.type === 'ol') return `<ol class="list-decimal list-inside my-2 space-y-1">${text}</ol>`
    if (node.type === 'li') return `<li class="ms-4">${text}</li>`

    return `<p class="mb-2">${text}</p>`
  }).join('')
}

function SSSClient({ faqs, dict, locale }: SSSPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const filteredFAQs = faqs
    .filter(faq =>
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{dict.faq.title}</h1>
          <p className="text-lg text-gray-600">
            {dict.faq.subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder={dict.faq.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 ps-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <svg className="absolute start-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8"></div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg">{dict.faq.noResults}</p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div key={faq.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full px-6 py-5 text-start flex justify-between items-start gap-4 hover:bg-gradient-to-r hover:from-sky-50 hover:to-transparent transition-all duration-200"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`mt-1 rounded-lg p-2 transition-all duration-200 ${
                      openId === faq.id
                        ? 'bg-sky-100 text-sky-600'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-sky-50 group-hover:text-sky-500'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900 text-lg leading-relaxed">{faq.question}</span>
                  </div>
                  <div className={`mt-2 rounded-full p-1.5 transition-all duration-300 ${
                    openId === faq.id
                      ? 'bg-sky-100 text-sky-600 rotate-180'
                      : 'bg-gray-100 text-gray-400 group-hover:bg-sky-50 group-hover:text-sky-500'
                  }`}>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {openId === faq.id && (
                  <div className="px-6 pb-6 pt-2 bg-gradient-to-b from-sky-50/50 to-transparent border-t border-gray-100">
                    <div className="ps-11">
                      <div
                        className="text-gray-700 prose prose-sm max-w-none leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: serializeContent(faq.answer) }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-sky-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{dict.faq.notFound}</h2>
          <p className="text-gray-700 mb-6">
            {dict.faq.notFoundDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/iletisim`}
              className="inline-block bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-700 transition"
            >
              {dict.faq.contactUs}
            </a>
            <a
              href="https://chat.whatsapp.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              {dict.faq.joinWhatsApp}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SSSClient
