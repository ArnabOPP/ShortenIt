import Link from "next/link";
import Image from "next/image";
import { BarChart3, QrCode, Globe, Check } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { HeroShortenForm } from "@/components/marketing/hero-shorten-form";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { InlineAdBanner } from "@/components/ads/inline-ad-banner";
import { WallpaperSkyscrapers } from "@/components/ads/wallpaper-skyscrapers";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description:
      "Track geographic data, device types, and referral sources in real-time with pixel-perfect accuracy.",
  },
  {
    icon: QrCode,
    title: "QR Code Engine",
    description:
      "Generate customizable, high-resolution QR codes for print and digital marketing campaigns instantly.",
  },
  {
    icon: Globe,
    title: "Branded Domains",
    description:
      "Increase trust and CTR by using your own custom domain names for all shortened links.",
  },
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Content Creator",
    avatar: "/images/testimonial-sarah-jenkins.jpg",
    quote:
      "ShortenIt transformed how I monetize my bio links. The custom domains added so much professionalism to my brand, and the revenue tracking is pinpoint accurate.",
  },
  {
    name: "David Chen",
    role: "Affiliate Marketer",
    avatar: "/images/testimonial-david-chen.jpg",
    quote:
      "The analytics are where ShortenIt really shines. I can see exactly which social platforms are driving the highest quality traffic. It's a game changer for my ROI.",
  },
  {
    name: "Elena Rodriguez",
    role: "SaaS Founder",
    avatar: "/images/testimonial-elena-rodriguez.jpg",
    quote:
      "Integration was seamless. We use their API for our enterprise link management and the uptime has been 100% over the last year. Highly recommended.",
  },
];

const steps = [
  {
    title: "Paste Link",
    description: "Drop your long URL into our high-performance engine. We handle the rest instantly.",
  },
  {
    title: "Choose Ad Mode",
    description: "Select from non-intrusive ad layers to monetize your traffic without hurting user experience.",
  },
  {
    title: "Share & Earn",
    description: "Distribute your branded link. Watch your dashboard balance grow as users engage.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <WallpaperSkyscrapers />
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-on-surface sm:text-5xl">
            Shrink Links. <span className="text-primary">Grow Revenue.</span>
          </h1>
          <p className="max-w-xl text-lg text-on-surface-variant">
            The link shortener that pays you. Turn every click into a
            high-conversion financial opportunity with precision analytics.
          </p>
          <HeroShortenForm />
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-secondary" /> No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-secondary" /> Real-time Ad Tracking
            </span>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-4 sm:flex-row sm:justify-center">
          <InlineAdBanner variant="leaderboard" />
          <InlineAdBanner variant="rectangle" />
        </section>

        <section id="features" className="bg-surface-container-low py-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <h2 className="font-display text-3xl font-bold text-on-surface">
                Powerful Features for Growth
              </h2>
              <p className="mt-2 text-on-surface-variant">
                Precision tools designed for professional link management.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((f) => (
                <Card key={f.title} className="p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-on-surface">{f.title}</h3>
                  <p className="mt-2 text-sm text-on-surface-variant">{f.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-4 sm:flex-row sm:justify-center">
          <InlineAdBanner variant="full-banner" />
          <InlineAdBanner variant="rectangle" />
        </section>

        <section className="py-10">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-on-surface">
                From Link to Revenue in 3 Steps
              </h2>
              <ol className="mt-8 flex flex-col gap-6">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-on-primary">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-on-surface">{s.title}</h3>
                      <p className="mt-1 text-sm text-on-surface-variant">{s.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <DashboardPreview />
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-4 sm:flex-row sm:justify-center">
          <InlineAdBanner variant="rectangle" />
          <InlineAdBanner variant="rectangle" />
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-8 text-center font-display text-3xl font-bold text-on-surface">
              Loved by Performance Marketers
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-display font-semibold text-on-surface">{t.name}</p>
                      <p className="text-xs text-on-surface-variant">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant">&ldquo;{t.quote}&rdquo;</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-4 sm:flex-row sm:justify-center">
          <InlineAdBanner variant="leaderboard" />
          <InlineAdBanner variant="rectangle" />
        </section>

        <section className="bg-primary py-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
            <h2 className="font-display text-2xl font-bold text-on-primary sm:text-3xl">
              Ready to maximize your link potential?
            </h2>
            <p className="text-on-primary/80">
              Join thousands of creators and businesses already scaling their growth with ShortenIt.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/sign-up">
                <Button size="lg" className="bg-surface-container-lowest text-primary hover:bg-surface-container-low">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="secondary" className="border-on-primary text-on-primary hover:bg-white/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-6">
          <InlineAdBanner variant="leaderboard" className="mx-auto" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
