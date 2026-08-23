import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Logo({ dark }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-heading text-xl font-semibold tracking-tight ${
        dark ? "text-brand-cream" : "text-brand-forest"
      }`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          dark ? "bg-brand-cream/10" : "bg-brand-forest/10"
        }`}
      >
        <Leaf className={`h-4 w-4 ${dark ? "text-brand-gold" : "text-brand-forest"}`} />
      </span>
      <span>
        Love&nbsp;-N-&nbsp;Living <span className="text-brand-gold">Healthy</span>
      </span>
    </Link>
  );
}
