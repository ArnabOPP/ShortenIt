import Link from "next/link";
import Image from "next/image";
import { Link as LinkIcon, Gauge, Radar } from "lucide-react";
import { InlineAdBanner } from "@/components/ads/inline-ad-banner";

export function AuthSplitLayout({
  children,
  imageSrc,
  imageCaption,
}: {
  children: React.ReactNode;
  imageSrc: string;
  imageCaption: string;
}) {
  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      <div className="hidden flex-col justify-center gap-6 bg-surface-container-low px-12 py-10 md:flex">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <LinkIcon className="h-5 w-5" strokeWidth={2.5} />
          ShortenIt
        </Link>
        <h1 className="max-w-md font-display text-4xl font-bold leading-tight text-on-surface">
          Power up your <span className="text-primary">performance.</span>
        </h1>
        <p className="max-w-sm text-on-surface-variant">
          Join marketers shortening millions of links and maximizing their click-through rates.
        </p>
        <div className="flex gap-4">
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-primary p-4 text-on-primary">
            <Gauge className="h-5 w-5" />
            <div>
              <p className="text-sm font-semibold">Fast Routing</p>
              <p className="text-xs opacity-80">Instant redirection</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-3 rounded-xl bg-secondary-container p-4 text-on-secondary-container">
            <Radar className="h-5 w-5" />
            <div>
              <p className="text-sm font-semibold">Live Data</p>
              <p className="text-xs opacity-80">Real-time tracking</p>
            </div>
          </div>
        </div>
        <div className="relative h-48 overflow-hidden rounded-xl border border-outline-variant/30">
          <Image src={imageSrc} alt={imageCaption} fill sizes="400px" className="object-cover" />
          <span className="absolute bottom-3 left-3 rounded-md bg-inverse-surface/80 px-2 py-1 text-xs font-medium text-inverse-on-surface">
            {imageCaption}
          </span>
        </div>
        <InlineAdBanner variant="full-banner" />
        <InlineAdBanner variant="rectangle" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 bg-background px-6 py-10">
        {children}
        <InlineAdBanner variant="rectangle" />
        <InlineAdBanner variant="full-banner" />
      </div>
    </div>
  );
}
