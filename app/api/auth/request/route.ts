import { requestMagicLink } from "../../../lib/magic-link";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { email?: string; return_to?: string };
  const email = String(body.email || "").trim().toLowerCase();
  if (!emailPattern.test(email)) return Response.json({ error: "A valid email is required." }, { status: 400 });

  const { url } = await requestMagicLink(email, String(body.return_to || "/account"));

  const includeUrl = process.env.AUTH_DEV_ECHO_LINKS === "1";
  return Response.json({ ok: true, ...(includeUrl && url ? { url } : {}) });
}
