'use client'

import { Target, Heart, Trophy, Users, Calendar, TrendingUp, type LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  target: Target,
  heart: Heart,
  trophy: Trophy,
  users: Users,
  calendar: Calendar,
  'trending-up': TrendingUp,
}

interface Highlight {
  icon?: string
  title: string
  description?: string
}

interface ValuePropositionSectionProps {
  heading?: string
  subheading?: string
  highlights?: Highlight[]
}

export function ValuePropositionSection({
  heading = 'Tu Transformación Comienza Aquí',
  subheading = 'Programas personalizados diseñados para ayudarte a alcanzar tus objetivos de forma efectiva y sostenible.',
  highlights = [
    { icon: 'target', title: 'Programas Personalizados', description: 'Planes adaptados a tus objetivos, nivel y disponibilidad.' },
    { icon: 'heart', title: 'Enfoque Integral', description: 'Combinamos ejercicio, nutrición y bienestar mental.' },
    { icon: 'users', title: 'Acompañamiento Constante', description: 'Seguimiento personalizado en cada paso de tu proceso.' },
    { icon: 'trending-up', title: 'Resultados Reales', description: 'Método probado con cientos de clientes satisfechos.' },
  ],
}: ValuePropositionSectionProps) {
  return (
    <section className="section-padding bg-warm-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-warm-900 mb-6">
            {heading}
          </h2>
          {subheading && (
            <p className="text-lg text-warm-600">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon ? iconMap[highlight.icon] : Target
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-gold-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl font-semibold text-warm-900 mb-3">
                  {highlight.title}
                </h3>
                {highlight.description && (
                  <p className="text-warm-600 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
