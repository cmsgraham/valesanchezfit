import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Achievements } from './collections/Achievements'
import { ContactSubmissions } from './collections/ContactSubmissions'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { ContactSettings } from './globals/ContactSettings'
import { ServicesPage } from './globals/ServicesPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' - Vale Sánchez Fitness Admin',
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    Services,
    Testimonials,
    Achievements,
    ContactSubmissions,
  ],
  globals: [
    SiteSettings,
    Header,
    Footer,
    HomePage,
    AboutPage,
    ServicesPage,
    ContactSettings,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true, // Auto-sync schema to database
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title || ''} | Vale Sánchez Fitness`,
      generateDescription: ({ doc }) => doc?.excerpt || '',
    }),
  ],
})
