import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

const services = [
  {
    title: 'Entrenamiento Personal',
    slug: 'personal-training',
    subtitle: 'Atención 100% personalizada para maximizar tus resultados',
    shortDescription: 'Sesiones individualizadas con atención personalizada para maximizar tus resultados.',
    icon: 'dumbbell' as const,
    featured: true,
    order: 1,
    status: 'published' as const,
    features: [
      { feature: 'Evaluación física inicial completa' },
      { feature: 'Plan de entrenamiento personalizado' },
      { feature: 'Seguimiento de progreso semanal' },
      { feature: 'Ajustes continuos según tus avances' },
      { feature: 'Soporte por WhatsApp entre sesiones' },
    ],
    ctaButton: { text: 'Reservar sesión' },
  },
  {
    title: 'Coaching Online',
    slug: 'online-coaching',
    subtitle: 'Entrena desde cualquier lugar con guía profesional',
    shortDescription: 'Entrenamiento profesional a distancia con seguimiento diario y plan totalmente adaptado a ti.',
    icon: 'video' as const,
    featured: false,
    order: 2,
    status: 'published' as const,
    features: [
      { feature: 'Plan de entrenamiento en app móvil' },
      { feature: 'Videos explicativos de cada ejercicio' },
      { feature: 'Comunicación diaria por WhatsApp' },
      { feature: 'Videollamada semanal de seguimiento' },
      { feature: 'Ajuste mensual del programa' },
    ],
    ctaButton: { text: 'Consultar' },
  },
  {
    title: 'Planes de Ejercicio',
    slug: 'exercise-plans',
    subtitle: 'Programas estructurados para tus metas y estilo de vida',
    shortDescription: 'Programas estructurados diseñados específicamente para tus metas y estilo de vida.',
    icon: 'calendar' as const,
    featured: false,
    order: 3,
    status: 'published' as const,
    features: [
      { feature: 'Plan de 4, 8 o 12 semanas' },
      { feature: 'Rutinas para gym o en casa' },
      { feature: 'Progresión de cargas y dificultad' },
      { feature: 'Calendario semanal detallado' },
      { feature: 'Guía de calentamiento y estiramiento' },
    ],
    ctaButton: { text: 'Ver planes' },
  },
  {
    title: 'Clases Grupales',
    slug: 'group-classes',
    subtitle: 'Entrena con la energía y motivación de la comunidad',
    shortDescription: 'Entrenamientos en grupo con la energía y motivación de la comunidad.',
    icon: 'users' as const,
    featured: false,
    order: 4,
    status: 'published' as const,
    features: [
      { feature: 'Grupos reducidos (máx. 8 personas)' },
      { feature: 'Sesiones de 60 minutos' },
      { feature: 'Diferentes niveles de dificultad' },
      { feature: 'Ambiente motivador y divertido' },
      { feature: 'Horarios flexibles entre semana y fines de semana' },
    ],
    ctaButton: { text: 'Ver horarios' },
  },
  {
    title: 'Seguimiento por App',
    slug: 'app-training',
    subtitle: 'Monitoreo continuo de tu progreso desde tu teléfono',
    shortDescription: 'Monitoreo continuo de tu progreso a través de nuestra aplicación móvil.',
    icon: 'smartphone' as const,
    featured: false,
    order: 5,
    status: 'published' as const,
    features: [
      { feature: 'Registro de entrenamientos y peso' },
      { feature: 'Gráficas de progreso' },
      { feature: 'Recordatorios de sesiones' },
      { feature: 'Biblioteca de ejercicios con videos' },
      { feature: 'Historial completo de tu evolución' },
    ],
    ctaButton: { text: 'Comenzar ahora' },
  },
  {
    title: 'Retos Fitness',
    slug: 'fitness-challenges',
    subtitle: 'Desafíos mensuales para mantenerte motivado',
    shortDescription: 'Desafíos mensuales para mantenerte motivado y alcanzar nuevas metas.',
    icon: 'trophy' as const,
    featured: false,
    order: 6,
    status: 'published' as const,
    features: [
      { feature: 'Retos de 21 o 30 días' },
      { feature: 'Comunidad de participantes' },
      { feature: 'Premios para los mejores resultados' },
      { feature: 'Guía diaria de ejercicios' },
      { feature: 'Check-ins de progreso semanales' },
    ],
    ctaButton: { text: 'Unirme al reto' },
  },
]

async function seed() {
  const payload = await getPayload({ config: configPromise })

  for (const service of services) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: service.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'services',
        id: existing.docs[0]!.id,
        data: service,
      })
      console.log(`Updated: ${service.title}`)
    } else {
      await payload.create({
        collection: 'services',
        data: service,
      })
      console.log(`Created: ${service.title}`)
    }
  }

  console.log('Done seeding services.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
