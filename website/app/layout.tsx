import type { Metadata } from 'next'
import { Patrick_Hand, Architects_Daughter, Outfit, Space_Mono, Caveat } from 'next/font/google'
import './globals.css'

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-patrick',
  display: 'swap',
})

const caveat = Caveat({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

const architectsDaughter = Architects_Daughter({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-architects',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GitKura (Git蔵) • Disaster-Proof Git Repository Vault & Multi-Cloud Replication Engine',
  description:
    'Air-gapped local vault, differential git synchronization, and automated snapshot replication across Telegram Channels, Google Drive, AWS S3, Cloudflare R2, and MinIO. Zero telemetry, AES-256 encrypted on disk.',
  authors: [{ name: 'Nishant Gaurav', url: 'https://github.com/CodewithEvilxd' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-256.png',
  },
}

import BrushFilterDefs from '@/components/BrushFilterDefs'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${patrickHand.variable} ${caveat.variable} ${architectsDaughter.variable} ${outfit.variable} ${spaceMono.variable}`}
    >
      <body className="bg-paper-off-white text-pencil-black min-h-screen flex flex-col antialiased">
        <BrushFilterDefs />
        {children}
      </body>
    </html>
  )
}
