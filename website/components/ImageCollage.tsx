'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

export interface CollageImage {
  src: string
  x: number
  y: number
  rotate: number
  alt?: string
}

export interface ImageCollageProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CollageImage[]
  containerClassName?: string
  imageClassName?: string
}

export const ImageCollage = React.forwardRef<HTMLDivElement, ImageCollageProps>(
  (
    { images, className, containerClassName, imageClassName, ...props },
    ref
  ) => {
    const [isOrganized, setIsOrganized] = useState(false)

    const toggleLayout = () => {
      setIsOrganized((prev) => !prev)
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center gap-6 sm:gap-8 select-none w-full cursor-pointer py-4',
          className
        )}
        onClick={toggleLayout}
        {...props}
      >
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-pencil-black/30 shadow-scribely-xs text-pencil-black text-xs sm:text-sm font-mono font-bold tracking-tight hover:border-pencil-black transition-colors">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Click anywhere to {isOrganized ? 'scatter notes' : 'assemble master blueprint'}</span>
        </div>

        {/* Strips Container */}
        <motion.div
          className={cn(
            'flex items-center justify-center relative overflow-visible py-8 px-4',
            containerClassName
          )}
        >
          <div className="flex items-center justify-center">
            {images.map((img, i) => (
              <motion.div
                key={i}
                className={cn(
                  'w-20 sm:w-28 md:w-36 lg:w-44 shrink-0 aspect-[170/439]',
                  !isOrganized && 'shadow-2xl rounded-sm border border-black/10',
                  isOrganized && 'shadow-none border-none',
                  imageClassName
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', bounce: 0.5, damping: 15, stiffness: 120 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: isOrganized ? 0 : img.x,
                  y: isOrganized ? 0 : img.y,
                  rotate: isOrganized ? 0 : img.rotate,
                  zIndex: isOrganized ? 1 : i + 1,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt || `GitKura Collage Plate ${i + 1}`}
                  draggable={false}
                  className="w-full h-full object-cover select-none pointer-events-none block"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }
)

ImageCollage.displayName = 'ImageCollage'

export default ImageCollage
