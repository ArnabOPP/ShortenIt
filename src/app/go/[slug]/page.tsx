import { notFound } from "next/navigation";
import { getLinkBySlug } from "@/lib/data/links";
import { recordClick } from "@/lib/data/clicks";
import { Interstitial } from "@/components/redirect/interstitial";

export default async function GoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const link = await getLinkBySlug(slug);

  if (!link || link.disabled) {
    notFound();
  }

  await recordClick(link.id, { adMode: "monetized" });

  return <Interstitial targetUrl={link.targetUrl} />;
}
