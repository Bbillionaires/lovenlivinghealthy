import { Leaf, Flower2, Sprout, Droplet, Package, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";

const CATEGORY_ICON: Record<Product["category"], typeof Leaf> = {
  "Herbal Teas": Flower2,
  "Superfood Powders": Sprout,
  "Immune Support": Sparkles,
  Adaptogens: Leaf,
  "Essential Oils": Droplet,
  "Wellness Bundles": Package,
};

export default function ProductVisual({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const Icon = CATEGORY_ICON[product.category] ?? Leaf;
  return (
    <div
      className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${product.accent} ${className}`}
    >
      <div className="absolute inset-0 opacity-20 mix-blend-overlay [background-image:radial-gradient(circle_at_30%_20%,white,transparent_45%)]" />
      <Icon className="h-12 w-12 text-white/90 drop-shadow-sm" strokeWidth={1.5} />
      {product.badge && (
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-forest shadow-sm">
          {product.badge}
        </span>
      )}
    </div>
  );
}
