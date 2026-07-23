import { count, desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { contentItems, newsletterSubscribers, submissions, users } from "../../../db/schema";
import { seedContent } from "../../../db/seed";
import { getChatGPTUser } from "../../chatgpt-auth";

async function authorize() {
  const user = await getChatGPTUser();
  if (!user) return null;
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
  return !allowed.length || allowed.includes(user.email.toLowerCase()) ? user : null;
}

export async function GET() {
  const actor = await authorize();
  if (!actor) return Response.json({ error:"Administrator access required" }, { status:403 });
  const db = await getDb();
  const [{ value:total }] = await db.select({ value:count() }).from(contentItems);
  if (!total) {
    for (let i=0;i<seedContent.length;i+=20) await db.insert(contentItems).values(seedContent.slice(i,i+20));
  }
  const [records, recentSubmissions, recentSubscribers, [{ value:submissionCount }], [{ value:subscriberCount }], [{ value:userCount }]] = await Promise.all([
    db.select({ id:contentItems.id,title:contentItems.title,collection:contentItems.collection,status:contentItems.status,updatedAt:contentItems.updatedAt }).from(contentItems).orderBy(desc(contentItems.updatedAt)).limit(60),
    db.select({ id:submissions.id,kind:submissions.kind,name:submissions.name,email:submissions.email,status:submissions.status,createdAt:submissions.createdAt }).from(submissions).orderBy(desc(submissions.createdAt)).limit(12),
    db.select({ id:newsletterSubscribers.id,email:newsletterSubscribers.email,status:newsletterSubscribers.status,createdAt:newsletterSubscribers.createdAt }).from(newsletterSubscribers).orderBy(desc(newsletterSubscribers.createdAt)).limit(12),
    db.select({ value:count() }).from(submissions),
    db.select({ value:count() }).from(newsletterSubscribers),
    db.select({ value:count() }).from(users),
  ]);
  return Response.json({ records,recentSubmissions,recentSubscribers,counts:{ submissions:submissionCount,subscribers:subscriberCount,users:userCount,content:records.length },actor:actor.email });
}
