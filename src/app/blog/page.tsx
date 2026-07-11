import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Card } from "@/components/ui/card";
import { InlineAdBanner } from "@/components/ads/inline-ad-banner";
import { WallpaperSkyscrapers } from "@/components/ads/wallpaper-skyscrapers";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Guides & Blog | ShortenIt",
  description: "Practical notes on link management, QR codes, and getting the most out of your links.",
};

export default function BlogIndexPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <WallpaperSkyscrapers />
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <h1 className="font-display text-3xl font-bold text-on-surface">Guides & Blog</h1>
          <p className="mt-2 text-on-surface-variant">
            Practical notes on link management, QR codes, and getting the most out of your links.
          </p>

          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <InlineAdBanner variant="leaderboard" />
            <InlineAdBanner variant="rectangle" />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="flex h-full flex-col p-6 transition hover:border-primary/40">
                  <p className="text-xs font-medium uppercase tracking-wide text-on-surface-variant">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {post.readMinutes} min read
                  </p>
                  <h2 className="mt-2 font-display text-lg font-semibold text-on-surface">{post.title}</h2>
                  <p className="mt-2 text-sm text-on-surface-variant">{post.excerpt}</p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <InlineAdBanner variant="rectangle" />
            <InlineAdBanner variant="rectangle" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
