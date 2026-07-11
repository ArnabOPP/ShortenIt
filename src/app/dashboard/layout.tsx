import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardWallpaperSkyscrapers } from "@/components/ads/dashboard-wallpaper-skyscrapers";
import { isClerkConfigured } from "@/lib/clerk";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardWallpaperSkyscrapers />
      <DashboardShell clerkEnabled={isClerkConfigured}>{children}</DashboardShell>
    </>
  );
}
