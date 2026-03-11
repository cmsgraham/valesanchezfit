'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  whatsappUrl: string
}

export function WhatsAppButton({ whatsappUrl }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 2000)

    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-full right-0 mb-3 mr-2"
          >
            <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-[250px]">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-warm-100 rounded-full flex items-center justify-center hover:bg-warm-200 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-3 h-3 text-warm-600" />
              </button>
              <p className="text-sm text-warm-800">
                ¿Tienes preguntas? <br />
                <span className="font-semibold">¡Escríbenos por WhatsApp!</span>
              </p>
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'flex items-center justify-center',
          'w-14 h-14 md:w-16 md:h-16',
          'bg-[#25D366] hover:bg-[#22c55e]',
          'rounded-full shadow-lg hover:shadow-xl',
          'transition-shadow duration-300'
        )}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" />
      </motion.a>

      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{
          scale: [1, 1.5, 1.5],
          opacity: [0.5, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    </div>
  )
}
