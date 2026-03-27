"use client";

import { motion } from "framer-motion";
import { Check, X, Scale } from "lucide-react";
import Image from "next/image";

interface CarSpec {
  label: string;
  car1: string | number | boolean;
  car2: string | number | boolean;
  better?: 1 | 2 | null;
}

interface CarComparisonProps {
  car1: {
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    specs: Record<string, string | number | boolean>;
  };
  car2: {
    make: string;
    model: string;
    year: number;
    price: number;
    image: string;
    specs: Record<string, string | number | boolean>;
  };
}

const formatValue = (value: string | number | boolean): string => {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number" && value > 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return String(value);
};

export function CarComparison({ car1, car2 }: CarComparisonProps) {
  const specKeys = Object.keys(car1.specs);
  const priceDiff = Math.abs(car1.price - car2.price);
  const priceDiffPercent = Math.round((priceDiff / Math.max(car1.price, car2.price)) * 100);
  const cheaperCar = car1.price < car2.price ? 1 : 2;

  return (
    <div className="w-full bg-[#141414] rounded-xl border border-white/[0.06] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-5 h-5 text-[#b8956e]" />
          <h3 className="text-[#f5f5f0] font-semibold text-lg">Side-by-Side Comparison</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Car 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[16/10] relative rounded-lg overflow-hidden mb-3">
              <Image
                src={car1.image}
                alt={`${car1.make} ${car1.model}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
            <div className="text-center">
              <p className="text-[#a0a0a0] text-sm">{car1.year} {car1.make}</p>
              <p className="text-[#f5f5f0] font-semibold text-lg">{car1.model}</p>
              <p className="text-[#b8956e] font-bold text-xl mt-1">${(car1.price / 1000).toFixed(0)}k</p>
              {cheaperCar === 1 && (
                <span className="inline-flex items-center gap-1 text-green-400 text-xs mt-1">
                  <Check className="w-3 h-3" /> Save ${(priceDiff / 1000).toFixed(0)}k
                </span>
              )}
            </div>
          </motion.div>

          {/* Car 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[16/10] relative rounded-lg overflow-hidden mb-3">
              <Image
                src={car2.image}
                alt={`${car2.make} ${car2.model}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
            <div className="text-center">
              <p className="text-[#a0a0a0] text-sm">{car2.year} {car2.make}</p>
              <p className="text-[#f5f5f0] font-semibold text-lg">{car2.model}</p>
              <p className="text-[#b8956e] font-bold text-xl mt-1">${(car2.price / 1000).toFixed(0)}k</p>
              {cheaperCar === 2 && (
                <span className="inline-flex items-center gap-1 text-green-400 text-xs mt-1">
                  <Check className="w-3 h-3" /> Save ${(priceDiff / 1000).toFixed(0)}k
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Specs Comparison */}
      <div className="divide-y divide-white/[0.06]">
        {specKeys.map((key, index) => {
          const val1 = car1.specs[key];
          const val2 = car2.specs[key];
          let better: 1 | 2 | null = null;

          // Simple comparison logic
          if (typeof val1 === "number" && typeof val2 === "number") {
            if (key.toLowerCase().includes("price") || key.toLowerCase().includes("km")) {
              better = val1 < val2 ? 1 : 2;
            } else {
              better = val1 > val2 ? 1 : 2;
            }
          }

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-3 items-center py-3 px-6 hover:bg-white/[0.02] transition-colors"
            >
              <div className={`text-sm ${better === 1 ? "text-[#b8956e] font-medium" : "text-[#a0a0a0]"}`}>
                {formatValue(val1)}
                {better === 1 && <Check className="inline w-3 h-3 ml-1" />}
              </div>
              <div className="text-center text-[#666666] text-xs uppercase tracking-wider">
                {key}
              </div>
              <div className={`text-sm text-right ${better === 2 ? "text-[#b8956e] font-medium" : "text-[#a0a0a0]"}`}>
                {formatValue(val2)}
                {better === 2 && <Check className="inline w-3 h-3 ml-1" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>  );
}

export default CarComparison;
