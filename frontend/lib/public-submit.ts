const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type SubmitResult = { ok: true } | { ok: false; reason: "offline" | "error" };

function endpoint(path: string) {
  return `${apiUrl!.replace(/\/$/, "")}${path}`;
}

export async function submitContact(data: Record<string, string>): Promise<SubmitResult> {
  if (!apiUrl) return { ok: false, reason: "offline" };
  try {
    const response = await fetch(endpoint("/contacts/"), {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.ok ? { ok: true } : { ok: false, reason: "error" };
  } catch {
    return { ok: false, reason: "error" };
  }
}

export async function submitQuote(formData: FormData): Promise<SubmitResult> {
  if (!apiUrl) return { ok: false, reason: "offline" };
  try {
    const response = await fetch(endpoint("/quotes/"), {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    return response.ok ? { ok: true } : { ok: false, reason: "error" };
  } catch {
    return { ok: false, reason: "error" };
  }
}
