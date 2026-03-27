"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Zap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for occasional buyers",
    icon: Zap,
    features: [
      "Basic search",
      "Limited price history (30 days)",
      "View 5 sold prices/month",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
    color: "from-gray-500/20 to-gray-600/10",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For serious buyers and sellers",
    icon: Sparkles,
    features: [
      "Advanced search filters",
      "Full price history",
      "Unlimited sold prices",
      "Price drop alerts",
      "Monthly market reports",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "from-[#b8956e]/20 to-[#8b7355]/10",
  },
  {
    name: "Dealer",
    price: "$299",
    period: "/month",
    description: "For dealerships and professionals",
    icon: Building2,
    features: [
      "Everything in Pro",
      "API access",
      "Bulk data exports",
      "Advanced analytics",
      "White-label reports",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
    color: "from-purple-500/20 to-purple-600/10",
  },
];

export function PricingSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f0] mb-4"
          >
            Simple{" "}
            <span className="text-[#b8956e]">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#a0a0a0]"
          >
            Choose the plan that fits your needs. Start free, upgrade when you&apos;re ready.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl border transition-all duration-300 overflow-hidden ${
                plan.popular
                  ? "bg-[#0a0a0a] border-[#b8956e]/30 scale-105 shadow-lg shadow-[#b8956e]/5"
                  : "bg-[#0a0a0a] border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-30`} />
              
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-[#b8956e] text-[#0a0a0a] hover:bg-[#c9a67f]">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="relative p-6 lg:p-8">
                {/* Plan Icon & Name */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    plan.popular 
                      ? "bg-[#b8956e]/20" 
                      : "bg-white/5"
                  }`}>
                    <plan.icon className={`w-7 h-7 ${
                      plan.popular ? "text-[#b8956e]" : "text-[#a0a0a0]"
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-[#f5f5f0]">{plan.name}</h3>
                    <p className="text-sm text-[#666666]">{plan.description}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#f5f5f0]">{plan.price}</span>
                  <span className="text-[#666666]">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.popular 
                          ? "bg-[#b8956e]/20" 
                          : "bg-green-500/10"
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.popular ? "text-[#b8956e]" : "text-green-500"
                        }`} />
                      </div>
                      <span className="text-sm text-[#a0a0a0]">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold"
                      : "bg-white/[0.05] hover:bg-white/10 text-[#f5f5f0]"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: Check, text: "No credit card required" },
            { icon: Check, text: "Cancel anytime" },
            { icon: Check, text: "14-day free trial" },
            { icon: Check, text: "24/7 support" },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#0a0a0a] border border-white/[0.06]"
            >
              <item.icon className="w-4 h-4 text-green-500" />
              <span className="text-sm text-[#a0a0a0]">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/pricing">
            <Button
              variant="outline"
              className="border-white/[0.15] text-[#f5f5f0] hover:bg-white/5 group"
            >
              Compare All Plans
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
