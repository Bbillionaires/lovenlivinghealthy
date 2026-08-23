import Link from "next/link";
import { Product } from "@/lib/types";
import { formatCents, discountedCents } from "@/lib/format";
import { SUBSCRIPTION_INTERVALS } from "@/lib/products";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product }: { product: Product }) {
  const bestDiscount = SUBSCRIPTION_INTERVALS[0].discountPercent;
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-brand-forest/10 bg-white/60 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <ProductVisual product={product} className="mb-4" />
      <p className="text-xs font-medium uppercase tracking-wide text-brand-moss">
        {product.category}
      </p>
      <h3 className="mt-1 font-heading text-lg font-semibold text-brand-forest group-hover:text-brand-terracotta">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-brand-forest/70">{product.tagline}</p>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-lg font-semibold text-brand-forest">
          {formatCents(discountedCents(product.priceCents, bestDiscount))}
        </span>
        <span className="text-sm text-brand-forest/40 line-through">
          {formatCents(product.priceCents)}
        </span>
      </div>
      <p className="text-xs text-brand-forest/50">
        with subscription &middot; {product.sizeLabel}
      </p>
    </Link>
  );
}
