import type { Metadata } from "next";
import { Bodoni_Moda, Figtree } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sonder — Remember your days",
  description: "A year from now, you'll be glad you started.",
  icons: {
    icon: "/icon.webp",
    apple: "/icon.webp",
  },
  openGraph: {
    title: "Sonder — Remember your days",
    description: "A year from now, you'll be glad you started.",
    url: "https://sonderdaily.app",
    siteName: "Sonder",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sonder — Remember your days",
    description: "A year from now, you'll be glad you started.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
