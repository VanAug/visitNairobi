import { and, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { savedItems } from "../../../db/schema";
import { getChatGPTUser } from "../../chatgpt-auth";

export async function GET() {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error:"Sign in required" }, { status:401 });
  const db = await getDb();
  const items = await db.select().from(savedItems).where(eq(savedItems.userEmail, identity.email));
  return Response.json({ items });
}

export async function POST(request: Request) {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error:"Sign in required" }, { status:401 });
  const { slug, itineraryDay } = await request.json() as { slug?:string; itineraryDay?:number };
  if (!slug || slug.length > 200) return Response.json({ error:"Valid content slug required" }, { status:400 });
  const db = await getDb();
  const existing = await db.select().from(savedItems).where(and(eq(savedItems.userEmail,identity.email),eq(savedItems.contentSlug,slug))).get();
  if (!existing) await db.insert(savedItems).values({ userEmail:identity.email,contentSlug:slug,itineraryDay });
  return Response.json({ ok:true }, { status:201 });
}

export async function DELETE(request: Request) {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error:"Sign in required" }, { status:401 });
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return Response.json({ error:"Slug required" }, { status:400 });
  const db = await getDb();
  await db.delete(savedItems).where(and(eq(savedItems.userEmail,identity.email),eq(savedItems.contentSlug,slug)));
  return Response.json({ ok:true });
}
