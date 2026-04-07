"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ComparisonCar {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice: number;
  odometer: number;
  fuelType: string;
  transmission: string;
  image: string;
  features: string[];
  location: string;
}

interface CarComparisonToolProps {
  initialCar?: ComparisonCar;
}

// Mock data for available cars
const MOCK_CARS: ComparisonCar[] = [
  {
    id: "car-001",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 61900,
    originalPrice: 68500,
    odometer: 18450,
    fuelType: "Electric",
    transmission: "Automatic",
    image: "/images/cars/tesla-model-3.jpg",
    features: ["Autopilot", "Premium Interior", "Glass Roof", "360 Cameras"],
    location: "Sydney, NSW",
  },
  {
    id: "car-002",
    make: "BMW",
    model: "3 Series",
    year: 2022,
    price: 58900,
    originalPrice: 72000,
    odometer: 42300,
    fuelType: "Petrol",
    transmission: "Automatic",
    image: "/images/cars/bmw-3-series.jpg",
    features: ["M Sport Package", "Harman Kardon", "Wireless CarPlay", "HUD"],
    location: "Melbourne, VIC",
  },
  {
    id: "car-003",
    make: "Toyota",
    model: "RAV4",
    year: 2021,
    price: 48500,
    originalPrice: 52000,
    odometer: 56800,
    fuelType: "Hybrid",
    transmission: "CVT",
    image: "/images/cars/toyota-rav4.jpg",
    features: ["Hybrid AWD", "Sunroof", "JBL Audio", "Power Tailgate"],
    location: "Brisbane, QLD",
  },
  {
    id: "car-004",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2022,
    price: 68900,
    originalPrice: 82000,
    odometer: 29100,
    fuelType: "Petrol",
    transmission: "Automatic",
    image: "/images/cars/mercedes-c-class.jpg",
    features: ["AMG Line", "Burmester Audio", "Ambient Lighting", "Panoramic Roof"],
    location: "Perth, WA",
  },
];

const SPEC_CATEGORIES: { key: string; label: string; format: (v: unknown, car?: ComparisonCar) => string }[] = [
  { key: "year", label: "Year", format: (v) => String(v) },
  { key: "price", label: "Price", format: (v) => `$${Number(v).toLocaleString()}` },
  {
    key: "savings",
    label: "Savings",
    format: (_, car) => {
      if (!car) return "$0";
      const savings = car.originalPrice - car.price;
      const percent = Math.round((savings / car.originalPrice) * 100);
      return `$${savings.toLocaleString()} (${percent}%)`;
    },
  },
  { key: "odometer", label: "Odometer", format: (v) => `${(Number(v) / 1000).toFixed(0)}k km` },
  { key: "fuelType", label: "Fuel Type", format: (v) => String(v) },
  { key: "transmission", label: "Transmission", format: (v) => String(v) },
  { key: "location", label: "Location", format: (v) => String(v).split(",")[0] },
];

