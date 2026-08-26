"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CollageImage {
  src: string;
  x: number;
  y: number;
  rotate: number;
  alt?: string;
}

export interface ImageCollageProps extends React.HTMLAttributes<HTMLDivElement> {
  images: CollageImage[];
  containerClassName?: string;
  imageClassName?: string;
}

export const ImageCollage = React.forwardRef<HTMLDivElement, ImageCollageProps>(
  (
    { images, className, containerClassName, imageClassName, ...props },
    ref
  ) => {
    const [isOrganized, setIsOrganized] = useState(false);

    const toggleLayout = () => {
      setIsOrganized((prev) => !prev);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-end select-none w-full cursor-pointer p-0 m-0 pb-0",
          className
        )}
        onClick={toggleLayout}
        {...props}
      >
        <motion.div
          className={cn(
            "flex items-center justify-center relative overflow-visible p-0 m-0",
            containerClassName
          )}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className={cn(
                "w-20 sm:w-32 md:w-40 lg:w-48 xl:w-52 shrink-0 aspect-[170/439]",
                !isOrganized && "shadow-lg hover:shadow-2xl rounded-xs transition-shadow",
                isOrganized && "shadow-none rounded-none",
                imageClassName
              )}
              initial={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", bounce: 0.45, damping: 14, stiffness: 120 }}
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
                alt={img.alt || `Collage strip ${i + 1}`}
                draggable={false}
                className="w-full h-full object-cover select-none pointer-events-none block"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

ImageCollage.displayName = "ImageCollage";

export default ImageCollage;
