import type { Metadata, Viewport } from "next";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { asset } from "@/lib/utils";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

// A static host cannot send security headers, so the policy is a meta tag.
// 'unsafe-inline' is required for Next.js hydration scripts and the theme
// bootstrap below; frame-ancestors is not supported in meta and is omitted.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data:",
  "connect-src 'self' https://formsubmit.co",
  "form-action 'self' https://formsubmit.co",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests"
].join("; ");

// Runs before paint so a saved theme choice does not flash the other palette.
const themeBootstrap =
  "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`
  },
  description: site.description,
  keywords: [
    "Aditya Shah",
    "Financial Engineering",
    "NYU Tandon",
    "Risk Management",
    "Value at Risk",
    "Derivatives",
    "Quantitative Finance",
    "IAQF",
    "Reinforcement Learning",
    "LLMs",
    "Agentic AI",
    "Traxys"
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    siteName: site.name
  },
  twitter: {
    card: "summary",
    title: `${site.name} · ${site.tagline}`,
    description: site.description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  icons: {
    icon: [{ url: asset("/favicon.svg"), type: "image/svg+xml" }]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#151412" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="bg-paper text-ink">{children}</body>
    </html>
  );
}
