'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface Stat {
  value: string
  label: string
}

interface AboutPreviewSectionProps {
  heading?: string
  content?: string
  imageUrl?: string
  stats?: Stat[]
  ctaText?: string
  ctaLink?: string
}

export function AboutPreviewSection({
  heading = 'Conoce a Vale Sánchez',
  content = 'Bienvenido a valesanchez.fit, donde la atención personalizada es nuestra especialidad. Ofrecemos clases privadas de entrenamiento para aquellos que buscan un entorno de entrenamiento individualizado y eficaz. Con nuestro enfoque en el entrenamiento personalizado, trabajaremos contigo para establecer tus metas y desarrollar un plan de trabajo específico para ayudarte a alcanzarlas.',
  imageUrl,
  stats = [
    { value: '500+', label: 'Clientes Transformados' },
    { value: '8+', label: 'Años de Experiencia' },
    { value: '10k+', label: 'Sesiones Completadas' },
    { value: '100%', label: 'Compromiso' },
  ],
  ctaText = 'Conocer más',
  ctaLink = '/about',
}: AboutPreviewSectionProps) {
  // Check if we have a real image (not a placeholder path)
  const hasRealImage = imageUrl && !imageUrl.includes('placeholder')

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {hasRealImage ? (
                <Image
                  src={imageUrl}
                  alt="Vale Sánchez - Personal Trainer"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 via-warm-700 to-warm-900 flex items-center justify-center">
                  <span className="text-6xl font-bold text-gold-500/30">VS</span>
                </div>
              )}
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gold-500/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-warm-200 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium mb-4">
              Sobre Mí
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-warm-900 mb-6">
              {heading}
            </h2>
            <div className="prose prose-warm max-w-none mb-8">
              <p className="text-warm-600 text-lg leading-relaxed">
                {content}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-warm-50 rounded-xl"
                >
                  <div className="font-display text-2xl md:text-3xl font-bold text-gold-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-warm-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button asChild variant="gold" size="lg">
              <Link href={ctaLink}>
                {ctaText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
