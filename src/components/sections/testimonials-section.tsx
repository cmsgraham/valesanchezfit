'use client'

import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface Testimonial {
  name: string
  role?: string
  quote: string
  imageUrl?: string
  rating?: number
}

interface TestimonialsSectionProps {
  heading?: string
  subheading?: string
  testimonials?: Testimonial[]
}

export function TestimonialsSection({
  heading = 'Lo que dicen nuestros clientes',
  subheading = 'Historias reales de personas que han transformado sus vidas con nuestro programa.',
  testimonials = [
    {
      name: 'María González',
      role: 'Cliente por 1 año',
      quote: 'Vale ha transformado completamente mi relación con el ejercicio. Su enfoque personalizado y su constante motivación me han ayudado a alcanzar metas que nunca creí posibles.',
      rating: 5,
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Cliente por 6 meses',
      quote: 'Después de años sin hacer ejercicio, encontré en valesanchez.fit el apoyo perfecto para retomar mi camino fitness. Los resultados hablan por sí solos.',
      rating: 5,
    },
    {
      name: 'Ana Martínez',
      role: 'Cliente por 8 meses',
      quote: 'La atención personalizada y el seguimiento constante hacen toda la diferencia. Me siento más fuerte, más saludable y más confiada que nunca.',
      rating: 5,
    },
  ],
}: TestimonialsSectionProps) {
  return (
    <section className="section-padding bg-white" id="testimonials">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium mb-4">
            Testimonios
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
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-gold-400 text-gold-400"
                      />
                    ))}
                  </div>

                  <Quote className="w-10 h-10 text-gold-500/20 mb-4" />

                  <p className="text-warm-800 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    {testimonial.imageUrl ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center">
                        <span className="text-gold-500 font-semibold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-warm-900">
                        {testimonial.name}
                      </div>
                      {testimonial.role && (
                        <div className="text-sm text-warm-600">
                          {testimonial.role}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
