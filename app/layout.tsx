import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LifeVault | Your Health Data Swiss Bank",
  description: "Store, encrypt, and monetize your health data. Take ownership of your biological assets.",
  keywords: ["health data", "Web3", "data vault", "health wallet", "data monetization"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground cursor-none`}
      >
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Noise Texture Overlay */}
        <div className="noise-overlay" />
        
        {/* Animated Background */}
        <div className="fixed inset-0 animated-gradient -z-10" />
        
        {/* Grid Background */}
        <div className="fixed inset-0 grid-bg -z-10" />
        
        {/* Radial Glow Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-secondary/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-3s' }} />
        </div>
        
        {children}
      </body>
    </html>
  );
}
