import { Metadata } from "next";
import { Globe2, Handshake, Leaf, FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Sourcing | Love - N - Living Healthy",
  description:
    "How Love - N - Living Healthy sources natural herbs and wellness products from around the world.",
};

const VALUES = [
  {
    Icon: Globe2,
    title: "Sourced Globally",
    desc: "We work directly with farms and cooperatives across Asia, Africa, Europe, and the Americas to find herbs at their most potent and traditional.",
  },
  {
    Icon: Handshake,
    title: "Fair Partnerships",
    desc: "We pay growers fairly and build long-term relationships instead of chasing the lowest price, because quality follows trust.",
  },
  {
    Icon: FlaskConical,
    title: "Tested for Purity",
    desc: "Every batch is checked by third-party labs for purity and potency before it ever reaches your door.",
  },
  {
    Icon: Leaf,
    title: "Minimally Processed",
    desc: "We dry, mill, and extract using traditional, low-heat methods that protect the plant's natural compounds.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-brand-sand py-16">
        <div className="container-page text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-moss">
            Our Story
          </p>
          <h1 className="mx-auto mt-2 max-w-2xl font-heading text-4xl font-semibold text-brand-forest">
            We go looking for the herbs worth building a ritual around
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-forest/70">
            Love - N - Living Healthy started with a simple frustration: the
            herbs and wellness staples on most grocery shelves had lost their
            potency long before they got there. So we started sourcing
            directly &mdash; traveling to the farms, meeting the growers, and
            bringing back the real thing. Today we work with partners across
            more than 35 countries to bring naturally sourced herbs, teas,
            adaptogens, and oils straight to your door, on a schedule you
            control.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {VALUES.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-brand-forest/10 bg-white/60 p-6"
            >
              <Icon className="h-8 w-8 flex-shrink-0 text-brand-terracotta" strokeWidth={1.5} />
              <div>
                <h3 className="font-heading text-lg font-semibold text-brand-forest">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-brand-forest/70">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-brand-forest/10 bg-white/50 py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-brand-forest">
              From the farm to your doorstep
            </h2>
            <ol className="mt-6 space-y-6">
              {[
                { title: "We visit the source", desc: "Our team builds relationships directly with growers, not brokers." },
                { title: "We verify quality", desc: "Samples are lab-tested for purity, potency, and contaminants." },
                { title: "We process gently", desc: "Traditional, low-heat drying and milling preserves each plant's character." },
                { title: "We ship on your schedule", desc: "One-time or subscription, packed fresh and sent straight to you." },
              ].map((item, idx) => (
                <li key={item.title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-forest/10 font-heading text-sm font-semibold text-brand-forest">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-brand-forest">{item.title}</p>
                    <p className="text-sm text-brand-forest/70">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-brand-forest to-brand-forest-light p-10 text-brand-cream">
            <p className="font-heading text-2xl font-semibold">
              &ldquo;We don&apos;t sell what we wouldn&apos;t put in our own
              kitchens.&rdquo;
            </p>
            <p className="mt-4 text-sm text-brand-cream/70">
              &mdash; The Love - N - Living Healthy Founding Team
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
