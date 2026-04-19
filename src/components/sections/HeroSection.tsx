"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, TrendingDown, Database, Bell, BarChart3, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { ShaderBackground } from "@/components/visuals/ShaderBackground";
import { MagneticButton, MagneticWrapper } from "@/components/interactions/MagneticButton";
import { RippleButton } from "@/components/interactions/RippleButton";
import { GradientText, RevealText, StaggerText } from "@/components/animations/TextAnimations";
import { Parallax } from "@/components/animations/ScrollAnimations";
import { TiltCard } from "@/components/interactions/TiltCard";

const features = [
  { icon: Database, label: "500K+ Price Histories" },
  { icon: BarChart3, label: "Real Market Data" },
  { icon: Bell, label: "Instant Alerts" },
  { icon: TrendingDown, label: "Depreciation Curves" },
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
function useAnimatedCounter(end: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  
  return count;
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const listingsCount = useAnimatedCounter(5247, 2500, countersStarted);
  const avgDiscount = useAnimatedCounter(12, 2000, countersStarted);

  useEffect(() => {
    const timer = setTimeout(() => setCountersStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { label: string; month: string } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1a1a1a] border border-[#b8956e]/30 rounded-lg p-3 shadow-xl backdrop-blur-xl">
          <p className="text-[#666666] text-xs mb-1">{data.month} 2024</p>
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
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* WebGL Shader Background */}
      <ShaderBackground />

      {/* Floating particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#b8956e]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Premium Badge */}
            <RevealText direction="up" delay={0}>
              <motion.div
                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#b8956e]/10 border border-[#b8956e]/20 backdrop-blur-sm"
                whileHover={{ scale: 1.05, borderColor: "rgba(184, 149, 110, 0.4)" }}
              >
                <Sparkles className="w-4 h-4 text-[#b8956e]" />
                <span className="text-sm font-medium text-[#b8956e]">
                  Now tracking {listingsCount.toLocaleString()}+ sold vehicles
                </span>
              </motion.div>
            </RevealText>

            {/* Headline */}
            <div className="mb-6">
              <RevealText direction="up" delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#f5f5f0] leading-[1.1]">
                  Australia&apos;s{" "}
                  <GradientText animate>Ownership Intelligence</GradientText>
                  {" "}Layer
                </h1>
              </RevealText>
            </div>

            {/* Subheadline */}
            <RevealText direction="up" delay={0.2}>
              <p className="text-lg sm:text-xl text-[#a0a0a0] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Buy smarter, sell better, and run inventory like a market maker.
                Vehicle history reports from <span className="text-[#f5f5f0] font-semibold">$19</span>,
                a buying concierge that does the haggling for you, and a dealer dashboard
                that tells you exactly where every car sits against the market.
              </p>
            </RevealText>

            {/* Stats Row */}
            <RevealText direction="up" delay={0.25}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
                {[
                  { value: `${avgDiscount}%`, label: "Avg. Discount Found", sublabel: "vs. asking price" },
                  { value: "38", label: "Days to Sale", sublabel: "median time" },
                  { value: "$2.4M", label: "User Savings", sublabel: "tracked to date" },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label} 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="text-3xl font-bold text-[#f5f5f0]">{stat.value}</div>
                    <div className="text-sm text-[#b8956e] font-medium">{stat.label}</div>
                    <div className="text-xs text-[#666666]">{stat.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </RevealText>

            {/* CTAs with Magnetic Effect */}
            <RevealText direction="up" delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <a href="/vehicle-history-report" className="block">
                  <MagneticButton
                    className="group relative px-8 py-4 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold text-base rounded-xl overflow-hidden transition-colors"
                    strength={0.2}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get a Vehicle Report — $19
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </MagneticButton>
                </a>

                <a href="/dealer" className="block">
                  <RippleButton
                    className="px-8 py-4 border border-white/[0.15] text-[#f5f5f0] hover:bg-white/5 font-medium text-base rounded-xl transition-colors"
                  >
                    Dealer dashboard demo
                  </RippleButton>
                </a>
              </div>
            </RevealText>

            {/* Feature Pills */}
            <RevealText direction="up" delay={0.4}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "rgba(184, 149, 110, 0.3)",
                      backgroundColor: "rgba(184, 149, 110, 0.08)"
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm transition-all cursor-default"
                  >
                    <feature.icon className="w-4 h-4 text-[#b8956e]" />
                    <span className="text-sm text-[#a0a0a0]">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </RevealText>
          </div>

          {/* Right Content - Interactive Chart Demo */}
          <Parallax offset={30} speed={0.3}>
            <TiltCard className="relative" tiltAmount={5} glareOpacity={0.1}>
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                className="relative bg-[#141414]/80 backdrop-blur-xl rounded-2xl border border-white/[0.08] p-6 shadow-2xl"
              >
                {/* Chart Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <motion.div
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#b8956e]/20 text-[#b8956e] border border-[#b8956e]/20"
                        animate={{ 
                          boxShadow: ["0 0 0px rgba(184,149,110,0)", "0 0 20px rgba(184,149,110,0.3)", "0 0 0px rgba(184,149,110,0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Live Data
                      </motion.div>
                    </div>
                    <h3 className="text-[#f5f5f0] font-semibold text-lg">Tesla Model 3 Performance</h3>
                    <p className="text-[#666666] text-sm">2023 • Full Price History</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-red-400 text-sm">
                      <TrendingDown className="w-4 h-4" />
                      -12.7%
                    </div>
                    <p className="text-[#f5f5f0] font-bold text-2xl">$59,800</p>
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
                      <YAxis hide domain={[58000, 70000]} />
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
                    { label: "Listed", value: "$68,500", change: "", color: "text-[#f5f5f0]" },
                    { label: "Price Drops", value: "3", change: "-$8,700", color: "text-red-400" },
                    { label: "Sold For", value: "$59,800", change: "-12.7%", color: "text-green-400" },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label} 
                      className="text-center p-3 bg-[#0a0a0a]/60 rounded-xl border border-white/[0.04]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ borderColor: "rgba(184, 149, 110, 0.2)" }}
                    >
                      <p className="text-[#666666] text-xs mb-1">{item.label}</p>
                      <p className={`font-semibold ${item.color}`}>{item.value}</p>
                      {item.change && (
                        <p className="text-xs text-red-400">{item.change}</p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Insight Cards with Stagger */}
                <div className="space-y-2">
                  {[
                    { icon: "⏱️", text: "Listed for 217 days before selling" },
                    { icon: "💰", text: "Final sale $8,700 below asking" },
                    { icon: "📉", text: "3 price reductions over listing period" },
                  ].map((insight, index) => (
                    <motion.div
                      key={insight.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.15, type: "spring" }}
                      whileHover={{ x: 5, backgroundColor: "rgba(184, 149, 110, 0.05)" }}
                      className="flex items-center gap-3 p-3 bg-[#0a0a0a]/40 rounded-xl border border-white/[0.03] transition-colors cursor-default"
                    >
                      <span className="text-lg">{insight.icon}</span>
                      <span className="text-[#a0a0a0] text-sm">{insight.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#b8956e]/10 via-transparent to-[#b8956e]/10 rounded-2xl blur-2xl -z-10 opacity-50" />
              </motion.div>
            </TiltCard>

            {/* Floating Verified Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-[#1a1a1a]/90 backdrop-blur-xl rounded-xl border border-white/[0.08] p-4 shadow-2xl"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
            >
              <motion.div 
                className="flex items-center gap-3"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </motion.div>
                </div>
                <div>
                  <p className="text-[#f5f5f0] font-semibold text-sm">Verified Sale</p>
                  <p className="text-[#666666] text-xs">Sold price confirmed</p>
                </div>
              </motion.div>
            </motion.div>
          </Parallax>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20 pt-8 border-t border-white/[0.06] text-center"
        >
          <p className="text-xs text-[#666666] uppercase tracking-wider mb-6">
            Built on legitimate AU data sources
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-12">
            {["PPSR", "NEVDIS", "Pickles", "Manheim", "Dealer Feeds"].map((brand, i) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                whileHover={{ opacity: 0.8, scale: 1.05 }}
                className="text-sm md:text-base font-medium text-[#a0a0a0] cursor-default transition-all"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
