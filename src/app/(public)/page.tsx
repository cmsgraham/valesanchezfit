import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HeroSection } from '@/components/sections/hero-section'
import { ValuePropositionSection } from '@/components/sections/value-proposition-section'
import { AboutPreviewSection } from '@/components/sections/about-preview-section'
import { ServicesSection } from '@/components/sections/services-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'
import type { Media, Service, Testimonial } from '@/payload-types'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  const title = (siteSettings as any)?.defaultMetaTitle ?? 'Vale Sánchez Fitness - Personal Trainer'
  const description = (siteSettings as any)?.defaultMetaDescription ?? 'Promoviendo estilos de vida saludables a través del Fitness. Entrenamiento personalizado y programas diseñados especialmente para ti.'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [homePage, servicesResult, testimonialsResult] = await Promise.all([
    payload.findGlobal({ slug: 'home-page' }).catch(() => null),
    payload.find({ collection: 'services', where: { status: { equals: 'published' } }, sort: 'order', limit: 6 }).catch(() => ({ docs: [] })),
    payload.find({ collection: 'testimonials', where: { status: { equals: 'published' } }, limit: 6 }).catch(() => ({ docs: [] })),
  ])

  const hero = homePage
  const vp = homePage?.valueProposition
  const ap = homePage?.aboutPreview
  const ss = homePage?.servicesSection
  const ts = homePage?.testimonialsSection
  const cta = homePage?.ctaSection

  // Hero image URL
  const heroImageUrl = hero?.heroImage && typeof hero.heroImage === 'object'
    ? (hero.heroImage as Media).url ?? undefined
    : undefined

  // About preview image URL
  const aboutImageUrl = ap?.image && typeof ap.image === 'object'
    ? (ap.image as Media).url ?? undefined
    : undefined

  // Map services from CMS or fall back to empty (ServicesSection has built-in defaults)
  const cmsServices = servicesResult.docs.map((s: Service) => ({
    title: s.title,
    shortDescription: s.shortDescription ?? undefined,
    icon: s.icon ?? undefined,
    imageUrl: s.image && typeof s.image === 'object' ? (s.image as Media).url ?? undefined : undefined,
    slug: s.slug,
  }))

  // Map testimonials from CMS or fall back to empty (TestimonialsSection has built-in defaults)
  const cmsTestimonials = testimonialsResult.docs.map((t: Testimonial) => ({
    name: t.name,
    role: t.role ?? undefined,
    quote: t.quote,
    rating: t.rating ?? 5,
    imageUrl: t.image && typeof t.image === 'object' ? (t.image as Media).url ?? undefined : undefined,
  }))

  return (
    <>
      <HeroSection
        title={hero?.heroTitle ?? 'Promoviendo estilos de vida saludables a través del Fitness!'}
        subtitle={hero?.heroSubtitle ?? 'Empecemos a trabajarlo juntos. Entrenamiento personalizado diseñado para transformar tu vida.'}
        imageUrl={heroImageUrl}
        videoUrl={hero?.heroBackgroundVideo ?? undefined}
        primaryCta={{ text: hero?.heroCta?.primaryButton?.text ?? 'Reserva tu Espacio', link: hero?.heroCta?.primaryButton?.link ?? '/contact' }}
        secondaryCta={{ text: hero?.heroCta?.secondaryButton?.text ?? 'Ver Servicios', link: hero?.heroCta?.secondaryButton?.link ?? '/services', enabled: hero?.heroCta?.secondaryButton?.enabled ?? true }}
      />

      {(vp?.enabled !== false) && (
        <ValuePropositionSection
          heading={vp?.heading ?? 'Tu Transformación Comienza Aquí'}
          subheading={vp?.subheading ?? undefined}
          highlights={vp?.highlights?.length ? vp.highlights.map(h => ({ icon: h.icon ?? undefined, title: h.title, description: h.description ?? undefined })) : undefined}
        />
      )}

      {(ap?.enabled !== false) && (
        <AboutPreviewSection
          heading={ap?.heading ?? 'Conoce a Vale Sánchez'}
          content={ap?.content ? JSON.stringify(ap.content) : 'Bienvenido a valesanchez.fit, donde la atención personalizada es nuestra especialidad.'}
          imageUrl={aboutImageUrl}
          stats={ap?.stats?.length ? ap.stats.map(s => ({ value: s.value, label: s.label })) : undefined}
          ctaText={ap?.ctaText ?? 'Conocer más'}
          ctaLink={ap?.ctaLink ?? '/about'}
        />
      )}

      {(ss?.enabled !== false) && (
        <ServicesSection
          heading={ss?.heading ?? 'Nuestros Servicios'}
          subheading={ss?.subheading ?? undefined}
          services={cmsServices.length ? cmsServices : undefined}
        />
      )}

      {(ts?.enabled !== false) && (
        <TestimonialsSection
          heading={ts?.heading ?? 'Lo que dicen nuestros clientes'}
          subheading={ts?.subheading ?? undefined}
          testimonials={cmsTestimonials.length ? cmsTestimonials : undefined}
        />
      )}

      <CTASection
        heading={cta?.heading ?? '¿Listo para comenzar tu transformación?'}
        subheading={cta?.subheading ?? 'Contáctanos hoy y da el primer paso hacia una vida más saludable.'}
        showWhatsApp={true}
      />
    </>
  )
}
