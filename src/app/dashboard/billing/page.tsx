import { CheckCircle2, CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UpgradeButton } from "@/components/billing/upgrade-button";
import { CancelButton } from "@/components/billing/cancel-button";
import { requireUserId, getDisplayUser } from "@/lib/auth";
import { getBillingInfo } from "@/lib/data/billing";
import { isRazorpayConfigured } from "@/lib/razorpay";

export default async function BillingPage() {
  const userId = await requireUserId();
  const [billing, user] = await Promise.all([getBillingInfo(userId), getDisplayUser()]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-surface">Billing</h1>
        <p className="mt-1 text-sm text-on-surface-variant">Manage your plan and subscription.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span
                className={
                  billing.plan === "pro"
                    ? "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary"
                    : "flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant"
                }
              >
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-semibold text-on-surface">
                  {billing.plan === "pro" ? "Pro — $19/mo" : "Free"}
                </p>
                <p className="text-sm text-on-surface-variant">
                  {billing.plan === "pro"
                    ? `Status: ${billing.razorpaySubscriptionStatus ?? "active"}`
                    : "50 links / month, basic analytics"}
                </p>
              </div>
            </div>

            {!isRazorpayConfigured ? (
              <p className="rounded-lg bg-surface-container-low px-4 py-2 text-sm text-on-surface-variant">
                Payments aren&apos;t configured yet — add Razorpay keys to enable upgrades.
              </p>
            ) : billing.plan === "pro" ? (
              <CancelButton />
            ) : (
              <UpgradeButton userEmail={user.email} />
            )}
          </div>
        </CardContent>
      </Card>

      {billing.plan === "free" && (
        <Card>
          <CardHeader>
            <CardTitle>What you get with Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3 text-sm text-on-surface-variant">
              {[
                "Unlimited links (Free plan is capped at 50/month)",
                "Real-time advanced analytics",
                "Custom domains (up to 3)",
                "API access (100 req/s)",
                "Ad-free redirects",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
