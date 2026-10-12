import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "24px",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E8E3DD",
        input: "#E8E3DD",
        ring: "#202020",
        background: "#FFFFFF",
        foreground: "#202020",
        ivory: "#F8F6F2",
        charcoal: "#202020",
        beige: "#EAE1D7",
        taupe: "#8C8177",
        'subtle-border': "#E8E3DD",
        'cta-black': "#171717",
        'accent-yellow': "#FDE047",
        'accent-soft': "#F5EFE6",
        primary: {
          DEFAULT: "#171717",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F8F6F2",
          foreground: "#202020",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F4EFEA",
          foreground: "#736B63",
        },
        accent: {
          DEFAULT: "#EAE1D7",
          foreground: "#202020",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#202020",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#202020",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
        full: "9999px",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config