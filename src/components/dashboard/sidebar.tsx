"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import {
  LayoutGrid,
  LinkIcon,
  BarChart3,
  QrCode,
  Globe,
  Braces,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/links", label: "My Links", icon: LinkIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/qr-codes", label: "QR Codes", icon: QrCode },
  { href: "/dashboard/domains", label: "Custom Domains", icon: Globe },
  { href: "/dashboard/api", label: "API", icon: Braces },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ clerkEnabled }: { clerkEnabled: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-dvh w-[260px] shrink-0 flex-col border-r border-outline-variant/30 bg-surface-container-lowest px-4 py-6">
      <Link href="/" className="mb-8 flex items-center gap-2 px-2 font-display text-lg font-bold text-primary">
        <LinkIcon className="h-5 w-5" strokeWidth={2.5} />
        ShortenIt Pro
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/dashboard/links/new"
        className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-container"
      >
        <Plus className="h-4 w-4" />
        Create New Link
      </Link>

      <div className="flex flex-col gap-1 border-t border-outline-variant/20 pt-4">
        <Link
          href="/contact"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low"
        >
          <HelpCircle className="h-4 w-4" />
          Help Center
        </Link>
        {clerkEnabled ? (
          <SignOutButton redirectUrl="/">
            <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-on-surface-variant hover:bg-surface-container-low">
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </SignOutButton>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Link>
        )}
      </div>
    </aside>
  );
}
