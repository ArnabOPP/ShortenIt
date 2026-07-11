import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { getBlogPost, blogPosts } from "@/lib/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ShortenIt`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 py-16">
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
            ← Back to Guides
          </Link>
          <p className="mt-6 text-xs font-medium uppercase tracking-wide text-on-surface-variant">
            {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}{" "}
            · {post.readMinutes} min read
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-on-surface">{post.title}</h1>
          <div className="mt-8 flex flex-col gap-5 text-on-surface-variant">
            {post.content.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-surface-container-low p-6 text-center">
            <p className="font-display font-semibold text-on-surface">Ready to try it yourself?</p>
            <Link href="/" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
              Shorten your first link →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
