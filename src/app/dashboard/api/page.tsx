import { KeyRound, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GenerateKeyForm } from "@/components/dashboard/generate-key-form";
import { requireUserId } from "@/lib/auth";
import { getUserApiKeys } from "@/lib/data/api-keys";
import { revokeApiKeyAction } from "./actions";
import { DashboardAdBanner } from "@/components/ads/dashboard-ad-banner";

export default async function ApiKeysPage() {
  const userId = await requireUserId();
  const keys = await getUserApiKeys(userId);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-surface">API & Documentation</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Build custom integrations and automate your link shortening workflow.
        </p>
      </div>

      <DashboardAdBanner variant="leaderboard" />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <GenerateKeyForm />
            </CardContent>
            {keys.length > 0 && (
              <div className="flex flex-col divide-y divide-outline-variant/10 border-t border-outline-variant/20">
                {keys.map((key) => (
                  <div key={key.id} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                      <KeyRound className="h-4 w-4 text-on-surface-variant" />
                      <div>
                        <p className="font-medium text-on-surface">{key.name}</p>
                        <p className="font-mono text-xs text-on-surface-variant">
                          sk_live_••••••••••••{key.keyPreview}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                      <span>
                        {key.lastUsedAt
                          ? `Last used ${key.lastUsedAt.toLocaleDateString()}`
                          : "Never used"}
                      </span>
                      <form action={revokeApiKeyAction.bind(null, key.id)}>
                        <button
                          type="submit"
                          className="rounded-md p-1.5 hover:bg-surface-container-low hover:text-error"
                          title="Revoke key"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card className="bg-inverse-surface p-5 text-inverse-on-surface">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-70">Quickstart</p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all font-mono text-xs leading-relaxed">
{`curl -X POST ${appUrl}/api/v1/shorten \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "long_url": "https://example.com/very-long-path"
  }'`}
          </pre>
          <p className="mt-3 text-xs opacity-70">
            The <code>/api/v1/shorten</code> endpoint isn&apos;t wired up to accept these keys yet — key
            issuance and revocation work today, but bearer-token authentication on the API route is the next
            step.
          </p>
        </Card>

        <DashboardAdBanner variant="half-page" className="mx-auto" />
      </div>
    </div>
  );
}
