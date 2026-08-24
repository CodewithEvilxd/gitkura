'use client'

import { useState } from 'react'
import {
  ChevronDown,
} from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
  category: string
}

const faqs: FaqItem[] = [
  {
    question: 'Is GitKura completely free and open source?',
    answer:
      'Yes, GitKura is 100% free and open-source under the permissive MIT License created by Nishant Gaurav. You can inspect the source code, run it on unlimited devices, and use it for personal or commercial projects without any paywalls or subscriptions.',
    category: 'General',
  },
  {
    question: 'How are my GitHub Personal Access Tokens and cloud keys secured?',
    answer:
      'All credentials (GitHub PAT, Telegram Bot Tokens, AWS S3 keys, Google Service Account JSON) are encrypted locally using AES-256 before being stored on your computer. Plaintext secrets are never written to disk, and GitKura sends zero analytics or telemetry anywhere.',
    category: 'Security',
  },
  {
    question: 'Can I use GitKura completely offline on air-gapped machines?',
    answer:
      'Yes! By choosing "Local Vault Only" mode, GitKura operates entirely on your local machine or external hard drive. It creates raw Git mirrors and .tar.gz snapshots locally without sending any data over the internet.',
    category: 'Privacy',
  },
  {
    question: 'How is GitKura better than running manual git clone commands?',
    answer:
      'Manual git clone downloads the entire repository from scratch every single time. GitKura uses smart differential synchronization (git fetch --all --prune --tags), which downloads only new commits and changed branches, saving up to 90% bandwidth and completing backups in seconds. It also automatically packages point-in-time archives and replicates to your clouds.',
    category: 'Performance',
  },
  {
    question: 'Which platforms and operating systems are supported?',
    answer:
      'GitKura runs natively on Windows 10 & 11 (installer & portable .exe), macOS (Universal .dmg supporting both Apple Silicon M1/M2/M3 and Intel), and Linux (AppImage and Debian .deb packages).',
    category: 'Compatibility',
  },
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-sky-50/90 border-2 border-pencil-black shadow-scribely-sm rounded-full -rotate-1">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
          <span className="font-caveat font-bold text-lg text-sky-950">
            frequently asked questions
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-marker uppercase leading-[1.25] text-[#17365D] tracking-tight">
          GOT QUESTIONS?{' '}
          <span className="relative inline-block text-[#E9A51A] sm:whitespace-nowrap">
            WE HAVE ANSWERS.
            <svg
              className="absolute left-0 -bottom-2 w-full h-3 select-none pointer-events-none"
              viewBox="0 0 200 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M 2 5 Q 100 2 198 5" stroke="#E9A51A" strokeWidth="3.6" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="font-patrick text-xl text-[#64748b] font-medium">
          Everything you need to know about GitKura security, cloud storage, and privacy.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx
          return (
            <div
              key={idx}
              className={`rounded-2xl border-2 border-pencil-black transition-all bg-white overflow-hidden ${
                isOpen ? 'shadow-scribely' : 'shadow-scribely-sm hover:border-pencil-black'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-gaegu font-bold bg-[#faf8f5] text-ink-blue px-2.5 py-0.5 rounded-lg border border-pencil-black">
                    {faq.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-black font-display text-ink-blue">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-pencil-black transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-ink-blue' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t-2 border-dashed border-pencil-black/15 bg-[#faf8f5]">
                  <p className="font-patrick text-base sm:text-lg text-[#475569] leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Cute Bottom FAQ Sticker Note */}
      <div className="mt-8 text-center">
        <span className="font-caveat font-bold text-xl text-indigo-900 bg-indigo-100/90 px-5 py-1.5 rounded-full border border-indigo-300 shadow-sm inline-flex items-center gap-1.5 -rotate-0.5">
          Have more questions? Open a GitHub Discussion or Issue anytime!
        </span>
      </div>
    </section>
  )
}
