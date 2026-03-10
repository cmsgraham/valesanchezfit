import { Metadata } from 'next'
import Link from 'next/link'
import { Lock, CalendarDays, Dumbbell, LineChart, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Portal de Clientes',
  description: 'Accede a tu portal personalizado con programas de entrenamiento, seguimiento de progreso y más.',
}

const features = [
  {
    icon: Dumbbell,
    title: 'Tus Programas',
    description: 'Accede a tus rutinas de entrenamiento personalizadas',
  },
  {
    icon: CalendarDays,
    title: 'Calendario',
    description: 'Visualiza y gestiona tus sesiones programadas',
  },
  {
    icon: LineChart,
    title: 'Progreso',
    description: 'Sigue tu evolución con gráficos y métricas',
  },
  {
    icon: Bell,
    title: 'Notificaciones',
    description: 'Recibe recordatorios y actualizaciones importantes',
  },
]

export default function PortalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50 py-16 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium mb-8">
          <Lock className="w-4 h-4" />
          Próximamente
        </div>

        {/* Main Content */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
          Portal de Clientes
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
          Estamos trabajando en un portal exclusivo para clientes donde podrás 
          acceder a tus programas de entrenamiento, seguir tu progreso y mucho más.
        </p>

        {/* Features Preview */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-white/70">
              <CardContent className="p-6">
                <feature.icon className="w-8 h-8 text-gold-500 mb-3 mx-auto" />
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            ¿Quieres ser notificado cuando el portal esté disponible?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold">
              <a 
                href="https://wa.me/50688546547?text=¡Hola! Me interesa ser notificado cuando el portal de clientes esté disponible."
                target="_blank"
                rel="noopener noreferrer"
              >
                Notifícame
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
