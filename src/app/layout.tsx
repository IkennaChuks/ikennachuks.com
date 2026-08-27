import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Backdrop } from "@/components/ui/backdrop";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { profile } from "@/lib/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ikennachuks.com"),
  title: {
    default: `${profile.name}, ${profile.credential} - Cloud, Data & AI Engineering`,
    template: `%s - ${profile.name}`,
  },
  description:
    "Senior Manager for Cloud, Data & AI Engineering at PwC Canada. Ex-Google data engineering lead with 12+ years designing lakehouse, streaming and MLOps platforms across GCP, AWS and Azure.",
  keywords: [
    "Ikenna Chuks Okolo",
    "data engineering",
    "cloud architecture",
    "agentic AI",
    "GCP",
    "AWS",
    "Azure",
    "Databricks",
    "PwC Canada",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  openGraph: {
    title: `${profile.name}, ${profile.credential}`,
    description: profile.headline,
    type: "profile",
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ed",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body id="top" className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only print:hidden focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-white"
        >
          Skip to content
        </a>
        <Backdrop />
        <ScrollProgress />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
