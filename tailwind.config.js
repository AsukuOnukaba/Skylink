/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: {
          300: "var(--sky-300)",
          500: "var(--sky-500)",
          700: "var(--sky-700)",
        },
        navy: {
          800: "var(--navy-800)",
          950: "var(--navy-950)",
        },
        royal: "var(--royal)",
        electric: "var(--electric)",
        cyan: "var(--cyan)",
        ice: "var(--ice)",
        slate: {
          100: "var(--slate-100)",
          200: "var(--slate-200)",
          500: "var(--slate-500)",
          700: "var(--slate-700)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      maxWidth: {
        container: "var(--container-max)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
      },
    },
  },
  plugins: [],
};
