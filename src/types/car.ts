export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export interface CarListing {
  id: string;
  make: string;
  model: string;
  year: number;
  variant: string;
  price: number;
  originalPrice: number;
  soldPrice?: number | null;
  priceHistory: PriceHistoryPoint[];
  odometer: number;
  location: string;
  state: "active" | "sold" | string;
  sellerType: "dealer" | "private" | string;
  image: string;
  listingDate: string;
  soldDate?: string;
  features: string[];
  fuelType: string;
  transmission: string;
}

export interface MarketTrends {
  depreciationByBrand: Record<string, {
    year1: number;
    year2: number;
    year3: number;
    year4: number;
    year5: number;
  }>;
  bestTimeToBuy: Record<string, number>;
  priceDistribution: Array<{
    range: string;
    percentage: number;
  }>;
  daysToSellByPrice: Array<{
    priceRange: string;
    avgDays: number;
  }>;
}

export interface Insights {
  avgDiscount: number;
  avgDaysListed: number;
  totalListings: number;
  totalSold: number;
  soldPriceDiff: number;
}

export interface DemoData {
  listings: CarListing[];
  marketTrends: MarketTrends;
  insights: Insights;
}
