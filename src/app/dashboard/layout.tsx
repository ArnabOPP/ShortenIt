import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { isClerkConfigured } from "@/lib/clerk";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell clerkEnabled={isClerkConfigured}>{children}</DashboardShell>;
}
