"use client";

import Script from "next/script";
import { ADSTERRA } from "@/lib/ads/adsterra";

// Social Bar attaches a fixed-position element to the top-level document, so
// it must run as a real page script (next/script), not inside an iframe.
export function AdsterraSocialBar() {
  return <Script src={ADSTERRA.socialBarSrc} strategy="afterInteractive" />;
}
