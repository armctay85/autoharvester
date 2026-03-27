"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Database, LineChart, Filter, Bell, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const steps = [
  {
    icon: Search,
    title: "Search",
    description: "Search thousands of listings with advanced filters. Find exactly what you're looking for.",
    image: "/images/features/search-interface.jpg",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Database,
    title: "Track",
    description: "We continuously monitor prices, tracking every change and sale in real-time.",
    image: "/images/features/price-history.jpg",
    color: "from-purple-500/20 to-pink-500/10",
  },
  {
    icon: LineChart,
    title: "Analyze",
    description: "Compare prices, view depreciation curves, and understand true market value.",
    image: "/images/features/comparison-chart.jpg",
    color: "from-green-500/20 to-emerald-500/10",
  },
  {
    icon: Bell,
    title: "Save",
    description: "Set alerts and never miss a deal. Get notified the moment prices drop.",
    image: "/images/features/alert-notification.jpg",
    color: "from-[#b8956e]/20 to-[#8b7355]/10",
  },
];

const comparisonFeatures = [
  { icon: Filter, text: "Advanced search filters" },
  { icon: CheckCircle, text: "Verified sold prices" },
  { icon: LineChart, text: "Price trend analysis" },
  { icon: Bell, text: "Smart price alerts" },
];

export function HowItWorksSection() {
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
            How It{" "}
            <span className="text-[#b8956e]">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#a0a0a0]"
          >
            A simple four-step process that transforms raw listing data into
            actionable market intelligence.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-[#b8956e]/30 to-transparent" />
              )}
              
              <div className="p-0 rounded-xl bg-[#0a0a0a] border border-white/[0.06] hover:border-[#b8956e]/20 transition-all duration-300 overflow-hidden">
                {/* Step Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${step.color} mix-blend-overlay opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                  
                  {/* Step Number */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#b8956e] flex items-center justify-center text-sm font-bold text-[#0a0a0a]"
                  >
                    {index + 1}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-[#b8956e]/10 flex items-center justify-center mb-4 group-hover:bg-[#b8956e]/20 transition-colors">
                    <step.icon className="w-5 h-5 text-[#b8956e]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#a0a0a0]">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workflow Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto">
              <Image
                src="/images/features/mobile-app.jpg"
                alt="AutoHarvester Mobile App"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent lg:hidden" />
            </div>
            
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                Search → Compare → Save
              </h3>
              <p className="text-[#a0a0a0] mb-6">
                Our intuitive workflow makes it easy to find the perfect car at the right price. 
                Search thousands of listings, compare prices with historical data, and save your favorites.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {comparisonFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#b8956e]/10 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-[#b8956e]" />
                    </div>
                    <span className="text-sm text-[#a0a0a0]">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#ef4444]/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
              <span className="text-sm font-medium text-[#ef4444]">Others</span>
            </div>
            <p className="text-[#a0a0a0]">
              Delete sold prices. Historical data vanishes. Buyers are left guessing what cars actually sold for.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-[#0a0a0a] border border-[#22c55e]/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span className="text-sm font-medium text-[#22c55e]">AutoHarvester</span>
            </div>
            <p className="text-[#a0a0a0]">
              Preserve every price. Archive sold data forever. See the complete price history no one else has.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/how-it-works">
            <Button
              variant="outline"
              className="border-white/[0.15] text-[#f5f5f0] hover:bg-white/5 group"
            >
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
