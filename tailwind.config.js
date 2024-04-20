import daisyui from "daisyui";
import tailwindScrollbar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseDraw: {
          "0%": { strokeDashoffset: 0 },
          "100%": { strokeDashoffset: 300 },
        },
      },
    },
  },
  plugins: [daisyui, tailwindScrollbar({ nocompatible: true })],
  daisyui: {
    themes: ["bumblebee", "dim"],
  },
};
