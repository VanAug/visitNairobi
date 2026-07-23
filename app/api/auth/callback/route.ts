import { safeRelativeReturnPath, serializeSessionCookie } from "../../../auth";
import { consumeMagicLink } from "../../../lib/magic-link";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  const secure = url.protocol === "https:";

  const result = token ? await consumeMagicLink(token) : null;
  if (!result) {
    return new Response(null, { status: 302, headers: { location: "/signin?error=invalid_link" } });
  }

  const destination = safeRelativeReturnPath(result.returnTo || "/account");
  const cookie = await serializeSessionCookie(result.email, { secure });
  return new Response(null, { status: 302, headers: { location: destination, "set-cookie": cookie } });
}
