'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MessageCircle, ArrowRight } from 'lucide-react'

interface CTASectionProps {
  heading?: string
  subheading?: string
  backgroundImageUrl?: string
  primaryButton?: { text: string; link: string }
  showWhatsApp?: boolean
  whatsappText?: string
}

export function CTASection({
  heading = '¿Listo para comenzar tu transformación?',
  subheading = 'Contáctanos hoy y da el primer paso hacia una vida más saludable. No importa si eres principiante o atleta avanzado, tenemos el programa perfecto para ti.',
  backgroundImageUrl,
  primaryButton = { text: 'Contáctanos', link: '/contact' },
  showWhatsApp = true,
  whatsappText = 'WhatsApp',
}: CTASectionProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '50688546547'
  const whatsappMessage = encodeURIComponent(
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hola! Me interesa saber más sobre los servicios de entrenamiento personal.'
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-warm-900/95 to-warm-800/90 z-10" />
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-warm-900 to-warm-800" />
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container-custom relative z-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {heading}
          </h2>
          {subheading && (
            <p className="text-lg md:text-xl text-warm-200 mb-10">
              {subheading}
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              variant="gold"
              size="xl"
              className="group"
            >
              <Link href={primaryButton.link}>
                {primaryButton.text}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            {showWhatsApp && (
              <Button
                asChild
                variant="whatsapp"
                size="xl"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {whatsappText}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
