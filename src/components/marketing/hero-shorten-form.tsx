"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Link as LinkIcon, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { shortenUrlAction, type ShortenState } from "@/app/actions/shorten";

const initialState: ShortenState = {};

function ShortenedResult({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const shortUrl =
    (typeof window !== "undefined" ? window.location.origin : "") + "/" + slug;

  async function copy() {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-surface-container-lowest p-4 shadow-card sm:flex-row sm:items-center">
      <div className="flex flex-1 items-center gap-2 overflow-hidden">
        <span className="rounded-full bg-secondary-container p-1.5 text-on-secondary-container">
          <Check className="h-4 w-4" />
        </span>
        <span className="truncate font-display font-semibold text-primary">{shortUrl}</span>
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="secondary" onClick={copy}>
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Link href="/sign-up">
          <Button type="button">Track clicks & earn</Button>
        </Link>
      </div>
    </div>
  );
}

export function HeroShortenForm() {
  const [state, formAction, pending] = useActionState(shortenUrlAction, initialState);

  if (state.slug) {
    return <ShortenedResult slug={state.slug} />;
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <form
        action={formAction}
        className="flex w-full flex-col gap-3 rounded-2xl bg-surface-container-lowest p-2 shadow-card sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-2 px-3">
          <LinkIcon className="h-4 w-4 shrink-0 text-on-surface-variant" />
          <input
            name="targetUrl"
            placeholder="https://your-long-url-goes-here.com/very-long-path"
            className="h-11 w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none"
          />
        </div>
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
          {pending ? "Shortening…" : "Shorten Now"}
        </Button>
      </form>
      {state.error && <p className="px-3 text-sm text-error">{state.error}</p>}
    </div>
  );
}
