"use client";

import { motion } from "framer-motion";
import { MapPin, Gauge, Fuel, Calendar, TrendingDown, CheckCircle2, Store, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { CarListing } from "@/types/car-listing";
import { formatPrice, formatOdometer, calculatePriceDrop } from "@/lib/premium-data";

interface ListingCardProps {
  listing: CarListing;
  onClick?: () => void;
  index?: number;
}

export function ListingCard({ listing, onClick, index = 0 }: ListingCardProps) {
  const priceDrop = calculatePriceDrop(listing);
  const hasDrop = priceDrop.amount > 0;
  const lastPriceChange = listing.price_history[listing.price_history.length - 1];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group cursor-pointer bg-[#141414] rounded-xl border border-white/[0.06] overflow-hidden hover:border-[#b8956e]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#b8956e]/5"
    >
      {/* Image Section */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <Image
          src={`/images/cars/${listing.images[0]}`}
          alt={`${listing.make} ${listing.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        
        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {listing.status === 'sold' ? (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Sold
            </Badge>
          ) : (
            <Badge className="bg-[#b8956e]/20 text-[#b8956e] border-[#b8956e]/30 backdrop-blur-sm">
              For Sale
            </Badge>
          )}
        </div>

        {/* Seller Type */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant="outline" 
            className="bg-[#0a0a0a]/80 border-white/[0.06] text-[#a0a0a0] backdrop-blur-sm text-xs"
          >
            {listing.seller_type === 'dealer' ? (
              <><Store className="w-3 h-3 mr-1 inline" /> Dealer</>
            ) : (
              <><User className="w-3 h-3 mr-1 inline" /> Private</>
            )}
          </Badge>
        </div>

        {/* Price Drop Badge */}
        {hasDrop && listing.status === 'active' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-3 left-3"
          >
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 backdrop-blur-sm">
              <TrendingDown className="w-3 h-3 mr-1" />
              -{priceDrop.percent.toFixed(1)}%
            </Badge>
          </motion.div>
        )}

        {/* View Indicator */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 text-[#b8956e] text-xs bg-[#0a0a0a]/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
            View Details
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title Row */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[#666666] text-xs mb-0.5">{listing.year} {listing.make}</p>
            <h3 className="text-[#f5f5f0] font-semibold text-base leading-tight">
              {listing.model}
            </h3>
            <p className="text-[#a0a0a0] text-xs mt-0.5 truncate">{listing.variant}</p>
          </div>
          <div className="text-right">
            <p className="text-[#f5f5f0] font-bold text-lg">{formatPrice(listing.current_price)}</p>
            {hasDrop && (
              <p className="text-[#666666] text-xs line-through">{formatPrice(listing.original_price)}</p>
            )}
          </div>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-3 text-xs text-[#666666] mb-3">
          <span className="flex items-center gap-1">
            <Gauge className="w-3 h-3" />
            {formatOdometer(listing.odometer)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {listing.location.split(',')[0]}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3 h-3" />
            {listing.fuel_type.split(' ')[0]}
          </span>
        </div>

        {/* Price History Mini */}
        <div className="pt-3 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666666]">
              <Calendar className="w-3 h-3 inline mr-1" />
              Listed {new Date(listing.listed_date).toLocaleDateString('en-AU', { month: 'short', year: '2-digit' })}
            </span>
            {listing.status === 'sold' && listing.sold_price ? (
              <span className="text-green-400">
                Sold {formatPrice(listing.sold_price)}
              </span>
            ) : (
              <span className="text-[#a0a0a0]">
                {listing.price_history.length > 1 ? `${listing.price_history.length - 1} price drops` : 'No price changes'}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ListingCard;
