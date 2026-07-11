import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Card } from "@/components/ui/card";

const components = [
  { name: "Redirect Engine", description: "Short-link resolution and redirects" },
  { name: "Dashboard", description: "Login, link management, analytics" },
  { name: "Database", description: "Link and click data storage" },
  { name: "Authentication", description: "Sign-up and sign-in" },
];

export default function ApiStatusPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-7 w-7 text-secondary" />
            <h1 className="font-display text-2xl font-bold text-on-surface">All systems operational</h1>
          </div>
          <p className="mt-2 text-sm text-on-surface-variant">
            This is a manually maintained status page rather than an automated monitor — if something seems
            down, please use the{" "}
            <Link href="/contact" className="text-primary underline">
              Contact page
            </Link>{" "}
            to let us know.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {components.map((c) => (
              <Card key={c.name} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-on-surface">{c.name}</p>
                  <p className="text-sm text-on-surface-variant">{c.description}</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  Operational
                </span>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
