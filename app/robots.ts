import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://visit-nairobi.example";
  return { rules: { userAgent:"*", allow:"/", disallow:["/admin","/account","/signin","/register","/api/"] }, sitemap:`${base}/sitemap.xml` };
}
