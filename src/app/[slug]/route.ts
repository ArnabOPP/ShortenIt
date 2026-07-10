import { NextRequest, NextResponse } from "next/server";
import { getLinkBySlug } from "@/lib/data/links";
import { recordClick } from "@/lib/data/clicks";

export async function GET(request: NextRequest, ctx: RouteContext<"/[slug]">) {
  const { slug } = await ctx.params;
  const origin = request.nextUrl.origin;

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
