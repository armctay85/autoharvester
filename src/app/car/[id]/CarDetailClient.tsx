"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Gauge, Fuel, Calendar, Tag, User, Share2, Heart, Bell, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { PriceHistoryChart } from "@/components/charts/PriceHistoryChart";
import { 
  DealBragGenerator, 
  PriceDropAlert, 
  CarComparisonTool, 
  SocialProofEngine,
  ReferralDashboard,
  GamificationUI 
} from "@/components/viral";
import { useGamification } from "@/contexts/GamificationContext";
import demoData from "@/data/demo-listings.json";

const { listings } = demoData;

interface CarDetailClientProps {
  id: string;
}

export default function CarDetailClient({ id }: CarDetailClientProps) {
  const [showDealBrag, setShowDealBrag] = useState(false);
  const { addPoints, state } = useGamification();
  
  const car = useMemo(() => listings.find((c) => c.id === id), [id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f5f5f0] mb-4">Car Not Found</h1>
          <p className="text-[#666666] mb-6">The listing you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const priceDrop = car.originalPrice - car.price;
  const priceDropPercent = Math.round((priceDrop / car.originalPrice) * 100);

  const handleShare = () => {
    setShowDealBrag(true);
  };

  const handleSaveSearch = () => {
    if (!state.savedSearches.includes(car.id)) {
      addPoints(50, {
        id: `save_${car.id}_${Date.now()}`,
        type: "save_search",
        description: `Saved search for ${car.make} ${car.model}`,
        points: 50,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Deal Brag Modal */}
      <DealBragGenerator
        car={{
          id: car.id,
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price,
          originalPrice: car.originalPrice,
          image: car.image,
        }}
        isOpen={showDealBrag}
        onClose={() => setShowDealBrag(false)}
      />

      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-[#a0a0a0] hover:text-[#f5f5f0]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-[#666666] hover:text-[#b8956e]"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[#666666] hover:text-red-400">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Image & Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Main Image */}
                <div className="aspect-[16/10] relative rounded-2xl overflow-hidden mb-6 bg-[#141414]">
                  <Image
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {car.state === "sold" ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                        Sold
                      </Badge>
                    ) : (
                      <Badge className="bg-[#b8956e]/20 text-[#b8956e] border-[#b8956e]/30 px-3 py-1">
                        For Sale
                      </Badge>
                    )}
                    <Badge className="bg-[#141414]/80 text-[#a0a0a0] border-white/[0.06]">
                      {car.sellerType === "dealer" ? "Dealer" : "Private"}
                    </Badge>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Gauge, label: "Odometer", value: `${(car.odometer / 1000).toFixed(0)}k km` },
                    { icon: Fuel, label: "Fuel Type", value: car.fuelType },
                    { icon: Calendar, label: "Year", value: car.year.toString() },
                    { icon: MapPin, label: "Location", value: car.location.split(",")[0] },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#141414] rounded-xl p-4 border border-white/[0.06]">
                      <div className="flex items-center gap-2 text-[#666666] text-xs mb-1">
                        <stat.icon className="w-3 h-3" />
                        {stat.label}
                      </div>
                      <div className="text-[#f5f5f0] font-medium">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - Price & Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                {/* Title & Price */}
                <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.06]">
                  <p className="text-[#666666] text-sm mb-1">{car.year} {car.make}</p>
                  <h1 className="text-3xl font-bold text-[#f5f5f0] mb-2">{car.model}</h1>
                  <p className="text-[#a0a0a0] text-sm mb-6">{car.variant}</p>

                  <div className="flex items-end gap-4 mb-6">
                    <div>
                      <p className="text-[#666666] text-sm mb-1">Current Price</p>
                      <p className="text-4xl font-bold text-[#f5f5f0]">${car.price.toLocaleString()}</p>
                    </div>
                    {priceDrop > 0 && (
                      <div className="text-right">
                        <p className="text-red-400 text-sm font-medium">
                          -{priceDropPercent}% (${priceDrop.toLocaleString()})
                        </p>
                        <p className="text-[#666666] text-sm line-through">${car.originalPrice.toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold h-12">
                      Contact Seller
                    </Button>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1 h-12 border-white/[0.15] text-[#f5f5f0]"
                        onClick={handleSaveSearch}
                      >
                        <Bell className="w-5 h-5 mr-2" />
                        Price Alert
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 h-12 border-[#b8956e]/50 text-[#b8956e] hover:bg-[#b8956e]/10"
                        onClick={handleShare}
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Share Deal
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Price Drop Alert & FOMO */}
                <PriceDropAlert 
                  car={{
                    id: car.id,
                    make: car.make,
                    model: car.model,
                    price: car.price,
                    originalPrice: car.originalPrice,
                    location: car.location,
                  }} 
                />

                {/* Transmission Info */}
                <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#b8956e]/10 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-[#b8956e]" />
                      </div>
                      <div>
                        <p className="text-[#666666] text-xs">Transmission</p>
                        <p className="text-[#f5f5f0] font-medium">{car.transmission}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#b8956e]/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-[#b8956e]" />
                      </div>
                      <div>
                        <p className="text-[#666666] text-xs">Seller Type</p>
                        <p className="text-[#f5f5f0] font-medium capitalize">{car.sellerType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Price History Chart */}
            <PriceHistoryChart
              data={car.priceHistory}
              currentPrice={car.price}
              originalPrice={car.originalPrice}
              soldPrice={car.soldPrice}
              isSold={car.state === "sold"}
            />

            {/* Features */}
            <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.06]">
              <h3 className="text-[#f5f5f0] font-semibold mb-4">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {car.features?.map((feature) => (
                  <Badge
                    key={feature}
                    variant="outline"
                    className="bg-[#0a0a0a] border-white/[0.06] text-[#a0a0a0] px-3 py-1"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Car Comparison Tool */}
            <CarComparisonTool 
              initialCar={{
                id: car.id,
                make: car.make,
                model: car.model,
                year: car.year,
                price: car.price,
                originalPrice: car.originalPrice,
                odometer: car.odometer,
                fuelType: car.fuelType,
                transmission: car.transmission,
                image: car.image,
                features: car.features,
                location: car.location,
              }} 
            />
          </div>

          {/* Sidebar - Right 1/3 */}
          <div className="space-y-6">
            {/* Gamification UI */}
            <GamificationUI />

            {/* Social Proof Engine */}
            <SocialProofEngine />

            {/* Referral Dashboard */}
            <ReferralDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
