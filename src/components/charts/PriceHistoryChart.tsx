"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { TrendingDown, Calendar, DollarSign } from "lucide-react";

interface PriceHistoryPoint {
  date: string;
  price: number;
}

interface PriceHistoryChartProps {
  data: PriceHistoryPoint[];
  currentPrice?: number;
  originalPrice?: number;
  soldPrice?: number | null;
  isSold?: boolean;
  height?: number;
  showGrid?: boolean;
  compact?: boolean;
}

const formatCurrency = (value: number) => {
  return `$${(value / 1000).toFixed(0)}k`;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-AU", { month: "short", year: "2-digit" });
};

export function PriceHistoryChart({
  data,
  currentPrice,
  originalPrice,
  soldPrice,
  isSold = false,
  height = 300,
  showGrid = true,
  compact = false,
}: PriceHistoryChartProps) {
  const chartData = data.map((point) => ({
    ...point,
    formattedDate: formatDate(point.date),
  }));

  const maxPrice = Math.max(...data.map((d) => d.price));
  const minPrice = Math.min(...data.map((d) => d.price));
  const priceDrop = originalPrice ? originalPrice - (soldPrice || currentPrice || minPrice) : 0;
  const priceDropPercent = originalPrice ? Math.round((priceDrop / originalPrice) * 100) : 0;

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-[#b8956e]/30 rounded-lg p-3 shadow-xl">
          <p className="text-[#a0a0a0] text-xs mb-1">{label}</p>
          <p className="text-[#f5f5f0] text-lg font-semibold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (compact) {
    return (
      <div className="w-full">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b8956e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#b8956e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="price"
              stroke="#b8956e"
              strokeWidth={2}
              fill="url(#priceGradient)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#141414] rounded-xl border border-white/[0.06] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-[#f5f5f0] font-semibold text-lg flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-[#b8956e]" />
            Price History
          </h3>
          <p className="text-[#666666] text-sm mt-1">Track how this listing changed over time</p>
        </div>
        {priceDrop > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-right"
          >
            <div className="text-red-400 font-semibold text-lg">-{priceDropPercent}%</div>
            <div className="text-[#666666] text-xs">Price reduction</div>
          </motion.div>
        )}
      </div>

      {/* Price Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {originalPrice && (
          <div className="bg-[#0a0a0a] rounded-lg p-3">
            <div className="flex items-center gap-2 text-[#666666] text-xs mb-1">
              <DollarSign className="w-3 h-3" />
              Original
            </div>
            <div className="text-[#a0a0a0] font-medium">{formatCurrency(originalPrice)}</div>
          </div>
        )}
        <div className="bg-[#0a0a0a] rounded-lg p-3">
          <div className="flex items-center gap-2 text-[#666666] text-xs mb-1">
            <Calendar className="w-3 h-3" />
            Listed
          </div>
          <div className="text-[#a0a0a0] font-medium">{formatDate(data[0].date)}</div>
        </div>
        {isSold && soldPrice ? (
          <div className="bg-[#b8956e]/10 rounded-lg p-3 border border-[#b8956e]/20">
            <div className="flex items-center gap-2 text-[#b8956e] text-xs mb-1">
              <TrendingDown className="w-3 h-3" />
              Sold For
            </div>
            <div className="text-[#b8956e] font-semibold">{formatCurrency(soldPrice)}</div>
          </div>
        ) : (
          <div className="bg-[#0a0a0a] rounded-lg p-3">
            <div className="flex items-center gap-2 text-[#666666] text-xs mb-1">
              <TrendingDown className="w-3 h-3" />
              Current
            </div>
            <div className="text-[#f5f5f0] font-semibold">{formatCurrency(currentPrice || minPrice)}</div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b8956e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#b8956e" stopOpacity={0} />
              </linearGradient>
            </defs>
            {showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            )}
            <XAxis
              dataKey="formattedDate"
              stroke="#666666"
              tick={{ fill: "#666666", fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <YAxis
              stroke="#666666"
              tick={{ fill: "#666666", fontSize: 11 }}
              tickFormatter={formatCurrency}
              tickLine={false}
              axisLine={false}
              domain={[minPrice * 0.95, maxPrice * 1.05]}
            />
            <Tooltip content={<CustomTooltip />} />
            {soldPrice && (
              <ReferenceLine
                y={soldPrice}
                stroke="#22c55e"
                strokeDasharray="5 5"
                strokeWidth={1}
                label={{ value: "Sold", fill: "#22c55e", fontSize: 10, position: "right" }}
              />
            )}
            <Area
              type="monotone"
              dataKey="price"
              stroke="#b8956e"
              strokeWidth={3}
              fill="url(#priceGradient)"
              dot={{ fill: "#b8956e", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "#b8956e", stroke: "#0a0a0a", strokeWidth: 2 }}
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#b8956e]" />
          <span className="text-[#a0a0a0] text-xs">Listing Price</span>
        </div>
        {isSold && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
            <span className="text-[#a0a0a0] text-xs">Sold Price</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PriceHistoryChart;
