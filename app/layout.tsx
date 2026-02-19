import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portofolio Saya",
  description: "Dibuat dengan Next.js dan Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. Pasang komponennya di sini (sebelum children) */}
        <NextTopLoader
          color="#2299DD" /* Warna loading bar (bisa ganti sesuka hati) */
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false} /* False biar gak ada bunderan muter di pojok kanan */
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
