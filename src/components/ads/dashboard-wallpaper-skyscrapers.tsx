import { WallpaperSkyscrapers } from "@/components/ads/wallpaper-skyscrapers";
import { requireUserId } from "@/lib/auth";
import { getBillingInfo } from "@/lib/data/billing";

// Same "ad-free Pro" gating as DashboardAdBanner.
export async function DashboardWallpaperSkyscrapers() {
  const userId = await requireUserId();
  const { plan } = await getBillingInfo(userId);
  if (plan === "pro") return null;
  return <WallpaperSkyscrapers />;
}
