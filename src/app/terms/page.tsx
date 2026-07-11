import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service | ShortenIt",
  description: "The terms that govern your use of ShortenIt.",
};

export default function TermsOfServicePage() {
  return (
    <LegalLayout title="Terms of Service" updated="July 11, 2026">
      <section>
        <h2>1. Acceptance of terms</h2>
        <p>
          By creating an account or using ShortenIt to create short links, you agree to these Terms of
          Service and our Privacy Policy.
        </p>
      </section>
      <section>
        <h2>2. Acceptable use</h2>
        <p>
          You may not use ShortenIt to create links to content that is illegal, phishing, malware, spam, or
          otherwise violates the policies of our advertising partners. We reserve the right to disable any
          link or account found in violation, without notice.
        </p>
      </section>
      <section>
        <h2>3. Monetized links and payouts</h2>
        <p>
          Links created in &quot;Monetized&quot; mode display advertising to visitors before redirecting.
          Estimated earnings shown in your dashboard are provisional and subject to verification against
          actual ad network reporting before any payout is issued. We reserve the right to withhold payouts
          associated with invalid, fraudulent, or bot-driven traffic.
        </p>
      </section>
      <section>
        <h2>4. Service availability</h2>
        <p>
          We aim for high uptime but do not guarantee uninterrupted service. Links may be temporarily
          unavailable during maintenance or due to factors outside our control.
        </p>
      </section>
      <section>
        <h2>5. Account termination</h2>
        <p>
          You may delete your account at any time. We may suspend or terminate accounts that violate these
          terms or applicable law.
        </p>
      </section>
      <section>
        <h2>6. Limitation of liability</h2>
        <p>
          ShortenIt is provided &quot;as is&quot; without warranties of any kind. We are not liable for
          indirect, incidental, or consequential damages arising from your use of the service.
        </p>
      </section>
      <section>
        <h2>7. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of ShortenIt after changes take effect
          constitutes acceptance of the revised terms.
        </p>
      </section>
    </LegalLayout>
  );
}
