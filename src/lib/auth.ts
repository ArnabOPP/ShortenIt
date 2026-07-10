import { auth, currentUser } from "@clerk/nextjs/server";
import { isClerkConfigured } from "@/lib/clerk";

const DEMO_USER_ID = "demo-user";

export async function requireUserId(): Promise<string> {
  if (!isClerkConfigured) return DEMO_USER_ID;
  const { userId } = await auth();
  return userId ?? DEMO_USER_ID;
}

export async function getDisplayUser() {
  if (!isClerkConfigured) {
    return { firstName: "Demo", fullName: "Demo User", imageUrl: null as string | null };
  }
  const user = await currentUser();
  return {
    firstName: user?.firstName ?? "there",
    fullName: user?.fullName ?? user?.username ?? "Account",
    imageUrl: user?.imageUrl ?? null,
  };
}
