"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AtSign, Globe, Code, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "API", href: "#" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Data Sources", href: "#" },
  ],
};

const socialLinks = [
  { icon: AtSign, href: "#", label: "Social" },
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: Code, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <svg
                  viewBox="0 0 40 40"
                  className="w-8 h-8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="19" stroke="#b8956e" strokeWidth="2" />
                  <path
                    d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20"
                    stroke="#b8956e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="20" cy="24" r="3" fill="#b8956e" />
                  <path d="M20 27V32" stroke="#b8956e" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M16 30L20 32L24 30"
                    stroke="#b8956e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl font-semibold text-[#f5f5f0]">
                  AutoHarvester
                </span>
              </Link>
              <p className="text-[#a0a0a0] text-sm max-w-xs mb-6">
                The largest database of sold car prices in Australia. See what cars
                actually sold for, not just what they&apos;re listed at.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-[#a0a0a0] hover:text-[#b8956e] hover:border-[#b8956e]/30 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[#f5f5f0] font-medium mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#a0a0a0] hover:text-[#f5f5f0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#f5f5f0] font-medium mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#a0a0a0] hover:text-[#f5f5f0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#f5f5f0] font-medium mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#a0a0a0] hover:text-[#f5f5f0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="bg-white/[0.08]" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#666666]">
            © {new Date().getFullYear()} AutoHarvester. All rights reserved.
          </p>
          <p className="text-sm text-[#666666]">
            Part of the{" "}
            <a
              href="https://develoop.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b8956e] hover:underline"
            >
              Develoop
            </a>{" "}
            family
          </p>
        </div>
      </div>
    </footer>
  );
}
