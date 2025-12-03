import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/features/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'Tahoma', 'Arial', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Persian Theme Colors
        'persian-red': 'var(--persian-red)',
        'deep-red': 'var(--deep-red)',
        'burgundy': 'var(--burgundy)',
        'gold': 'var(--gold)',
        'light-gold': 'var(--light-gold)',
        'tile-blue': 'var(--tile-blue)',
        'tile-turquoise': 'var(--tile-turquoise)',
        'cream': 'var(--cream)',

        // Shadcn UI Colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'rotate-tiles': 'rotate-tiles 60s linear infinite',
        'shimmer': 'shimmer 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'counter-glow': 'counter-glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
      keyframes: {
        'rotate-tiles': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'shimmer': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
        'glow': {
          '0%': {
            boxShadow: '0 0 5px var(--gold), 0 0 10px var(--gold)'
          },
          '100%': {
            boxShadow: '0 0 10px var(--gold), 0 0 20px var(--gold), 0 0 30px var(--gold)'
          },
        },
        'counter-glow': {
          '0%': {
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          },
          '100%': {
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px var(--gold)'
          },
        },
        'fadeIn': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'slideInRight': {
          'from': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)'
          },
        },
      },
    },
  },
}

export default config