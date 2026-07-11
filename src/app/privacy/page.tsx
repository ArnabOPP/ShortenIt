import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/marketing/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy | ShortenIt",
  description: "How ShortenIt collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 11, 2026">
      <section>
        <h2>1. Information we collect</h2>
        <p>
          When you create an account, we collect your email address and authentication details via our
          identity provider, Clerk. When you create a short link, we store the destination URL, your chosen
          slug, and ad-mode preference. When someone clicks a short link, we log the timestamp, referrer,
          device/user-agent string, and (where available) an approximate country, to power your analytics
          dashboard.
        </p>
      </section>
      <section>
        <h2>2. How we use information</h2>
        <p>
          We use click data to generate the analytics shown in your dashboard, to detect abuse (e.g. spam or
          malware links), and to calculate estimated ad-revenue share on monetized links. We do not sell your
          personal data to third parties.
        </p>
      </section>
      <section>
        <h2>3. Advertising</h2>
        <p>
          Links created in &quot;Monetized&quot; mode display third-party advertisements on an interstitial
          page before redirecting. Ad networks we work with (such as Google AdSense and other partners) may
          use cookies or similar technologies to serve relevant ads. You can control ad personalization
          through your browser or ad network settings.
        </p>
      </section>
      <section>
        <h2>4. Data retention</h2>
        <p>
          Click logs are retained for as long as your account and its links remain active, so you can review
          historical analytics. You can delete individual links at any time, which removes their associated
          click history.
        </p>
      </section>
      <section>
        <h2>5. Your rights</h2>
        <p>
          You may request a copy of your data or account deletion at any time by contacting us through the{" "}
          <Link href="/contact" className="text-primary underline">
            Contact page
          </Link>
          .
        </p>
      </section>
      <section>
        <h2>6. Contact</h2>
        <p>Questions about this policy? Reach out via the Contact page linked above.</p>
      </section>
    </LegalLayout>
  );
}
