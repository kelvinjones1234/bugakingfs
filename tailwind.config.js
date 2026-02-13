/** @type {import('tailwindcss').Config} */
module.exports = {
  // Dark mode is removed/disabled
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        border: "var(--border)",
      },
      spacing: {
        // Now you can use: p-section, m-element, gap-section
        section: "var(--spacing-section)", 
        element: "var(--spacing-element)",
      },
      borderRadius: {
        brand: "var(--radius-md)", // Use rounded-brand for standard cards
        "brand-lg": "var(--radius-lg)", // Use rounded-brand-lg for hero sections
      },
      fontFamily: {
        sans: ["Epilogue", "sans-serif"],
        display: ["Epilogue", "sans-serif"],
      },
    },
  },
  plugins: [],
};