import type { MetadataRoute } from "next";
import { destinations, experiences, foodVenues, hotels, nightlife, shopping, stories } from "./expanded-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://visit-nairobi.example";
  const routes = ["","discover","things-to-do","food-and-drink","hotels","nightlife","shopping","destinations","events","business","stories","plan","partner","about","contact","faqs","privacy","cookies","terms","accessibility","responsible-travel","editorial-policy","submit-a-listing"];
  return [
    ...routes.map(x => ({ url: `${base}/${x}`, lastModified: new Date(), changeFrequency: x ? "weekly" as const : "daily" as const, priority: x ? .7 : 1 })),
    ...experiences.map(x => ({ url:`${base}/experiences/${x.slug}`, lastModified:new Date(), changeFrequency:"monthly" as const, priority:.8 })),
    ...stories.map(x => ({ url:`${base}/stories/${x.slug}`, lastModified:new Date(), changeFrequency:"monthly" as const, priority:.6 })),
    ...destinations.map(x => ({ url:`${base}/destinations/${x.slug}`, lastModified:new Date(), changeFrequency:"monthly" as const, priority:.8 })),
    ...foodVenues.map(x => ({ url:`${base}/food-and-drink/${x.slug}`, lastModified:new Date(), changeFrequency:"monthly" as const, priority:.7 })),
    ...hotels.map(x => ({ url:`${base}/hotel/${x.slug}`, lastModified:new Date(), changeFrequency:"monthly" as const, priority:.7 })),
    ...nightlife.map(x => ({ url:`${base}/nightlife/${x.slug}`, lastModified:new Date(), changeFrequency:"monthly" as const, priority:.6 })),
    ...shopping.map(x => ({ url:`${base}/shopping/${x.slug}`, lastModified:new Date(), changeFrequency:"monthly" as const, priority:.6 })),
  ];
}
