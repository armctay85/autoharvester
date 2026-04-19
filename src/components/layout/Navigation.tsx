"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/vehicle-history-report", label: "Vehicle Report" },
  { href: "/concierge", label: "Concierge" },
  { href: "/dealer", label: "Dealers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.08]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              viewBox="0 0 40 40"
              className="w-8 h-8 lg:w-9 lg:h-9 transition-transform duration-300 group-hover:scale-105"
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
              <path
                d="M20 27V32"
                stroke="#b8956e"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 30L20 32L24 30"
                stroke="#b8956e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-lg lg:text-xl font-semibold tracking-tight text-[#f5f5f0]">
              AutoHarvester
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#a0a0a0] hover:text-[#f5f5f0] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#b8956e] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/search">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#a0a0a0] hover:text-[#f5f5f0] hover:bg-white/5"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </Link>
            <Link href="/vehicle-history-report">
              <Button
                size="sm"
                className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-medium"
              >
                Get a $19 report
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-[#f5f5f0]">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-80 bg-[#0a0a0a] border-l border-white/[0.08] p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
                  <span className="text-lg font-semibold text-[#f5f5f0]">
                    AutoHarvester
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-[#a0a0a0]"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <nav className="flex-1 p-4">
                  <ul className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-3 px-4 text-[#a0a0a0] hover:text-[#f5f5f0] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <div className="p-4 border-t border-white/[0.08] space-y-3">
                  <Link href="/search" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-white/[0.15] text-[#f5f5f0] hover:bg-white/5"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search Cars
                    </Button>
                  </Link>
                  <Link href="/vehicle-history-report" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-medium">
                      Get a $19 report
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
