import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Contact Us | AutoHarvester",
  description:
    "Get in touch with the AutoHarvester team. We're here to help with any questions about our platform, pricing, or data.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@autoharvester.com.au",
    href: "mailto:hello@autoharvester.com.au",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+61 3 9000 0000",
    href: "tel:+61390000000",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Melbourne, Australia",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri 9am-6pm AEDT",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f5f5f0] mb-6">
            Get in{" "}
            <span className="text-[#b8956e]">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#a0a0a0]">
            Have a question or feedback? We&apos;d love to hear from you. Our team
            typically responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-2xl bg-[#141414] border border-white/[0.06]">
              <h2 className="text-xl font-semibold text-[#f5f5f0] mb-6">
                Send us a message
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#a0a0a0] mb-2">
                      First Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John"
                      className="bg-[#0a0a0a] border-white/[0.1] text-[#f5f5f0] placeholder:text-[#666666] focus:border-[#b8956e]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#a0a0a0] mb-2">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Doe"
                      className="bg-[#0a0a0a] border-white/[0.1] text-[#f5f5f0] placeholder:text-[#666666] focus:border-[#b8956e]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#a0a0a0] mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="bg-[#0a0a0a] border-white/[0.1] text-[#f5f5f0] placeholder:text-[#666666] focus:border-[#b8956e]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#a0a0a0] mb-2">
                    Subject
                  </label>
                  <select className="w-full px-3 py-2 rounded-md bg-[#0a0a0a] border border-white/[0.1] text-[#f5f5f0] focus:outline-none focus:border-[#b8956e]/50">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales / Enterprise</option>
                    <option value="partners">Partnerships</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#a0a0a0] mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="bg-[#0a0a0a] border-white/[0.1] text-[#f5f5f0] placeholder:text-[#666666] focus:border-[#b8956e]/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-start gap-4 p-4 rounded-xl bg-[#141414] border border-white/[0.06] hover:border-[#b8956e]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#b8956e]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b8956e]/20 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-[#b8956e]" />
                </div>
                <div>
                  <p className="text-sm text-[#666666] mb-1">{item.label}</p>
                  <p className="text-[#f5f5f0] font-medium">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Social Links */}
            <div className="p-6 rounded-xl bg-[#141414] border border-white/[0.06]">
              <h3 className="text-sm font-medium text-[#a0a0a0] mb-4">
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-[#a0a0a0] hover:text-[#b8956e] hover:bg-[#b8956e]/10 transition-colors"
                  >
                    <span className="text-xs">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ Link */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#b8956e]/10 to-transparent border border-[#b8956e]/20">
              <h3 className="text-[#f5f5f0] font-medium mb-2">
                Need quick answers?
              </h3>
              <p className="text-sm text-[#a0a0a0] mb-4">
                Check our FAQ section for common questions about pricing,
                features, and getting started.
              </p>
              <a
                href="/pricing"
                className="text-sm text-[#b8956e] hover:underline"
              >
                View FAQs →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
