import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk";
import { AdsterraSocialBar } from "@/components/ads/adsterra-social-bar";
import { AdsterraPopunder } from "@/components/ads/adsterra-popunder";
import "./globals.css";

const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://shortenitpro.vercel.app";
const title = "ShortenIt | Shrink Links. Grow Revenue.";
const description =
  "The link shortener that pays you. Turn every click into a high-conversion financial opportunity with precision analytics.";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: { default: title, template: "%s" },
  description,
  openGraph: {
    title,
    description,
    url: appUrl,
    siteName: "ShortenIt",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface font-body">
        <AdsterraSocialBar />
        <AdsterraPopunder />
        {children}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isClerkConfigured) {
    return <Shell>{children}</Shell>;
  }

  return (
    <ClerkProvider>
      <Shell>{children}</Shell>
    </ClerkProvider>
  );
}
