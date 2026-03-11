import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CTASection } from '@/components/sections/cta-section'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Heart, Shield, Users, Target, TrendingUp, Star } from 'lucide-react'
import type { AboutPage, Media } from '@/payload-types'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findGlobal({ slug: 'about-page' }).catch(() => null) as AboutPage | null
  return {
    title: page?.seo?.metaTitle ?? 'Sobre Vale Sánchez - Personal Trainer',
    description: page?.seo?.metaDescription ?? 'Conoce a Vale Sánchez, personal trainer certificada dedicada a transformar vidas a través del fitness personalizado.',
  }
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  shield: Shield,
  users: Users,
  target: Target,
  'trending-up': TrendingUp,
  star: Star,
}

const DEFAULT_CREDENTIALS = [
  { title: 'Certificación Personal Trainer', institution: 'ACE Fitness', year: 2018 },
  { title: 'Especialización en Entrenamiento Funcional', institution: 'CrossFit Level 1', year: 2019 },
  { title: 'Certificación en Nutrición Deportiva', institution: 'ISSA', year: 2020 },
  { title: 'Competidora Nacional de Fitness', institution: 'IFBB', year: 2021 },
]

const DEFAULT_VALUES = [
  { icon: 'heart', title: 'Pasión', description: 'El fitness es mi vida y mi misión es compartir esa pasión contigo.' },
  { icon: 'shield', title: 'Compromiso', description: 'Me comprometo con tu éxito como si fuera el mío propio.' },
  { icon: 'target', title: 'Resultados', description: 'Enfoque en metas claras y medibles para tu transformación.' },
  { icon: 'users', title: 'Comunidad', description: 'Formas parte de una comunidad que te apoya en cada paso.' },
]

export default async function AboutPageRoute() {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.findGlobal({ slug: 'about-page' }).catch(() => null) as AboutPage | null

  const heroTitle = page?.heroTitle ?? 'Conoce a Vale Sánchez'
  const heroSubtitle = page?.heroSubtitle ?? 'Conoce mi historia y pasión por el fitness'
  const heroImageUrl = page?.heroImage && typeof page.heroImage === 'object'
    ? (page.heroImage as Media).url ?? undefined
    : undefined

  const contentHeading = page?.mainContent?.heading ?? 'Mi Historia'
  const mainImageUrl = page?.mainContent?.image && typeof page.mainContent.image === 'object'
    ? (page.mainContent.image as Media).url ?? undefined
    : undefined

  const credentialsHeading = page?.credentials?.heading ?? 'Credenciales y Certificaciones'
  const credentialsSubtitle = (page?.credentials as any)?.subtitle ?? 'Formación continua para ofrecerte el mejor servicio.'
  const credentialItems = page?.credentials?.items?.length
    ? page.credentials.items
    : DEFAULT_CREDENTIALS

  const valuesHeading = page?.missionValues?.valuesHeading ?? 'Mis Valores'
  const valuesSubtitle = (page?.missionValues as any)?.valuesSubtitle ?? 'Los principios que guían mi trabajo y mi relación con cada cliente.'
  const valueItems = page?.missionValues?.values?.length
    ? page.missionValues.values.map(v => ({
        icon: v.icon ?? 'heart',
        title: v.title,
        description: v.description ?? '',
      }))
    : DEFAULT_VALUES

  const mainContent = page?.mainContent?.content ?? null

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-warm-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium mb-4">
              Sobre Mí
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

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-gold-400/20 via-warm-700 to-warm-900 flex items-center justify-center">
                {mainImageUrl ? (
                  <Image src={mainImageUrl} alt={heroTitle} fill className="object-cover" />
                ) : (
                  <span className="text-6xl font-bold text-gold-500/30">VS</span>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-500/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-warm-200 rounded-2xl -z-10" />
            </div>

            {/* Content */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-900 mb-6">
                {contentHeading}
              </h2>
              <div className="prose prose-warm max-w-none">
                {mainContent ? (
                  <RichText data={mainContent} />
                ) : (
                  <>
                    <p>
                      Mi viaje en el mundo del fitness comenzó hace más de 8 años, cuando descubrí 
                      el poder transformador del ejercicio no solo en el cuerpo, sino en la mente 
                      y el espíritu.
                    </p>
                    <p>
                      Como personal trainer certificada, he tenido el privilegio de acompañar a 
                      cientos de personas en su camino hacia una vida más saludable. Cada cliente 
                      es único, y por eso desarrollo programas personalizados que se adaptan a sus 
                      objetivos, estilo de vida y nivel de condición física.
                    </p>
                    <p>
                      Mi filosofía se basa en que el fitness debe ser sostenible y disfrutable. 
                      No creo en dietas extremas ni entrenamientos que te hacen odiar el ejercicio. 
                      Creo en encontrar el equilibrio perfecto que te permita alcanzar tus metas 
                      mientras disfrutas del proceso.
                    </p>
                    <p>
                      Como atleta competidora, entiendo los desafíos y las recompensas de empujar 
                      los límites. Esa experiencia me permite guiarte de manera efectiva, ya sea 
                      que estés dando tus primeros pasos o preparándote para una competencia.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-warm-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-900 mb-6">
              {valuesHeading}
            </h2>
            <p className="text-lg text-warm-600">
              {valuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueItems.map((value, index) => {
              const IconComponent = ICON_MAP[value.icon] ?? Heart
              return (
                <Card key={index} className="text-center border-0 bg-white">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-gold-500" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-warm-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-warm-600 text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-900 mb-6">
              {credentialsHeading}
            </h2>
            <p className="text-lg text-warm-600">
              {credentialsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {credentialItems.map((credential, index) => (
              <Card key={index} className="border-0 bg-warm-50">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-warm-900 mb-1">
                      {credential.title}
                    </h3>
                    <p className="text-sm text-warm-600">
                      {credential.institution} • {credential.year}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="¿Lista para comenzar?"
        subheading="Agenda tu primera sesión y descubre cómo puedo ayudarte a alcanzar tus metas."
      />
    </>
  )
}
