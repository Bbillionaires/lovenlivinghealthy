export type ProductCategory =
  | "Herbal Teas"
  | "Superfood Powders"
  | "Immune Support"
  | "Adaptogens"
  | "Essential Oils"
  | "Wellness Bundles";

export type SubscriptionInterval = {
  label: string;
  interval: "week" | "month";
  intervalCount: number;
  discountPercent: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  origin: string;
  benefits: string[];
  ingredients: string[];
  priceCents: number;
  sizeLabel: string;
  accent: string;
  badge?: string;
};

export type PurchaseType = "one-time" | "subscription";

export type CartItem = {
  productId: string;
  purchaseType: PurchaseType;
  intervalLabel?: string;
  interval?: "week" | "month";
  intervalCount?: number;
  discountPercent?: number;
  quantity: number;
};
