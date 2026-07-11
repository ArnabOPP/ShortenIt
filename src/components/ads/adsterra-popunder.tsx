"use client";

import Script from "next/script";
import { ADSTERRA } from "@/lib/ads/adsterra";

// Popunder listens for the visitor's next click anywhere on the page, so it
// must run as a real page script (next/script), not inside an iframe.
export function AdsterraPopunder() {
  return <Script src={ADSTERRA.popunderSrc} strategy="afterInteractive" />;
}
