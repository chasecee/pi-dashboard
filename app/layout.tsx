import type { Metadata, Viewport } from "next";
import { Anonymous_Pro } from "next/font/google";
import "./globals.css";

const inter = Anonymous_Pro({
  style: ["normal", "italic"],
  weight: "700",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Dashboard",
  },
  description:
    "A minimalist dashboard featuring time, date, and inspirational quotes",
  keywords: ["dashboard", "clock", "quotes", "minimalist", "pi dashboard"],
  authors: [{ name: "Chase" }],
  creator: "Chase",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Dashboard",
    description:
      "A minimalist dashboard featuring time, date, and inspirational quotes",
    siteName: "Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard",
    description:
      "A minimalist dashboard featuring time, date, and inspirational quotes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
