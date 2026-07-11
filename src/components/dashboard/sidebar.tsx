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
  CreditCard,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/links", label: "My Links", icon: LinkIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/qr-codes", label: "QR Codes", icon: QrCode },
  { href: "/dashboard/domains", label: "Custom Domains", icon: Globe },
  { href: "/dashboard/api", label: "API", icon: Braces },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  clerkEnabled,
  open,
  onClose,
}: {
  clerkEnabled: boolean;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-inverse-surface/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-dvh w-[260px] shrink-0 flex-col border-r border-outline-variant/30 bg-surface-container-lowest px-4 py-6 transition-transform duration-200 md:sticky md:top-0 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8 flex items-center justify-between px-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-bold text-primary"
            onClick={onClose}
          >
            <LinkIcon className="h-5 w-5" strokeWidth={2.5} />
            ShortenIt Pro
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-on-surface-variant hover:bg-surface-container-low md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
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
          onClick={onClose}
          className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-container"
        >
          <Plus className="h-4 w-4" />
          Create New Link
        </Link>

        <div className="flex flex-col gap-1 border-t border-outline-variant/20 pt-4">
          <Link
            href="/contact"
            onClick={onClose}
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
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
