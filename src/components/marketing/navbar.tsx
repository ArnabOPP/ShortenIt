import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { isClerkConfigured } from "@/lib/clerk";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export async function Navbar() {
  const isSignedIn = isClerkConfigured && Boolean((await auth()).userId);

  return (
    <header className="border-b border-outline-variant/30 bg-surface-container-lowest/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <LinkIcon className="h-5 w-5" strokeWidth={2.5} />
          ShortenIt
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-on-surface-variant md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-on-surface">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-on-surface-variant hover:text-on-surface"
              >
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-on-surface-variant hover:text-on-surface">
                Login
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
