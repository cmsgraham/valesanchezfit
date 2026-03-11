'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DEFAULT_NAV_ITEMS = [
  { label: 'Inicio', href: '/', newTab: false },
  { label: 'Sobre Mí', href: '/about', newTab: false },
  { label: 'Servicios', href: '/services', newTab: false },
  { label: 'Contacto', href: '/contact', newTab: false },
]

interface HeaderProps {
  data?: {
    navItems?: { label: string; link: string; newTab?: boolean | null; highlight?: boolean | null; id?: string | null }[] | null
    ctaButton?: { enabled?: boolean | null; text?: string | null; link?: string | null; style?: string | null } | null
  } | null
  whatsappUrl: string
}

export function Header({ data, whatsappUrl }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navItems = data?.navItems?.length
    ? data.navItems.map(item => ({ label: item.label, href: item.link, newTab: item.newTab ?? false }))
    : DEFAULT_NAV_ITEMS

  const ctaEnabled = data?.ctaButton?.enabled ?? true
  const ctaText = data?.ctaButton?.text ?? 'Reserva tu Espacio'
  const ctaStyle = data?.ctaButton?.style ?? 'whatsapp'
  const ctaHref = ctaStyle === 'whatsapp' ? whatsappUrl : (data?.ctaButton?.link ?? '/contact')
  const ctaExternal = ctaStyle === 'whatsapp' || ctaHref.startsWith('http')

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-4 lg:py-6'
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group"
            >
              <span
                className={cn(
                  'font-display text-xl md:text-2xl font-bold transition-colors',
                  isScrolled ? 'text-warm-900' : 'text-white'
                )}
              >
                vale<span className="text-gold-500">sánchez</span>.fit
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-gold-500 relative group',
                    isScrolled ? 'text-warm-900' : 'text-white'
                  )}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            {ctaEnabled && (
              <div className="hidden lg:flex items-center gap-4">
                <Button asChild variant="gold" size="default">
                  {ctaExternal ? (
                    <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                      <Phone className="w-4 h-4 mr-2" />
                      {ctaText}
                    </a>
                  ) : (
                    <Link href={ctaHref}>
                      <Phone className="w-4 h-4 mr-2" />
                      {ctaText}
                    </Link>
                  )}
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-md transition-colors',
                isScrolled ? 'text-warm-900' : 'text-white'
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl p-6 pt-20"
            >
              <div className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-warm-900 hover:text-gold-500 transition-colors block"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {ctaEnabled && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-6 border-t"
                  >
                    <Button asChild variant="gold" size="lg" className="w-full">
                      {ctaExternal ? (
                        <a
                          href={ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          {ctaText}
                        </a>
                      ) : (
                        <Link href={ctaHref} onClick={() => setIsMobileMenuOpen(false)}>
                          <Phone className="w-4 h-4 mr-2" />
                          {ctaText}
                        </Link>
                      )}
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