export function CarComparisonTool({ initialCar }: CarComparisonToolProps) {
  const [selectedCars, setSelectedCars] = useState<ComparisonCar[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedSpecs, setExpandedSpecs] = useState(true);

  useEffect(() => {
    if (initialCar) {
      setSelectedCars([initialCar]);
    }
  }, [initialCar]);

  const addCar = (car: ComparisonCar) => {
    if (selectedCars.length < 3 && !selectedCars.find((c) => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
    }
    setShowAddModal(false);
  };

  const removeCar = (id: string) => {
    setSelectedCars(selectedCars.filter((c) => c.id !== id));
  };

  const getBestValue = (key: string): string | null => {
    if (selectedCars.length < 2) return null;

    if (key === "price") {
      const minPrice = Math.min(...selectedCars.map((c) => c.price));
      return selectedCars.find((c) => c.price === minPrice)?.id || null;
    }

    if (key === "savings") {
      const maxSavings = Math.max(...selectedCars.map((c) => c.originalPrice - c.price));
      return selectedCars.find((c) => c.originalPrice - c.price === maxSavings)?.id || null;
    }

    if (key === "odometer") {
      const minOdo = Math.min(...selectedCars.map((c) => c.odometer));
      return selectedCars.find((c) => c.odometer === minOdo)?.id || null;
    }

    if (key === "year") {
      const maxYear = Math.max(...selectedCars.map((c) => c.year));
      return selectedCars.find((c) => c.year === maxYear)?.id || null;
    }

    return null;
  };

  if (selectedCars.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#141414] rounded-2xl p-8 border border-white/[0.06] text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#b8956e]/10 flex items-center justify-center">
          <Scale className="w-8 h-8 text-[#b8956e]" />
        </div>
        <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">Compare Cars</h3>
        <p className="text-[#666666] mb-4">Select cars to compare side-by-side</p>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Car to Compare
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#141414] rounded-2xl border border-white/[0.06] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-[#b8956e]" />
            <h3 className="text-xl font-bold text-[#f5f5f0]">Compare ({selectedCars.length}/3)</h3>
          </div>
          <div className="flex items-center gap-2">
            {selectedCars.length < 3 && (
              <Button
                onClick={() => setShowAddModal(true)}
                variant="outline"
                size="sm"
                className="border-[#b8956e]/50 text-[#b8956e]"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Car
              </Button>
            )}
            <button
              onClick={() => setExpandedSpecs(!expandedSpecs)}
              className="p-2 rounded-lg hover:bg-white/5"
            >
              {expandedSpecs ? (
                <ChevronUp className="w-5 h-5 text-[#666666]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#666666]" />
              )}
            </button>
          </div>
        </div>

        {/* Car Headers */}
        <div className={`grid gap-4 p-6 ${selectedCars.length === 1 ? "grid-cols-1" : selectedCars.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {selectedCars.map((car) => (
            <div key={car.id} className="relative">
              <button
                onClick={() => removeCar(car.id)}
                className="absolute -top-2 -right-2 z-10 p-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="aspect-[4/3] relative rounded-xl overflow-hidden mb-3 bg-[#0a0a0a]">
                <Image
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                />
              </div>

              <h4 className="font-bold text-[#f5f5f0]">
                {car.year} {car.make}
              </h4>
              <p className="text-[#b8956e] font-medium">{car.model}</p>
            </div>
          ))}
        </div>

        {/* Specs Comparison */}
        <AnimatePresence>
          {expandedSpecs && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-white/[0.06]"
            >
              {SPEC_CATEGORIES.map((spec) => {
                const bestValueId = getBestValue(spec.key);

                return (
                  <div
                    key={spec.key}
                    className="grid gap-4 p-4 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors"
                    style={{
                      gridTemplateColumns: `100px repeat(${selectedCars.length}, 1fr)`,
                    }}
                  >
                    <div className="text-sm text-[#666666] font-medium">{spec.label}</div>

                    {selectedCars.map((car) => {
                      const isBest = bestValueId === car.id;
                      let value: string;

                      if (spec.key === "savings") {
                        value = spec.format(null, car);
                      } else {
                        const carValue = car[spec.key as keyof ComparisonCar];
                        value = spec.format(carValue as never);
                      }

                      return (
                        <div key={car.id} className="text-center">
                          <span
                            className={`text-sm ${
                              isBest ? "text-green-400 font-bold" : "text-[#f5f5f0]"
                            }`}
                          >
                            {value}
                          </span>
                          {isBest && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-1 text-green-400"
                            >
                              ✓
                            </motion.span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Features Comparison */}
              <div
                className="grid gap-4 p-4"
                style={{
                  gridTemplateColumns: `100px repeat(${selectedCars.length}, 1fr)`,
                }}
              >
                <div className="text-sm text-[#666666] font-medium">Features</div>

                {selectedCars.map((car) => (
                  <div key={car.id} className="text-sm">
                    <div className="flex flex-wrap gap-1">
                      {car.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-0.5 bg-[#b8956e]/10 text-[#b8956e] rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Winner Badge */}
        {selectedCars.length >= 2 && (
          <div className="p-6 border-t border-white/[0.06]">
            <div className="bg-gradient-to-r from-green-500/20 to-transparent rounded-xl p-4 border border-green-500/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-green-400">Best Deal</p>
                  {(() => {
                    const bestCar = selectedCars.reduce((best, car) => {
                      const bestValue = best.originalPrice - best.price;
                      const carValue = car.originalPrice - car.price;
                      return carValue > bestValue ? car : best;
                    });
                    return (
                      <p className="text-lg font-bold text-[#f5f5f0]">
                        {bestCar.year} {bestCar.make} {bestCar.model}
                      </p>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Add Car Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="bg-[#141414] rounded-2xl border border-white/[0.06]">
                <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                  <h3 className="text-xl font-bold text-[#f5f5f0]">Add Car to Compare</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 rounded-lg hover:bg-white/10"
                  >
                    <X className="w-5 h-5 text-[#666666]" />
                  </button>
                </div>

                <div className="p-6 grid grid-cols-2 gap-4">
                  {MOCK_CARS.filter((car) => !selectedCars.find((c) => c.id === car.id)).map((car) => (
                    <button
                      key={car.id}
                      onClick={() => addCar(car)}
                      className="text-left p-4 rounded-xl bg-[#0a0a0a] border border-white/[0.06] hover:border-[#b8956e]/50 transition-colors"
                    >
                      <div className="aspect-video relative rounded-lg overflow-hidden mb-3 bg-[#141414]">
                        <Image
                          src={car.image}
                          alt={`${car.make} ${car.model}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-bold text-[#f5f5f0]">
                        {car.year} {car.make} {car.model}
                      </h4>
                      <p className="text-[#b8956e]">${car.price.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
