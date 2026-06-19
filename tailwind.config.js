/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        chrome: "var(--chrome)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        "muted-light": "var(--muted-light)",
        border: "var(--border)",
        "border-light": "var(--border-light)",
        intent: {
          high: "var(--intent-high)",
          "high-bg": "var(--intent-high-bg)",
          medium: "var(--intent-medium)",
          "medium-bg": "var(--intent-medium-bg)",
          low: "var(--intent-low)",
          "low-bg": "var(--intent-low-bg)",
        }
      },
      fontFamily: {
        // SF Pro emulation
        sans: [
          "-apple-system", 
          "BlinkMacSystemFont", 
          "Segoe UI", 
          "Roboto", 
          "Helvetica", 
          "Arial", 
          "sans-serif", 
          "Apple Color Emoji", 
          "Segoe UI Emoji", 
          "Segoe UI Symbol"
        ],
        // Söhne / Neue Haas Grotesk emulation
        display: [
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        mono: [
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.04)",
        float: "0 8px 32px rgba(0,0,0,0.08)",
        "float-heavy": "0 16px 48px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
}
