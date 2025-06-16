import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Dhruv Parmar",
  description: "NextJS Developer with great passion and experties",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
