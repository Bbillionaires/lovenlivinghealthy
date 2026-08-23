import Link from "next/link";
import { AtSign, Mail, Share2 } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-forest text-brand-cream/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo dark />
          <p className="mt-4 max-w-sm text-sm leading-6">
            We source natural herbs and wellness products globally and bring
            them right to your doorstep &mdash; consistently, honestly, and
            with care for the farmers and land they come from.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-brand-cream/10 p-2 transition hover:bg-brand-gold hover:text-brand-forest"
            >
              <AtSign className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-brand-cream/10 p-2 transition hover:bg-brand-gold hover:text-brand-forest"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@lovenlivinghealthy.com"
              aria-label="Email"
              className="rounded-full bg-brand-cream/10 p-2 transition hover:bg-brand-gold hover:text-brand-forest"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-gold">
            Shop
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/plans">Subscription Plans</Link></li>
            <li><Link href="/cart">Your Cart</Link></li>
            <li><Link href="/account">Manage Subscription</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-gold">
            Company
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about">Our Sourcing</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><a href="#">Shipping &amp; Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-cream/10 py-6">
        <p className="container-page text-xs text-brand-cream/50">
          &copy; {new Date().getFullYear()} Love - N - Living Healthy. All
          rights reserved. These statements have not been evaluated by the
          FDA. Our products are not intended to diagnose, treat, cure, or
          prevent any disease.
        </p>
      </div>
    </footer>
  );
}
