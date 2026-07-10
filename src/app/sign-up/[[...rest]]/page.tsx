import { SignUp } from "@clerk/nextjs";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { ClerkNotConfigured } from "@/components/auth/clerk-not-configured";
import { clerkAppearance } from "@/components/auth/clerk-appearance";
import { isClerkConfigured } from "@/lib/clerk";

export default function SignUpPage() {
  return (
    <AuthSplitLayout
      imageSrc="/images/signup-hero.jpg"
      imageCaption="Grow with data-driven link management"
    >
      {isClerkConfigured ? (
        <SignUp appearance={clerkAppearance} />
      ) : (
        <ClerkNotConfigured mode="sign-up" />
      )}
    </AuthSplitLayout>
  );
}
