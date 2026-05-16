import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Michael L. Hauge",
    template: "%s | Michael L. Hauge",
  },
  description: "AI training, implementation, and financial backing for ambitious companies in Southeast Asia.",
  metadataBase: new URL("https://hau.ge"),
  openGraph: {
    title: "Michael L. Hauge",
    description: "AI training, implementation, and financial backing for ambitious companies in Southeast Asia.",
    url: "https://hau.ge",
    siteName: "Michael L. Hauge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael L. Hauge",
    description: "AI training, implementation, and financial backing for ambitious companies in Southeast Asia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
