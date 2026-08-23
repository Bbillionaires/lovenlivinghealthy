import Link from "next/link";
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop All Products | Love - N - Living Healthy",
  description: "Browse globally sourced herbs, teas, adaptogens, and wellness essentials.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const products = category
    ? PRODUCTS.filter((p) => p.category === category)
    : PRODUCTS;

  return (
    <div className="container-page py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-moss">
          The Full Collection
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-brand-forest">
          Shop All Products
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-brand-forest/70">
          Every item is available as a one-time purchase or a flexible
          subscription &mdash; save up to 15% when you subscribe.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/shop"
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            !category
              ? "border-brand-forest bg-brand-forest text-brand-cream"
              : "border-brand-forest/20 text-brand-forest hover:border-brand-forest/40"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/shop?category=${encodeURIComponent(cat)}`}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              category === cat
                ? "border-brand-forest bg-brand-forest text-brand-cream"
                : "border-brand-forest/20 text-brand-forest hover:border-brand-forest/40"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-16 text-center text-brand-forest/60">
          No products found in this category yet.
        </p>
      )}
    </div>
  );
}
