import Link from "next/link";
import Hero from "@/components/Hero";
import UspStrip from "@/components/UspStrip";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { PRODUCTS } from "@/lib/products";

export default function Home() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <>
      <Hero />
      <UspStrip />

      <section className="container-page py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-moss">
              Customer Favorites
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-forest sm:text-4xl">
              Start your ritual
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-semibold text-brand-terracotta sm:block"
          >
            View all products &rarr;
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link
          href="/shop"
          className="mt-8 block text-center text-sm font-semibold text-brand-terracotta sm:hidden"
        >
          View all products &rarr;
        </Link>
      </section>

      <section className="bg-brand-sand py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-moss">
              Why Subscribe
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-brand-forest sm:text-4xl">
              One less thing to remember to buy
            </h2>
            <p className="mt-4 text-brand-forest/70">
              Every product on Love - N - Living Healthy can be set up on a
              flexible delivery schedule &mdash; every 4, 8, or 12 weeks &mdash;
              at a discount of up to 15%. Adjust frequency, swap products, or
              cancel from your account at any time, no phone calls required.
            </p>
            <Link
              href="/plans"
              className="mt-6 inline-block rounded-full bg-brand-forest px-7 py-3 text-sm font-semibold text-brand-cream transition hover:bg-brand-forest-light"
            >
              Explore Subscription Plans
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "15%", label: "max savings" },
              { value: "35+", label: "countries sourced" },
              { value: "0", label: "cancellation fees" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/70 p-6 shadow-sm"
              >
                <p className="font-heading text-3xl font-semibold text-brand-terracotta">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-brand-forest/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </>
  );
}
