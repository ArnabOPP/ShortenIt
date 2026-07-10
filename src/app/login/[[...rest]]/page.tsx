import { SignIn } from "@clerk/nextjs";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { ClerkNotConfigured } from "@/components/auth/clerk-not-configured";
import { clerkAppearance } from "@/components/auth/clerk-appearance";
import { isClerkConfigured } from "@/lib/clerk";

export default function LoginPage() {
  return (
    <AuthSplitLayout
      imageSrc="/images/login-dashboard-preview.jpg"
      imageCaption="Enterprise Analytics Dashboard"
    >
      {isClerkConfigured ? (
        <SignIn appearance={clerkAppearance} />
      ) : (
        <ClerkNotConfigured mode="login" />
      )}
    </AuthSplitLayout>
  );
}
