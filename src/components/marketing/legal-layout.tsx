import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="font-display text-3xl font-bold text-on-surface">{title}</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: {updated}</p>
          <div className="prose-legal mt-8 flex flex-col gap-6 text-sm leading-relaxed text-on-surface-variant [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-on-surface [&_p]:text-on-surface-variant">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
