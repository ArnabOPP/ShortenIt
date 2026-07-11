import { UserProfile } from "@clerk/nextjs";
import { clerkAppearance } from "@/components/auth/clerk-appearance";
import { ClerkNotConfigured } from "@/components/auth/clerk-not-configured";
import { isClerkConfigured } from "@/lib/clerk";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-surface">Settings</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Manage your profile, security, and connected accounts.
        </p>
      </div>

      {isClerkConfigured ? (
        <UserProfile
          appearance={{
            ...clerkAppearance,
            elements: {
              ...clerkAppearance.elements,
              rootBox: "w-full",
              card: "shadow-none border border-outline-variant/30 rounded-2xl w-full",
            },
          }}
        />
      ) : (
        <ClerkNotConfigured mode="login" />
      )}
    </div>
  );
}
