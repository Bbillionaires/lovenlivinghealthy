"use client";

import Link from "next/link";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { getProductById } from "@/lib/products";
import { formatCents, discountedCents } from "@/lib/format";
import ProductVisual from "@/components/ProductVisual";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lines = items
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      const unitPrice =
        item.purchaseType === "subscription"
          ? discountedCents(product.priceCents, item.discountPercent ?? 0)
          : product.priceCents;
      return { item, product, unitPrice };
    })
    .filter(Boolean) as { item: typeof items[number]; product: NonNullable<ReturnType<typeof getProductById>>; unitPrice: number }[];

  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.item.quantity, 0);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="font-heading text-3xl font-semibold text-brand-forest">
          Your cart is empty
        </h1>
        <p className="mt-2 text-brand-forest/70">
          Browse the shop to find your next ritual.
        </p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-brand-terracotta px-7 py-3 text-sm font-semibold text-white"
        >
          Shop All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-16">
      <h1 className="font-heading text-4xl font-semibold text-brand-forest">
        Your Cart
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {lines.map(({ item, product, unitPrice }) => (
            <div
              key={`${item.productId}-${item.purchaseType}`}
              className="flex gap-4 rounded-2xl border border-brand-forest/10 bg-white/60 p-4"
            >
              <ProductVisual product={product} className="h-24 w-24 flex-shrink-0" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="font-heading font-semibold text-brand-forest hover:text-brand-terracotta"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-brand-forest/60">
                      {item.purchaseType === "subscription"
                        ? `Subscription · ${item.intervalLabel}`
                        : "One-time purchase"}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.purchaseType)}
                    aria-label="Remove item"
                    className="text-brand-forest/40 hover:text-brand-terracotta"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-brand-forest/20">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.purchaseType, item.quantity - 1)
                      }
                      className="px-3 py-1 text-brand-forest"
                    >
                      &minus;
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.purchaseType, item.quantity + 1)
                      }
                      className="px-3 py-1 text-brand-forest"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-brand-forest">
                    {formatCents(unitPrice * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-brand-forest/10 bg-white/60 p-6">
          <h2 className="font-heading text-xl font-semibold text-brand-forest">
            Order Summary
          </h2>
          <div className="mt-4 flex justify-between text-sm text-brand-forest/70">
            <span>Subtotal</span>
            <span>{formatCents(subtotal)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm text-brand-forest/70">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-brand-forest/10 pt-4 font-semibold text-brand-forest">
            <span>Estimated Total</span>
            <span>{formatCents(subtotal)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-brand-forest px-6 py-3 text-sm font-semibold text-brand-cream transition hover:bg-brand-forest-light disabled:opacity-60"
          >
            {loading ? "Redirecting..." : "Checkout"}
          </button>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <p className="mt-3 text-center text-xs text-brand-forest/50">
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
