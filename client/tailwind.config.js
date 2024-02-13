/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pharlap: "#AC7D88",
        yellowish: "#FDF0D1",
        pomelo: "#85586F",
        lips: "#643843",
        romance: "#985566",
      },
    },
  },
  plugins: [],
};
