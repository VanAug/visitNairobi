import { and, eq, gt, isNull, lt } from "drizzle-orm";
import { getDb } from "../../db";
import { magicLinkTokens } from "../../db/schema";
import { safeRelativeReturnPath } from "../auth";
import { sendConfiguredEmail } from "./email";

const TTL_MINUTES = 15;
const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_MINUTES = 10;

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

async function sha256(value: string): Promise<Uint8Array> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return new Uint8Array(digest);
}

export async function requestMagicLink(email: string, returnTo: string): Promise<{ url: string | null }> {
  const db = await getDb();

  await db.delete(magicLinkTokens).where(lt(magicLinkTokens.expiresAt, new Date(Date.now() - 24 * 60 * 60 * 1000)));

  const recent = await db.select({ id: magicLinkTokens.id }).from(magicLinkTokens).where(
    and(eq(magicLinkTokens.email, email), gt(magicLinkTokens.createdAt, new Date(Date.now() - WINDOW_MINUTES * 60 * 1000))),
  );
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return { url: null };

  const tokenBytes = crypto.getRandomValues(new Uint8Array(32));
  const token = base64UrlEncode(tokenBytes);
  const tokenHash = base64UrlEncode(await sha256(token));
  const expiresAt = new Date(Date.now() + TTL_MINUTES * 60 * 1000);
  const safeReturnTo = safeRelativeReturnPath(returnTo);

  await db.insert(magicLinkTokens).values({ email, tokenHash, returnTo: safeReturnTo, expiresAt });

  const linkUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback?token=${token}`;
  await sendConfiguredEmail({
    to: email,
    from: process.env.EMAIL_FROM,
    template: "magic-link-signin",
    subject: "Your Visit Nairobi sign-in link",
    data: { url: linkUrl },
  }).catch(() => undefined);

  return { url: linkUrl };
}

export async function consumeMagicLink(token: string): Promise<{ email: string; returnTo: string | null } | null> {
  const db = await getDb();
  const tokenHash = base64UrlEncode(await sha256(token));
  const [row] = await db.update(magicLinkTokens)
    .set({ usedAt: new Date() })
    .where(and(
      eq(magicLinkTokens.tokenHash, tokenHash),
      isNull(magicLinkTokens.usedAt),
      gt(magicLinkTokens.expiresAt, new Date()),
    ))
    .returning({ email: magicLinkTokens.email, returnTo: magicLinkTokens.returnTo });
  return row ?? null;
}
