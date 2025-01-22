import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'new-pink': '#FA67A0',
      },
      screens: {
        iphonese: "375px",
        iphone12pro: "390px",
        iphonexr: "414px",
        iphone14promax: "430px",
        ipadmini: "768px",
        ipadair: "820px",
        ipadpro: "1024px",        
        samsungs8plus: "360px",
        samsungzfold: "344px",
        pixel7: "412px",
        surfaceduo: "540px",
        zenbookfold: "853px",
        surfacepro7: "912px"
      },
    },
  },
  plugins: [],
} satisfies Config;
