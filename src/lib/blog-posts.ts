export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "optimizing-your-redirects",
    title: "Optimizing Your Redirects: Direct vs. Monetized Links",
    excerpt:
      "When should you use an instant redirect versus a monetized interstitial? A practical breakdown of the trade-off.",
    date: "2026-06-18",
    readMinutes: 4,
    content: [
      "Every short link you create is a small trade-off between user experience and revenue. A direct redirect sends visitors straight to your destination with no delay — best for transactional links, customer support, or anywhere trust matters more than a few cents of ad revenue.",
      "A monetized interstitial inserts a brief ad page before the redirect completes. It earns a small amount per click, but it also adds friction: every extra second before your visitor reaches their destination increases the chance they bounce.",
      "A simple rule of thumb: use direct redirects for links you send to people who already trust you (email newsletters, customer receipts, app store links). Reserve monetized links for high-volume, lower-intent traffic — social bios, forum posts, or content you're distributing at scale where a small per-click yield adds up.",
      "Whichever mode you choose, keep the redirect fast. Our interstitial page uses a short, visible countdown with a skip option rather than a long forced wait — visitors who feel in control are far less likely to abandon the link entirely.",
    ],
  },
  {
    slug: "qr-codes-for-print-campaigns",
    title: "A Practical Guide to QR Codes for Print Campaigns",
    excerpt:
      "QR codes bridge physical and digital marketing — here's how to use them without looking like a 2011 restaurant menu.",
    date: "2026-05-02",
    readMinutes: 5,
    content: [
      "QR codes had a rough reputation for years, but scan rates have climbed steadily since 2020 as native camera scanning became standard on every phone. The difference between a QR code that gets scanned and one that gets ignored usually comes down to context and destination.",
      "Always point your QR code at a short, trackable link rather than a raw long URL. This lets you see exactly how many people scanned a specific poster, flyer, or product tag — and lets you swap the destination later without reprinting anything.",
      "Size matters more than people expect: a QR code needs roughly 2×2 cm of clear space per meter of expected scanning distance. A code on a bus-stop poster needs to be dramatically larger than one on a business card.",
      "Finally, always test your code by scanning it yourself, from a distance, in the lighting conditions it'll actually be printed under, before you commit to a print run.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}
