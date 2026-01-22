/**
 * Sosyal Medya Linkleri Konfigürasyonu
 *
 * Bu dosyada tüm sosyal medya linklerini tek yerden yönetebilirsiniz.
 * Linkleri güncellemek için sadece bu dosyayı düzenleyin.
 */

export const socialMediaLinks = {
  whatsapp: {
    url: 'https://chat.whatsapp.com/example',
    label: 'WhatsApp\'a katıl',
    enabled: false // WhatsApp linki henüz ayarlanmadı
  },
  telegram: {
    url: 'https://t.me/example',
    label: 'Telegram\'a katıl',
    enabled: false // Telegram linki henüz ayarlanmadı
  },
  facebook: {
    url: 'https://www.facebook.com/people/Diaspora-Azad%C3%AE/61587020394058/?rdid=PmYlAkiX4RiihduD&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F182bUEn4jE%2F',
    label: 'Facebook\'ta takip edin',
    enabled: true
  },
  twitter: {
    url: 'https://twitter.com',
    label: 'Twitter\'da takip edin',
    enabled: false // Twitter linki henüz ayarlanmadı
  },
  instagram: {
    url: 'https://www.instagram.com/diaspora_azadi?igsh=MWNsb2NpeXI4Ymd1Nw%3D%3D',
    label: 'Instagram\'da takip edin',
    enabled: true
  }
} as const

/**
 * Sosyal Medya Platform Türleri
 */
export type SocialMediaPlatform = keyof typeof socialMediaLinks

/**
 * Aktif sosyal medya platformlarını döndürür
 */
export function getActiveSocialMedia() {
  return Object.entries(socialMediaLinks)
    .filter(([_, config]) => config.enabled)
    .map(([platform, config]) => ({
      platform: platform as SocialMediaPlatform,
      ...config
    }))
}
