import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type AuthUser = {
  displayName: string;
  email: string;
  fullName: string | null;
};

const SESSION_COOKIE = "vn_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const SIGN_IN_PATH = "/signin";
const RESERVED_AUTH_PATHS = [
  SIGN_IN_PATH,
  "/api/auth/request",
  "/api/auth/callback",
  "/api/auth/signout",
];

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "AUTH_SECRET is not configured. Set it in your environment (see .env.example) before using sign-in."
    );
  }
  return secret;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getAuthSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function sign(data: string): Promise<string> {
  const key = await hmacKey();
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return base64UrlEncode(new Uint8Array(signature));
}

async function verifySignature(data: string, signature: string): Promise<boolean> {
  const key = await hmacKey();
  try {
    return await crypto.subtle.verify("HMAC", key, base64UrlDecode(signature), new TextEncoder().encode(data));
  } catch {
    return false;
  }
}

function readCookie(cookieHeader: string, name: string): string | null {
  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    if (part.slice(0, separator).trim() === name) return part.slice(separator + 1).trim();
  }
  return null;
}

export async function serializeSessionCookie(email: string, opts: { secure: boolean }): Promise<string> {
  const payload = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify({ e: email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS })),
  );
  const signature = await sign(payload);
  return `${SESSION_COOKIE}=${payload}.${signature}; Path=/; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; SameSite=Lax${opts.secure ? "; Secure" : ""}`;
}

export function clearSessionCookie(opts: { secure: boolean }): string {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${opts.secure ? "; Secure" : ""}`;
}

export async function getSessionUser(): Promise<AuthUser | null> {
  const requestHeaders = await headers();
  const cookieHeader = requestHeaders.get("cookie");
  if (!cookieHeader) return null;
  const raw = readCookie(cookieHeader, SESSION_COOKIE);
  if (!raw) return null;
  const separator = raw.indexOf(".");
  if (separator === -1) return null;
  const payload = raw.slice(0, separator);
  const signature = raw.slice(separator + 1);
  if (!payload || !signature || !(await verifySignature(payload, signature))) return null;

  let parsed: { e: string; exp: number };
  try {
    parsed = JSON.parse(new TextDecoder().decode(base64UrlDecode(payload)));
  } catch {
    return null;
  }
  if (!parsed.e || typeof parsed.exp !== "number" || parsed.exp < Math.floor(Date.now() / 1000)) return null;

  return { displayName: parsed.e, email: parsed.e, fullName: null };
}

export async function requireSessionUser(returnTo: string): Promise<AuthUser> {
  const user = await getSessionUser();
  if (user) return user;
  redirect(signInPath(returnTo));
}

export function signInPath(returnTo: string): string {
  return `${SIGN_IN_PATH}?return_to=${encodeURIComponent(safeRelativeReturnPath(returnTo))}`;
}

export function safeRelativeReturnPath(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//")) return "/";

  let url: URL;
  try {
    url = new URL(value, "https://app.local");
  } catch {
    return "/";
  }
  if (url.origin !== "https://app.local") return "/";
  if (isReservedAuthPath(url.pathname)) return "/";

  return `${url.pathname}${url.search}${url.hash}`;
}

function isReservedAuthPath(pathname: string): boolean {
  return RESERVED_AUTH_PATHS.includes(pathname);
}
