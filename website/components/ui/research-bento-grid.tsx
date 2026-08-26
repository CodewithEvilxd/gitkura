'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  SiDocker,
  SiGithub,
  SiTelegram,
  SiGoogledrive,
  SiCloudflare,
} from 'react-icons/si'
import {
  HardDrive,
  ShieldCheck,
  Lock,
  Unlock,
  GitCommit,
  Zap,
  Layers,
  TrendingDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import WashiTape from '@/components/WashiTape'
import InkanStamp from '@/components/InkanStamp'

export interface ResearchBentoBrand {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  iconColor: string
  activeBg: string
  activeBorder: string
  tag: string
  protocol: string
  chunkSize: string
  egressCost: string
  speed: string
  details: string
}

const BRANDS: readonly ResearchBentoBrand[] = [
  {
    id: 'github',
    name: 'GitHub Upstream',
    icon: SiGithub,
    iconColor: 'text-[#181717]',
    activeBg: 'bg-slate-100',
    activeBorder: 'border-slate-800 ring-slate-800/20',
    tag: 'Source DAG',
    protocol: 'Smart HTTP v2 / SSH',
    chunkSize: 'Raw Git Objects',
    egressCost: 'Native API ($0)',
    speed: '12ms Inode Scan',
    details: 'Monitors commit DAG trees & inode hashes to detect branch divergence with zero poll lag.',
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare R2',
    icon: SiCloudflare,
    iconColor: 'text-[#F38020]',
    activeBg: 'bg-orange-50',
    activeBorder: 'border-[#F38020] ring-[#F38020]/25',
    tag: 'Zero Egress S3',
    protocol: 'Chunked S3 REST',
    chunkSize: '10MB Multi-part',
    egressCost: '$0 Free Egress',
    speed: '48 MB/s Edge',
    details: 'Zero egress fee cold archive. Encrypted thin-packs are mirrored across 300+ edge locations.',
  },
  {
    id: 'telegram',
    name: 'Telegram Bot CDN',
    icon: SiTelegram,
    iconColor: 'text-[#229ED9]',
    activeBg: 'bg-sky-50',
    activeBorder: 'border-[#229ED9] ring-[#229ED9]/25',
    tag: '49.5MB Sharding',
    protocol: 'MTProto File API',
    chunkSize: '49.5 MB Chunks',
    egressCost: '$0 Unlimited',
    speed: '22 MB/s Stream',
    details: 'Splits large git bundles into stealth 49.5MB encrypted chunks indexed via Telegram channel messages.',
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    icon: SiGoogledrive,
    iconColor: 'text-[#0F9D58]',
    activeBg: 'bg-emerald-50',
    activeBorder: 'border-[#0F9D58] ring-[#0F9D58]/25',
    tag: 'OAuth2 Failover',
    protocol: 'Drive v3 Resumable',
    chunkSize: 'Multi-part Stream',
    egressCost: 'Standard Quota',
    speed: '35 MB/s API',
    details: 'Secondary multi-cloud encrypted vault with automatic exponential jitter backoff on rate limits.',
  },
  {
    id: 'vault',
    name: 'Local NVMe Vault',
    icon: HardDrive,
    iconColor: 'text-[#0284C7]',
    activeBg: 'bg-cyan-50',
    activeBorder: 'border-[#0284C7] ring-[#0284C7]/25',
    tag: 'Air-Gapped NVMe',
    protocol: 'Direct NVMe I/O',
    chunkSize: 'Zero-Copy mmap',
    egressCost: '$0 Local NVMe',
    speed: '1.2 GB/s Direct',
    details: 'On-device air-gapped storage enclave. Isolated from renderer process via ContextBridge IPC firewall.',
  },
  {
    id: 'docker',
    name: 'Docker Engine',
    icon: SiDocker,
    iconColor: 'text-[#2496ED]',
    activeBg: 'bg-blue-50',
    activeBorder: 'border-[#2496ED] ring-[#2496ED]/25',
    tag: 'Headless Daemon',
    protocol: 'Unix Socket IPC',
    chunkSize: 'Automated Cron',
    egressCost: '$0 Self-Hosted',
    speed: 'Instant Daemon',
    details: 'Self-hosted containerized worker running scheduled background synchronization without GUI overhead.',
  },
]

const spring = { type: 'spring', stiffness: 350, damping: 28 } as const
const LIFTED_TILES = new Set([5, 14, 23, 34, 41, 53, 62, 71, 79, 88, 97, 108, 119, 131, 146, 157, 169, 184, 199, 213, 226, 241])
const BRIGHT_TILES = new Set([17, 45, 76, 103, 138, 176, 205, 234])

export function ResearchBentoGrid() {
  const [selectedBrand, setSelectedBrand] = React.useState(0)
  const [isLocked, setIsLocked] = React.useState(false)
  const [syncMetric, setSyncMetric] = React.useState<'delta' | 'full'>('delta')
  const [isHovered, setIsHovered] = React.useState(false)
  const reduceMotion = useReducedMotion()

  // Auto rotate selected brand smoothly when not hovered
  React.useEffect(() => {
    if (reduceMotion || isHovered) return
    const interval = setInterval(() => {
      setSelectedBrand((prev) => (prev + 1) % BRANDS.length)
    }, 3800)
    return () => clearInterval(interval)
  }, [reduceMotion, isHovered])

  const activeBrand = BRANDS[selectedBrand]

  return (
    <div className="w-full select-none">
      {/* ========================================================================= */}
      {/* SINGLE UNIFIED MASTER BENTO CANVAS                                        */}
      {/* ========================================================================= */}
      <div className="relative bg-[#fffdfa] rounded-3xl border-2 border-pencil-black p-5 sm:p-8 shadow-[0_16px_44px_rgba(0,0,0,0.07)] space-y-6 sm:space-y-8">
        {/* Corner Washi Tape Pins */}
        <WashiTape variant="yellow" rotate="-rotate-12" width={110} height={32} className="-top-4 -left-3 z-30 shadow-xs" />
        <WashiTape variant="rose" rotate="rotate-12" width={110} height={32} className="-top-4 -right-3 z-30 shadow-xs" />
        <WashiTape variant="blue" rotate="-rotate-6" width={95} height={28} className="-bottom-3.5 right-10 z-30 shadow-xs" />

        {/* ======================================================================= */}
        {/* TOP SECTION: BRAND ICON SHOWCASE WITH DYNAMIC GLIDING CURSOR            */}
        {/* ======================================================================= */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative isolate min-h-[300px] sm:min-h-[310px] rounded-2xl border-2 border-pencil-black/20 bg-white overflow-hidden p-5 sm:p-6 flex flex-col justify-between"
        >
          {/* Subtle Tile Grid Background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 grid h-[85%] grid-cols-[repeat(28,minmax(0,1fr))] grid-rows-[repeat(9,minmax(0,1fr))] gap-px overflow-hidden opacity-50"
            style={{ maskImage: 'linear-gradient(to bottom,black 0%,black 65%,transparent 100%)' }}
          >
            {Array.from({ length: 252 }, (_, index) => (
              <span
                key={index}
                className={cn(
                  'border border-black/[0.03] bg-[#faf8f5]',
                  LIFTED_TILES.has(index) && 'bg-[#edece6]',
                  BRIGHT_TILES.has(index) && 'bg-[#e5e4dc]',
                )}
              />
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[80%] bg-[radial-gradient(ellipse_at_50%_25%,transparent_12%,rgba(247,247,245,.15)_58%,#ffffff_100%)]"
          />

          {/* Floating Responsive Grid of Large Square Icon Buttons */}
          <div className="relative z-10 mx-auto grid w-full max-w-[800px] grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 pt-2 pb-10 sm:pb-9">
            {BRANDS.map((brand, index) => {
              const Icon = brand.icon
              const isSelected = selectedBrand === index
              return (
                <div key={brand.name} className="relative flex flex-col items-center justify-center">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedBrand(index)}
                    onMouseEnter={() => setSelectedBrand(index)}
                    aria-label={`Select ${brand.name}`}
                    aria-pressed={isSelected}
                    className={cn(
                      'relative flex aspect-square w-full min-w-[70px] sm:min-w-[80px] max-w-[95px] items-center justify-center overflow-hidden rounded-2xl border-2 cursor-pointer transition-all',
                      isSelected
                        ? cn('bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] ring-2', brand.activeBorder)
                        : 'bg-white/90 hover:bg-white border-pencil-black/20 hover:border-pencil-black text-slate-700 shadow-2xs',
                    )}
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            y: isSelected ? -4 : [0, index % 2 ? 1.5 : -1.5, 0],
                            scale: isSelected ? 1.06 : 1,
                          }
                    }
                    whileHover={{ y: -5, scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{
                      y: { duration: 4.8 + index * 0.3, delay: index * 0.2, repeat: Infinity, ease: 'easeInOut' },
                      scale: spring,
                    }}
                  >
                    {isSelected && (
                      <motion.span
                        aria-hidden
                        className="absolute inset-[8%] rounded-full bg-highlighter-yellow/40 blur-md"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: [0.4, 0.75, 0.4], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                    <motion.span
                      className={cn('relative flex size-full items-center justify-center p-3.5 sm:p-4', brand.iconColor)}
                      animate={{ scale: isSelected ? 1.12 : 1 }}
                      transition={spring}
                    >
                      <Icon className="w-8 h-8 sm:w-9 sm:h-9" aria-hidden />
                    </motion.span>
                  </motion.button>

                  {/* 100% Reliable Gliding Pointer Cursor with layoutId */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeTargetGlidingCursor"
                      className="absolute top-full mt-1.5 z-30 flex flex-col items-center select-none pointer-events-none whitespace-nowrap"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                      }}
                    >
                      <svg
                        width="22"
                        height="26"
                        viewBox="0 0 26 30"
                        fill="none"
                        className="h-auto w-[16px] drop-shadow-md"
                      >
                        <path
                          d="M2.2 2.5 22 15.1l-9.4 2.1-4.1 9.1L2.2 2.5Z"
                          className="fill-[#fef08a] stroke-[#1a3a5f]"
                          strokeWidth="2.1"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-bold tracking-tight rounded-md border border-pencil-black/30 bg-[#fef08a] text-[#1a3a5f] shadow-scribely-xs mt-0.5">
                        {brand.name}
                      </span>
                    </motion.div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Bottom Feature Details */}
          <div className="relative z-10 pt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t border-pencil-black/10">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg sm:text-xl text-ink-blue tracking-tight">
                  {activeBrand.name}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                  {activeBrand.tag}
                </span>
              </div>
              <p className="max-w-[500px] text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                {activeBrand.details}
              </p>
            </div>

            <div className="flex items-center gap-5 shrink-0 font-mono text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Throughput</span>
                <span className="font-bold text-ink-blue text-sm">{activeBrand.speed}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Egress Fee</span>
                <span className="font-bold text-emerald-600 text-sm">{activeBrand.egressCost}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* BOTTOM SECTION: 2-COLUMN METRICS (BENCHMARK & VAULT ENCLAVE)            */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 pt-2">
          {/* Left: Differential Delta Pack vs Full Clone Benchmark */}
          <div className="md:col-span-7 bg-[#fbf9f6] rounded-2xl border-2 border-pencil-black/20 p-5 space-y-4 flex flex-col justify-between shadow-2xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 tracking-wider">
                <GitCommit className="w-4 h-4 text-blue-600" />
                <span>DAG DIFFERENTIAL BENCHMARK</span>
              </div>
              <h4 className="text-lg sm:text-xl font-heading font-black text-ink-blue tracking-tight">
                Differential Thin-Pack vs Full Re-Clone
              </h4>
            </div>

            {/* Clean Borderless Toggle Tabs */}
            <div className="flex items-center gap-6 border-b border-pencil-black/10 pb-2">
              <button
                type="button"
                onClick={() => setSyncMetric('delta')}
                className={cn(
                  'text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 pb-1',
                  syncMetric === 'delta'
                    ? 'text-ink-blue border-b-2 border-ink-blue font-black'
                    : 'text-slate-400 hover:text-slate-700',
                )}
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>GitKura Delta (18.2 MB)</span>
              </button>
              <button
                type="button"
                onClick={() => setSyncMetric('full')}
                className={cn(
                  'text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 pb-1',
                  syncMetric === 'full'
                    ? 'text-red-600 border-b-2 border-red-600 font-black'
                    : 'text-slate-400 hover:text-slate-700',
                )}
              >
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>Full Re-Clone (2.4 GB)</span>
              </button>
            </div>

            {syncMetric === 'delta' ? (
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="font-heading font-black text-2xl sm:text-3xl text-emerald-600 tracking-tight">
                    18.2 MB Thin-Pack
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs border border-emerald-300 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3 text-emerald-600" />
                    -92.4% Bandwidth Saved
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-pencil-black/20">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '7.6%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>Transfer: 1.4s (12ms scan)</span>
                  <span className="text-emerald-700 font-bold">$0 Free Egress</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="font-heading font-black text-2xl sm:text-3xl text-red-600 tracking-tight">
                    2,400.0 MB Full Clone
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-mono font-bold text-xs border border-red-300">
                    100% Redundant Overhead
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-pencil-black/20">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-red-500 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 font-bold">
                  <span>Transfer: 3m 40s</span>
                  <span className="text-red-700 font-bold">Heavy Bandwidth &amp; IO</span>
                </div>
              </div>
            )}

            <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
              Scans inode hashes in 12ms and streams only incremental commit objects.
            </p>
          </div>

          {/* Right: Air-Gapped Vault Enclave Controller */}
          <div className="md:col-span-5 bg-[#fbf9f6] rounded-2xl border-2 border-pencil-black/20 p-5 space-y-4 flex flex-col justify-between relative shadow-2xs">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-600 tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>AIR-GAPPED VAULT ENCLAVE</span>
                </div>
                <h4 className="text-lg sm:text-xl font-heading font-black text-ink-blue tracking-tight">
                  Memory Enclave Lock
                </h4>
              </div>
              <InkanStamp kanji="極秘" subtext="VAULT" variant="red" />
            </div>

            {/* Clean Interactive Switch (No Box) */}
            <div className="space-y-3 py-1">
              <button
                type="button"
                onClick={() => setIsLocked(!isLocked)}
                className="group flex items-center gap-3.5 py-1 text-left cursor-pointer transition-all w-full select-none"
              >
                {/* Modern Toggle Switch */}
                <div
                  className={cn(
                    'w-12 h-7 rounded-full transition-colors relative p-1 shrink-0 border border-pencil-black/20',
                    isLocked ? 'bg-slate-300' : 'bg-emerald-500 shadow-sm',
                  )}
                >
                  <motion.div
                    animate={{ x: isLocked ? 0 : 20 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="w-5 h-5 bg-white rounded-full shadow-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {isLocked ? (
                    <>
                      <Lock className="w-5 h-5 text-red-600 shrink-0" />
                      <span className="font-heading font-bold text-base sm:text-lg text-red-700">
                        Vault Locked (RAM Purged)
                      </span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-5 h-5 text-emerald-600 shrink-0 animate-pulse" />
                      <span className="font-heading font-bold text-base sm:text-lg text-emerald-800">
                        Vault Active (Enclave Loaded)
                      </span>
                    </>
                  )}
                </div>
              </button>

              <div className="text-xs font-mono text-slate-500 font-bold">
                {isLocked ? (
                  <span className="text-red-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    RAM key wiped to 0x00 &bull; Sync paused
                  </span>
                ) : (
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    AES-256 Key in RAM &bull; Auto-sync active
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
              PBKDF2 32-byte AES key exists solely in RAM and zero-fills on lock.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchBentoGrid
