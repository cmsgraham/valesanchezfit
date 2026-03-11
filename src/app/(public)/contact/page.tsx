import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ContactSection } from '@/components/sections/contact-section'
import type { ContactSetting } from '@/payload-types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Contacto - Vale Sánchez Fitness',
  description: 'Contáctame para comenzar tu transformación fitness.',
}

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise }).catch(() => null)
  const settings = payload ? await payload.findGlobal({ slug: 'contact-settings' }).catch(() => null) : null as ContactSetting | null

  const info = {
    whatsappNumber: settings?.whatsapp?.phoneNumber ?? '50688546547',
    whatsappMessage: settings?.whatsapp?.defaultMessage ?? '¡Hola! Me gustaría obtener más información sobre tus servicios.',
    email: settings?.email?.contactEmail ?? 'info@valesanchez.fit',
    address: settings?.location?.address ?? 'San José, Costa Rica',
    addressHref: settings?.location?.googleMapsUrl ?? 'https://maps.google.com/?q=San+Jose+Costa+Rica',
    hours: settings?.businessHours?.hours?.[0]
      ? `${settings.businessHours.hours[0].days}: ${settings.businessHours.hours[0].hours}`
      : 'Lun - Vie: 6am - 8pm',
    hoursDescription: settings?.businessHours?.hours?.[1]
      ? `${settings.businessHours.hours[1].days}: ${settings.businessHours.hours[1].hours}`
      : 'Sábados: 7am - 12pm',
    formHeading: settings?.contactPage?.formHeading ?? 'Envíame un Mensaje',
    successMessage: settings?.contactPage?.successMessage ?? 'Gracias por contactarme. Te responderé lo antes posible.',
  }

  const heroTitle = settings?.contactPage?.heroTitle ?? 'Hablemos'
  const heroSubtitle = settings?.contactPage?.heroSubtitle ?? 'Estoy aquí para responder tus preguntas y ayudarte a comenzar tu transformación'

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-warm-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium mb-4">
              Contacto
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-warm-900 mb-6">
              {heroTitle}
            </h1>
            <p className="text-lg text-warm-600">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <ContactSection info={info} />
    </>
  )
}
