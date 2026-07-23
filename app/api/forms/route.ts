import { getDb } from "../../../db";
import { newsletterSubscribers, submissions } from "../../../db/schema";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendConfiguredEmail(payload: Record<string, unknown>) {
  const url = process.env.EMAIL_API_URL;
  const key = process.env.EMAIL_API_KEY;
  if (!url || !key) return;
  const response = await fetch(url, {
    method:"POST",
    headers:{ "content-type":"application/json",authorization:`Bearer ${key}` },
    body:JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Configured email provider rejected the message");
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const email = String(body.email || "").trim().toLowerCase();
    const kind = String(body.kind || "General enquiry").slice(0, 80);
    if (body.company_url) return Response.json({ ok: true }, { status: 201 });
    if (!emailPattern.test(email) || body.consent !== "on") return Response.json({ error: "A valid email and consent are required." }, { status: 400 });
    const db = await getDb();
    if (kind === "Newsletter") {
      await db.insert(newsletterSubscribers).values({ email, consent: true, status:"subscribed" }).onConflictDoUpdate({ target:newsletterSubscribers.email,set:{ consent:true,status:"subscribed" } });
      await sendConfiguredEmail({ to:email,from:process.env.EMAIL_FROM,template:"newsletter-welcome",subject:"Welcome to Visit Nairobi" }).catch(() => undefined);
    } else {
      const message = String(body.message || "");
      if (message.length < 20) return Response.json({ error: "Please add a little more detail." }, { status: 400 });
      await db.insert(submissions).values({
        kind, email, consent: true, name: String(body.name || "").slice(0,120),
        organisation: String(body.organisation || "").slice(0,180),
        telephone: String(body.telephone || "").slice(0,60), message: message.slice(0,5000),
      });
      await Promise.all([
        sendConfiguredEmail({ to:email,from:process.env.EMAIL_FROM,template:"submission-acknowledgement",subject:`We received your ${kind.toLowerCase()}` }),
        sendConfiguredEmail({ to:process.env.STAFF_NOTIFICATION_EMAIL,from:process.env.EMAIL_FROM,template:"staff-submission-alert",subject:`New Visit Nairobi submission: ${kind}`,data:{ email,kind } }),
      ]).catch(() => undefined);
    }
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to save submission." }, { status: 500 });
  }
}
