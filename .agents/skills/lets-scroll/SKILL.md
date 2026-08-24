---
name: lets-scroll
description: >
  Build immersive scroll-driven, cinematic storytelling experiences and scroll-scrubbed
  web interfaces for any product, brand, or architecture. Turns standard page scrolls into
  continuous timeline journeys (fly-throughs, isometric walk-throughs, interactive stage
  transitions, and visual scene sequences) with NO jarring cuts. Use when designing
  scroll-animated landing pages, interactive product demos, animated tech diagrams, or
  scrub-driven web applications using Anime.js, Canvas, or CSS timeline drivers.
allowed-tools: run_command, view_file, write_to_file, replace_file_content
---

# lets-scroll Skill for Antigravity

The `lets-scroll` skill defines a methodology and architecture for building **scroll-driven cinematic storytelling pages and interactive scrub engines**.

Instead of treating page scroll as simple document navigation, `lets-scroll` transforms the scrollbar into a **time and camera driver**. As the user scrolls:
1. Progress is computed smoothly (0.0 to 1.0) along a pinned "stage".
2. Active scenes crossfade or transform without visible cuts.
3. Dynamic telemetry, interactive consoles, and floating annotations respond in real-time.

---

## 🏛️ Core Principles

### 1. The Pinned Stage (Sticky Viewport)
A parent container with height proportional to scroll length (e.g. `min-h-[300vh]` to `min-h-[500vh]`) contains a `sticky top-0 h-screen` viewport. The user scrolls naturally through standard page mechanics while the visual camera remains pinned in focus.

```tsx
<div ref={containerRef} className="relative min-h-[350vh]">
  <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
    {/* Dynamic scene layers driven by scrollProgress */}
  </div>
</div>
```

### 2. Normalized Progress & Scene Windows
Progress $P \in [0, 1]$ is calculated based on container position relative to viewport:
$$P = \frac{-rect.top}{rect.height - window.innerHeight}$$

Each scene $i$ of $N$ scenes owns a normalized active window:
- Scene 1: $P \in [0.00, 0.25]$
- Scene 2: $P \in [0.25, 0.50]$
- Scene 3: $P \in [0.50, 0.75]$
- Scene 4: $P \in [0.75, 1.00]$

### 3. Smooth Tweening with Anime.js / RequestAnimationFrame
Avoid janky scroll lag by using `requestAnimationFrame` with lerp (linear interpolation) or Anime.js timeline scrubbing:
```ts
currentProgress += (targetProgress - currentProgress) * 0.1
```

### 4. Seamless Transitions & Frame Consistency
Adjacent scenes must share visual continuity (matching background tones, persistent anchor UI elements, and continuous progress rails).

---

## 🎨 Best Practices for Landing Pages
1. **Always provide interactive fallbacks**: Allow users to click scene pills or step markers directly if they prefer clicking over continuous scrolling.
2. **Progress Rail**: Display a vertical or horizontal progress gauge showing the current story beat and remaining steps.
3. **No Unwanted Scroll Hijacking**: Never lock native browser scroll physics (`overflow: hidden` on body or aggressive wheel event prevention); always map standard page scroll coordinates to stage progress.
4. **Performance**: Use GPU-accelerated CSS properties (`transform`, `opacity`, `filter`) and throttle state emissions via `requestAnimationFrame`.
