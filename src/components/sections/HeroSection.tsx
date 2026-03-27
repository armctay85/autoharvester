"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, Database, Bell, BarChart3, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

const features = [
  { icon: Database, label: "Price History Archive" },
  { icon: BarChart3, label: "Market Trends" },
  { icon: Bell, label: "Price Drop Alerts" },
  { icon: TrendingDown, label: "Sold Price Database" },
];

// Sample price history for the hero chart
const priceHistoryData = [
  { month: "Aug", price: 68500, label: "Listed" },
  { month: "Sep", price: 68500, label: "" },
  { month: "Oct", price: 65900, label: "-$2,600" },
  { month: "Nov", price: 65900, label: "" },
  { month: "Dec", price: 63900, label: "-$2,000" },
  { month: "Jan", price: 63900, label: "" },
  { month: "Feb", price: 61900, label: "-$2,000" },
  { month: "Mar", price: 59800, label: "Final" },
];

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return count;
}

export function HeroSection() {
  const listingsCount = useAnimatedCounter(5247);
  const avgDiscount = useAnimatedCounter(12);

  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { label: string; month: string } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1a1a1a] border border-[#b8956e]/30 rounded-lg p-3 shadow-xl">
          <p className="text-[#a0a0a0] text-xs mb-1">{data.month} 2024</p>
          <p className="text-[#f5f5f0] text-lg font-semibold">{formatCurrency(payload[0].value)}</p>
          {data.label && data.label.startsWith("-") && (
            <p className="text-red-400 text-xs">{data.label}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#b8956e]/5 via-transparent to-transparent" />
        
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b8956e]/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b8956e]/20 rounded-full blur-[120px]"
        />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(184, 149, 110, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184, 149, 110, 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-2 text-xs font-medium border-[#b8956e]/30 text-[#b8956e] bg-[#b8956e]/5"
              >
                Now tracking {listingsCount.toLocaleString()}+ sold vehicles across Australia
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f5f0] mb-6"
            >
              See What Cars{" "}
              <span className="text-[#b8956e]">Actually</span>{" "}
              Sold For
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#a0a0a0] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Unlike Carsales that removes prices once sold, we preserve the data.
              Track price history, market trends, and depreciation curves to make
              smarter buying and selling decisions.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              {[
                { value: `${avgDiscount}%`, label: "Avg. Discount" },
                { value: "38", label: "Days Listed" },
                { value: "500K+", label: "Data Points" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-[#f5f5f0]">{stat.value}</div>
                  <div className="text-xs text-[#666666]">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <Button
                size="lg"
                className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold px-8 h-12 text-base group"
              >
                Start Searching
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/[0.15] text-[#f5f5f0] hover:bg-white/5 px-8 h-12 text-base"
              >
                Join Waitlist
              </Button>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-[#b8956e]/20 transition-colors"
                >
                  <feature.icon className="w-4 h-4 text-[#b8956e]" />
                  <span className="text-sm text-[#a0a0a0]">{feature.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Chart Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-[#141414] rounded-2xl border border-white/[0.06] p-6 shadow-2xl shadow-black/50">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-[#b8956e]/10 text-[#b8956e] border-[#b8956e]/20">
                      Live Example
                    </Badge>
                  </div>
                  <h3 className="text-[#f5f5f0] font-semibold">Tesla Model 3 Performance</h3>
                  <p className="text-[#666666] text-sm">2023 • Price History</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-red-400 text-sm">
                    <TrendingDown className="w-4 h-4" />
                    -12.7%
                  </div>
                  <p className="text-[#f5f5f0] font-bold text-xl">$59,800</p>
                </div>
              </div>

              {/* Chart */}
              <div className="h-[200px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={priceHistoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="heroChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b8956e" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#b8956e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <YAxis
                      hide
                      domain={[58000, 70000]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      y={59800}
                      stroke="#22c55e"
                      strokeDasharray="5 5"
                      strokeWidth={1}
                      label={{ value: "Sold", fill: "#22c55e", fontSize: 10, position: "right" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#b8956e"
                      strokeWidth={3}
                      fill="url(#heroChartGradient)"
                      dot={{ fill: "#b8956e", strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, fill: "#b8956e", stroke: "#0a0a0a", strokeWidth: 2 }}
                      animationDuration={2500}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Price Markers */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Listed", value: "$68,500", change: "" },
                  { label: "Price Drops", value: "3", change: "-$6,700" },
                  { label: "Sold For", value: "$59,800", change: "-12.7%" },
                ].map((item) => (
                  <div key={item.label} className="text-center p-3 bg-[#0a0a0a] rounded-lg">
                    <p className="text-[#666666] text-xs mb-1">{item.label}</p>
                    <p className="text-[#f5f5f0] font-semibold">{item.value}</p>
                    {item.change && (
                      <p className="text-red-400 text-xs">{item.change}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Insight Cards */}
              <div className="space-y-2">
                {[
                  { icon: Clock, text: "Listed for 217 days before selling" },
                  { icon: CheckCircle2, text: "Sold for $8,700 less than asking" },
                  { icon: TrendingDown, text: "Price dropped 3 times over listing period" },
                ].map((insight, index) => (
                  <motion.div
                    key={insight.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.15 }}
                    className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg border border-white/[0.03]"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#b8956e]/10 flex items-center justify-center flex-shrink-0">
                      <insight.icon className="w-4 h-4 text-[#b8956e]" />
                    </div>
                    <span className="text-[#a0a0a0] text-sm">{insight.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Glow effect */}
              <div className="absolute -inset-1 bg-[#b8956e]/5 rounded-2xl blur-2xl -z-10" />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-[#1a1a1a] rounded-xl border border-white/[0.06] p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-[#f5f5f0] font-semibold text-sm">Verified Sale</p>
                  <p className="text-[#666666] text-xs">Sold price confirmed</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 pt-8 border-t border-white/[0.06] text-center"
        >
          <p className="text-xs text-[#666666] uppercase tracking-wider mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12 opacity-40">
            {["CarAdvice", "Drive", "Wheels", "Motoring", "Carsales"].map((brand) => (
              <span
                key={brand}
                className="text-sm md:text-base font-medium text-[#a0a0a0]"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}

export default HeroSection;
