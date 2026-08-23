import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ClearCartOnMount from "@/components/ClearCartOnMount";

export default function CheckoutSuccessPage() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <ClearCartOnMount />
      <CheckCircle2 className="h-16 w-16 text-brand-terracotta" strokeWidth={1.5} />
      <h1 className="mt-6 font-heading text-4xl font-semibold text-brand-forest">
        Thank you for your order!
      </h1>
      <p className="mt-3 max-w-md text-brand-forest/70">
        A confirmation email is on its way. If you started a subscription,
        you can manage its frequency or cancel anytime from your account.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/account"
          className="rounded-full bg-brand-forest px-7 py-3 text-sm font-semibold text-brand-cream"
        >
          Manage Subscription
        </Link>
        <Link
          href="/shop"
          className="rounded-full border border-brand-forest/20 px-7 py-3 text-sm font-semibold text-brand-forest"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
