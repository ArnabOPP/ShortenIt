"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cancelSubscriptionAction } from "@/app/dashboard/billing/actions";

export function CancelButton() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleCancel() {
    if (!confirm("Cancel your Pro subscription? You'll be downgraded to the Free plan immediately.")) return;
    startTransition(async () => {
      const result = await cancelSubscriptionAction();
      if (!result.ok) {
        setError(result.error ?? "Could not cancel subscription.");
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Button variant="destructive" onClick={handleCancel} disabled={pending}>
        {pending ? "Cancelling…" : "Cancel Subscription"}
      </Button>
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
