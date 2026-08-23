"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import Logo from "./Logo";
import { useCartCount } from "@/lib/store";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/plans", label: "Subscription Plans" },
  { href: "/about", label: "Our Sourcing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const count = useCartCount();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-forest/10 bg-brand-cream/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-forest/80 transition hover:text-brand-terracotta"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center gap-1 rounded-full border border-brand-forest/15 px-3 py-2 text-sm font-medium text-brand-forest transition hover:border-brand-terracotta hover:text-brand-terracotta"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-terracotta text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-forest/10 bg-brand-cream md:hidden">
          <div className="container-page flex flex-col gap-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-forest/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
