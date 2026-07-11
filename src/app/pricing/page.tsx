import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing | ShortenIt",
  description:
    "Simple, transparent pricing for ShortenIt — free forever for 50 links/month, or go Pro for unlimited links, advanced analytics, and custom domains.",
};

const tiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for side projects and personal brand building.",
    features: ["50 links / month", "Basic analytics", "Standard QR codes"],
    cta: "Get Started",
    href: "/sign-up",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$19",
    period: "/mo",
    description: "For growing teams and serious digital creators.",
    features: [
      "Unlimited links",
      "Real-time advanced analytics",
      "Custom domains (up to 3)",
      "API access (100 req/s)",
      "Ad-free redirects",
    ],
    cta: "Get Started",
    href: "/dashboard/billing",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large-scale operations.",
    features: ["Everything in Pro", "Unlimited custom domains", "Dedicated account manager", "Uptime SLA"],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

const comparisonRows = [
  { feature: "Link shortening", free: "50/mo", pro: "Unlimited", enterprise: "Unlimited" },
  { feature: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Custom/Full" },
  { feature: "QR codes", free: "Standard", pro: "Dynamic/Branded", enterprise: "Dynamic/Branded" },
  { feature: "Custom domains", free: false, pro: "3 domains", enterprise: "Unlimited" },
  { feature: "API access", free: false, pro: "100 req/s", enterprise: "Priority access" },
  { feature: "Ad-free redirects", free: false, pro: true, enterprise: true },
];

const faqs = [
  {
    q: "How do payouts work for creators?",
    a: "Once your account crosses the minimum payout threshold, earnings from monetized redirects are paid out monthly via your connected payout method.",
  },
  {
    q: "Can I use my own custom domain?",
    a: "Yes — Pro plans support up to 3 custom domains, and Enterprise plans support unlimited domains, from the Custom Domains page in your dashboard.",
  },
  {
    q: "Is there a limit on API requests?",
    a: "The free plan doesn't include API access. Pro includes 100 requests/second; Enterprise gets priority, higher-throughput access.",
  },
  {
    q: "What happens if I exceed my monthly link limit?",
    a: "On the free plan, you'll be prompted to upgrade once you hit 50 links in a month. Existing links keep working either way.",
  },
];

function FeatureValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-4 w-4 text-secondary" />
    ) : (
      <X className="h-4 w-4 text-error" />
    );
  }
  return <span>{value}</span>;
}

export default function PricingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-on-surface">
            Choose the plan that fits your growth.
          </h1>
          <p className="mt-3 text-on-surface-variant">
            Scalable link infrastructure for creators, developers, and enterprise teams. Transparent pricing
            with no hidden fees.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={
                tier.highlighted
                  ? "relative flex flex-col border-2 border-primary p-6"
                  : "flex flex-col p-6"
              }
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-on-primary">
                  MOST POPULAR
                </span>
              )}
              <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
                {tier.name}
              </p>
              <p className="mt-2 flex items-baseline gap-1 font-display text-3xl font-bold text-on-surface">
                {tier.price}
                {tier.period && <span className="text-sm font-normal text-on-surface-variant">{tier.period}</span>}
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">{tier.description}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-on-surface">
                    <Check className="h-4 w-4 shrink-0 text-secondary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={tier.href} className="mt-6">
                <Button
                  variant={tier.highlighted ? "primary" : "secondary"}
                  className="w-full"
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </section>

        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="mb-6 text-center font-display text-2xl font-bold text-on-surface">
            Full Feature Comparison
          </h2>
          <div className="overflow-hidden rounded-2xl border border-outline-variant/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low text-left">
                  <th className="px-6 py-3 font-medium text-on-surface-variant">Features</th>
                  <th className="px-6 py-3 font-medium text-on-surface-variant">Free</th>
                  <th className="px-6 py-3 font-medium text-primary">Pro</th>
                  <th className="px-6 py-3 font-medium text-on-surface-variant">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-outline-variant/10">
                    <td className="px-6 py-4 text-on-surface">{row.feature}</td>
                    <td className="px-6 py-4">
                      <FeatureValue value={row.free} />
                    </td>
                    <td className="px-6 py-4 font-medium text-on-surface">
                      <FeatureValue value={row.pro} />
                    </td>
                    <td className="px-6 py-4">
                      <FeatureValue value={row.enterprise} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-20">
          <h2 className="mb-6 text-center font-display text-2xl font-bold text-on-surface">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-outline-variant/30 bg-surface-container-lowest px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-on-surface">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 text-on-surface-variant transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-on-surface-variant">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
