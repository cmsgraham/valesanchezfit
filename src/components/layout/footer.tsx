import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Entrenamiento Personal', href: '/services#personal-training' },
    { label: 'Planes de Ejercicio', href: '/services#exercise-plans' },
    { label: 'Clases Virtuales', href: '/services#virtual-classes' },
    { label: 'App de Seguimiento', href: '/services#app-training' },
  ],
  company: [
    { label: 'Sobre Mí', href: '/about' },
    { label: 'Servicios', href: '/services' },
    { label: 'Testimonios', href: '/#testimonials' },
    { label: 'Contacto', href: '/contact' },
  ],
  legal: [
    { label: 'Política de Privacidad', href: '/privacy-policy' },
    { label: 'Términos de Servicio', href: '/terms' },
  ],
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/valesanchez.fit', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '50688546547'

  return (
    <footer className="bg-warm-900 text-warm-100">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-bold text-white">
                vale<span className="text-gold-400">sánchez</span>.fit
              </span>
            </Link>
            <p className="text-warm-300 text-sm leading-relaxed mb-6">
              Transformando vidas a través del fitness personalizado.
              Tu bienestar es mi prioridad.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-warm-800 flex items-center justify-center hover:bg-gold-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-warm-300 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-6">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-300 hover:text-gold-400 transition-colors text-sm"
                  >
                    +{whatsappNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')}
                  </a>
                  <p className="text-warm-400 text-xs mt-1">WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:cristian.madrigal@gmail.com"
                  className="text-warm-300 hover:text-gold-400 transition-colors text-sm"
                >
                  cristian.madrigal@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-warm-300 text-sm">
                  Costa Rica
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div className="text-warm-300 text-sm">
                  <p>Lun - Vie: 6:00 - 20:00</p>
                  <p>Sáb: 7:00 - 14:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-warm-400 text-sm">
              © {currentYear} Vale Sánchez Fitness. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-warm-400 hover:text-gold-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
