"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroShortenForm() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    router.push(`/sign-up?target=${encodeURIComponent(url)}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl flex-col gap-3 rounded-2xl bg-surface-container-lowest p-2 shadow-card sm:flex-row"
    >
      <div className="flex flex-1 items-center gap-2 px-3">
        <LinkIcon className="h-4 w-4 shrink-0 text-on-surface-variant" />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://your-long-url-goes-here.com/very-long-path"
          className="h-11 w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none"
        />
      </div>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Shorten Now
      </Button>
    </form>
  );
}
