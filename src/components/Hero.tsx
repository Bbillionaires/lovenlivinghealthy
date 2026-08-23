import Link from "next/link";
import { Leaf, Sprout, Flower2, Droplet } from "lucide-react";

const FLOATING_ICONS = [
  { Icon: Leaf, className: "left-[8%] top-[18%] text-brand-moss/70", size: 34, delay: "0s" },
  { Icon: Sprout, className: "left-[80%] top-[12%] text-brand-gold/70", size: 40, delay: "0.4s" },
  { Icon: Flower2, className: "left-[85%] top-[62%] text-brand-terracotta/60", size: 30, delay: "0.8s" },
  { Icon: Droplet, className: "left-[4%] top-[68%] text-brand-forest/50", size: 28, delay: "1.2s" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-sand to-brand-cream py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {FLOATING_ICONS.map(({ Icon, className, size, delay }, i) => (
          <Icon
            key={i}
            className={`absolute animate-pulse ${className}`}
            style={{ width: size, height: size, animationDelay: delay, animationDuration: "3.5s" }}
          />
        ))}
      </div>

      <div className="container-page relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-forest/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-forest">
          Globally Sourced &middot; Delivered to Your Door
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl font-heading text-4xl font-semibold leading-tight text-brand-forest sm:text-6xl">
          Nature&apos;s best herbs,
          <span className="text-brand-terracotta"> delivered on your terms.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-brand-forest/70">
          Love - N - Living Healthy travels the world to find the herbs and
          wellness staples worth building a ritual around &mdash; then ships
          them straight to your door, on a schedule that fits your life.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="rounded-full bg-brand-terracotta px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-terracotta/90"
          >
            Shop All Products
          </Link>
          <Link
            href="/plans"
            className="rounded-full border border-brand-forest/20 bg-white px-7 py-3 text-sm font-semibold text-brand-forest transition hover:border-brand-forest/40"
          >
            See Subscription Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
