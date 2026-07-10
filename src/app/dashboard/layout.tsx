import { Sidebar } from "@/components/dashboard/sidebar";
import { isClerkConfigured } from "@/lib/clerk";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-surface">
      <Sidebar clerkEnabled={isClerkConfigured} />
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1280px] px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
