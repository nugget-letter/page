export type ContactPayload = {
  company: string;
  name: string;
  email: string;
  type: string;
  message: string;
};

export async function submitContactToSheet(payload: ContactPayload): Promise<void> {
  const url = process.env.APPS_SCRIPT_URL;
  if (!url) {
    throw new Error("APPS_SCRIPT_URL is not set");
  }

  const secret = process.env.APPS_SCRIPT_SECRET;
  if (!secret) {
    throw new Error("APPS_SCRIPT_SECRET is not set");
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, secret }),
  });

  const body = await res.json();

  if (!res.ok || !body.ok) {
    throw new Error(body.error ?? `Apps Script request failed with status ${res.status}`);
  }
}
