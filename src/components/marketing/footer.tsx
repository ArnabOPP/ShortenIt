import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 bg-surface-container-lowest">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-on-surface-variant md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-display font-bold text-primary">ShortenIt</span>
          <p className="mt-1">© {new Date().getFullYear()} ShortenIt Inc. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/privacy" className="hover:text-on-surface">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-on-surface">Terms of Service</Link>
          <Link href="/api-status" className="hover:text-on-surface">API Status</Link>
          <Link href="/contact" className="hover:text-on-surface">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
