import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { ContactSetting } from '@/payload-types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de los servicios de Vale Sánchez Fitness.',
}

export default async function TermsPage() {
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
              Términos y Condiciones
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
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar el sitio web valesanchez.fit y los servicios de Vale Sánchez 
              Fitness, aceptas estar sujeto a estos términos y condiciones. Si no estás de acuerdo 
              con alguna parte de estos términos, no debes utilizar nuestros servicios.
            </p>

            <h2>2. Descripción de los Servicios</h2>
            <p>
              Vale Sánchez Fitness ofrece servicios de entrenamiento personal, coaching online, 
              asesoría nutricional y programas de fitness. Los detalles específicos de cada 
              servicio se acuerdan directamente con cada cliente.
            </p>

            <h2>3. Requisitos de Salud</h2>
            <p>
              Antes de comenzar cualquier programa de entrenamiento, debes:
            </p>
            <ul>
              <li>Informar sobre cualquier condición médica existente</li>
              <li>Consultar con un médico si tienes dudas sobre tu aptitud física</li>
              <li>Firmar el formulario de consentimiento informado requerido</li>
              <li>Mantener actualizada tu información de salud</li>
            </ul>

            <h2>4. Reservas y Cancelaciones</h2>
            <p>
              <strong>Reservas:</strong> Las sesiones se reservan con anticipación y están 
              sujetas a disponibilidad.
            </p>
            <p>
              <strong>Cancelaciones:</strong> Puedes cancelar o reprogramar una sesión con al 
              menos 24 horas de anticipación sin cargo. Las cancelaciones con menos de 24 horas 
              de anticipación o las ausencias sin aviso pueden resultar en el cargo completo 
              de la sesión.
            </p>

            <h2>5. Pagos</h2>
            <ul>
              <li>Los pagos deben realizarse según el acuerdo de cada servicio</li>
              <li>Los paquetes prepagados no son reembolsables pero sí transferibles</li>
              <li>Aceptamos efectivo, transferencia bancaria y SINPE Móvil</li>
              <li>Los precios están sujetos a cambios con previo aviso</li>
            </ul>

            <h2>6. Responsabilidad del Cliente</h2>
            <p>El cliente es responsable de:</p>
            <ul>
              <li>Llegar puntualmente a las sesiones programadas</li>
              <li>Usar ropa y calzado apropiados para el ejercicio</li>
              <li>Seguir las instrucciones de seguridad durante el entrenamiento</li>
              <li>Comunicar cualquier molestia o incomodidad durante el ejercicio</li>
              <li>Mantenerse hidratado y alimentado apropiadamente</li>
            </ul>

            <h2>7. Limitación de Responsabilidad</h2>
            <p>
              Vale Sánchez Fitness no se hace responsable de lesiones que ocurran como resultado 
              de no seguir las instrucciones proporcionadas, no revelar condiciones médicas 
              preexistentes, o participar en actividades fuera del programa acordado.
            </p>
            <p>
              Participar en programas de ejercicio conlleva riesgos inherentes. Al utilizar 
              nuestros servicios, aceptas estos riesgos y liberas a Vale Sánchez Fitness de 
              responsabilidad dentro de los límites permitidos por la ley.
            </p>

            <h2>8. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos, 
              programas de entrenamiento y materiales educativos, es propiedad de Vale Sánchez 
              Fitness y está protegido por derechos de autor. No está permitida la reproducción 
              o distribución sin autorización escrita.
            </p>

            <h2>9. Confidencialidad</h2>
            <p>
              Los programas de entrenamiento personalizados son confidenciales y están diseñados 
              específicamente para cada cliente. No deben ser compartidos, distribuidos o 
              utilizados comercialmente sin autorización.
            </p>

            <h2>10. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier 
              momento. Los cambios serán efectivos desde su publicación en este sitio web.
            </p>

            <h2>11. Ley Aplicable</h2>
            <p>
              Estos términos se rigen por las leyes de la República de Costa Rica. Cualquier 
              disputa será resuelta en los tribunales de San José, Costa Rica.
            </p>

            <h2>12. Contacto</h2>
            <p>
              Para preguntas sobre estos términos y condiciones:
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
