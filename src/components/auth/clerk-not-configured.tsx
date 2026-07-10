export function ClerkNotConfigured({ mode }: { mode: "login" | "sign-up" }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-8 text-center">
      <h2 className="font-display text-xl font-semibold text-on-surface">
        Auth not configured yet
      </h2>
      <p className="mt-2 text-sm text-on-surface-variant">
        Add <code className="rounded bg-surface-container px-1.5 py-0.5">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{" "}
        and <code className="rounded bg-surface-container px-1.5 py-0.5">CLERK_SECRET_KEY</code> to{" "}
        <code className="rounded bg-surface-container px-1.5 py-0.5">.env.local</code> to enable the{" "}
        {mode === "login" ? "login" : "sign-up"} form.
      </p>
    </div>
  );
}
