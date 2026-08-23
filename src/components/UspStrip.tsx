import { Globe2, ShieldCheck, RefreshCw, Truck } from "lucide-react";

const ITEMS = [
  { Icon: Globe2, title: "Globally Sourced", desc: "From small farms and cooperatives worldwide" },
  { Icon: ShieldCheck, title: "Third-Party Tested", desc: "Every batch checked for purity" },
  { Icon: RefreshCw, title: "Flexible Subscriptions", desc: "Pause, skip, or cancel anytime" },
  { Icon: Truck, title: "Free Shipping", desc: "On all subscription orders" },
];

export default function UspStrip() {
  return (
    <section className="border-y border-brand-forest/10 bg-white/50">
      <div className="container-page grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
        {ITEMS.map(({ Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center text-center gap-2">
            <Icon className="h-6 w-6 text-brand-terracotta" strokeWidth={1.5} />
            <p className="text-sm font-semibold text-brand-forest">{title}</p>
            <p className="text-xs text-brand-forest/60">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
