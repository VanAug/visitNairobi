export async function sendConfiguredEmail(payload: Record<string, unknown>) {
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
