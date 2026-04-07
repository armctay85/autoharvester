"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  Search, MapPin, Filter, TrendingDown, Calendar, Gauge, X, Eye,
  ArrowRightLeft, Bell, Check, ChevronDown, SlidersHorizontal
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import listingsData from "@/data/demo-listings.json";
import { PriceHistoryChart } from "@/components/charts/PriceHistoryChart";
import { AlertSimulator } from "@/components/interactions/AlertSimulator";
import { MagneticButton } from "@/components/interactions/MagneticButton";
import { RippleButton } from "@/components/interactions/RippleButton";
import { FadeInView } from "@/components/animations/ScrollAnimations";
import { GradientText } from "@/components/animations/TextAnimations";

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

const makes = ["All Makes", "Tesla", "BMW", "Mercedes", "Audi", "Porsche", "Toyota", "Lexus"];
const priceRanges = ["Any Price", "Under $50k", "$50k - $75k", "$75k - $100k", "$100k+"];
const years = ["Any Year", "2024", "2023", "2022", "2021", "2020"];

export function DemoSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [compareCars, setCompareCars] = useState<Car[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMake, setSelectedMake] = useState("All Makes");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Any Price");
  const [selectedYear, setSelectedYear] = useState("Any Year");
  const [showComparison, setShowComparison] = useState(false);
  const [alertCar, setAlertCar] = useState<Car | null>(null);

  // Filter cars based on search and filters
  const filteredCars = useMemo(() => {
    let result = demoListings;

    if (searchQuery.length > 0) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          `${car.make} ${car.model}`.toLowerCase().includes(query)
      );
    }

    if (selectedMake !== "All Makes") {
      result = result.filter((car) => car.make === selectedMake);
    }

    if (selectedPriceRange !== "Any Price") {
      result = result.filter((car) => {
        switch (selectedPriceRange) {
          case "Under $50k":
            return car.price < 50000;
          case "$50k - $75k":
            return car.price >= 50000 && car.price < 75000;
          case "$75k - $100k":
            return car.price >= 75000 && car.price < 100000;
          case "$100k+":
            return car.price >= 100000;
          default:
            return true;
        }
      });
    }

    if (selectedYear !== "Any Year") {
      result = result.filter((car) => car.year.toString() === selectedYear);
    }

    return result;
  }, [searchQuery, selectedMake, selectedPriceRange, selectedYear]);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const toggleCompare = (car: Car, e: React.MouseEvent) => {
    e.stopPropagation();
    if (compareCars.find((c) => c.id === car.id)) {
      setCompareCars(compareCars.filter((c) => c.id !== car.id));
    } else if (compareCars.length < 2) {
      setCompareCars([...compareCars, car]);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const formatOdometer = (km: number) => {
    return `${(km / 1000).toFixed(0)}k km`;
  };

  const calculateSavings = (car: Car) => {
    const drop = car.originalPrice - car.price;
    const percent = Math.round((drop / car.originalPrice) * 100);
    return { amount: drop, percent };
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
          <FadeInView>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b8956e]/10 border border-[#b8956e]/20 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Eye className="w-4 h-4 text-[#b8956e]" />
              <span className="text-sm font-medium text-[#b8956e]">Interactive Demo</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f0] mb-4">
              Try It{" "}
              <GradientText>Live</GradientText>
            </h2>

            <p className="text-[#a0a0a0] text-lg max-w-2xl mx-auto">
              Search real listings, compare cars side-by-side, and set price alerts. 
              This is exactly what you&apos;ll get with AutoHarvester.
            </p>
          </FadeInView>
        </div>

        {/* Search Bar */}
        <FadeInView delay={0.1}>
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-[#666666] group-focus-within:text-[#b8956e] transition-colors" />
              </div>
              <Input
                type="text"
                placeholder="Search by make or model..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHasSearched(true);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-12 pr-4 py-6 bg-[#141414] border-white/[0.06] text-[#f5f5f0] placeholder:text-[#666666] text-lg rounded-xl focus:border-[#b8956e]/50 focus:ring-2 focus:ring-[#b8956e]/10 transition-all"
              />
              <motion.button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold rounded-lg transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                Search
              </motion.button>
            </div>

            {/* Quick suggestions */}
            {!hasSearched && (
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {["Tesla Model 3", "BMW 3 Series", "Mercedes C-Class", "Porsche 911"].map((make) => (
                  <motion.button
                    key={make}
                    onClick={() => {
                      setSearchQuery(make);
                      setHasSearched(true);
                    }}
                    className="px-4 py-2 text-sm text-[#a0a0a0] bg-[#141414] border border-white/[0.06] rounded-full hover:border-[#b8956e]/30 hover:text-[#b8956e] transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {make}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </FadeInView>

        {/* Filters Toggle */}
        <FadeInView delay={0.15}>
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-6">
            <RippleButton
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#a0a0a0] bg-[#141414] border border-white/[0.06] rounded-lg hover:border-[#b8956e]/30 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <motion.span
                animate={{ rotate: showFilters ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </RippleButton>

            {compareCars.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setShowComparison(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-[#b8956e]/20 text-[#b8956e] border border-[#b8956e]/30 rounded-lg hover:bg-[#b8956e]/30 transition-all"
              >
                <ArrowRightLeft className="w-4 h-4" />
                Compare ({compareCars.length})
              </motion.button>
            )}
          </div>
        </FadeInView>

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto mb-8 overflow-hidden"
            >
              <div className="p-4 bg-[#141414] rounded-xl border border-white/[0.06]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-[#666666] mb-2 block">Make</label>
                    <select
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/[0.06] rounded-lg text-[#f5f5f0] text-sm focus:border-[#b8956e]/50 focus:outline-none"
                    >
                      {makes.map((make) => (
                        <option key={make} value={make}>{make}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#666666] mb-2 block">Price Range</label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/[0.06] rounded-lg text-[#f5f5f0] text-sm focus:border-[#b8956e]/50 focus:outline-none"
                    >
                      {priceRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-[#666666] mb-2 block">Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/[0.06] rounded-lg text-[#f5f5f0] text-sm focus:border-[#b8956e]/50 focus:outline-none"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Grid with Layout Animation */}
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {filteredCars.length > 0 && (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCars.slice(0, 9).map((car, index) => {
                  const savings = calculateSavings(car);
                  const isSelected = compareCars.find((c) => c.id === car.id);

                  return (
                    <motion.div
                      key={car.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedCar(car)}
                    >
                      <div className="relative bg-[#141414] rounded-xl border border-white/[0.06] overflow-hidden hover:border-[#b8956e]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#b8956e]/5"
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

                          {/* State Badge */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            {car.state === "sold" ? (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Sold</Badge>
                            ) : (
                              <Badge className="bg-[#b8956e]/20 text-[#b8956e] border-[#b8956e]/30">For Sale</Badge>
                            )}
                            
                            {savings.percent > 10 && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                -{savings.percent}%
                              </Badge>
                            )}
                          </div>

                          {/* Compare Toggle */}
                          <motion.button
                            onClick={(e) => toggleCompare(car, e)}
                            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-[#b8956e] text-[#0a0a0a]"
                                : "bg-[#0a0a0a]/80 text-[#f5f5f0] opacity-0 group-hover:opacity-100"
                            }`}
                            whileTap={{ scale: 0.9 }}
                          >
                            {isSelected ? <Check className="w-4 h-4" /> : <ArrowRightLeft className="w-4 h-4" />}
                          </motion.button>

                          {/* View Chart Badge */}
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-1 text-[#b8956e] text-xs bg-[#0a0a0a]/80 px-2 py-1 rounded-full backdrop-blur-sm">
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
                                  -{savings.percent}%
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

                          {/* Alert Button */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAlertCar(car);
                            }}
                            className="w-full mt-3 flex items-center justify-center gap-2 py-2 text-sm text-[#b8956e] bg-[#b8956e]/10 rounded-lg hover:bg-[#b8956e]/20 transition-colors opacity-0 group-hover:opacity-100"
                            whileTap={{ scale: 0.98 }}
                          >
                            <Bell className="w-4 h-4" />
                            Set Price Alert
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {hasSearched && filteredCars.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-[#666666]">No results found. Try adjusting your filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>

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

                  {/* Alert CTA */}
                  <div className="p-4 bg-[#b8956e]/10 rounded-xl border border-[#b8956e]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-[#f5f5f0] mb-1">Want this car for less?</h4>
                        <p className="text-sm text-[#a0a0a0]">Set a price alert and we&apos;ll notify you when it drops.</p>
                      </div>
                      <RippleButton
                        onClick={() => setAlertCar(selectedCar)}
                        className="px-6 py-3 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold rounded-lg"
                      >
                        Set Alert
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Modal */}
        <AnimatePresence>
          {showComparison && compareCars.length === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/90 backdrop-blur-sm"
              onClick={() => setShowComparison(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#141414] rounded-2xl border border-white/[0.06] p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#f5f5f0]">Compare Cars</h2>
                  <button
                    onClick={() => setShowComparison(false)}
                    className="p-2 rounded-full hover:bg-white/[0.06] transition-colors"
                  >
                    <X className="w-6 h-6 text-[#666666]" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {compareCars.map((car, index) => (
                    <motion.div
                      key={car.id}
                      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-4"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden">
                        <Image
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h3 className="text-xl font-bold text-[#f5f5f0]">
                        {car.year} {car.make} {car.model}
                      </h3>

                      <div className="space-y-2">
                        {[
                          { label: "Price", value: formatPrice(car.price) },
                          { label: "Odometer", value: formatOdometer(car.odometer) },
                          { label: "Location", value: car.location },
                          { label: "Fuel Type", value: car.fuelType },
                          { label: "Transmission", value: car.transmission },
                        ].map((spec) => (
                          <div key={spec.label} className="flex justify-between py-2 border-b border-white/[0.06]">
                            <span className="text-[#666666]">{spec.label}</span>
                            <span className="text-[#f5f5f0] font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Price Diff */}
                {compareCars.length === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 p-4 bg-[#b8956e]/10 rounded-xl border border-[#b8956e]/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[#a0a0a0]">Price Difference</span>
                      <span className="text-xl font-bold text-[#b8956e]">
                        {formatPrice(Math.abs(compareCars[0].price - compareCars[1].price))}
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alert Simulator Modal */}
        <AnimatePresence>
          {alertCar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/90 backdrop-blur-sm"
              onClick={() => setAlertCar(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-[#141414] rounded-2xl border border-white/[0.06] p-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                    <Image
                      src={alertCar.image}
                      alt={`${alertCar.make} ${alertCar.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#f5f5f0]">Price Alert</h3>
                    <p className="text-sm text-[#a0a0a0]">
                      {alertCar.year} {alertCar.make} {alertCar.model}
                    </p>
                    <p className="text-sm text-[#b8956e] font-medium">
                      Current: {formatPrice(alertCar.price)}
                    </p>
                  </div>
                </div>

                <AlertSimulator
                  onSimulate={(email) => {
                    console.log(`Alert created for ${email} on ${alertCar.id}`);
                    setTimeout(() => setAlertCar(null), 2000);
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default DemoSearch;
