"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Share2, 
  Bell, 
  Trophy, 
  Users, 
  Target,
  Sparkles,
  TrendingUp,
  Gift,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DealBragGenerator,
  PriceDropAlert,
  ExitIntentModal,
  ReferralDashboard,
  GamificationUI,
  SocialProofEngine,
  CarComparisonTool,
} from "@/components/viral";

const DEMO_CAR = {
  id: "demo-001",
  make: "BMW",
  model: "3 Series",
  year: 2022,
  variant: "330i M Sport",
  price: 58900,
  originalPrice: 72000,
  image: "/images/cars/bmw-3-series.jpg",
  location: "Sydney, NSW",
  odometer: 42300,
  fuelType: "Petrol",
  transmission: "Automatic",
  features: ["M Sport Package", "Harman Kardon", "Wireless CarPlay", "HUD"],
};

const FEATURES = [
  {
    id: "deal-brag",
    title: "Deal Brag",
    description: "One-click shareable images for social media",
    icon: Share2,
    color: "#b8956e",
    component: "DealBragGenerator",
  },
  {
    id: "price-alerts",
    title: "Price Drop Alerts",
    description: "Real-time FOMO notifications & urgency indicators",
    icon: Bell,
    color: "#ef4444",
    component: "PriceDropAlert",
  },
  {
    id: "gamification",
    title: "Gamification",
    description: "Points, badges, leaderboards & rewards",
    icon: Trophy,
    color: "#f59e0b",
    component: "GamificationUI",
  },
  {
    id: "social-proof",
    title: "Social Proof Engine",
    description: "Live counters, activity feeds & trust badges",
    icon: Users,
    color: "#22c55e",
    component: "SocialProofEngine",
  },
  {
    id: "referral",
    title: "Referral Program",
    description: "Give 50% off, get 1 month Pro free",
    icon: Gift,
    color: "#8b5cf6",
    component: "ReferralDashboard",
  },
  {
    id: "comparison",
    title: "Car Comparison",
    description: "Side-by-side deal comparison tool",
    icon: Target,
    color: "#3b82f6",
    component: "CarComparisonTool",
  },
];

export default function ViralFeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showDealBrag, setShowDealBrag] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b8956e]/10 border border-[#b8956e]/30 mb-6">
            <Rocket className="w-4 h-4 text-[#b8956e]" />
            <span className="text-sm text-[#b8956e]">Viral Growth Engine</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#f5f5f0] mb-6">
            Make It{" "}
            <span className="text-[#b8956e]">Viral</span>
          </h1>

          <p className="text-xl text-[#a0a0a0] max-w-2xl mx-auto mb-8">
            AutoHarvester is now equipped with powerful viral mechanics designed to 
            maximize sharing, engagement, and conversion.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button 
              onClick={() => setShowDealBrag(true)}
              className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Try Deal Brag
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowExitIntent(true)}
              className="border-white/[0.1] text-[#f5f5f0]"
            >
              <Bell className="w-4 h-4 mr-2" />
              Test Exit Intent
            </Button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveFeature(feature.id)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                activeFeature === feature.id
                  ? "bg-[#b8956e]/10 border-[#b8956e]/50"
                  : "bg-[#141414] border-white/[0.06] hover:border-white/[0.1]"
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
              </div>

              <h3 className="text-lg font-bold text-[#f5f5f0] mb-2">{feature.title}</h3>
              <p className="text-[#666666] text-sm">{feature.description}</p>

              <div className="mt-4 flex items-center text-sm text-[#b8956e]">
                <span>View Demo</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Feature Demo */}
        <AnimatePresence mode="wait">
          {activeFeature && (
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#141414] rounded-2xl border border-white/[0.06] p-8"
            >
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-8">
                {FEATURES.find((f) => f.id === activeFeature)?.title} Demo
              </h2>

              <div className="max-w-2xl mx-auto">
                {activeFeature === "deal-brag" && (
                  <div className="text-center py-12">
                    <Button
                      onClick={() => setShowDealBrag(true)}
                      className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold text-lg px-8 py-6"
                    >
                      <Share2 className="w-5 h-5 mr-2" />
                      Generate Share Image
                    </Button>
                  </div>
                )}

                {activeFeature === "price-alerts" && (
                  <PriceDropAlert car={DEMO_CAR} />
                )}

                {activeFeature === "gamification" && (
                  <GamificationUI />
                )}

                {activeFeature === "social-proof" && (
                  <SocialProofEngine />
                )}

                {activeFeature === "referral" && (
                  <ReferralDashboard />
                )}

                {activeFeature === "comparison" && (
                  <CarComparisonTool initialCar={DEMO_CAR} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Target Viral Coefficient", value: "0.5+", icon: TrendingUp },
            { label: "Target Referral Rate", value: "20%+", icon: Users },
            { label: "Points to Award", value: "Unlimited", icon: Trophy },
            { label: "Social Shares", value: "Trackable", icon: Share2 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-[#141414] rounded-2xl border border-white/[0.06]"
            >
              <stat.icon className="w-8 h-8 text-[#b8956e] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#f5f5f0] mb-1">{stat.value}</div>
              <div className="text-sm text-[#666666]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modals */}
      <DealBragGenerator
        car={DEMO_CAR}
        isOpen={showDealBrag}
        onClose={() => setShowDealBrag(false)}
      />

      <ExitIntentModal 
        car={DEMO_CAR} 
      />
    </div>
  );
}
