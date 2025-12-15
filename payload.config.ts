// @ts-nocheck
import { buildConfig } from 'payload/dist/config/build'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- NL Onderwijs',
    },
  },
  editor: slateEditor({}),
  collections: [
    {
      slug: 'users',
      auth: {
        tokenExpiration: 7200,
        verify: false,
        maxLoginAttempts: 0,
        lockTime: 0,
      },
      admin: {
        useAsTitle: 'email',
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'haber',
      labels: {
        singular: 'Bilgi',
        plural: 'Bilgi Bankası',
      },
      dbName: 'habers',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'publishedDate', 'category'],
        enableRichTextLink: false,
        enableRichTextRelationship: false,
      },
      versions: {
        drafts: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, req, operation }: any) => {
            if (operation === 'create' && data.slug && req.query?.duplicate) {
              data.slug = `${data.slug}-${Date.now()}`
            }
            return data
          },
        ],
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Başlık',
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          label: 'URL',
          admin: {
            hidden: true,
          },
          hooks: {
            beforeValidate: [
              async ({ value, data, operation, req }: any) => {
                let slug = value

                if (!slug && data?.title) {
                  slug = data.title
                    .toLowerCase()
                    .replace(/ş/g, 's')
                    .replace(/ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/ı/g, 'i')
                    .replace(/ö/g, 'o')
                    .replace(/ç/g, 'c')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '')
                }

                if (operation === 'create' && slug && req?.payload) {
                  const existing = await req.payload.find({
                    collection: 'haber',
                    where: { slug: { equals: slug } },
                    limit: 1,
                  })

                  if (existing.docs.length > 0) {
                    let counter = 1
                    let newSlug = `${slug}-kopya`

                    while (true) {
                      const check = await req.payload.find({
                        collection: 'haber',
                        where: { slug: { equals: newSlug } },
                        limit: 1,
                      })

                      if (check.docs.length === 0) break
                      counter++
                      newSlug = `${slug}-kopya-${counter}`
                    }

                    slug = newSlug
                  }
                }

                return slug
              },
            ],
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          label: 'Kısa Özet',
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'medya',
          required: true,
          label: 'Kapak Görseli',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: 'İçerik',
        },
        {
          name: 'category',
          type: 'select',
          required: true,
          label: 'Kategori',
          options: [
            { label: 'İltica ve Resmi İşlemler', value: 'asylum' },
            { label: 'Sağlık', value: 'health' },
            { label: 'Eğitim', value: 'education' },
            { label: 'İş ve Çalışma', value: 'work' },
          ],
        },
        {
          name: 'publishedDate',
          type: 'date',
          required: true,
          label: 'Yayın Tarihi',
          defaultValue: () => new Date().toISOString(),
          admin: {
            hidden: true,
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          options: [
            { label: 'Taslak', value: 'draft' },
            { label: 'Yayında', value: 'published' },
          ],
        },
      ],
      timestamps: true,
    },
    {
      slug: 'blog',
      labels: {
        singular: 'Blog Yazısı',
        plural: 'Blog',
      },
      dbName: 'kose-yazilaris',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'author', 'publishedDate'],
        enableRichTextLink: false,
        enableRichTextRelationship: false,
      },
      versions: {
        drafts: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, operation, req }: any) => {
            if (operation === 'create' && data.slug) {
              const existingDoc = await req.payload.find({
                collection: 'blog',
                where: { slug: { equals: data.slug } },
                limit: 1,
              })

              if (existingDoc.docs.length > 0) {
                let counter = 1
                let newSlug = `${data.slug}-kopya`

                while (true) {
                  const check = await req.payload.find({
                    collection: 'blog',
                    where: { slug: { equals: newSlug } },
                    limit: 1,
                  })

                  if (check.docs.length === 0) break
                  counter++
                  newSlug = `${data.slug}-kopya-${counter}`
                }

                data.slug = newSlug
              }
            }
            return data
          },
        ],
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Başlık',
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          label: 'URL',
          admin: {
            hidden: true,
          },
          hooks: {
            beforeValidate: [
              async ({ value, data, operation, req }: any) => {
                let slug = value

                if (!slug && data?.title) {
                  slug = data.title
                    .toLowerCase()
                    .replace(/ş/g, 's')
                    .replace(/ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/ı/g, 'i')
                    .replace(/ö/g, 'o')
                    .replace(/ç/g, 'c')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '')
                }

                if (operation === 'create' && slug && req?.payload) {
                  const existing = await req.payload.find({
                    collection: 'blog',
                    where: { slug: { equals: slug } },
                    limit: 1,
                  })

                  if (existing.docs.length > 0) {
                    let counter = 1
                    let newSlug = `${slug}-kopya`

                    while (true) {
                      const check = await req.payload.find({
                        collection: 'blog',
                        where: { slug: { equals: newSlug } },
                        limit: 1,
                      })

                      if (check.docs.length === 0) break
                      counter++
                      newSlug = `${slug}-kopya-${counter}`
                    }

                    slug = newSlug
                  }
                }

                return slug
              },
            ],
          },
        },
        {
          name: 'author',
          type: 'text',
          required: false,
          label: 'Yazar',
        },
        {
          name: 'excerpt',
          type: 'textarea',
          label: 'Kısa Özet',
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'medya',
          required: true,
          label: 'Kapak Görseli',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: 'İçerik',
        },
        {
          name: 'publishedDate',
          type: 'date',
          required: true,
          label: 'Yayın Tarihi',
          defaultValue: () => new Date().toISOString(),
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          options: [
            { label: 'Taslak', value: 'draft' },
            { label: 'Yayında', value: 'published' },
          ],
        },
      ],
      timestamps: true,
    },
    {
      slug: 'duyurular',
      labels: {
        singular: 'Duyuru',
        plural: 'Duyuru',
      },
      dbName: 'duyurulars',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'publishedDate', 'urgent'],
        enableRichTextLink: false,
        enableRichTextRelationship: false,
      },
      versions: {
        drafts: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, operation, req }: any) => {
            if (operation === 'create' && data.slug) {
              const existingDoc = await req.payload.find({
                collection: 'duyurular',
                where: { slug: { equals: data.slug } },
                limit: 1,
              })

              if (existingDoc.docs.length > 0) {
                let counter = 1
                let newSlug = `${data.slug}-kopya`

                while (true) {
                  const check = await req.payload.find({
                    collection: 'duyurular',
                    where: { slug: { equals: newSlug } },
                    limit: 1,
                  })

                  if (check.docs.length === 0) break
                  counter++
                  newSlug = `${data.slug}-kopya-${counter}`
                }

                data.slug = newSlug
              }
            }
            return data
          },
        ],
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Başlık',
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
          label: 'URL',
          admin: {
            hidden: true,
          },
          hooks: {
            beforeValidate: [
              async ({ value, data, operation, req }: any) => {
                let slug = value

                if (!slug && data?.title) {
                  slug = data.title
                    .toLowerCase()
                    .replace(/ş/g, 's')
                    .replace(/ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/ı/g, 'i')
                    .replace(/ö/g, 'o')
                    .replace(/ç/g, 'c')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '')
                }

                if (operation === 'create' && slug && req?.payload) {
                  const existing = await req.payload.find({
                    collection: 'duyurular',
                    where: { slug: { equals: slug } },
                    limit: 1,
                  })

                  if (existing.docs.length > 0) {
                    let counter = 1
                    let newSlug = `${slug}-kopya`

                    while (true) {
                      const check = await req.payload.find({
                        collection: 'duyurular',
                        where: { slug: { equals: newSlug } },
                        limit: 1,
                      })

                      if (check.docs.length === 0) break
                      counter++
                      newSlug = `${slug}-kopya-${counter}`
                    }

                    slug = newSlug
                  }
                }

                return slug
              },
            ],
          },
        },
        {
          name: 'excerpt',
          type: 'textarea',
          label: 'Kısa Özet',
        },
        {
          name: 'featuredImage',
          type: 'upload',
          relationTo: 'medya',
          required: true,
          label: 'Kapak Görseli',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          label: 'İçerik',
        },
        {
          name: 'urgent',
          type: 'checkbox',
          label: 'Acil/Önemli Duyuru',
          defaultValue: false,
        },
        {
          name: 'publishedDate',
          type: 'date',
          required: true,
          label: 'Yayın Tarihi',
          defaultValue: () => new Date().toISOString(),
          admin: {
            hidden: true,
          },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          options: [
            { label: 'Taslak', value: 'draft' },
            { label: 'Yayında', value: 'published' },
          ],
        },
      ],
      timestamps: true,
    },
    {
      slug: 'sss',
      labels: {
        singular: 'Sık Sorulan Soru',
        plural: 'Sık Sorulan Soru',
      },
      dbName: 'ssses',
      admin: {
        useAsTitle: 'question',
        defaultColumns: ['question', 'category', 'order'],
        enableRichTextLink: false,
        enableRichTextRelationship: false,
      },
      versions: {
        drafts: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, operation, req }: any) => {
            if (operation === 'create' && data.slug) {
              const existingDoc = await req.payload.find({
                collection: 'sss',
                where: { slug: { equals: data.slug } },
                limit: 1,
              })

              if (existingDoc.docs.length > 0) {
                let counter = 1
                let newSlug = `${data.slug}-kopya`

                while (true) {
                  const check = await req.payload.find({
                    collection: 'sss',
                    where: { slug: { equals: newSlug } },
                    limit: 1,
                  })

                  if (check.docs.length === 0) break
                  counter++
                  newSlug = `${data.slug}-kopya-${counter}`
                }

                data.slug = newSlug
              }
            }
            return data
          },
        ],
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Soru',
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          label: 'Cevap',
        },
        {
          name: 'category',
          type: 'select',
          required: true,
          label: 'Kategori',
          options: [
            { label: 'İltica ve Resmi İşlemler', value: 'asylum' },
            { label: 'Sağlık', value: 'health' },
            { label: 'Eğitim', value: 'education' },
            { label: 'İş ve Çalışma', value: 'work' },
          ],
        },
        {
          name: 'order',
          type: 'number',
          label: 'Sıralama (Opsiyonel)',
          defaultValue: 0,
          admin: {
            description: 'Soruların görüntülenme sırası. Boş bırakılabilir, 0 varsayılan değerdir.',
          },
        },
      ],
      timestamps: true,
    },
    {
      slug: 'whatsapp-requests',
      labels: {
        singular: 'WhatsApp Grup Talebi',
        plural: 'WhatsApp Grup Talepleri',
      },
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'phone', 'status', 'createdAt'],
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'İsim',
        },
        {
          name: 'email',
          type: 'email',
          required: false,
          label: 'E-posta (Opsiyonel)',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Telefon',
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'pending',
          label: 'Durum',
          options: [
            { label: 'Beklemede', value: 'pending' },
            { label: 'Onaylandı', value: 'approved' },
            { label: 'Reddedildi', value: 'rejected' },
          ],
        },
        {
          name: 'notes',
          type: 'textarea',
          required: false,
          label: 'Notlar (İç Kullanım)',
        },
      ],
      timestamps: true,
    },
    {
      slug: 'contact',
      labels: {
        singular: 'İletişim Mesajı',
        plural: 'İletişim Mesajları',
      },
      admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'email', 'phone', 'subject', 'createdAt'],
      },
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'İsim',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'E-posta',
        },
        {
          name: 'phone',
          type: 'text',
          required: false,
          label: 'Telefon',
        },
        {
          name: 'subject',
          type: 'text',
          required: true,
          label: 'Konu',
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
          label: 'Mesaj',
        },
      ],
      timestamps: true,
    },
    {
      slug: 'medya',
      labels: {
        singular: 'Medya',
        plural: 'Medya',
      },
      dbName: 'medyas',
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
      upload: {
        staticDir: 'public/media',
        staticURL: '/media',
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
          {
            name: 'card',
            width: 768,
            height: 432,
            position: 'centre',
          },
        ],
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          label: 'Alternatif Metin',
        },
      ],
    },
  ],
  typescript: {
    outputFile: './payload-types.ts',
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
})
