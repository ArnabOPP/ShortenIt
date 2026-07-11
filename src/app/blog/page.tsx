import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/lib/blog-posts";

export default function BlogIndexPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="font-display text-3xl font-bold text-on-surface">Guides & Blog</h1>
          <p className="mt-2 text-on-surface-variant">
            Practical notes on link management, QR codes, and getting the most out of your links.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
