import { DM_Sans, Playfair_Display } from 'next/font/google'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { Toaster } from '@/components/ui/toaster'
import '../globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const payload = await getPayload({ config: configPromise }).catch(() => null)
  const [headerData, footerData, contactData, siteData] = payload
    ? await Promise.all([
        payload.findGlobal({ slug: 'header' }).catch(() => null),
        payload.findGlobal({ slug: 'footer' }).catch(() => null),
        payload.findGlobal({ slug: 'contact-settings' }).catch(() => null),
        payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
      ])
    : [null, null, null, null]

  const whatsappNumber = (contactData as any)?.whatsapp?.phoneNumber ?? '50688546547'
  const whatsappMessage = (contactData as any)?.whatsapp?.defaultMessage ?? 'Hola! Me interesa saber más sobre los servicios de entrenamiento personal.'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  const floatingButtonEnabled = (contactData as any)?.whatsapp?.floatingButton?.enabled ?? true

  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable}`} data-theme="public">
      <body className="min-h-screen bg-white text-warm-900 font-sans antialiased">
        <Header data={headerData as any} whatsappUrl={whatsappUrl} />
        <main>{children}</main>
        <Footer data={footerData as any} siteData={siteData as any} contactData={contactData as any} />
        {floatingButtonEnabled && <WhatsAppButton whatsappUrl={whatsappUrl} />}
        <Toaster />
      </body>
    </html>
  )
}
