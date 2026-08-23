"use client";

import { FormEvent, useState } from "react";
import { ShieldCheck } from "lucide-react";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Something went wrong");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <div className="container-page flex flex-col items-center py-20 text-center">
      <ShieldCheck className="h-12 w-12 text-brand-terracotta" strokeWidth={1.5} />
      <h1 className="mt-4 font-heading text-4xl font-semibold text-brand-forest">
        Manage Your Subscription
      </h1>
      <p className="mt-3 max-w-md text-brand-forest/70">
        Enter the email you used at checkout and we&apos;ll take you to your
        secure billing portal, where you can update payment methods, change
        delivery frequency, or cancel a subscription.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full border border-brand-forest/20 bg-white px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-brand-cream transition hover:bg-brand-forest-light disabled:opacity-60"
          >
            {status === "loading" ? "Loading..." : "Go to Portal"}
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
