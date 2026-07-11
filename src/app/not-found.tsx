import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high">
        <LinkIcon className="h-6 w-6 text-on-surface-variant" />
      </div>
      <p className="font-display text-sm font-semibold uppercase tracking-wide text-primary">404</p>
      <h1 className="font-display text-2xl font-bold text-on-surface">Page not found</h1>
      <p className="text-sm text-on-surface-variant">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/">
        <Button variant="secondary">Back to Home</Button>
      </Link>
    </div>
  );
}
