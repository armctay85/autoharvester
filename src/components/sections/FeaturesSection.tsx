"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  TrendingDown,
  Database,
  LineChart,
  Bell,
  FileText,
  ArrowRight,
  Car,
  Sparkles,
  Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TiltCard, GlassCard } from "@/components/interactions/TiltCard";
import { RippleButton } from "@/components/interactions/RippleButton";
import { GradientText, RevealText } from "@/components/animations/TextAnimations";
import { FadeInView, StaggerContainer, StaggerItem, Parallax } from "@/components/animations/ScrollAnimations";
import { MagneticWrapper } from "@/components/interactions/MagneticButton";
import { PriceHistoryChart } from "@/components/charts/PriceHistoryChart";
import { DepreciationChart, BestTimeToBuyChart, PriceDistributionChart } from "@/components/charts/MarketTrendsCharts";
import { CarComparison } from "@/components/charts/CarComparison";
import { PriceAlertCreator } from "@/components/charts/PriceAlertCreator";
import listingsData from "@/data/demo-listings.json";

const samplePriceHistory = [
  { date: "2024-08-15", price: 68500 },
  { date: "2024-10-20", price: 65900 },
  { date: "2024-12-05", price: 63900 },
  { date: "2025-02-18", price: 61900 },
];

const depreciationData = [
  { brand: "Porsche", year1: 12, year2: 18, year3: 24, year4: 28, year5: 32 },
  { brand: "Lexus", year1: 14, year2: 22, year3: 28, year4: 34, year5: 38 },
  { brand: "Toyota", year1: 12, year2: 20, year3: 26, year4: 32, year5: 36 },
  { brand: "Tesla", year1: 15, year2: 25, year3: 32, year4: 38, year5: 42 },
  { brand: "Mazda", year1: 16, year2: 25, year3: 32, year4: 38, year5: 42 },
  { brand: "Kia", year1: 18, year2: 28, year3: 35, year4: 41, year5: 46 },
  { brand: "BMW", year1: 22, year2: 35, year3: 42, year4: 48, year5: 52 },
  { brand: "Mercedes-Benz", year1: 20, year2: 32, year3: 40, year4: 46, year5: 50 },
  { brand: "Audi", year1: 24, year2: 36, year3: 44, year4: 50, year5: 54 },
];

const bestTimeData = [
  { month: "January", score: 92 },
  { month: "February", score: 94 },
  { month: "March", score: 96 },
  { month: "April", score: 97 },
  { month: "May", score: 98 },
  { month: "June", score: 95 },
  { month: "July", score: 93 },
  { month: "August", score: 94 },
  { month: "September", score: 96 },
  { month: "October", score: 98 },
  { month: "November", score: 100 },
  { month: "December", score: 88 },
];

const priceDistributionData = [
  { range: "Under $30k", percentage: 18 },
  { range: "$30k - $50k", percentage: 28 },
  { range: "$50k - $75k", percentage: 24 },
  { range: "$75k - $100k", percentage: 16 },
  { range: "$100k - $150k", percentage: 10 },
  { range: "$150k+", percentage: 4 },
];

const car1 = {
  make: "BMW",
  model: "330i",
  year: 2022,
  price: 58900,
  image: "/images/cars/bmw-3-series.jpg",
  specs: {
    Price: 58900,
    Odometer: "42k km",
    "Fuel Type": "Petrol",
    Transmission: "Auto",
    Features: 12,
    Location: "Melbourne",
  },
};

const car2 = {
  make: "Mercedes",
  model: "C300",
  year: 2022,
  price: 68900,
  image: "/images/cars/mercedes-c-class.jpg",
  specs: {
    Price: 68900,
    Odometer: "29k km",
    "Fuel Type": "Petrol",
    Transmission: "Auto",
    Features: 15,
    Location: "Perth",
  },
};

const features = [
  {
    icon: TrendingDown,
    title: "Price History",
    description: "See every price change a vehicle has had. Track how long it was listed and when the price dropped.",
    highlight: "Never miss a price drop",
    demo: "chart",
    image: "/images/features/price-history.jpg",
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    stats: [
      { label: "Avg. Drops", value: "2.3x" },
      { label: "Price Cut", value: "8.5%" },
    ],
  },
  {
    icon: Database,
    title: "Sold Price Database",
    description: "Access the largest database of sold car prices in Australia. Know what cars actually sold for.",
    highlight: "500,000+ sold vehicles",
    demo: "sold",
    image: "/images/features/sold-database.jpg",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    stats: [
      { label: "Records", value: "500K+" },
      { label: "Updated", value: "Daily" },
    ],
  },
  {
    icon: LineChart,
    title: "Market Trends",
    description: "Analyze depreciation curves by make, model, and year. Understand the true market value of any vehicle.",
    highlight: "Data-driven insights",
    demo: "trends",
    image: "/images/features/market-trend.jpg",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    stats: [
      { label: "Makes", value: "48+" },
      { label: "Models", value: "340+" },
    ],
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description: "Get notified when prices drop on cars you're watching. Be the first to know about deals.",
    highlight: "Real-time notifications",
    demo: "alerts",
    image: "/images/features/alert-notification.jpg",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    stats: [
      { label: "Avg. Response", value: "<2min" },
      { label: "Success Rate", value: "94%" },
    ],
  },
  {
    icon: Car,
    title: "Car Comparison",
    description: "Compare specs, prices, and value side-by-side. Make informed decisions with our comparison tool.",
    highlight: "Side-by-side analysis",
    demo: "compare",
    image: "/images/features/car-comparison.jpg",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    stats: [
      { label: "Comparisons", value: "∞" },
      { label: "Metrics", value: "24+" },
    ],
  },
  {
    icon: FileText,
    title: "Market Reports",
    description: "Monthly intelligence reports on market movements, hot models, and pricing predictions.",
    highlight: "Expert analysis",
    demo: "reports",
    image: "/images/features/price-chart.jpg",
    gradient: "from-[#b8956e]/20 via-[#8b7355]/10 to-transparent",
    stats: [
      { label: "Reports", value: "12/mo" },
      { label: "Accuracy", value: "92%" },
    ],
  },
];

