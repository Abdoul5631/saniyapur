"use client";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (!response.ok) {
      setError("Identifiant ou mot de passe incorrect.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#0f2e36] px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <Image src="/images/logo.png" alt="J&amp;B SANIYAPUR SARL" width={220} height={128} priority className="h-12 w-auto" />
        <h1 className="mt-5 text-2xl font-semibold text-[#16232a]">Connexion à l’administration</h1>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-[#16232a]">Identifiant</label>
            <input id="username" name="username" autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-[#16232a]">Mot de passe</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
          </div>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="mt-2 rounded-full bg-[#a85c36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60">{loading ? "Connexion…" : "Se connecter"}</button>
        </form>
      </div>
    </div>
  );
}
