import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "backgroundImage": {
        "clash-pattern": "url('/background.png')"
      }
    },
  },
  plugins: [],
} satisfies Config;
