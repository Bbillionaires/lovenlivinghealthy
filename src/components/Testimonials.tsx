import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Priya M.",
    quote:
      "The turmeric alone changed my morning routine. You can tell it's the real thing — deep color, real aroma, not the dusty stuff from the grocery store.",
    location: "Austin, TX",
  },
  {
    name: "Daniel O.",
    quote:
      "I travel for work constantly, so being able to skip a delivery from the app in ten seconds is what keeps me subscribed. The ashwagandha is genuinely great too.",
    location: "Denver, CO",
  },
  {
    name: "Renee A.",
    quote:
      "Their sourcing story sold me before I even tasted anything. Now the chamomile tea is a non-negotiable part of my evening.",
    location: "Portland, OR",
  },
];

export default function Testimonials() {
  return (
    <section className="container-page py-20">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold text-brand-forest sm:text-4xl">
          Loved by people building a healthier ritual
        </h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl border border-brand-forest/10 bg-white/60 p-6"
          >
            <div className="flex gap-1 text-brand-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-6 text-brand-forest/80">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-brand-forest">
              {t.name}
              <span className="ml-1 font-normal text-brand-forest/50">
                &middot; {t.location}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
