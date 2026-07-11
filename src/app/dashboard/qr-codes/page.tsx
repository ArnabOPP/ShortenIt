import QRCode from "qrcode";
import { Download, QrCode as QrCodeIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { requireUserId } from "@/lib/auth";
import { getLinksTable } from "@/lib/data/links";
import { DashboardAdBanner } from "@/components/ads/dashboard-ad-banner";

export default async function QrCodesPage() {
  const userId = await requireUserId();
  const links = await getLinksTable(userId);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const codes = await Promise.all(
    links.map(async (link) => {
      const shortUrl = `${appUrl}/${link.slug}`;
      const dataUrl = await QRCode.toDataURL(shortUrl, {
        width: 320,
        margin: 1,
        color: { dark: "#0B1C30", light: "#FFFFFF" },
      });
      return { ...link, shortUrl, dataUrl };
    })
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-surface">QR Codes</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Every link automatically gets a scannable QR code — download it for print or digital use.
        </p>
      </div>

      <DashboardAdBanner variant="leaderboard" />

      {codes.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 p-12 text-center">
          <QrCodeIcon className="h-8 w-8 text-on-surface-variant" />
          <p className="font-medium text-on-surface">No links yet</p>
          <p className="text-sm text-on-surface-variant">
            Create a link first and its QR code will show up here.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {codes.map((code) => (
            <Card key={code.id} className="flex flex-col items-center gap-3 p-5">
              {/* eslint-disable-next-line @next/next/no-img-element -- base64 data URI, next/image adds no value here */}
              <img
                src={code.dataUrl}
                alt={`QR code for /${code.slug}`}
                className="h-40 w-40 rounded-lg border border-outline-variant/30"
              />
              <p className="font-medium text-primary">/{code.slug}</p>
              <a
                href={code.dataUrl}
                download={`${code.slug}-qr.png`}
                className="flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary"
              >
                <Download className="h-4 w-4" />
                Download PNG
              </a>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
