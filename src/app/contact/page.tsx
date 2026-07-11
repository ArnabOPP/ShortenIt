import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact | ShortenIt",
  description: "Get in touch with the ShortenIt team for support, billing, or sales questions.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h1 className="font-display text-3xl font-bold text-on-surface">Contact us</h1>
          <p className="mt-3 text-on-surface-variant">
            Questions about your account, a link, or a billing issue? Reach out and we&apos;ll get back to
            you.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Card className="flex flex-col items-center gap-3 p-6">
              <Mail className="h-6 w-6 text-primary" />
              <p className="font-display font-semibold text-on-surface">Email support</p>
              <p className="text-sm text-on-surface-variant">
                For account, billing, and technical issues.
              </p>
              <a href="mailto:support@shortenitpro.vercel.app" className="text-sm font-medium text-primary hover:underline">
                support@shortenitpro.vercel.app
              </a>
            </Card>
            <Card className="flex flex-col items-center gap-3 p-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <p className="font-display font-semibold text-on-surface">Sales & Enterprise</p>
              <p className="text-sm text-on-surface-variant">
                For custom domains, higher volume, and Enterprise plans.
              </p>
              <a href="mailto:sales@shortenitpro.vercel.app" className="text-sm font-medium text-primary hover:underline">
                sales@shortenitpro.vercel.app
              </a>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
