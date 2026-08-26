'use client'

import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import InkanStamp from '@/components/InkanStamp'
// import { ImageCollage } from '@/components/ui/image-collage'

// const COLLAGE_IMAGES = [
//   { src: '/collage/strip-0.jpg', x: -65, y: -16, rotate: -13, alt: 'Git Commits & Heritage Kura' },
//   { src: '/collage/strip-1.jpg', x: -30, y: 16, rotate: 8, alt: 'Commit DAG & Branch Flow' },
//   { src: '/collage/strip-2.jpg', x: -5, y: -18, rotate: -6, alt: 'Differential Delta Sync 92% Saved' },
//   { src: '/collage/strip-3.jpg', x: 22, y: 18, rotate: 9, alt: 'Air-Gapped Sovereign Vault' },
//   { src: '/collage/strip-4.jpg', x: 48, y: -14, rotate: -8, alt: 'Multi-Cloud Replication Terminal' },
//   { src: '/collage/strip-5.jpg', x: 75, y: 16, rotate: 12, alt: 'Disaster Recovery Runbook' },
// ]

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-pencil-black flex flex-col justify-between selection:bg-highlighter-yellow selection:text-ink-blue">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col items-center justify-center text-center py-20 my-auto">
        {/* Center: Inkan Stamp & Pure Word Link to 13-Chapter Manual */}
        <div className="space-y-8 flex flex-col items-center justify-center">
          <InkanStamp kanji="極秘" subtext="AIR-GAPPED SOVEREIGN" variant="red" />

          <Link
            href="/docs/manual"
            className="group inline-flex items-center justify-center gap-3 text-3xl sm:text-5xl lg:text-6xl font-caveat font-black text-ink-blue hover:text-[#d97706] transition-all cursor-pointer py-1"
          >
            <span className="relative pb-1">
              <span>Read Documentation (Chapter 01 → 12)</span>
              <span className="absolute left-0 bottom-0 w-full h-2.5 sm:h-3.5 bg-highlighter-yellow/70 -z-10 rounded-full transform origin-left scale-x-95 group-hover:scale-x-100 group-hover:bg-highlighter-yellow transition-all" />
            </span>
            <span className="inline-block group-hover:translate-x-3 transition-transform duration-200 text-3xl sm:text-5xl lg:text-6xl text-[#d97706]">
              ➔
            </span>
          </Link>
        </div>

        {/* ImageCollage Feature (Commented out) */}
        {/* 
        <div className="w-full flex items-center justify-center mt-auto pb-0 mb-0">
          <ImageCollage images={COLLAGE_IMAGES} />
        </div>
        */}
      </main>

      <Footer />
    </div>
  )
}
