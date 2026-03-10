import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { ValuePropositionSection } from '@/components/sections/value-proposition-section'
import { AboutPreviewSection } from '@/components/sections/about-preview-section'
import { ServicesSection } from '@/components/sections/services-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'

export const metadata: Metadata = {
  title: 'Vale Sánchez Fitness - Personal Trainer',
  description: 'Promoviendo estilos de vida saludables a través del Fitness. Entrenamiento personalizado y programas diseñados especialmente para ti.',
  openGraph: {
    title: 'Vale Sánchez Fitness - Personal Trainer',
    description: 'Promoviendo estilos de vida saludables a través del Fitness',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection
        title="Promoviendo estilos de vida saludables a través del Fitness!"
        subtitle="Empecemos a trabajarlo juntos. Entrenamiento personalizado diseñado para transformar tu vida."
        primaryCta={{ text: 'Reserva tu Espacio', link: '/contact' }}
        secondaryCta={{ text: 'Ver Servicios', link: '/services', enabled: true }}
      />

      <ValuePropositionSection
        heading="Tu Transformación Comienza Aquí"
        highlights={[
          {
            icon: 'target',
            title: 'Programas Personalizados',
            description: 'Planes de entrenamiento adaptados a tus objetivos, nivel físico y disponibilidad de tiempo.',
          },
          {
            icon: 'heart',
            title: 'Enfoque Integral',
            description: 'Combinamos ejercicio, orientación nutricional y bienestar mental para resultados duraderos.',
          },
          {
            icon: 'users',
            title: 'Acompañamiento Constante',
            description: 'Seguimiento personalizado en cada paso, ajustando el programa según tu progreso.',
          },
          {
            icon: 'trending-up',
            title: 'Resultados Reales',
            description: 'Método probado con cientos de clientes que han transformado sus vidas.',
          },
        ]}
      />

      <AboutPreviewSection
        heading="Conoce a Vale Sánchez"
        content="Bienvenido a valesanchez.fit, donde la atención personalizada es nuestra especialidad. Ofrecemos clases privadas de entrenamiento para aquellos que buscan un entorno de entrenamiento individualizado y eficaz. Con nuestro enfoque en el entrenamiento personalizado, trabajaremos contigo para establecer tus metas y desarrollar un plan de trabajo específico para ayudarte a alcanzarlas. Ofrecemos una amplia variedad de clases, desde entrenamiento de fuerza y resistencia hasta entrenamiento funcional."
        stats={[
          { value: '500+', label: 'Clientes Transformados' },
          { value: '8+', label: 'Años de Experiencia' },
          { value: '10k+', label: 'Sesiones Completadas' },
          { value: '100%', label: 'Compromiso' },
        ]}
      />

      <ServicesSection
        heading="Nuestros Servicios"
        subheading="Ofrecemos una variedad de programas diseñados para adaptarse a tus necesidades y objetivos específicos."
      />

      <TestimonialsSection
        heading="Lo que dicen nuestros clientes"
        subheading="Historias reales de personas que han transformado sus vidas con nuestro programa."
      />

      <CTASection
        heading="¿Listo para comenzar tu transformación?"
        subheading="Contáctanos hoy y da el primer paso hacia una vida más saludable. No importa si eres principiante o atleta avanzado, tenemos el programa perfecto para ti."
        showWhatsApp={true}
      />
    </>
  )
}
