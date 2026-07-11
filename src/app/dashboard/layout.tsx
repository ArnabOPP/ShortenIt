import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { isClerkConfigured } from "@/lib/clerk";
import { requireUserId } from "@/lib/auth";
import { getBillingInfo } from "@/lib/data/billing";

// Ads are gated to Free-plan users only, honoring the ad-free Pro promise.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const userId = await requireUserId();
  const { plan } = await getBillingInfo(userId);

  return (
    <DashboardShell clerkEnabled={isClerkConfigured} showAds={plan !== "pro"}>
      {children}
    </DashboardShell>
  );
}
