"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { TrendingDown, Car, Percent } from "lucide-react";

interface DepreciationData {
  brand: string;
  year1: number;
  year2: number;
  year3: number;
  year4: number;
  year5: number;
}

interface MarketTrendsChartProps {
  data: DepreciationData[];
  height?: number;
}

const brandColors: Record<string, string> = {
  Porsche: "#d4af37",
  "Mercedes-Benz": "#c0c0c0",
  BMW: "#0066b1",
  Audi: "#bb0a30",
  Lexus: "#1a1a1a",
  Tesla: "#cc0000",
  Toyota: "#eb0a1e",
  Mazda: "#101010",
  Kia: "#c41230",
  Hyundai: "#002c5f",
  Ford: "#003478",
  Subaru: "#003399",
  Volkswagen: "#001e50",
  Honda: "#cc0000",
  Nissan: "#c3002f",
};

const getBrandColor = (brand: string, index: number): string => {
  if (brandColors[brand]) {
    return brandColors[brand];
  }
  const fallbackColors = ["#b8956e", "#8b7355", "#c9a67f", "#a67c52", "#d4a574"];
  return fallbackColors[index % fallbackColors.length];
};

export function DepreciationChart({ data, height = 400 }: MarketTrendsChartProps) {
  // Transform data for 3-year depreciation view
  const chartData = data.map((item) => ({
    brand: item.brand,
    year1: item.year1,
    year3: item.year3,
    year5: item.year5,
    totalDepreciation: item.year5,
  }));

  // Sort by 3-year depreciation
  chartData.sort((a, b) => a.year3 - b.year3);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; value: number; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-[#b8956e]/30 rounded-lg p-4 shadow-xl">
          <p className="text-[#f5f5f0] font-semibold mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="text-[#a0a0a0] text-sm" style={{ color: entry.color }}>
                  {entry.dataKey === "year1" && "Year 1"}
                  {entry.dataKey === "year3" && "Year 3"}
                  {entry.dataKey === "year5" && "Year 5"}
                </span>
                <span className="text-[#f5f5f0] font-medium">-{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#141414] rounded-xl border border-white/[0.06] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[#f5f5f0] font-semibold text-lg flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-[#b8956e]" />
            Depreciation by Brand
          </h3>
          <p className="text-[#666666] text-sm mt-1">Average value loss over 5 years</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#b8956e]" />
            <span className="text-[#a0a0a0]">Year 1</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#8b7355]" />
            <span className="text-[#a0a0a0]">Year 3</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-[#5c4a3a]" />
            <span className="text-[#a0a0a0]">Year 5</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              tickFormatter={(value) => `-${value}%`}
              tickLine={false}
              axisLine={false}
              domain={[0, 60]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={40} stroke="#666666" strokeDasharray="5 5" opacity={0.5} />
            
            <Bar dataKey="year1" name="Year 1" fill="#b8956e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="year3" name="Year 3" fill="#8b7355" radius={[4, 4, 0, 0]} />
            <Bar dataKey="year5" name="Year 5" fill="#5c4a3a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/[0.06]">
        {chartData.slice(0, 4).map((item, index) => (
          <motion.div
            key={item.brand}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0a0a0a] rounded-lg p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <Car className="w-3 h-3 text-[#b8956e]" />
              <span className="text-[#a0a0a0] text-xs">{item.brand}</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-[#f5f5f0] font-semibold">-{item.year3}% </span>
              <span className="text-[#666666] text-xs mb-0.5">@ 3yr</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Best Time to Buy Heatmap
interface BestTimeData {
  month: string;
  score: number;
}

export function BestTimeToBuyChart({ data }: { data: BestTimeData[] }) {
  const getScoreColor = (score: number): string => {
    if (score >= 95) return "#b8956e";
    if (score >= 90) return "#8b7355";
    if (score >= 85) return "#5c4a3a";
    return "#3d3d3d";
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const chartData = months.map((month, index) => ({
    month,
    score: data[index]?.score || 90,
    fullMonth: data[index]?.month || month,
  }));

  return (
    <div className="w-full bg-[#141414] rounded-xl border border-white/[0.06] p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[#f5f5f0] font-semibold text-lg flex items-center gap-2">
            <Percent className="w-5 h-5 text-[#b8956e]" />
            Best Time to Buy
          </h3>
          <p className="text-[#666666] text-sm mt-1">Price index by month — lower is better</p>
        </div>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
        {chartData.map((item, index) => (
          <motion.div
            key={item.month}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="aspect-square rounded-lg flex flex-col items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: getScoreColor(item.score) }}
          >
            <span className="text-[#0a0a0a] text-xs font-medium">{item.month}</span>
            <span className="text-[#0a0a0a] text-xs font-bold">{item.score}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#b8956e]" />
          <span className="text-[#a0a0a0] text-xs">Best deals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#3d3d3d]" />
          <span className="text-[#a0a0a0] text-xs">Higher prices</span>
        </div>
      </div>
    </div>
  );
}

// Price Distribution Chart
interface PriceRangeData {
  range: string;
  percentage: number;
}

export function PriceDistributionChart({ data }: { data: PriceRangeData[] }) {
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: PriceRangeData }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-[#b8956e]/30 rounded-lg p-3 shadow-xl">
          <p className="text-[#f5f5f0] font-medium">{payload[0].payload.range}</p>
          <p className="text-[#b8956e] text-lg font-semibold">{payload[0].payload.percentage}%</p>
          <p className="text-[#666666] text-xs">of total listings</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#141414] rounded-xl border border-white/[0.06] p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[#f5f5f0] font-semibold text-lg flex items-center gap-2">
            <Car className="w-5 h-5 text-[#b8956e]" />
            Price Distribution
          </h3>
          <p className="text-[#666666] text-sm mt-1">Market share by price bracket</p>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
            <XAxis
              type="number"
              stroke="#666666"
              tick={{ fill: "#666666", fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="range"
              stroke="#666666"
              tick={{ fill: "#666666", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="percentage" fill="#b8956e" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 1 ? "#b8956e" : index === 2 ? "#8b7355" : "#5c4a3a"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default { DepreciationChart, BestTimeToBuyChart, PriceDistributionChart };
