import rawData from '@/data/premium-listings.json';
import type { PremiumListingsData, CarListing } from '@/types/car-listing';

export const premiumData = rawData as PremiumListingsData;

export const { listings, market_insights, depreciation_curves, metadata } = premiumData;

// Filter functions
export const getActiveListings = (): CarListing[] => 
  listings.filter(l => l.status === 'active');

export const getSoldListings = (): CarListing[] => 
  listings.filter(l => l.status === 'sold');

export const getListingsByMake = (make: string): CarListing[] => 
  listings.filter(l => l.make.toLowerCase() === make.toLowerCase());

export const getListingsByState = (state: string): CarListing[] => 
  listings.filter(l => l.state.toLowerCase() === state.toLowerCase());

export const getListingsByPriceRange = (min: number, max: number): CarListing[] => 
  listings.filter(l => l.current_price >= min && l.current_price <= max);

export const getListingsByBodyType = (bodyType: string): CarListing[] => 
  listings.filter(l => l.body_type.toLowerCase().includes(bodyType.toLowerCase()));

export const searchListings = (query: string): CarListing[] => {
  const q = query.toLowerCase();
  return listings.filter(l => 
    l.make.toLowerCase().includes(q) ||
    l.model.toLowerCase().includes(q) ||
    l.variant.toLowerCase().includes(q) ||
    `${l.make} ${l.model}`.toLowerCase().includes(q)
  );
};

// Stats functions
export const getAverageDaysToSell = (): number => market_insights.avg_days_to_sell;

export const getAveragePriceDrop = (): number => market_insights.avg_price_drop;

export const getDepreciationForBrand = (brand: string): number => {
  const curve = depreciation_curves[brand];
  return curve ? curve.y3 : 35; // Default 35% at 3 years
};

// Formatters
export const formatPrice = (price: number): string => 
  `$${price.toLocaleString('en-AU')}`;

export const formatOdometer = (km: number): string => 
  `${(km / 1000).toFixed(0)}k km`;

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};

export const calculatePriceDrop = (listing: CarListing): { amount: number; percent: number } => {
  const amount = listing.original_price - (listing.sold_price || listing.current_price);
  const percent = (amount / listing.original_price) * 100;
  return { amount, percent };
};

// Unique values for filters
export const uniqueMakes = [...new Set(listings.map(l => l.make))].sort();
export const uniqueStates = [...new Set(listings.map(l => l.state))].sort();
export const uniqueBodyTypes = [...new Set(listings.map(l => l.body_type))].sort();
export const uniqueFuelTypes = [...new Set(listings.map(l => l.fuel_type))].sort();
