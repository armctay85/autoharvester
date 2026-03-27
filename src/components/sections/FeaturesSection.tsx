"use client";

import { motion } from "framer-motion";
import {
  TrendingDown,
  Database,
  LineChart,
  Bell,
  FileText,
  ArrowRight,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
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
    color: "from-red-500/20 to-orange-500/10",
  },
  {
    icon: Database,
    title: "Sold Price Database",
    description: "Access the largest database of sold car prices in Australia. Know what cars actually sold for.",
    highlight: "500,000+ sold vehicles",
    demo: "sold",
    image: "/images/features/sold-database.jpg",
    color: "from-green-500/20 to-emerald-500/10",
  },
  {
    icon: LineChart,
    title: "Market Trends",
    description: "Analyze depreciation curves by make, model, and year. Understand the true market value of any vehicle.",
    highlight: "Data-driven insights",
    demo: "trends",
    image: "/images/features/market-trend.jpg",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description: "Get notified when prices drop on cars you're watching. Be the first to know about deals.",
    highlight: "Real-time notifications",
    demo: "alerts",
    image: "/images/features/alert-notification.jpg",
    color: "from-yellow-500/20 to-amber-500/10",
  },
  {
    icon: Car,
    title: "Car Comparison",
    description: "Compare specs, prices, and value side-by-side. Make informed decisions with our comparison tool.",
    highlight: "Side-by-side analysis",
    demo: "compare",
    image: "/images/features/car-comparison.jpg",
    color: "from-purple-500/20 to-pink-500/10",
  },
  {
    icon: FileText,
    title: "Market Reports",
    description: "Monthly intelligence reports on market movements, hot models, and pricing predictions.",
    highlight: "Expert analysis",
    demo: "reports",
    image: "/images/features/price-chart.jpg",
    color: "from-[#b8956e]/20 to-[#8b7355]/10",
  },
];

function FeatureDemo({ type }: { type: string }) {
  switch (type) {
    case "chart":
      return (
        <div className="mt-6">
          <PriceHistoryChart
            data={samplePriceHistory}
            currentPrice={61900}
            originalPrice={68500}
            height={280}
          />
        </div>
      );
    case "trends":
      return (
        <div className="mt-6 space-y-4">
          <DepreciationChart data={depreciationData} height={250} />
          <div className="grid grid-cols-2 gap-4">
            <BestTimeToBuyChart data={bestTimeData} />
            <PriceDistributionChart data={priceDistributionData} />
          </div>
        </div>
      );
    case "alerts":
      return (
        <div className="mt-6">
          <PriceAlertCreator
            car={{ make: "Tesla", model: "Model 3", currentPrice: 61900 }}
          />
        </div>
      );
    case "compare":
      return (
        <div className="mt-6">
          <CarComparison car1={car1} car2={car2} />
        </div>
      );
    case "sold":
      return (
        <div className="mt-6 bg-[#0a0a0a] rounded-xl p-6 border border-white/[0.06]">
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
            <div className="h-full w-3/4 bg-gradient-to-r from-[#b8956e] to-green-500 rounded-full" />
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Days Listed", value: "217" },
              { label: "Price Drops", value: "3" },
              { label: "Final vs List", value: "-12.7%" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[#f5f5f0] font-semibold">{stat.value}</p>
                <p className="text-[#666666] text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "reports":
      return (
        <div className="mt-6 bg-[#0a0a0a] rounded-xl p-6 border border-white/[0.06]">
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
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b8956e]" />
                <p className="text-[#a0a0a0] text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f0] mb-4"
          >
            Powerful{" "}
            <span className="text-[#b8956e]">Features</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#a0a0a0]"
          >
            Everything you need to make informed car buying and selling decisions.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl bg-[#141414] border border-white/[0.06] hover:border-[#b8956e]/20 transition-all duration-300 overflow-hidden"
            >
              {/* Feature Image */}
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[#0a0a0a]/90 backdrop-blur-sm flex items-center justify-center border border-white/10">
                  <feature.icon className="w-6 h-6 text-[#b8956e]" />
                </div>
                
                {/* Highlight Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#b8956e]/90 text-[#0a0a0a] backdrop-blur-sm">
                    {feature.highlight}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#a0a0a0] mb-4">{feature.description}</p>
                  <FeatureDemo type={feature.demo} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/features">
            <Button
              variant="outline"
              className="border-white/[0.15] text-[#f5f5f0] hover:bg-white/5 group"
            >
              Explore All Features
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
