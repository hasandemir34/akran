import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Akran | Akran Koçluğu & Akademik Not Paylaşım Platformu",
  description:
    "1. sınıf öğrencileri ile tecrübeli 3. sınıf akran koçlarını eşleştiren; ders notları, sınav tavsiyeleri ve akademik yol haritalarıyla hibrit öğrenci dayanışması sunan modern web platformu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-slate-50/50 text-slate-900 antialiased flex flex-col`}>
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
