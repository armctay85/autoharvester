export interface PriceHistoryPoint {
  date: string;
  price: number;
  event: 'listed' | 'price_drop' | 'sold' | 'relisted';
  reason?: string;
  buyer_type?: string;
}

export interface CarListing {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  odometer: number;
  location: string;
  state: 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';
  seller_type: 'dealer' | 'private';
  dealer_name?: string;
  original_price: number;
  current_price: number;
  sold_price?: number;
  status: 'active' | 'sold' | 'withdrawn';
  listed_date: string;
  sold_date?: string;
  days_listed?: number;
  price_history: PriceHistoryPoint[];
  images: string[];
  features: string[];
  transmission: string;
  fuel_type: string;
  body_type: string;
  colour: string;
  seats: number;
  doors: number;
  engine_size: string;
  cylinders?: number;
  range_km?: number;
  registration: string;
  registration_expiry: string;
}

export interface MarketInsights {
  avg_days_to_sell: number;
  avg_price_drop: number;
  price_drop_frequency: string;
  hot_segment: string;
  cooling_segment: string;
  best_value_retention: string[];
  worst_depreciation: string[];
}

export interface DepreciationCurve {
  y1: number;
  y2: number;
  y3: number;
  y5: number;
}

export interface PremiumListingsData {
  metadata: {
    generated_at: string;
    market: string;
    total_listings: number;
    active_listings: number;
    sold_listings: number;
    currency: string;
    sources: string[];
  };
  market_insights: MarketInsights;
  depreciation_curves: Record<string, DepreciationCurve>;
  listings: CarListing[];
}
