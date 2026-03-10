import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Vale Sánchez Fitness - Personal Trainer',
    template: '%s | Vale Sánchez Fitness',
  },
  description: 'Entrenamiento fitness personalizado y programas diseñados especialmente para ti. Transforma tu vida con Vale Sánchez.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
