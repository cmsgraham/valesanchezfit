'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Dumbbell,
  Users,
  Calendar,
  Smartphone,
  Target,
  Trophy,
  Heart,
  Activity,
  Video,
  Star,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, LucideIcon> = {
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

interface Service {
  title: string
  shortDescription?: string
  icon?: string
  imageUrl?: string
  slug: string
}

interface ServicesSectionProps {
  heading?: string
  subheading?: string
  services?: Service[]
  ctaText?: string
  ctaLink?: string
}

export function ServicesSection({
  heading = 'Nuestros Servicios',
  subheading = 'Ofrecemos una variedad de programas diseñados para adaptarse a tus necesidades y objetivos específicos.',
  services = [
    {
      title: 'Entrenamiento Personal',
      shortDescription: 'Sesiones individualizadas con atención personalizada para maximizar tus resultados.',
      icon: 'dumbbell',
      slug: 'personal-training',
    },
    {
      title: 'Planes de Ejercicio',
      shortDescription: 'Programas estructurados diseñados específicamente para tus metas y estilo de vida.',
      icon: 'calendar',
      slug: 'exercise-plans',
    },
    {
      title: 'Clases Virtuales',
      shortDescription: 'Entrena desde cualquier lugar con sesiones en vivo y seguimiento en tiempo real.',
      icon: 'video',
      slug: 'virtual-classes',
    },
    {
      title: 'Seguimiento por App',
      shortDescription: 'Monitoreo continuo de tu progreso a través de nuestra aplicación móvil.',
      icon: 'smartphone',
      slug: 'app-training',
    },
    {
      title: 'Clases Grupales',
      shortDescription: 'Entrenamientos en grupo con la energía y motivación de la comunidad.',
      icon: 'users',
      slug: 'group-classes',
    },
    {
      title: 'Retos Fitness',
      shortDescription: 'Desafíos mensuales para mantenerte motivado y alcanzar nuevas metas.',
      icon: 'trophy',
      slug: 'fitness-challenges',
    },
  ],
  ctaText = 'Ver todos los servicios',
  ctaLink = '/services',
}: ServicesSectionProps) {
  return (
    <section className="section-padding bg-warm-50" id="services">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium mb-4">
            Servicios
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-warm-900 mb-6">
            {heading}
          </h2>
          {subheading && (
            <p className="text-lg text-warm-600">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon ? iconMap[service.icon] : Dumbbell
            return (
              <div key={service.slug}>
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                  {service.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  )}
                  <CardHeader className={service.imageUrl ? 'pt-4' : ''}>
                    <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-gold-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <CardTitle className="font-display text-xl text-warm-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {service.shortDescription && (
                      <p className="text-warm-600 text-sm mb-4">
                        {service.shortDescription}
                      </p>
                    )}
                    <Link
                      href={`/services#${service.slug}`}
                      className="inline-flex items-center text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors"
                    >
                      Más información
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href={ctaLink}>
              {ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
