import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/lib/products";
import { CartItem } from "@/lib/types";
import { discountedCents } from "@/lib/format";

export async function POST(req: NextRequest) {
  let items: CartItem[];
  try {
    const body = await req.json();
    items = body.items;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const hasSubscription = items.some((i) => i.purchaseType === "subscription");
  const mode: "subscription" | "payment" = hasSubscription ? "subscription" : "payment";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of items) {
    const product = getProductById(item.productId);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product: ${item.productId}` },
        { status: 400 }
      );
    }

    const isSubscription = item.purchaseType === "subscription";
    const unitAmount = isSubscription
      ? discountedCents(product.priceCents, item.discountPercent ?? 0)
      : product.priceCents;

    const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
      currency: "usd",
      unit_amount: unitAmount,
      product_data: {
        name: product.name,
        description: `${product.sizeLabel}${
          isSubscription ? ` · delivered ${item.intervalLabel}` : ""
        }`,
      },
      ...(isSubscription
        ? {
            recurring: {
              interval: item.interval === "week" ? "week" : "month",
              interval_count: item.intervalCount ?? 1,
            },
          }
        : {}),
    };

    lineItems.push({
      price_data: priceData,
      quantity: item.quantity,
    });
  }

  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      ...(mode === "subscription" ? { billing_address_collection: "auto" } : {}),
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error", err);
    const message =
      err instanceof Error ? err.message : "Unable to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
