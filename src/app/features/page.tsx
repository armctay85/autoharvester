import type { Metadata } from "next";
import {
  TrendingDown,
  Database,
  LineChart,
  Bell,
  FileText,
  Search,
  Filter,
  Download,
  Shield,
  Zap,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features | AutoHarvester",
  description:
    "Explore AutoHarvester's powerful features: Price History, Sold Price Database, Market Trends, Price Alerts, and comprehensive Market Reports.",
};

const mainFeatures = [
  {
    icon: TrendingDown,
    title: "Price History",
    description:
      "See the complete price journey of any vehicle. Track every price change from initial listing to final sale, including the dates and amounts of each adjustment.",
    benefits: [
      "Complete price change timeline",
      "Days-on-market tracking",
      "Price reduction alerts",
      "Historical price comparison",
      "Negotiation insights",
    ],
  },
  {
    icon: Database,
    title: "Sold Price Database",
    description:
      "Access Australia's largest database of sold car prices. Unlike listing sites that hide sold prices, we preserve them forever, giving you the true market value.",
    benefits: [
      "500,000+ sold vehicle records",
      "Actual sale prices, not estimates",
      "Make/model/year filtering",
      "Location-based pricing",
      "Condition-adjusted values",
    ],
  },
  {
    icon: LineChart,
    title: "Market Trends",
    description:
      "Analyze depreciation curves and market movements with sophisticated data visualization. Understand how values change over time and identify the best times to buy or sell.",
    benefits: [
      "Depreciation curve analysis",
      "Seasonal trend identification",
      "Supply/demand indicators",
      "Value prediction models",
      "Market heat maps",
    ],
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description:
      "Never miss a deal. Set custom alerts for specific makes, models, or price ranges and get notified instantly when a matching vehicle's price drops.",
    benefits: [
      "Real-time price drop notifications",
      "Custom filter criteria",
      "Email and push notifications",
      "Alert history tracking",
      "Batch alert management",
    ],
  },
  {
    icon: FileText,
    title: "Market Reports",
    description:
      "Receive monthly intelligence reports curated by automotive data experts. Stay ahead of market movements with professional-grade analysis.",
    benefits: [
      "Monthly market summaries",
      "Hot model identification",
      "Price movement analysis",
      "Expert commentary",
      "Downloadable PDFs",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Search,
    title: "Advanced Search",
    description: "Powerful filters to find exactly what you're looking for.",
  },
  {
    icon: Filter,
    title: "Smart Filters",
    description: "Filter by price history, days on market, and more.",
  },
  {
    icon: Download,
    title: "Data Export",
    description: "Export data in CSV or Excel format for analysis.",
  },
  {
    icon: Shield,
    title: "Data Integrity",
    description: "Verified data sources with accuracy guarantees.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Live data synchronization across all platforms.",
  },
  {
    icon: Clock,
    title: "Historical Archive",
    description: "Access years of historical pricing data.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f5f5f0] mb-6">
            Powerful{" "}
            <span className="text-[#b8956e]">Features</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#a0a0a0]">
            Everything you need to make informed car buying and selling
            decisions. Professional-grade tools for everyone.
          </p>
        </div>

        {/* Main Features */}
        <div className="space-y-24 lg:space-y-32 mb-24">
          {mainFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-14 h-14 rounded-xl bg-[#b8956e]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-[#b8956e]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] mb-4">
                  {feature.title}
                </h2>
                <p className="text-[#a0a0a0] text-lg mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8956e] mt-2 flex-shrink-0" />
                      <span className="text-[#a0a0a0]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="aspect-[4/3] rounded-2xl bg-[#141414] border border-white/[0.06] p-8 flex items-center justify-center">
                  <feature.icon className="w-32 h-32 text-[#b8956e]/20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] text-center mb-12">
            Additional{" "}
            <span className="text-[#b8956e]">Capabilities</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-[#141414] border border-white/[0.06] hover:border-[#b8956e]/20 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-[#b8956e] mb-4" />
                <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#a0a0a0]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API Section */}
        <div className="bg-[#141414] rounded-2xl p-8 lg:p-12 border border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] mb-4">
                Developer? Use Our{" "}
                <span className="text-[#b8956e]">API</span>
              </h2>
              <p className="text-[#a0a0a0] mb-6">
                Integrate AutoHarvester data directly into your applications.
                Our REST API provides programmatic access to our entire database
                with comprehensive documentation and SDKs.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "RESTful API with JSON responses",
                  "Comprehensive documentation",
                  "Python and JavaScript SDKs",
                  "Webhook support for real-time updates",
                  "99.9% uptime SLA",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[#a0a0a0]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#b8956e]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#0a0a0a] rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-[#a0a0a0]">
                {`// Get sold price history for a vehicle
const response = await fetch(
  'https://api.autoharvester.com.au/v1/sold-prices',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    params: {
      make: 'Toyota',
      model: 'Corolla',
      year_from: 2020,
      year_to: 2023
    }
  }
);

const data = await response.json();
console.log(data.prices);`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
