import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { newsletterSubscribers, savedItems, users } from "../../../db/schema";
import { getChatGPTUser } from "../../chatgpt-auth";

export async function GET(request: Request) {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error:"Sign in required" }, { status:401 });
  const db = await getDb();
  let profile = await db.select().from(users).where(eq(users.email, identity.email)).get();
  if (!profile) {
    await db.insert(users).values({ email:identity.email,name:identity.fullName });
    profile = await db.select().from(users).where(eq(users.email, identity.email)).get();
  }
  const saved = await db.select().from(savedItems).where(eq(savedItems.userEmail, identity.email));
  if (new URL(request.url).searchParams.get("export") === "1") {
    const subscriptions = await db.select().from(newsletterSubscribers).where(eq(newsletterSubscribers.email, identity.email));
    return Response.json({ exportedAt:new Date().toISOString(), profile:profile || { email:identity.email,name:identity.fullName }, saved, subscriptions }, { headers:{ "content-disposition":`attachment; filename="visit-nairobi-data.json"` } });
  }
  return Response.json({ user:profile || { email:identity.email,name:identity.fullName,newsletterOptIn:false }, saved });
}

export async function POST(request: Request) {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error:"Sign in required" }, { status:401 });
  const body = await request.json().catch(() => ({})) as { newsletterOptIn?:boolean; accessibilityPreferences?:string };
  const db = await getDb();
  await db.insert(users).values({
    email:identity.email,name:identity.fullName,newsletterOptIn:Boolean(body.newsletterOptIn),
    accessibilityPreferences:String(body.accessibilityPreferences || "").slice(0,500),
  }).onConflictDoUpdate({ target:users.email,set:{
    name:identity.fullName,newsletterOptIn:Boolean(body.newsletterOptIn),
    accessibilityPreferences:String(body.accessibilityPreferences || "").slice(0,500),updatedAt:new Date(),
  }});
  if (body.newsletterOptIn) {
    await db.insert(newsletterSubscribers).values({ email:identity.email,consent:true,status:"subscribed" }).onConflictDoUpdate({ target:newsletterSubscribers.email,set:{ consent:true,status:"subscribed" } });
  } else {
    await db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.email,identity.email));
  }
  return Response.json({ ok:true,user:{ email:identity.email,name:identity.fullName,newsletterOptIn:Boolean(body.newsletterOptIn) } });
}

export async function DELETE() {
  const identity = await getChatGPTUser();
  if (!identity) return Response.json({ error:"Sign in required" }, { status:401 });
  const db = await getDb();
  await db.batch([
    db.delete(savedItems).where(eq(savedItems.userEmail, identity.email)),
    db.delete(newsletterSubscribers).where(eq(newsletterSubscribers.email, identity.email)),
    db.delete(users).where(eq(users.email, identity.email)),
  ]);
  return Response.json({ ok:true });
}
