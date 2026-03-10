'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  imageUrl?: string
  primaryCta?: { text: string; link: string }
  secondaryCta?: { text: string; link: string; enabled?: boolean }
}

export function HeroSection({
  title = 'Promoviendo estilos de vida saludables a través del Fitness!',
  subtitle = 'Empecemos a trabajarlo juntos. Entrenamiento personalizado diseñado para transformar tu vida.',
  imageUrl,
  primaryCta = { text: 'Reserva tu Espacio', link: '/contact' },
  secondaryCta = { text: 'Ver Servicios', link: '/services', enabled: true },
}: HeroSectionProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '50688546547'
  const whatsappMessage = encodeURIComponent(
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hola! Me interesa saber más sobre los servicios de entrenamiento personal.'
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  // Check if we have a real image (not a placeholder path)
  const hasRealImage = imageUrl && !imageUrl.includes('placeholder')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-warm-900/90 via-warm-900/70 to-warm-900/50 z-10" />
        {hasRealImage ? (
          <Image
            src={imageUrl}
            alt="Fitness training"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-warm-800 via-warm-900 to-warm-950" />
        )}
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 pt-24 pb-16">
        <div className="max-w-3xl">
          <div>
            <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 rounded-full text-sm font-medium mb-6">
              Personal Trainer Certificada
            </span>
          </div>

          <h1
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
          >
            {title}
          </h1>

          <p
            className="text-lg md:text-xl text-warm-200 mb-10 max-w-xl"
          >
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              variant="gold"
              size="xl"
              className="group"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 mr-2" />
                {primaryCta.text}
              </a>
            </Button>

            {secondaryCta.enabled && (
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-warm-900"
              >
                <Link href={secondaryCta.link}>
                  {secondaryCta.text}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center animate-bounce">
          <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}
