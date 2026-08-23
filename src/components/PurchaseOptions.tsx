"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Product, PurchaseType } from "@/lib/types";
import { SUBSCRIPTION_INTERVALS } from "@/lib/products";
import { formatCents, discountedCents } from "@/lib/format";
import { useCartStore } from "@/lib/store";

export default function PurchaseOptions({ product }: { product: Product }) {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("subscription");
  const [intervalIndex, setIntervalIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const interval = SUBSCRIPTION_INTERVALS[intervalIndex];
  const activePrice =
    purchaseType === "subscription"
      ? discountedCents(product.priceCents, interval.discountPercent)
      : product.priceCents;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      purchaseType,
      quantity,
      ...(purchaseType === "subscription"
        ? {
            intervalLabel: interval.label,
            interval: interval.interval,
            intervalCount: interval.intervalCount,
            discountPercent: interval.discountPercent,
          }
        : {}),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-brand-forest/10 bg-white/70 p-6">
      <div className="space-y-3">
        <label
          className={`flex cursor-pointer items-start justify-between rounded-xl border p-4 transition ${
            purchaseType === "subscription"
              ? "border-brand-terracotta bg-brand-terracotta/5"
              : "border-brand-forest/15"
          }`}
        >
          <div className="flex gap-3">
            <input
              type="radio"
              name="purchaseType"
              checked={purchaseType === "subscription"}
              onChange={() => setPurchaseType("subscription")}
              className="mt-1 accent-[color:var(--brand-terracotta)]"
            />
            <div>
              <p className="font-medium text-brand-forest">
                Subscribe &amp; Save{" "}
                <span className="text-brand-terracotta">{interval.discountPercent}%</span>
              </p>
              <p className="text-sm text-brand-forest/60">
                Delivered automatically. Pause, skip, or cancel any time.
              </p>
              {purchaseType === "subscription" && (
                <select
                  value={intervalIndex}
                  onChange={(e) => setIntervalIndex(Number(e.target.value))}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 rounded-lg border border-brand-forest/20 bg-white px-3 py-1.5 text-sm text-brand-forest"
                >
                  {SUBSCRIPTION_INTERVALS.map((opt, idx) => (
                    <option key={opt.label} value={idx}>
                      {opt.label} &middot; save {opt.discountPercent}%
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <span className="whitespace-nowrap font-semibold text-brand-forest">
            {formatCents(discountedCents(product.priceCents, interval.discountPercent))}
          </span>
        </label>

        <label
          className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
            purchaseType === "one-time"
              ? "border-brand-terracotta bg-brand-terracotta/5"
              : "border-brand-forest/15"
          }`}
        >
          <div className="flex gap-3">
            <input
              type="radio"
              name="purchaseType"
              checked={purchaseType === "one-time"}
              onChange={() => setPurchaseType("one-time")}
              className="accent-[color:var(--brand-terracotta)]"
            />
            <div>
              <p className="font-medium text-brand-forest">One-time purchase</p>
              <p className="text-sm text-brand-forest/60">No commitment.</p>
            </div>
          </div>
          <span className="whitespace-nowrap font-semibold text-brand-forest">
            {formatCents(product.priceCents)}
          </span>
        </label>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex items-center rounded-lg border border-brand-forest/20">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-brand-forest"
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 text-brand-forest"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 rounded-lg bg-brand-forest px-6 py-3 text-sm font-semibold text-brand-cream transition hover:bg-brand-forest-light"
        >
          {added ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="h-4 w-4" /> Added to cart
            </span>
          ) : (
            `Add to cart · ${formatCents(activePrice * quantity)}`
          )}
        </button>
      </div>
    </div>
  );
}
