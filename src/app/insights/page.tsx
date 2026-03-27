"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, Calendar, DollarSign, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import demoData from "@/data/demo-listings.json";
import { CarCard } from "@/components/cards/CarCard";

const { listings, marketTrends, insights } = demoData;

const COLORS = ["#b8956e", "#8b7355", "#6b5a45", "#4a4035", "#3a3530", "#2a2825"];

const depreciationData = Object.entries(marketTrends.depreciationByBrand)
  .map(([brand, data]) => ({
    brand,
    year1: data.year1,
    year2: data.year2,
    year3: data.year3,
    year4: data.year4,
    year5: data.year5,
  }))
  .slice(0, 8);

const priceDistributionData = marketTrends.priceDistribution;

const bestTimeData = Object.entries(marketTrends.bestTimeToBuy).map(([month, value]) => ({
  month: month.charAt(0).toUpperCase() + month.slice(1, 3),
  value,
}));

const hotDeals = [...listings]
  .filter((car) => car.state === "active")
  .map((car) => ({
    ...car,
    dropPercent: Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100),
  }))
  .sort((a, b) => b.dropPercent - a.dropPercent)
  .slice(0, 4);

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#b8956e]/30 rounded-lg p-3 shadow-xl">
        <p className="text-[#a0a0a0] text-xs mb-1">{label}</p>
        <p className="text-[#f5f5f0] text-sm font-semibold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f5f5f0] mb-6">
            Market <span className="text-[#b8956e]">Insights</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#a0a0a0]">
            Data-driven analysis of the Australian car market. Track depreciation,
            price trends, and find the best deals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-[#141414] rounded-xl border border-white/[0.06] p-6 text-center">
            <div className="w-12 h-12 bg-[#b8956e]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Car className="w-6 h-6 text-[#b8956e]" />
            </div>
            <div className="text-2xl font-bold text-[#f5f5f0]">{insights.totalListings.toLocaleString()}</div>
            <div className="text-[#666666] text-sm">Total Listings</div>
          </div>
          <div className="bg-[#141414] rounded-xl border border-white/[0.06] p-6 text-center">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingDown className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-[#f5f5f0]">{insights.avgDiscount}%</div>
            <div className="text-[#666666] text-sm">Avg. Discount</div>
          </div>
          <div className="bg-[#141414] rounded-xl border border-white/[0.06] p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-[#f5f5f0]">{insights.avgDaysListed}</div>
            <div className="text-[#666666] text-sm">Avg. Days Listed</div>
          </div>
          <div className="bg-[#141414] rounded-xl border border-white/[0.06] p-6 text-center">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-[#f5f5f0]">{insights.soldPriceDiff}%</div>
            <div className="text-[#666666] text-sm">Sold Price Diff</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#f5f5f0]">Hot Deals This Week</h2>
              <p className="text-[#666666]">Listings with the biggest price drops</p>
            </div>
            <Link href="/search">
              <Button variant="ghost" className="text-[#b8956e]">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotDeals.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} showPriceDrop />
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#141414] rounded-xl border border-white/[0.06] p-6"
          >
            <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">
              Average Depreciation by Brand
            </h3>
            <p className="text-[#666666] text-sm mb-6">
              5-year depreciation curve comparison (% of original value lost)
            </p>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={depreciationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis
                    dataKey="brand"
                    stroke="#666666"
                    tick={{ fill: "#666666", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  />
                  <YAxis
                    stroke="#666666"
                    tick={{ fill: "#666666", fontSize: 11 }}
                    tickFormatter={(value) => `${value}%`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="year1" name="Year 1" fill="#b8956e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="year3" name="Year 3" fill="#8b7355" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="year5" name="Year 5" fill="#4a4035" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#b8956e]" />
                <span className="text-xs text-[#a0a0a0]">Year 1</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#8b7355]" />
                <span className="text-xs text-[#a0a0a0]">Year 3</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#4a4035]" />
                <span className="text-xs text-[#a0a0a0]">Year 5</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#141414] rounded-xl border border-white/[0.06] p-6"
          >
            <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">Best Time to Buy</h3>
            <p className="text-[#666666] text-sm mb-6">Price index by month (100 = highest prices)</p>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bestTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis
                    dataKey="month"
                    stroke="#666666"
                    tick={{ fill: "#666666", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  />
                  <YAxis
                    stroke="#666666"
                    tick={{ fill: "#666666", fontSize: 11 }}
                    domain={[85, 105]}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#b8956e"
                    strokeWidth={3}
                    dot={{ fill: "#b8956e", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: "#b8956e" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-3 bg-[#b8956e]/10 rounded-lg border border-[#b8956e]/20">
              <p className="text-sm text-[#f5f5f0]">
                <span className="text-[#b8956e] font-semibold">💡 Tip:</span>{" "}
                December typically offers the best deals, with prices averaging 12% below peak.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#141414] rounded-xl border border-white/[0.06] p-6"
          >
            <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">Price Distribution</h3>
            <p className="text-[#666666] text-sm mb-6">Market share by price range</p>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priceDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="percentage"
                  >
                    {priceDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#1a1a1a] border border-[#b8956e]/30 rounded-lg p-3 shadow-xl">
                            <p className="text-[#a0a0a0] text-xs mb-1">{data.range}</p>
                            <p className="text-[#f5f5f0] text-sm font-semibold">{data.percentage}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {priceDistributionData.map((item, index) => (
                <div key={item.range} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs text-[#a0a0a0] truncate">
                    {item.range} ({item.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#141414] rounded-xl border border-white/[0.06] p-6"
          >
            <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">Days to Sell by Price</h3>
            <p className="text-[#666666] text-sm mb-6">Average time on market by price bracket</p>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketTrends.daysToSellByPrice} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis
                    type="number"
                    stroke="#666666"
                    tick={{ fill: "#666666", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="priceRange"
                    stroke="#666666"
                    tick={{ fill: "#666666", fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                    width={90}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#1a1a1a] border border-[#b8956e]/30 rounded-lg p-3 shadow-xl">
                            <p className="text-[#a0a0a0] text-xs mb-1">{data.priceRange}</p>
                            <p className="text-[#f5f5f0] text-sm font-semibold">{data.avgDays} days</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="avgDays" fill="#b8956e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-[#b8956e]/10 to-transparent rounded-2xl p-8 lg:p-12 border border-[#b8956e]/20 text-center"
        >
          <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">Ready to Find Your Next Car?</h2>
          <p className="text-[#a0a0a0] mb-6 max-w-md mx-auto">
            Browse {listings.length} listings with complete price history and market insights.
          </p>
          <Link href="/search">
            <Button className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold px-8 h-12">
              Start Searching
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