function FeatureDemo({ type }: { type: string }) {
  switch (type) {
    case "chart":
      return (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <PriceHistoryChart
            data={samplePriceHistory}
            currentPrice={61900}
            originalPrice={68500}
            height={280}
          />
        </motion.div>
      );
    case "trends":
      return (
        <motion.div 
          className="mt-6 space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <DepreciationChart data={depreciationData} height={250} />
          <div className="grid grid-cols-2 gap-4">
            <BestTimeToBuyChart data={bestTimeData} />
            <PriceDistributionChart data={priceDistributionData} />
          </div>
        </motion.div>
      );
    case "alerts":
      return (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <PriceAlertCreator
            car={{ make: "Tesla", model: "Model 3", currentPrice: 61900 }}
          />
        </motion.div>
      );
    case "compare":
      return (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <CarComparison car1={car1} car2={car2} />
        </motion.div>
      );
    case "sold":
      return (
        <motion.div 
          className="mt-6 bg-[#0a0a0a] rounded-xl p-6 border border-white/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-[#f5f5f0] font-semibold">Sold Price Verified</p>
                <p className="text-[#666666] text-sm">2023 Tesla Model 3</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#f5f5f0]">$59,800</p>
              <p className="text-red-400 text-sm">-$8,700 from list</p>
            </div>
          </div>
          <div className="h-2 bg-[#141414] rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#b8956e] to-green-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "75%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Days Listed", value: "217" },
              { label: "Price Drops", value: "3" },
              { label: "Final vs List", value: "-12.7%" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <p className="text-[#f5f5f0] font-semibold">{stat.value}</p>
                <p className="text-[#666666] text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    case "reports":
      return (
        <motion.div 
          className="mt-6 bg-[#0a0a0a] rounded-xl p-6 border border-white/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#b8956e]/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#b8956e]" />
            </div>
            <div>
              <p className="text-[#f5f5f0] font-semibold">March 2025 Market Report</p>
              <p className="text-[#666666] text-sm">Published 3 days ago</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              "EV prices down 8% year-over-year",
              "Luxury sedans seeing strongest depreciation",
              "Toyota RAV4 remains best value retention",
              "Best time to buy: December (historically)",
            ].map((insight, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#b8956e]" />
                <p className="text-[#a0a0a0] text-sm">{insight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    default:
      return null;
  }
}

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]"
        style={{ y: backgroundY }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-32 w-64 h-64 bg-[#b8956e]/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#b8956e]/5 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeInView>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b8956e]/10 border border-[#b8956e]/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-[#b8956e]" />
              <span className="text-sm font-medium text-[#b8956e]">Powerful Tools</span>
            </motion.div>
          </FadeInView>

          <RevealText direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f0] mb-4">
              Everything You Need to{" "}
              <GradientText>Win</GradientText>
            </h2>
          </RevealText>

          <RevealText direction="up" delay={0.2}>
            <p className="text-lg text-[#a0a0a0]">
              Professional-grade tools that give you the edge in negotiations. 
              Know more than the seller.
            </p>
          </RevealText>
        </div>

        {/* Features Grid with 3D Cards */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16" staggerDelay={0.15}>
          {features.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <TiltCard tiltAmount={8} glareOpacity={0.1} scale={1.01}>
                <div className="group relative p-6 rounded-2xl bg-[#141414]/80 backdrop-blur-xl border border-white/[0.06] overflow-hidden hover:border-[#b8956e]/20 transition-all duration-500"
                >
                  {/* Animated gradient background */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} 
                  />

                  {/* Feature Image */}
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} mix-blend-overlay opacity-60`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                    
                    {/* Icon Badge */}
                    <motion.div 
                      className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[#0a0a0a]/90 backdrop-blur-sm flex items-center justify-center border border-white/10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <feature.icon className="w-6 h-6 text-[#b8956e]" />
                    </motion.div>
                    
                    {/* Highlight Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-[#b8956e] text-[#0a0a0a] backdrop-blur-sm">
                        <Sparkles className="w-3 h-3" />
                        {feature.highlight}
                      </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                      {feature.stats.map((stat, i) => (
                        <div 
                          key={stat.label}
                          className="flex-1 px-3 py-2 rounded-lg bg-[#0a0a0a]/80 backdrop-blur-sm border border-white/[0.06]"
                        >
                          <p className="text-[#f5f5f0] font-bold text-sm">{stat.value}</p>
                          <p className="text-[#666666] text-[10px] uppercase tracking-wider">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-[#f5f5f0] mb-2 group-hover:text-[#b8956e] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#a0a0a0] mb-4">{feature.description}</p>
                    <FeatureDemo type={feature.demo} />
                  </div>

                  {/* Hover glow */}
                  <div className="absolute -inset-px bg-gradient-to-r from-[#b8956e]/0 via-[#b8956e]/10 to-[#b8956e]/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeInView delay={0.3}>
          <div className="text-center">
            <MagneticWrapper>
              <Link href="/features">
                <RippleButton className="group inline-flex items-center gap-2 px-8 py-4 border border-white/[0.15] text-[#f5f5f0] hover:bg-white/5 rounded-xl transition-all">
                  Explore All Features
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </RippleButton>
              </Link>
            </MagneticWrapper>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

export default FeaturesSection;
