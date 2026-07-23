import type { Metadata } from "next";
import { RoutePage } from "../site";
import { allDirectoryItems, destinations, stories } from "../expanded-content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const record = [...stories,...allDirectoryItems].find(x => x.slug === slug[slug.length-1]);
  const destination = destinations.find(x => x.slug === slug[slug.length-1]);
  const title = record?.title || destination?.title || slug[slug.length - 1].replaceAll("-"," ").replace(/\b\w/g, x => x.toUpperCase());
  const description = record?.summary || destination?.intro || `Explore ${title} with Visit Nairobi — Your Gateway to Africa.`;
  const image = record?.image || destination?.image || "/og.png";
  return {
    title,description,alternates:{ canonical:`/${slug.join("/")}` },
    openGraph:{ title,description,images:[image],type:slug[0] === "stories" ? "article" : "website" },
    robots:slug[0] === "admin" || ["signin","register","account"].includes(slug[0]) ? { index:false,follow:false } : undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <RoutePage segments={slug}/>;
}
