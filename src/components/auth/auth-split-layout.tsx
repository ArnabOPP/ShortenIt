import Link from "next/link";
import { Link as LinkIcon, Gauge, Radar } from "lucide-react";

export function AuthSplitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      <div className="hidden flex-col justify-center gap-8 bg-surface-container-low px-12 py-16 md:flex">
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
      </div>
      <div className="flex items-center justify-center bg-background px-6 py-16">
        {children}
      </div>
    </div>
  );
}
