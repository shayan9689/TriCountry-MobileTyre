/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        page: {
          DEFAULT: "#0A1628",
          card: "#0E1F38",
          elevated: "#111D33",
        },
        navy: {
          950: "#050A14",
          900: "#0B1221",
          850: "#0B172A",
          800: "#0E1A2E",
          700: "#111D33",
          600: "#152542",
        },
        brand: {
          lemon: "#FFE545",
          lemonHot: "#FFD400",
          blue: "#3B82F6",
          vivid: "#2B92FB",
        },
      },
      fontFamily: {
        display: ["Bebas Neue", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "cta-glow": "0 8px 28px rgba(255, 229, 69, 0.35)",
        "card-soft": "0 12px 40px rgba(0, 0, 0, 0.45)",
      },
    },
  },
  plugins: [],
};
