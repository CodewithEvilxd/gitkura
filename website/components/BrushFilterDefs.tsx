export default function BrushFilterDefs() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute w-0 h-0 pointer-events-none overflow-hidden"
      style={{ position: 'absolute', width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle dry-brush edge filter for secondary headings */}
        <filter
          id="dry-brush-filter"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="2"
            seed="7"
            result="edgeNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="edgeNoise"
            scale="1.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Master Hand-Painted Dry Brush Pipeline: Authentic Bristle Grain + Organic Torn Edges */}
        <filter
          id="dry-brush-heavy"
          x="-12%"
          y="-12%"
          width="124%"
          height="124%"
        >
          {/* 1. Natural rough torn brush edges */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.032 0.16"
            numOctaves="3"
            seed="12"
            result="brushNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="brushNoise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="roughText"
          />

          {/* 2. Long horizontal dry-brush bristle grain */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022 0.24"
            numOctaves="3"
            seed="19"
            result="bristleNoise"
          />

          {/* 3. High-contrast alpha mask for visible dry-ink streaks */}
          <feColorMatrix
            in="bristleNoise"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 2.2 -0.65
            "
            result="bristleMask"
          />

          {/* 4. Apply dry-bristle gaps directly into the letter strokes */}
          <feComposite
            in="roughText"
            in2="bristleMask"
            operator="in"
            result="texturedText"
          />

          {/* 5. Composite: rich opaque body with crisp visible dry-bristle grain */}
          <feMerge>
            <feMergeNode in="roughText" opacity="0.35" />
            <feMergeNode in="texturedText" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
