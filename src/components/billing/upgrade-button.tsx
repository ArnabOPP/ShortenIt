"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSubscriptionAction, verifyPaymentAction } from "@/app/dashboard/billing/actions";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function UpgradeButton({ userEmail }: { userEmail: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleUpgrade() {
    setLoading(true);
    setError(null);

    const result = await createSubscriptionAction();
    if (result.error || !result.subscriptionId || !result.keyId) {
      setError(result.error ?? "Something went wrong starting checkout.");
      setLoading(false);
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError("Couldn't load the payment form. Check your connection and try again.");
      setLoading(false);
      return;
    }

    const razorpayCheckout = new window.Razorpay({
      key: result.keyId,
      subscription_id: result.subscriptionId,
      name: "ShortenIt Pro",
      description: "Monthly Pro subscription",
      prefill: { email: userEmail },
      theme: { color: "#004ac6" },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_subscription_id: string;
        razorpay_signature: string;
      }) => {
        const verified = await verifyPaymentAction(response);
        if (verified.ok) {
          router.refresh();
        } else {
          setError(verified.error ?? "Payment could not be verified.");
        }
        setLoading(false);
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    });

    razorpayCheckout.open();
  }

  return (
    <div className="flex flex-col gap-2">
      <Button onClick={handleUpgrade} disabled={loading} size="lg">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Opening checkout…" : "Upgrade to Pro"}
      </Button>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
