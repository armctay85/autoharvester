import type { Metadata } from "next";
import { motion } from "framer-motion";
import { Search, Database, Archive, LineChart, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | AutoHarvester",
  description: "Learn how AutoHarvester tracks, harvests, archives, and analyzes car pricing data to give you the price history no one else has.",
};

const steps = [
  {
    icon: Search,
    title: "List",
    subtitle: "Continuous Monitoring",
    description:
      "Our advanced crawlers continuously scan major Australian car listing platforms 24/7. We track new listings, price changes, and status updates in real-time, ensuring no data point is missed.",
    details: [
      "Monitors Carsales, Gumtree, Facebook Marketplace, and more",
      "Real-time detection of new listings",
      "Tracks price changes as they happen",
      "Monitors listing status (available, sold, removed)",
    ],
  },
  {
    icon: Database,
    title: "Harvest",
    subtitle: "Data Capture",
    description:
      "When a listing is detected, our system immediately captures comprehensive data including price, specifications, photos, location, and seller information before it can be altered or removed.",
    details: [
      "Captures complete vehicle specifications",
      "Records initial asking price",
      "Stores high-resolution images",
      "Preserves seller details and location",
    ],
  },
  {
    icon: Archive,
    title: "Archive",
    subtitle: "Permanent Storage",
    description:
      "Every data point is permanently stored in our secure, redundant database. Unlike listing sites that delete sold data, we preserve it forever, building an ever-growing historical record.",
    details: [
      "Immutable historical record",
      "Redundant cloud storage",
      "Data integrity verification",
      "Comprehensive backup systems",
    ],
  },
  {
    icon: LineChart,
    title: "Analyze",
    subtitle: "Intelligence Generation",
    description:
      "Our analytics engine processes millions of data points to generate insights: depreciation curves, market trends, fair value estimates, and optimal timing predictions.",
    details: [
      "Machine learning price predictions",
      "Make/model depreciation curves",
      "Market trend analysis",
      "Fair value calculations",
    ],
  },
];

const comparisonPoints = [
  { feature: "Sold Price History", others: false, autoharvester: true },
  { feature: "Price Change Tracking", others: false, autoharvester: true },
  { feature: "Days on Market Data", others: false, autoharvester: true },
  { feature: "Depreciation Curves", others: false, autoharvester: true },
  { feature: "Market Trend Analysis", others: false, autoharvester: true },
  { feature: "Historical Archive", others: false, autoharvester: true },
  { feature: "API Access", others: false, autoharvester: true },
  { feature: "Bulk Data Export", others: false, autoharvester: true },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f5f5f0] mb-6">
            How It{" "}
            <span className="text-[#b8956e]">Works</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#a0a0a0]">
            A sophisticated four-step process that transforms raw listing data into
            actionable market intelligence.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-24 lg:space-y-32 mb-24">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[#b8956e]/10 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-[#b8956e]" />
                  </div>
                  <div>
                    <span className="text-sm text-[#b8956e] font-medium">
                      Step {index + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0]">
                      {step.title}
                    </h2>
                  </div>
                </div>
                <p className="text-[#a0a0a0] text-lg mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#22c55e] mt-0.5 flex-shrink-0" />
                      <span className="text-[#a0a0a0]">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`relative ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="aspect-square rounded-2xl bg-[#141414] border border-white/[0.06] p-8 flex items-center justify-center">
                  <div className="text-center">
                    <step.icon className="w-24 h-24 text-[#b8956e]/20 mx-auto mb-4" />
                    <p className="text-[#666666] text-sm uppercase tracking-wider">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-16 left-1/2 w-[1px] h-16 bg-gradient-to-b from-[#b8956e]/30 to-transparent" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] text-center mb-8">
            The AutoHarvester{" "}
            <span className="text-[#b8956e]">Difference</span>
          </h2>

          <div className="bg-[#141414] rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="text-sm font-medium text-[#f5f5f0]">Feature</div>
              <div className="text-sm font-medium text-[#ef4444] text-center">Others</div>
              <div className="text-sm font-medium text-[#22c55e] text-center">
                AutoHarvester
              </div>
            </div>

            {comparisonPoints.map((point, index) => (
              <div
                key={point.feature}
                className={`grid grid-cols-3 gap-4 p-4 ${
                  index !== comparisonPoints.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
                }`}
              >
                <div className="text-sm text-[#a0a0a0]">{point.feature}</div>
                <div className="flex justify-center">
                  {point.others ? (
                    <Check className="w-5 h-5 text-[#22c55e]" />
                  ) : (
                    <X className="w-5 h-5 text-[#ef4444]" />
                  )}
                </div>
                <div className="flex justify-center">
                  {point.autoharvester ? (
                    <Check className="w-5 h-5 text-[#22c55e]" />
                  ) : (
                    <X className="w-5 h-5 text-[#ef4444]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
