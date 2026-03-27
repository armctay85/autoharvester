"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ChevronDown, Filter, TrendingDown, Calendar, Gauge, X, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import listingsData from "@/data/demo-listings.json";
import { PriceHistoryChart } from "@/components/charts/PriceHistoryChart";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  variant: string;
  price: number;
  originalPrice: number;
  priceHistory: Array<{ date: string; price: number }>;
  odometer: number;
  location: string;
  state: string;
  sellerType: string;
  image: string;
  fuelType: string;
  transmission: string;
  soldPrice?: number | null;
}

const demoListings: Car[] = listingsData.listings as Car[];

export function DemoSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const filteredCars = searchQuery.length > 1
    ? demoListings.filter(
        (car) =>
          car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `${car.make} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearch = () => {
    setHasSearched(true);
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const formatOdometer = (km: number) => {
    return `${(km / 1000).toFixed(0)}k km`;
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#b8956e]/5 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(184, 149, 110, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184, 149, 110, 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-xs font-medium border-[#b8956e]/30 text-[#b8956e] bg-[#b8956e]/5"
            >
              Live Demo
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f0] mb-4">
              Try It Yourself
            </h2>
            <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
              Search for any car and see its complete price history. 
              Click on a result to view the full price drop chart.
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-[#666666]" />
            </div>
            <Input
              type="text"
              placeholder="Try 'Tesla Model 3' or 'BMW'..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 1) setHasSearched(true);
                else setHasSearched(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full pl-12 pr-4 py-6 bg-[#141414] border-white/[0.06] text-[#f5f5f0] placeholder:text-[#666666] text-lg rounded-xl focus:border-[#b8956e]/50 focus:ring-2 focus:ring-[#b8956e]/10"
            />
            <Button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold px-6"
            >
              Search
            </Button>
          </div>

          {/* Quick suggestions */}
          {!hasSearched && (
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {["Tesla", "BMW", "Mercedes", "Porsche", "Toyota"].map((make) => (
                <button
                  key={make}
                  onClick={() => {
                    setSearchQuery(make);
                    setHasSearched(true);
                  }}
                  className="px-3 py-1.5 text-sm text-[#a0a0a0] bg-[#141414] border border-white/[0.06] rounded-full hover:border-[#b8956e]/30 hover:text-[#b8956e] transition-colors"
                >
                  {make}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {filteredCars.length > 0 && !selectedCar && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCars.slice(0, 6).map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCar(car)}
                  className="group cursor-pointer bg-[#141414] rounded-xl border border-white/[0.06] overflow-hidden hover:border-[#b8956e]/30 transition-all hover:shadow-lg hover:shadow-[#b8956e]/5"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={car.image}
                      alt={`${car.make} ${car.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {car.state === "sold" ? (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Sold</Badge>
                      ) : (
                        <Badge className="bg-[#b8956e]/20 text-[#b8956e] border-[#b8956e]/30">For Sale</Badge>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <div className="flex items-center gap-1 text-[#b8956e] text-xs bg-[#0a0a0a]/80 px-2 py-1 rounded-full">
                        <Eye className="w-3 h-3" />
                        View Chart
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[#666666] text-sm">{car.year} {car.make}</p>
                        <h3 className="text-[#f5f5f0] font-semibold">{car.model}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-[#f5f5f0] font-bold text-lg">{formatPrice(car.price)}</p>
                        {car.price < car.originalPrice && (
                          <p className="text-red-400 text-xs">
                            -{Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)}%
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[#666666]">
                      <span className="flex items-center gap-1">
                        <Gauge className="w-3 h-3" />
                        {formatOdometer(car.odometer)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {car.location.split(",")[0]}
                      </span>
                    </div>

                    {/* Mini chart preview */}
                    <div className="mt-3 pt-3 border-t border-white/[0.06]">
                      <div className="h-10">
                        <PriceHistoryChart
                          data={car.priceHistory}
                          height={40}
                          compact
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {hasSearched && filteredCars.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-[#666666]">No results found. Try a different search term.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Car Detail Modal */}
        <AnimatePresence>
          {selectedCar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/90 backdrop-blur-sm"
              onClick={() => setSelectedCar(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#141414] rounded-2xl border border-white/[0.06]"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-[#141414] border-b border-white/[0.06] p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-4">
                    <div className="aspect-video w-32 relative rounded-lg overflow-hidden">
                      <Image
                        src={selectedCar.image}
                        alt={`${selectedCar.make} ${selectedCar.model}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#f5f5f0]">
                        {selectedCar.year} {selectedCar.make} {selectedCar.model}
                      </h2>
                      <p className="text-[#a0a0a0]">{selectedCar.variant}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="p-2 rounded-full hover:bg-white/[0.06] transition-colors"
                  >
                    <X className="w-6 h-6 text-[#666666]" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Price Chart */}
                  <PriceHistoryChart
                    data={selectedCar.priceHistory}
                    currentPrice={selectedCar.price}
                    originalPrice={selectedCar.originalPrice}
                    soldPrice={selectedCar.soldPrice}
                    isSold={selectedCar.state === "sold"}
                  />

                  {/* Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Price", value: formatPrice(selectedCar.price), icon: TrendingDown },
                      { label: "Odometer", value: formatOdometer(selectedCar.odometer), icon: Gauge },
                      { label: "Location", value: selectedCar.location, icon: MapPin },
                      { label: "Listed", value: new Date(selectedCar.priceHistory[0].date).toLocaleDateString("en-AU"), icon: Calendar },
                    ].map((spec) => (
                      <div key={spec.label} className="bg-[#0a0a0a] rounded-lg p-4">
                        <div className="flex items-center gap-2 text-[#666666] text-xs mb-1">
                          <spec.icon className="w-3 h-3" />
                          {spec.label}
                        </div>
                        <div className="text-[#f5f5f0] font-medium text-sm">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default DemoSearch;
