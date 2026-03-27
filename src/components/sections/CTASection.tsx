"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-[#141414] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b8956e]/20 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b8956e]/10 border border-[#b8956e]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#b8956e]" />
            <span className="text-sm text-[#b8956e]">Start your free trial today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f0] mb-4">
            Ready to See What Cars{" "}
            <span className="text-[#b8956e]">Actually Sold For?</span>
          </h2>

          <p className="text-lg text-[#a0a0a0] mb-8 max-w-2xl mx-auto">
            Join 12,000+ smart car buyers and sellers who use AutoHarvester to make
            informed decisions. Start free, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold px-8 h-12 text-base group"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/[0.15] text-[#f5f5f0] hover:bg-white/5 px-8 h-12 text-base"
            >
              View Demo
            </Button>
          </div>

          <p className="mt-6 text-sm text-[#666666]">
            No credit card required. 14-day free trial.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
