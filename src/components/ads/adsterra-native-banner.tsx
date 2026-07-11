"use client";

import Script from "next/script";
import { ADSTERRA } from "@/lib/ads/adsterra";

export function AdsterraNativeBanner() {
  return (
    <div>
      <div id={ADSTERRA.nativeBannerContainerId} />
      <Script src={ADSTERRA.nativeBannerSrc} strategy="afterInteractive" data-cfasync="false" />
    </div>
  );
}
