import { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Love - N - Living Healthy",
  description: "Get in touch with the Love - N - Living Healthy team.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-moss">
          We&apos;d love to hear from you
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold text-brand-forest">
          Contact Us
        </h1>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="flex gap-3">
            <Mail className="h-5 w-5 flex-shrink-0 text-brand-terracotta" />
            <div>
              <p className="font-semibold text-brand-forest">Email</p>
              <p className="text-sm text-brand-forest/70">
                hello@lovenlivinghealthy.com
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 flex-shrink-0 text-brand-terracotta" />
            <div>
              <p className="font-semibold text-brand-forest">Studio</p>
              <p className="text-sm text-brand-forest/70">Austin, Texas, USA</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 flex-shrink-0 text-brand-terracotta" />
            <div>
              <p className="font-semibold text-brand-forest">Response time</p>
              <p className="text-sm text-brand-forest/70">
                Within 1-2 business days
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
