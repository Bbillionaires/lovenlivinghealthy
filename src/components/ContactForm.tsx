"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-brand-forest/10 bg-white/60 p-8 text-center">
        <p className="font-heading text-xl font-semibold text-brand-forest">
          Message sent!
        </p>
        <p className="mt-2 text-sm text-brand-forest/70">
          Thanks for reaching out &mdash; our team will reply within 1-2
          business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-brand-forest" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-brand-forest/20 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-brand-forest" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-brand-forest/20 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-brand-forest" htmlFor="topic">
          Topic
        </label>
        <select
          id="topic"
          name="topic"
          className="mt-1 w-full rounded-lg border border-brand-forest/20 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
        >
          <option>General question</option>
          <option>Order or subscription help</option>
          <option>Wholesale &amp; partnerships</option>
          <option>Press</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-brand-forest" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-brand-forest/20 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-terracotta"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-brand-cream transition hover:bg-brand-forest-light disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}
