import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CTASection } from '@/components/sections/cta-section'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Dumbbell, Users, Video, Calendar, Target, Trophy, Heart, Activity, Smartphone, Star } from 'lucide-react'
import type { Service, ServicesPage as ServicesPageType } from '@/payload-types'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise }).catch(() => null)
  const page = (payload ? await payload.findGlobal({ slug: 'services-page' }).catch(() => null) : null) as ServicesPageType | null
  return {
    title: page?.seo?.metaTitle ?? 'Servicios de Entrenamiento Personal',
    description: page?.seo?.metaDescription ?? 'Descubre nuestros servicios de entrenamiento personal, coaching en línea, planes de nutrición y más.',
  }
}

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  dumbbell: Dumbbell,
  users: Users,
  calendar: Calendar,
  smartphone: Smartphone,
  target: Target,
  trophy: Trophy,
  heart: Heart,
  activity: Activity,
  video: Video,
  star: Star,
}

const PERIOD_LABELS: Record<string, string> = {
  session: 'por sesión',
  month: 'por mes',
  package: 'paquete',
}

function getPrice(pricing?: Service['pricing']): { price: string; period?: string } {
  if (!pricing?.showPricing || pricing.price == null) return { price: 'Consultar' }
  const currency = pricing.currency ?? '₡'
  const formatted = pricing.price.toLocaleString('es-CR')
  const period = pricing.period ? PERIOD_LABELS[pricing.period] : undefined
  return { price: `${currency}${formatted}`, period }
}

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise }).catch(() => null)
  const [servicesResult, contactData, pageData] = payload
    ? await Promise.all([
        payload.find({
          collection: 'services',
          where: { status: { equals: 'published' } },
          sort: 'order',
          limit: 20,
        }).catch(() => ({ docs: [] as Service[] })),
        payload.findGlobal({ slug: 'contact-settings' }).catch(() => null),
        payload.findGlobal({ slug: 'services-page' }).catch(() => null) as Promise<ServicesPageType | null>,
      ])
    : [{ docs: [] as Service[] }, null, null]

  const whatsappNumber = (contactData as any)?.whatsapp?.phoneNumber ?? '50688546547'

  const heroTitle = pageData?.heroTitle ?? 'Servicios de Entrenamiento'
  const heroSubtitle = pageData?.heroSubtitle ?? 'Encuentra el servicio perfecto para tus objetivos y estilo de vida'
  const heroBadge = pageData?.heroBadge ?? 'Servicios'

  const faqHeading = pageData?.faqHeading ?? 'Preguntas Frecuentes'
  const faqSubheading = pageData?.faqSubheading ?? 'Respuestas a las dudas más comunes sobre mis servicios.'
  const DEFAULT_FAQ = [
    { question: '¿Necesito experiencia previa para empezar?', answer: 'No, trabajo con personas de todos los niveles. Diseño programas adaptados a tu condición física actual y vamos progresando juntos.' },
    { question: '¿Qué debo llevar a las sesiones presenciales?', answer: 'Solo necesitas ropa cómoda, tenis deportivos, una toalla pequeña y muchas ganas. Yo proporciono todo el equipo necesario.' },
    { question: '¿Cómo funciona el coaching online?', answer: 'Recibes un plan de entrenamiento personalizado en una app, videos explicativos de cada ejercicio, y nos comunicamos diariamente por WhatsApp. Además, tenemos una videollamada semanal de seguimiento.' },
    { question: '¿Puedo cancelar o reprogramar sesiones?', answer: 'Sí, puedes reprogramar con al menos 24 horas de anticipación sin ningún cargo adicional.' },
    { question: '¿Ofrecen planes de pago?', answer: 'Sí, para programas mensuales y paquetes ofrezco facilidades de pago. Escríbeme para conocer las opciones disponibles.' },
  ]
  const faqItems: { question: string; answer: string }[] = pageData?.faqItems?.length
    ? pageData.faqItems.map((f) => ({ question: f.question, answer: f.answer }))
    : DEFAULT_FAQ

  const ctaHeading = pageData?.ctaHeading ?? '¿No encuentras lo que buscas?'
  const ctaSubheading = pageData?.ctaSubheading ?? 'Escríbeme y juntos diseñamos un plan perfecto para tus necesidades específicas.'

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-warm-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium mb-4">
              {heroBadge}
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

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {servicesResult.docs.length === 0 ? (
            <div className="text-center py-16 text-warm-600">
              <p className="text-lg">Servicios próximamente.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesResult.docs.map((service) => {
                const IconComponent = SERVICE_ICONS[service.icon ?? ''] ?? Dumbbell
                const { price, period } = getPrice(service.pricing)
                const features = service.features?.map(f => f.feature) ?? []
                const ctaText = service.ctaButton?.text ?? 'Consultar'
                const ctaHref = service.ctaButton?.link
                  ?? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`¡Hola! Me interesa el servicio de ${service.title}.`)}`
                return (
                  <Card
                    key={service.id}
                    className={`relative flex flex-col border-0 ${
                      service.featured
                        ? 'bg-gradient-to-br from-warm-900 to-warm-800 text-white ring-2 ring-gold-500'
                        : 'bg-white shadow-lg'
                    }`}
                  >
                    {service.featured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-block px-4 py-1 bg-gold-500 text-white text-sm font-medium rounded-full">
                          Más Popular
                        </span>
                      </div>
                    )}
                    <CardHeader className="pt-8">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                        service.featured ? 'bg-gold-500/20' : 'bg-gold-500/10'
                      }`}>
                        <IconComponent className={`w-7 h-7 ${service.featured ? 'text-gold-400' : 'text-gold-500'}`} />
                      </div>
                      <CardTitle className={`font-display text-xl ${service.featured ? 'text-white' : ''}`}>
                        {service.title}
                      </CardTitle>
                      <CardDescription className={service.featured ? 'text-warm-300' : ''}>
                        {service.shortDescription ?? ''}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {features.length > 0 && (
                        <ul className="space-y-3 mb-8 flex-1">
                          {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                service.featured ? 'text-gold-400' : 'text-gold-500'
                              }`} />
                              <span className={`text-sm ${service.featured ? 'text-warm-200' : 'text-warm-600'}`}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-auto">
                        <div className="mb-4">
                          <span className={`font-display text-2xl font-bold ${
                            service.featured ? 'text-white' : 'text-warm-900'
                          }`}>
                            {price}
                          </span>
                          {period && (
                            <span className={`text-sm ml-1 ${
                              service.featured ? 'text-warm-300' : 'text-warm-600'
                            }`}>
                              {period}
                            </span>
                          )}
                        </div>
                        <Button
                          asChild
                          variant={service.featured ? 'gold' : 'default'}
                          className="w-full"
                        >
                          <a
                            href={ctaHref}
                            target={ctaHref.startsWith('http') ? '_blank' : undefined}
                            rel={ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {ctaText}
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-warm-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-900 mb-6">
              {faqHeading}
            </h2>
            <p className="text-lg text-warm-600">
              {faqSubheading}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="border-0 bg-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-warm-900 mb-2">{faq.question}</h3>
                  <p className="text-warm-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={ctaHeading}
        subheading={ctaSubheading}
      />
    </>
  )
}
