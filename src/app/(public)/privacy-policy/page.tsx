import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { ContactSetting } from '@/payload-types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Conoce cómo recopilamos, usamos y protegemos tu información personal.',
}

export default async function PrivacyPolicyPage() {
  const payload = await getPayload({ config: configPromise }).catch(() => null)
  const settings = (payload ? await payload.findGlobal({ slug: 'contact-settings' }).catch(() => null) : null) as ContactSetting | null
  const email = settings?.email?.contactEmail ?? 'info@valesanchez.fit'
  const whatsapp = settings?.whatsapp?.phoneNumber ? `+${settings.whatsapp.phoneNumber}` : '+506 8854 6547'

  return (
    <>
      <section className="relative pt-32 pb-10 bg-warm-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-warm-900 mb-6">
              Política de Privacidad
            </h1>
            <p className="text-warm-600">
              Última actualización: {new Date().toLocaleDateString('es-CR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-warm">
            <h2>1. Información que Recopilamos</h2>
            <p>
              En Vale Sánchez Fitness (valesanchez.fit), recopilamos información que nos proporcionas 
              directamente cuando:
            </p>
            <ul>
              <li>Completas el formulario de contacto</li>
              <li>Te comunicas con nosotros por WhatsApp o email</li>
              <li>Te registras para nuestros servicios</li>
              <li>Participas en nuestros programas de entrenamiento</li>
            </ul>

            <p>Esta información puede incluir:</p>
            <ul>
              <li>Nombre y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Información de salud relevante para el entrenamiento</li>
              <li>Objetivos de fitness y preferencias de entrenamiento</li>
            </ul>

            <h2>2. Cómo Usamos tu Información</h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul>
              <li>Proporcionar nuestros servicios de entrenamiento personal</li>
              <li>Comunicarnos contigo sobre tus consultas y solicitudes</li>
              <li>Personalizar tu experiencia de entrenamiento</li>
              <li>Enviar actualizaciones sobre nuestros servicios (con tu consentimiento)</li>
              <li>Mejorar nuestros servicios y sitio web</li>
            </ul>

            <h2>3. Protección de tu Información</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger 
              tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
            </p>

            <h2>4. Compartición de Información</h2>
            <p>
              No vendemos, intercambiamos ni transferimos tu información personal a terceros. 
              Podemos compartir información con proveedores de servicios que nos ayudan a operar 
              nuestro sitio web o negocio, siempre bajo acuerdos de confidencialidad.
            </p>

            <h2>5. Tus Derechos</h2>
            <p>Tienes derecho a:</p>
            <ul>
              <li>Acceder a tu información personal</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de tu información</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>

            <h2>6. Cookies y Tecnologías Similares</h2>
            <p>
              Nuestro sitio web puede utilizar cookies para mejorar tu experiencia de navegación. 
              Puedes configurar tu navegador para rechazar cookies, aunque esto puede limitar 
              algunas funcionalidades del sitio.
            </p>

            <h2>7. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos 
              cualquier cambio publicando la nueva política en esta página con una fecha de 
              actualización revisada.
            </p>

            <h2>8. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad, puedes contactarme:
            </p>
            <ul>
              <li>Email: {email}</li>
              <li>WhatsApp: {whatsapp}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
