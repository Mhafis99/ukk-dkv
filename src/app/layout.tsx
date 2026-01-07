import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistem Manajemen Uji Kompetensi Keahlian",
  description: "Sistem manajemen uji kompetensi keahlian dengan Next.js 15 dan MySQL",
  keywords: ["Uji Kompetensi", "Manajemen", "Next.js", "TypeScript", "MySQL", "Pendidikan"],
  authors: [{ name: "Tim Pengembang" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Sistem Manajemen Uji Kompetensi Keahlian",
    description: "Sistem manajemen uji kompetensi keahlian untuk pendidikan vokasi",
    url: "http://localhost:3000",
    siteName: "Manajemen Uji Kompetensi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistem Manajemen Uji Kompetensi Keahlian",
    description: "Sistem manajemen uji kompetensi keahlian",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
