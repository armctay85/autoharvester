"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CarCard } from "@/components/cards/CarCard";
import demoData from "@/data/demo-listings.json";
import { CarListing } from "@/types/car";

const { listings } = demoData;

interface FilterState {
  search: string;
  make: string;
  model: string;
  minPrice: string;
  maxPrice: string;
  location: string;
  state: string;
}

const MAKES = Array.from(new Set(listings.map((l) => l.make))).sort();
const LOCATIONS = Array.from(new Set(listings.map((l) => l.location.split(", ")[0]))).sort();

export default function SearchPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    state: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const availableModels = useMemo(() => {
    if (!filters.make) return [];
    return Array.from(
      new Set(listings.filter((l) => l.make === filters.make).map((l) => l.model))
    ).sort();
  }, [filters.make]);

  const filteredListings = useMemo(() => {
    return listings.filter((car: CarListing) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchSearch =
          car.make.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower) ||
          car.variant.toLowerCase().includes(searchLower);
        if (!matchSearch) return false;
      }
      if (filters.make && car.make !== filters.make) return false;
      if (filters.model && car.model !== filters.model) return false;
      if (filters.minPrice && car.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && car.price > parseInt(filters.maxPrice)) return false;
      if (filters.location && !car.location.includes(filters.location)) return false;
      if (filters.state && car.state !== filters.state) return false;
      return true;
    });
  }, [filters]);

  const activeFiltersCount = Object.values(filters).filter((v) => v !== "").length;

  const clearFilters = () => {
    setFilters({
      search: "",
      make: "",
      model: "",
      minPrice: "",
      maxPrice: "",
      location: "",
      state: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f5f0] mb-2">
            Search <span className="text-[#b8956e]">Listings</span>
          </h1>
          <p className="text-[#a0a0a0]">
            Browse {filteredListings.length} cars with complete price history
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
            <Input
              type="text"
              placeholder="Search by make, model, or variant..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-12 pr-4 py-6 bg-[#141414] border-white/[0.08] text-[#f5f5f0] placeholder:text-[#666666] focus:border-[#b8956e]/50 text-base"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-white/[0.1] text-[#f5f5f0] hover:bg-white/5"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-[#b8956e] text-[#0a0a0a]">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-[#666666] hover:text-[#f5f5f0]"
            >
              <X className="w-4 h-4 mr-1" />
              Clear all
            </Button>
          )}

          {filters.make && (
            <Badge
              variant="outline"
              className="border-[#b8956e]/30 text-[#b8956e] cursor-pointer"
              onClick={() => setFilters({ ...filters, make: "", model: "" })}
            >
              {filters.make} <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
          {filters.model && (
            <Badge
              variant="outline"
              className="border-[#b8956e]/30 text-[#b8956e] cursor-pointer"
              onClick={() => setFilters({ ...filters, model: "" })}
            >
              {filters.model} <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
          {filters.location && (
            <Badge
              variant="outline"
              className="border-[#b8956e]/30 text-[#b8956e] cursor-pointer"
              onClick={() => setFilters({ ...filters, location: "" })}
            >
              {filters.location} <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
          {filters.state && (
            <Badge
              variant="outline"
              className="border-[#b8956e]/30 text-[#b8956e] cursor-pointer"
              onClick={() => setFilters({ ...filters, state: "" })}
            >
              {filters.state === "sold" ? "Sold" : "Active"} <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
          {(filters.minPrice || filters.maxPrice) && (
            <Badge
              variant="outline"
              className="border-[#b8956e]/30 text-[#b8956e] cursor-pointer"
              onClick={() => setFilters({ ...filters, minPrice: "", maxPrice: "" })}
            >
              ${filters.minPrice ? (parseInt(filters.minPrice) / 1000).toFixed(0) + "k" : "0"} - ${filters.maxPrice ? (parseInt(filters.maxPrice) / 1000).toFixed(0) + "k" : "∞"}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          )}
        </motion.div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#141414] rounded-xl border border-white/[0.06] p-6 mb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Make</label>
                <select
                  value={filters.make}
                  onChange={(e) => setFilters({ ...filters, make: e.target.value, model: "" })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/[0.1] rounded-lg text-[#f5f5f0] focus:border-[#b8956e]/50 focus:outline-none"
                >
                  <option value="">All Makes</option>
                  {MAKES.map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Model</label>
                <select
                  value={filters.model}
                  onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                  disabled={!filters.make}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/[0.1] rounded-lg text-[#f5f5f0] focus:border-[#b8956e]/50 focus:outline-none disabled:opacity-50"
                >
                  <option value="">All Models</option>
                  {availableModels.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Min Price</label>
                <select
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/[0.1] rounded-lg text-[#f5f5f0] focus:border-[#b8956e]/50 focus:outline-none"
                >
                  <option value="">No minimum</option>
                  <option value="30000">$30,000</option>
                  <option value="50000">$50,000</option>
                  <option value="75000">$75,000</option>
                  <option value="100000">$100,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Max Price</label>
                <select
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/[0.1] rounded-lg text-[#f5f5f0] focus:border-[#b8956e]/50 focus:outline-none"
                >
                  <option value="">No maximum</option>
                  <option value="50000">$50,000</option>
                  <option value="75000">$75,000</option>
                  <option value="100000">$100,000</option>
                  <option value="150000">$150,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/[0.1] rounded-lg text-[#f5f5f0] focus:border-[#b8956e]/50 focus:outline-none"
                >
                  <option value="">All Locations</option>
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] mb-2">Status</label>
                <select
                  value={filters.state}
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/[0.1] rounded-lg text-[#f5f5f0] focus:border-[#b8956e]/50 focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#f5f5f0] mb-2">No cars found</h3>
            <p className="text-[#666666] mb-6">Try adjusting your filters to see more results</p>
            <Button onClick={clearFilters} variant="outline">Clear all filters</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
