# Love - N - Living Healthy

A subscription e-commerce site for Love - N - Living Healthy, a brand that
sources natural herbs and wellness products globally and ships them direct
to customers. Built with Next.js (App Router), TypeScript, Tailwind CSS,
and Stripe.

## Features

- Product catalog across six categories (teas, superfood powders,
  adaptogens, immune support, essential oils, and curated wellness bundles)
- Every product can be bought one-time or as a subscription (every 4, 8, or
  12 weeks) at a discount, via `src/components/PurchaseOptions.tsx`
- Cart persisted in the browser (Zustand + localStorage) at `/cart`
- Stripe Checkout for both one-time payments and recurring subscriptions,
  built with inline `price_data` so no product/price catalog needs to be
  pre-created in the Stripe Dashboard (`src/app/api/checkout/route.ts`)
- Self-serve subscription management via the Stripe Billing Portal,
  looked up by email at `/account` (`src/app/api/portal/route.ts`)
- Stripe webhook endpoint stub for order fulfillment / lifecycle events
  (`src/app/api/webhook/route.ts`)
- Marketing pages: home, shop with category filters, product detail,
  subscription plans, brand story ("Our Sourcing"), and contact form

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # then fill in your Stripe keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuring Stripe

1. Create a [Stripe](https://stripe.com) account and grab your test API
   keys from the [Dashboard](https://dashboard.stripe.com/apikeys).
2. Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to
   `.env.local`.
3. To receive webhooks locally, run the Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook
   ```
   and copy the printed signing secret into `STRIPE_WEBHOOK_SECRET`.
4. In production, create a webhook endpoint in the Stripe Dashboard
   pointing at `https://yourdomain.com/api/webhook`, subscribed at minimum
   to `checkout.session.completed`, `customer.subscription.deleted`, and
   `invoice.payment_failed`.

No products or prices need to be created in the Stripe Dashboard — the
catalog lives in `src/lib/products.ts` and prices are sent to Stripe via
`price_data` at checkout time.

## Project structure

```
src/
  app/            Routes (home, shop, plans, about, contact, cart, account,
                   checkout success/cancel, and API routes)
  components/      UI building blocks (Header, Footer, ProductCard,
                   PurchaseOptions, etc.)
  lib/             Product data, cart store, formatting helpers, Stripe client
```

## Next steps for production

- Swap `src/lib/products.ts` for a real database (e.g. Supabase) once you
  need inventory, images, or admin editing.
- Wire `/api/contact` and `/api/newsletter` up to an email provider or CRM.
- Add real product photography in place of the generated `ProductVisual`
  placeholders.
- Add customer accounts/auth if you want order history beyond the Stripe
  Billing Portal.
