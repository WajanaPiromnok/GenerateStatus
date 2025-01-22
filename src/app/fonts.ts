import localFont from "next/font/local";
import { Literata } from "next/font/google";

export const literata = Literata({ subsets: ["latin"] });

export const LineSeed = localFont({
  src: [
    {
      path: "../fonts/LINESeedSansTH_W_Rg.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/LINESeedSansTH_W_Bd.woff",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["system-ui", "arial"],
  // Optional: define a variable name for CSS
  variable: "--font-custom",
});
