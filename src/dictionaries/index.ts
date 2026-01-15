import { Locale } from '@/src/lib/i18n'

// Dictionary type
export interface Dictionary {
  metadata: {
    title: string
    description: string
  }
  nav: {
    home: string
    news: string
    blog: string
    guides: string
    emergency: string
    announcements: string
    faq: string
    about: string
    contact: string
    pages: string
    quickAccess: string
  }
  categories: {
    asylum: string
    health: string
    education: string
    work: string
    all: string
  }
  home: {
    quickAccess: string
    latestNews: string
    viewAll: string
    contactUs: string
    contactDescription: string
    contactForm: string
    blogDescription: string
    guidesDescription: string
    announcementsDescription: string
  }
  whatsapp: {
    title: string
    description: string
    joinButton: string
    nameLabel: string
    phoneLabel: string
    phoneHint: string
    emailLabel: string
    emailPlaceholder: string
    backButton: string
    sendButton: string
    sending: string
    successTitle: string
    successMessage: string
    errorMessage: string
    moderationNote: string
  }
  contact: {
    title: string
    subtitle: string
    sendMessage: string
    contactInfo: string
    address: string
    addressValue: string
    socialMedia: string
    usefulLinks: string
    residencePermits: string
    housing: string
    form: {
      name: string
      email: string
      phone: string
      phoneOptional: string
      subject: string
      message: string
      send: string
      sending: string
      success: string
      error: string
      emailError: string
    }
  }
  about: {
    title: string
    description: string
    foundation: string
    purposeTitle: string
    purpose: string
    missionTitle: string
    mission: string
    offerTitle: string
    offers: string[]
  }
  faq: {
    title: string
    subtitle: string
    allCategories: string
    noResults: string
    searchPlaceholder: string
    notFound: string
    notFoundDescription: string
    contactUs: string
    joinWhatsApp: string
  }
  footer: {
    description: string
    quickAccess: string
    usefulLinks: string
    contact: string
    contactText: string
    copyright: string
  }
  emergency: {
    title: string
    subtitle: string
    emergencyDescription: string
    policeNonEmergency: string
    policeNonEmergencyDesc: string
    refugeeHealth: string
    refugeeHealthDesc: string
    mentalHealthTitle: string
    suicidePrevention: string
    suicidePreventionDesc: string
    listeningLine: string
    listeningLineDesc: string
    mindKorrelatie: string
    mindKorrelatieDesc: string
    domesticViolenceTitle: string
    safeHome: string
    safeHomeDesc: string
    fier: string
    fierDesc: string
    childLine: string
    childLineDesc: string
    victimSupport: string
    victimSupportDesc: string
    refugeeServicesTitle: string
    indDesc: string
    vluchtelingenWerkDesc: string
    askvDesc: string
    legalTitle: string
    legalAid: string
    legalAidDesc: string
    discrimination: string
    discriminationDesc: string
    free: string
    importantNote: string
    importantNoteDesc: string
    needMoreHelp: string
    contactUs: string
  }
  common: {
    readMore: string
    loading: string
    error: string
    required: string
    backToList: string
    featured: string
    columnist: string
    guideLabel: string
    urgentAnnouncements: string
    generalAnnouncements: string
    urgent: string
    urgentAnnouncement: string
  }
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  tr: () => import('./tr.json').then((module) => module.default),
  ku: () => import('./ku.json').then((module) => module.default),
  ar: () => import('./ar.json').then((module) => module.default),
  nl: () => import('./nl.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]()
}
