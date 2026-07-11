import { Globe, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AddDomainForm } from "@/components/dashboard/add-domain-form";
import { requireUserId } from "@/lib/auth";
import { getUserDomains } from "@/lib/data/domains";
import { removeDomainAction } from "./actions";
import { DashboardAdBanner } from "@/components/ads/dashboard-ad-banner";

export default async function DomainsPage() {
  const userId = await requireUserId();
  const domains = await getUserDomains(userId);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-surface">Custom Domains</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Connect your own brand to ShortenIt with white-labeled short URLs.
        </p>
      </div>

      <DashboardAdBanner variant="full-banner" />

      <Card>
        <CardHeader>
          <CardTitle>Connected Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <AddDomainForm />
        </CardContent>
        {domains.length > 0 && (
          <div className="flex flex-col divide-y divide-outline-variant/10 border-t border-outline-variant/20">
            {domains.map((domain) => (
              <div key={domain.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-on-surface-variant" />
                  <div>
                    <p className="font-medium text-on-surface">{domain.domain}</p>
                    <p className="text-xs text-on-surface-variant">
                      Added{" "}
                      {domain.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={
                      domain.verified
                        ? "rounded-full bg-secondary-container px-2.5 py-1 text-xs font-medium text-on-secondary-container"
                        : "rounded-full bg-surface-container-high px-2.5 py-1 text-xs font-medium text-on-surface-variant"
                    }
                  >
                    {domain.verified ? "Verified" : "Pending DNS"}
                  </span>
                  <form action={removeDomainAction.bind(null, domain.id)}>
                    <button
                      type="submit"
                      className="rounded-md p-1.5 text-on-surface-variant hover:bg-surface-container-low hover:text-error"
                      title="Remove domain"
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

      <Card>
        <CardHeader>
          <CardTitle>DNS Configuration Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-4 text-sm text-on-surface-variant">
            <li>
              <span className="font-medium text-on-surface">1. Log in to your DNS provider</span> — access
              the DNS management console for the domain you want to connect (e.g. GoDaddy, Cloudflare,
              Namecheap).
            </li>
            <li>
              <span className="font-medium text-on-surface">2. Add a CNAME record</span> pointing your
              subdomain (e.g. <code className="rounded bg-surface-container-low px-1.5 py-0.5">links</code>)
              at{" "}
              <code className="rounded bg-surface-container-low px-1.5 py-0.5">
                {process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") ?? "shortenitpro.vercel.app"}
              </code>
              .
            </li>
            <li>
              <span className="font-medium text-on-surface">3. Wait for propagation</span> — DNS changes can
              take up to 48 hours, though they usually resolve within minutes.
            </li>
          </ol>
          <p className="mt-4 text-xs text-on-surface-variant">
            Automated verification and SSL provisioning aren&apos;t wired up yet — domains you add here are
            tracked as &quot;Pending DNS&quot; until that&apos;s built.
          </p>
        </CardContent>
      </Card>

      <DashboardAdBanner variant="rectangle" className="mx-auto max-w-sm" />
    </div>
  );
}
