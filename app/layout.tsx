import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Michael Hauge",
    template: "%s | Michael Hauge",
  },
  description: "AI training and transformation for senior leadership teams.",
  metadataBase: new URL("https://hau.ge"),
  openGraph: {
    title: "Michael Hauge",
    description: "AI training and transformation for senior leadership teams.",
    url: "https://hau.ge",
    siteName: "Michael Hauge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Hauge",
    description: "AI training and transformation for senior leadership teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
