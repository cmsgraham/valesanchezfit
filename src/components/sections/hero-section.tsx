'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'

interface HeroSectionProps {
  title?: string
  subtitle?: string
  imageUrl?: string
  videoUrl?: string
  primaryCta?: { text: string; link: string }
  secondaryCta?: { text: string; link: string; enabled?: boolean }
}

function toBackgroundVideoUrl(url: string): string {
  // YouTube watch URL → embed with autoplay/mute/loop
  const ytWatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytWatch) {
    const id = ytWatch[1]
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
  }
  // Already a YouTube embed URL — append params
  if (url.includes('youtube.com/embed/')) {
    const sep = url.includes('?') ? '&' : '?'
    return `${url}${sep}autoplay=1&mute=1&loop=1&controls=0&modestbranding=1`
  }
  // Vimeo watch URL → player embed
  const vimeoWatch = url.match(/(?:^|\/)vimeo\.com\/(\d+)/)
  if (vimeoWatch) {
    return `https://player.vimeo.com/video/${vimeoWatch[1]}?autoplay=1&muted=1&loop=1&background=1`
  }
  // Already a Vimeo player URL
  if (url.includes('player.vimeo.com/video/')) {
    const sep = url.includes('?') ? '&' : '?'
    return `${url}${sep}autoplay=1&muted=1&loop=1&background=1`
  }
  return url
}

export function HeroSection({
  title = 'Promoviendo estilos de vida saludables a través del Fitness!',
  subtitle = 'Empecemos a trabajarlo juntos. Entrenamiento personalizado diseñado para transformar tu vida.',
  imageUrl,
  videoUrl,
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
  const embedUrl = videoUrl ? toBackgroundVideoUrl(videoUrl) : null

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-warm-900/90 via-warm-900/70 to-warm-900/50 z-10" />
        {embedUrl ? (
          // Video background — iframe sized larger than viewport to always cover at 16:9
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              src={embedUrl}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ width: 'max(100%, 177.78vh)', height: 'max(56.25vw, 100%)' }}
              title="Background video"
            />
          </div>
        ) : hasRealImage ? (
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
      <div className="container-custom relative z-20 pt-28 pb-20">
        <div className="max-w-4xl">
          <div>
            <span className="inline-block px-5 py-2 bg-gold-500/20 text-gold-400 rounded-full text-base font-medium mb-8 tracking-wide">
              Personal Trainer Certificada
            </span>
          </div>

          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-7"
          >
            {title}
          </h1>

          <p
            className="text-xl md:text-2xl text-warm-200 mb-12 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Button
              asChild
              variant="gold"
              size="xl"
              className="group text-base h-16 px-10"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Phone className="w-5 h-5 mr-2.5" />
                {primaryCta.text}
              </a>
            </Button>

            {secondaryCta.enabled && (
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-2 border-white text-white hover:bg-white hover:text-warm-900 text-base h-16 px-10"
              >
                <Link href={secondaryCta.link}>
                  {secondaryCta.text}
                  <ArrowRight className="w-5 h-5 ml-2.5 group-hover:translate-x-1 transition-transform" />
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
