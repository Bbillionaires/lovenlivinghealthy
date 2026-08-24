import Image from "next/image";
import Link from "next/link";

export default function Logo({ dark }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 font-heading text-xl font-semibold tracking-tight ${
        dark ? "text-brand-cream" : "text-brand-forest"
      }`}
    >
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-sm">
        <Image
          src="/logo.jpg"
          alt="Love - N - Living Healthy"
          width={44}
          height={44}
          className="h-full w-full rounded-lg object-cover"
        />
      </span>
      <span>
        Love&nbsp;-N-&nbsp;Living <span className="text-brand-gold">Healthy</span>
      </span>
    </Link>
  );
}
