import { Metadata } from "next";
import { Check } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, SUBSCRIPTION_INTERVALS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Subscription Plans | Love - N - Living Healthy",
  description:
    "Flexible herb and wellness subscriptions delivered every 4, 8, or 12 weeks. Pause, skip, or cancel anytime.",
};

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Choose your products",
    desc: "Pick individual herbs, teas, or a curated wellness bundle from the shop.",
  },
  {
    step: "2",
    title: "Pick your rhythm",
    desc: "Every 4, 8, or 12 weeks. The more often you subscribe, the more you save.",
  },
  {
    step: "3",
    title: "We handle the rest",
    desc: "Your order ships automatically. Manage or cancel anytime from your account.",
  },
];

export default function PlansPage() {
  const bundles = PRODUCTS.filter((p) => p.category === "Wellness Bundles");

  return (
    <div className="container-page py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-moss">
          Subscription Plans
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-brand-forest">
          A ritual, delivered on your schedule
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-brand-forest/70">
          Every product can be subscribed to individually, or you can start
          with one of our curated bundles below. All subscriptions are
          flexible &mdash; change frequency, swap products, or cancel anytime.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {SUBSCRIPTION_INTERVALS.map((interval) => (
          <div
            key={interval.label}
            className="rounded-2xl border border-brand-forest/10 bg-white/60 p-6 text-center"
          >
            <p className="font-heading text-2xl font-semibold text-brand-forest">
              {interval.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-brand-terracotta">
              Save {interval.discountPercent}%
            </p>
            <p className="mt-2 text-sm text-brand-forest/60">
              on every order, automatically
            </p>
          </div>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="text-center font-heading text-3xl font-semibold text-brand-forest">
          Curated Wellness Bundles
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-brand-forest/70">
          The easiest way to start a subscription &mdash; three complementary
          products, bundled at a better price.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {bundles.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl bg-brand-sand p-10">
        <h2 className="text-center font-heading text-3xl font-semibold text-brand-forest">
          How it works
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest font-heading text-lg font-semibold text-brand-cream">
                {item.step}
              </div>
              <h3 className="mt-4 font-semibold text-brand-forest">{item.title}</h3>
              <p className="mt-1 text-sm text-brand-forest/70">{item.desc}</p>
            </div>
          ))}
        </div>
        <ul className="mx-auto mt-10 grid max-w-xl gap-3 text-sm text-brand-forest/80">
          {[
            "No contracts or cancellation fees",
            "Free shipping on every subscription order",
            "Manage everything from your account dashboard",
            "Skip a delivery whenever life gets busy",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-brand-terracotta" /> {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
