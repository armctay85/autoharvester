"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Gauge, TrendingDown, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CarListing } from "@/types/car";

interface CarCardProps {
  car: CarListing;
  index?: number;
  showPriceDrop?: boolean;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
};

const formatOdometer = (value: number) => {
  return `${(value / 1000).toFixed(0)}k km`;
};

export function CarCard({ car, index = 0, showPriceDrop = false }: CarCardProps) {
  const priceDrop = car.originalPrice - car.price;
  const priceDropPercent = Math.round((priceDrop / car.originalPrice) * 100);
  const isSold = car.state === "sold";
  
  // Calculate discount from market (mock calculation based on original vs current)
  const marketDiscount = priceDropPercent > 0 ? priceDropPercent : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/car/${car.id}`}>
        <div className="group relative bg-[#141414] rounded-xl border border-white/[0.06] overflow-hidden hover:border-[#b8956e]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#b8956e]/5">
          {/* Image Container */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={car.image}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Sold Badge */}
            {isSold && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-red-500/90 text-white border-0 font-semibold px-3 py-1">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  SOLD
                </Badge>
              </div>
            )}
            
            {/* Price Drop Badge */}
            {marketDiscount > 10 && !isSold && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-green-500/90 text-white border-0 font-semibold px-3 py-1">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {marketDiscount}% OFF
                </Badge>
              </div>
            )}
            
            {/* Below Market Badge */}
            {marketDiscount > 5 && !isSold && (
              <div className="absolute bottom-3 right-3 z-10">
                <Badge className="bg-[#b8956e]/90 text-[#0a0a0a] border-0 font-semibold text-xs">
                  {marketDiscount}% below market
                </Badge>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60" />
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Make/Model/Year */}
            <div className="mb-2">
              <h3 className="text-[#f5f5f0] font-semibold text-lg leading-tight group-hover:text-[#b8956e] transition-colors">
                {car.make} {car.model}
              </h3>
              <p className="text-[#666666] text-sm">
                {car.year} {car.variant}
              </p>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-[#f5f5f0] font-bold text-2xl">
                {formatCurrency(car.price)}
              </span>
              {car.originalPrice > car.price && (
                <span className="text-[#666666] text-sm line-through">
                  {formatCurrency(car.originalPrice)}
                </span>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 text-sm text-[#a0a0a0]">
              <div className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-[#666666]" />
                <span>{formatOdometer(car.odometer)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#666666]" />
                <span className="truncate max-w-[120px]">{car.location}</span>
              </div>
            </div>

            {/* Features Pills */}
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/[0.06]">
              {car.features.slice(0, 2).map((feature) => (
                <span
                  key={feature}
                  className="text-xs text-[#666666] bg-[#0a0a0a] px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {car.features.length > 2 && (
                <span className="text-xs text-[#666666] bg-[#0a0a0a] px-2 py-1 rounded">
                  +{car.features.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default CarCard;
