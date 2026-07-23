import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { auditLogs, contentItems } from "../../../db/schema";
import { getChatGPTUser } from "../../chatgpt-auth";

export async function PATCH(request: Request) {
  const actor = await getChatGPTUser();
  if (!actor) return Response.json({ error:"Sign in required" }, { status:401 });
  const body = await request.json() as { id?:number;status?:string;reason?:string };
  const statuses = ["draft","in review","approved","scheduled","published","archived"];
  const status = String(body.status || "").toLowerCase();
  if (!body.id || !statuses.includes(status)) return Response.json({ error:"Valid record and status required" }, { status:400 });
  if (status === "draft" && body.reason !== undefined && String(body.reason).trim().length < 5) return Response.json({ error:"A reason is required when returning content to draft" }, { status:400 });
  const db = await getDb();
  await db.batch([
    db.update(contentItems).set({ status,updatedAt:new Date() }).where(eq(contentItems.id,body.id)),
    db.insert(auditLogs).values({ actor:actor.email,action:`status:${status}`,collection:"content",recordId:String(body.id),detail:String(body.reason || "") }),
  ]);
  return Response.json({ ok:true });
}
