import Link from "next/link";
import { XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <XCircle className="h-16 w-16 text-brand-forest/40" strokeWidth={1.5} />
      <h1 className="mt-6 font-heading text-4xl font-semibold text-brand-forest">
        Checkout canceled
      </h1>
      <p className="mt-3 max-w-md text-brand-forest/70">
        No charge was made. Your cart is still saved whenever you&apos;re
        ready to check out.
      </p>
      <Link
        href="/cart"
        className="mt-8 rounded-full bg-brand-terracotta px-7 py-3 text-sm font-semibold text-white"
      >
        Return to Cart
      </Link>
    </div>
  );
}
