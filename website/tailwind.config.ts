import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'paper-off-white': '#faf8f5',
        'paper-cream': '#fdfbf7',
        'paper-surface': '#ffffff',
        'pencil-black': '#1e293b',
        'ink-blue': '#1a3a5f',
        'ink-navy': '#0f2744',
        'ink-hover': '#244975',
        'highlighter-yellow': '#fef08a',
        'highlighter-gold': '#fde047',
        'highlighter-mint': '#dcfce7',
        'highlighter-rose': '#fee2e2',
        'highlighter-sky': '#dbeafe',
        'highlighter-purple': '#f3e8ff',
        'highlighter-orange': '#ffedd5',
      },
      fontFamily: {
        hand: ['Patrick Hand', 'Caveat', 'cursive', 'sans-serif'],
        caveat: ['Caveat', 'cursive', 'sans-serif'],
        cabin: ['Cabin Sketch', 'cursive', 'sans-serif'],
        gochi: ['Gochi Hand', 'cursive', 'sans-serif'],
        kalam: ['Kalam', 'cursive', 'sans-serif'],
        gaegu: ['Gaegu', 'cursive', 'sans-serif'],
        patrick: ['Patrick Hand', 'cursive', 'sans-serif'],
        indie: ['Indie Flower', 'cursive', 'sans-serif'],
        shadows: ['Shadows Into Light Two', 'cursive', 'sans-serif'],
        marker: ['Permanent Marker', 'cursive', 'sans-serif'],
        gloria: ['Gloria Hallelujah', 'cursive', 'sans-serif'],
        reenie: ['Reenie Beanie', 'cursive', 'sans-serif'],
        covered: ['Covered By Your Grace', 'cursive', 'sans-serif'],
        sketch: ['Architects Daughter', 'cursive', 'sans-serif'],
        architects: ['Architects Daughter', 'cursive', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Outfit', 'system-ui', 'sans-serif'],
        bricolage: ['Bricolage Grotesque', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'scribely-sm': '2px 2px 0px #1e293b',
        'scribely': '4px 4px 0px #1e293b',
        'scribely-lg': '6px 6px 0px #1e293b',
        'scribely-xl': '8px 8px 0px #1e293b',
      },
      backgroundImage: {
        'notebook-dots': 'radial-gradient(#1e293b 1px, transparent 1px)',
        'notebook-lines': 'linear-gradient(rgba(30,41,59,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

export default config
