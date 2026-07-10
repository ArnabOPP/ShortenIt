import Link from "next/link";
import { LinkIcon as BrokenLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExpiredPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-error-container">
        <BrokenLink className="h-6 w-6 text-error" />
      </div>
      <h1 className="font-display text-2xl font-bold text-on-surface">This link has expired</h1>
      <p className="text-sm text-on-surface-variant">
        The short link you followed is no longer active, was disabled by its owner, or never existed.
      </p>
      <Link href="/">
        <Button variant="secondary">Create your own short link</Button>
      </Link>

      <div className="mt-8 w-full rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-on-surface-variant">Advertisement</p>
        <div className="flex h-24 items-center justify-center rounded-xl bg-surface-container-low text-sm text-on-surface-variant">
          Ad slot
        </div>
      </div>
    </div>
  );
}
