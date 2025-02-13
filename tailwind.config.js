import primevue from "tailwindcss-primeui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,ts}",
    "./fragments/**/*.{vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {
      screens: {
        print: { raw: "print" },
        screen: { raw: "screen" },
      },
      animation: {
        "cursor-blink": "blink 1.5s steps(2) infinite",
        float: "float 16s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%": {
            opacity: 0,
          },
        },
        float: {
          "0%,100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
      },
    },
  },
  plugins: [primevue],
};
