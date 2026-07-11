import { InlineAdBanner } from "@/components/ads/inline-ad-banner";
import { requireUserId } from "@/lib/auth";
import { getBillingInfo } from "@/lib/data/billing";

/**
 * Dashboard pages promise Pro subscribers a "zero-ad experience" (see the
 * upgrade card on the dashboard home page) — so unlike marketing pages,
 * these ads are gated to the Free plan only.
 */
export async function DashboardAdBanner(props: React.ComponentProps<typeof InlineAdBanner>) {
  const userId = await requireUserId();
  const { plan } = await getBillingInfo(userId);
  if (plan === "pro") return null;
  return <InlineAdBanner {...props} />;
}
