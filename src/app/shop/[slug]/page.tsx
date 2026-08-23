import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MapPin } from "lucide-react";
import ProductVisual from "@/components/ProductVisual";
import PurchaseOptions from "@/components/PurchaseOptions";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, getProductBySlug } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Love - N - Living Healthy`,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="container-page py-12">
      <nav className="text-sm text-brand-forest/50">
        <Link href="/shop" className="hover:text-brand-terracotta">
          Shop
        </Link>{" "}
        / <span className="text-brand-forest">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductVisual product={product} className="lg:sticky lg:top-24" />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-moss">
            {product.category}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold text-brand-forest sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-brand-forest/70">{product.tagline}</p>

          <div className="mt-3 flex items-center gap-2 text-sm text-brand-forest/60">
            <MapPin className="h-4 w-4" />
            Sourced from {product.origin}
          </div>

          <p className="mt-5 leading-7 text-brand-forest/80">
            {product.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-moss">
                Benefits
              </p>
              <ul className="mt-2 space-y-1 text-sm text-brand-forest/80">
                {product.benefits.map((b) => (
                  <li key={b}>&bull; {b}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-moss">
                Ingredients
              </p>
              <ul className="mt-2 space-y-1 text-sm text-brand-forest/80">
                {product.ingredients.map((i) => (
                  <li key={i}>&bull; {i}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-xs text-brand-forest/50">{product.sizeLabel}</p>

          <div className="mt-6">
            <PurchaseOptions product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-heading text-2xl font-semibold text-brand-forest">
            You might also like
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
