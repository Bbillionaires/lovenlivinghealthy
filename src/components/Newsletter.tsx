"use client";

import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-brand-forest py-16">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <h2 className="font-heading text-2xl font-semibold text-brand-cream sm:text-3xl">
          Get 15% off your first subscription order
        </h2>
        <p className="max-w-md text-sm text-brand-cream/70">
          Join our list for sourcing stories, new arrivals, and a welcome
          discount code.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-full border border-brand-cream/20 bg-brand-cream/10 px-5 py-3 text-sm text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-forest transition hover:bg-brand-gold/90 disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Get My Code"}
          </button>
        </form>
        {status === "done" && (
          <p className="text-sm text-brand-gold">
            You&apos;re on the list! Check your inbox for your code.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-300">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
