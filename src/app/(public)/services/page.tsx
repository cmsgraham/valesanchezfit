import { Metadata } from 'next'
import Link from 'next/link'
import { CTASection } from '@/components/sections/cta-section'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Dumbbell, Users, Video, Salad, Crown, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Servicios de Entrenamiento Personal',
  description: 'Descubre nuestros servicios de entrenamiento personal, coaching en línea, planes de nutrición y más.',
}

const services = [
  {
    id: 'personal',
    icon: Dumbbell,
    title: 'Entrenamiento Personal',
    description: 'Sesiones uno a uno diseñadas exclusivamente para ti, con atención personalizada y seguimiento constante.',
    features: [
      'Evaluación física completa',
      'Plan personalizado de ejercicios',
      'Seguimiento de progreso',
      'Ajustes semanales del programa',
      'Apoyo vía WhatsApp',
    ],
    price: 'Desde ₡25,000',
    period: 'por sesión',
    featured: false,
  },
  {
    id: 'online',
    icon: Video,
    title: 'Coaching Online',
    description: 'Entrenamiento a distancia con la misma calidad y atención que presencial, desde cualquier lugar.',
    features: [
      'Videollamadas semanales',
      'Plan de entrenamiento digital',
      'Videos explicativos de ejercicios',
      'Comunicación diaria',
      'App de seguimiento incluida',
    ],
    price: 'Desde ₡50,000',
    period: 'por mes',
    featured: true,
  },
  {
    id: 'grupos',
    icon: Users,
    title: 'Clases Grupales',
    description: 'Entrenamientos en grupo pequeños para máxima motivación y resultados en comunidad.',
    features: [
      'Grupos de máximo 6 personas',
      'Ambiente motivador',
      'Variedad de rutinas',
      'Horarios flexibles',
      'Comunidad de apoyo',
    ],
    price: 'Desde ₡15,000',
    period: 'por sesión',
    featured: false,
  },
  {
    id: 'nutricion',
    icon: Salad,
    title: 'Asesoría Nutricional',
    description: 'Plan de alimentación personalizado que complementa tu entrenamiento para resultados óptimos.',
    features: [
      'Evaluación de hábitos actuales',
      'Plan alimenticio personalizado',
      'Recetas adaptadas a tus gustos',
      'Lista de compras semanal',
      'Seguimiento quincenal',
    ],
    price: 'Desde ₡35,000',
    period: 'por mes',
    featured: false,
  },
  {
    id: 'competencia',
    icon: Crown,
    title: 'Prep de Competencia',
    description: 'Preparación integral para competencias de fitness con experiencia de atleta competidora.',
    features: [
      'Plan de entrenamiento periodizado',
      'Nutrición para competencia',
      'Práctica de poses',
      'Peak week management',
      'Apoyo el día del evento',
    ],
    price: 'Consultar',
    period: '',
    featured: false,
  },
  {
    id: 'corporativo',
    icon: Calendar,
    title: 'Programas Corporativos',
    description: 'Soluciones de bienestar para empresas que quieren equipos más saludables y productivos.',
    features: [
      'Sesiones en tu empresa',
      'Programas de bienestar',
      'Charlas y talleres',
      'Descuentos por volumen',
      'Reportes de participación',
    ],
    price: 'Personalizado',
    period: '',
    featured: false,
  },
]

export default function ServicesPage() {
  const whatsappNumber = '50688546547'
  const whatsappMessage = encodeURIComponent('¡Hola! Me interesa conocer más sobre los servicios de entrenamiento.')

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-warm-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 rounded-full text-sm font-medium mb-4">
              Servicios
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-warm-900 mb-6">
              Servicios de Entrenamiento
            </h1>
            <p className="text-lg text-warm-600">
              Encuentra el servicio perfecto para tus objetivos y estilo de vida
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card 
                key={service.id}
                className={`relative flex flex-col border-0 ${
                  service.featured 
                    ? 'bg-gradient-to-br from-warm-900 to-warm-800 text-white ring-2 ring-gold-500' 
                    : 'bg-white shadow-lg'
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block px-4 py-1 bg-gold-500 text-white text-sm font-medium rounded-full">
                      Más Popular
                    </span>
                  </div>
                )}
                <CardHeader className="pt-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    service.featured ? 'bg-gold-500/20' : 'bg-gold-500/10'
                  }`}>
                    <service.icon className={`w-7 h-7 ${service.featured ? 'text-gold-400' : 'text-gold-500'}`} />
                  </div>
                  <CardTitle className={`font-display text-xl ${service.featured ? 'text-white' : ''}`}>
                    {service.title}
                  </CardTitle>
                  <CardDescription className={service.featured ? 'text-warm-300' : ''}>
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          service.featured ? 'text-gold-400' : 'text-gold-500'
                        }`} />
                        <span className={`text-sm ${service.featured ? 'text-warm-200' : 'text-warm-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <div className="mb-4">
                      <span className={`font-display text-2xl font-bold ${
                        service.featured ? 'text-white' : 'text-warm-900'
                      }`}>
                        {service.price}
                      </span>
                      {service.period && (
                        <span className={`text-sm ml-1 ${
                          service.featured ? 'text-warm-300' : 'text-warm-600'
                        }`}>
                          {service.period}
                        </span>
                      )}
                    </div>
                    <Button 
                      asChild
                      variant={service.featured ? 'gold' : 'default'}
                      className="w-full"
                    >
                      <a 
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`¡Hola! Me interesa el servicio de ${service.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Consultar
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-warm-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-warm-900 mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-warm-600">
              Respuestas a las dudas más comunes sobre mis servicios.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: '¿Necesito experiencia previa para empezar?',
                a: 'No, trabajo con personas de todos los niveles. Diseño programas adaptados a tu condición física actual y vamos progresando juntos.',
              },
              {
                q: '¿Qué debo llevar a las sesiones presenciales?',
                a: 'Solo necesitas ropa cómoda, tenis deportivos, una toalla pequeña y muchas ganas. Yo proporciono todo el equipo necesario.',
              },
              {
                q: '¿Cómo funciona el coaching online?',
                a: 'Recibes un plan de entrenamiento personalizado en una app, videos explicativos de cada ejercicio, y nos comunicamos diariamente por WhatsApp. Además, tenemos una videollamada semanal de seguimiento.',
              },
              {
                q: '¿Puedo cancelar o reprogramar sesiones?',
                a: 'Sí, puedes reprogramar con al menos 24 horas de anticipación sin ningún cargo adicional.',
              },
              {
                q: '¿Ofrecen planes de pago?',
                a: 'Sí, para programas mensuales y paquetes ofrezco facilidades de pago. Escríbeme para conocer las opciones disponibles.',
              },
            ].map((faq, index) => (
              <Card key={index} className="border-0 bg-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-warm-900 mb-2">{faq.q}</h3>
                  <p className="text-warm-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="¿No encuentras lo que buscas?"
        subheading="Escríbeme y juntos diseñamos un plan perfecto para tus necesidades específicas."
      />
    </>
  )
}
