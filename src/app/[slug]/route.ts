import { NextRequest, NextResponse } from "next/server";
import { getLinkBySlug } from "@/lib/data/links";
import { recordClick } from "@/lib/data/clicks";

// Clerk's dev-instance "dev browser" sync flow can bounce an unauthenticated
// first-time visitor through a same-origin path before it lands back on the
// page they wanted. Without this guard, that transient path gets treated as
// an unknown short-link slug and hijacked into our branded "expired" page,
// breaking the auth handshake. Bail out to a plain 404 instead so Clerk's
// own client-side logic can complete the flow undisturbed.
function looksLikeClerkInternalPath(slug: string, request: NextRequest) {
  return (
    slug.startsWith("clerk_") ||
    request.nextUrl.searchParams.has("__clerk_db_jwt") ||
    request.nextUrl.searchParams.has("__clerk_handshake")
  );
}

export async function GET(request: NextRequest, ctx: RouteContext<"/[slug]">) {
  const { slug } = await ctx.params;
  const origin = request.nextUrl.origin;

  if (looksLikeClerkInternalPath(slug, request)) {
    return new NextResponse(null, { status: 404 });
  }

  const link = await getLinkBySlug(slug);

  if (!link || link.disabled || (link.expiresAt && link.expiresAt < new Date())) {
    return NextResponse.redirect(new URL(`/expired?slug=${encodeURIComponent(slug)}`, origin));
  }

  if (link.adMode === "monetized") {
    return NextResponse.redirect(new URL(`/go/${slug}`, origin));
  }

  await recordClick(link.id, {
    referrer: request.headers.get("referer") ?? undefined,
    device: request.headers.get("user-agent") ?? undefined,
    adMode: "direct",
  });

  return NextResponse.redirect(link.targetUrl);
}
