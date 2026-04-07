"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, Flame, Users, Clock, Zap } from "lucide-react";

interface PriceDropAlertProps {
  car: {
    id: string;
    make: string;
    model: string;
    price: number;
    originalPrice: number;
    location: string;
  };
}

interface SocialProofData {
  dealsFoundToday: number;
  peopleViewing: number;
  peopleInLocation: number;
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: string;
  name: string;
  action: string;
  car: string;
  savings: number;
  timeAgo: string;
  avatar: string;
}

// Simulated real-time data
const generateSocialProof = (): SocialProofData => ({
  dealsFoundToday: Math.floor(Math.random() * 500) + 1000,
  peopleViewing: Math.floor(Math.random() * 8) + 2,
  peopleInLocation: Math.floor(Math.random() * 50) + 20,
  recentActivity: [
    { id: "1", name: "Sarah M.", action: "saved", car: "BMW 3 Series", savings: 3200, timeAgo: "2 min ago", avatar: "👩" },
    { id: "2", name: "James K.", action: "found", car: "Tesla Model 3", savings: 5600, timeAgo: "5 min ago", avatar: "👨" },
    { id: "3", name: "Emma L.", action: "alerted", car: "Toyota RAV4", savings: 2100, timeAgo: "12 min ago", avatar: "👱" },
    { id: "4", name: "Michael R.", action: "saved", car: "Mercedes C-Class", savings: 8900, timeAgo: "18 min ago", avatar: "🧔" },
  ],
});

export function PriceDropAlert({ car }: PriceDropAlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [socialProof, setSocialProof] = useState<SocialProofData | null>(null);
  const [showFOMO, setShowFOMO] = useState(false);

  const priceDrop = car.originalPrice - car.price;
  const priceDropPercent = Math.round((priceDrop / car.originalPrice) * 100);

  useEffect(() => {
    // Simulate price drop notification after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      setSocialProof(generateSocialProof());
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const fomoTimer = setTimeout(() => {
        setShowFOMO(true);
      }, 3000);

      return () => clearTimeout(fomoTimer);
    }
  }, [isVisible]);

  // Update viewer count periodically
  useEffect(() => {
    if (!showFOMO) return;

    const interval = setInterval(() => {
      setSocialProof((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          peopleViewing: Math.max(2, prev.peopleViewing + Math.floor(Math.random() * 3) - 1),
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [showFOMO]);

  return (
    <div className="space-y-4">
      {/* Price Drop Alert Banner */}
      <AnimatePresence>
        {isVisible && priceDrop > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-500/20 via-red-500/10 to-transparent border border-red-500/30 p-4"
          >
            {/* Animated pulse background */}
            <motion.div
              className="absolute inset-0 bg-red-500/10"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                <Flame className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">🔥 HOT DEAL</span>
                  <span className="text-[#a0a0a0] text-sm">Price just dropped!</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-white">
                    -${priceDrop.toLocaleString()}
                  </span>
                  <span className="text-red-400 font-medium">({priceDropPercent}% off)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#666666]">Original price</div>
                <div className="text-lg text-[#666666] line-through">
                  ${car.originalPrice.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOMO Indicators */}
      <AnimatePresence>
        {showFOMO && socialProof && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            {/* Live viewer count */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 p-3 bg-[#141414] rounded-lg border border-white/[0.06]"
            >
              <div className="flex -space-x-2">
                {["👀", "👤", "👁️"].map((emoji, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#141414] flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </motion.div>
                ))}
              </div>
              <div className="flex-1">
                <span className="text-[#f5f5f0] font-medium">
                  {socialProof.peopleViewing} others viewing now
                </span>
              </div>
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Location scarcity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 p-3 bg-[#141414] rounded-lg border border-white/[0.06]"
            >
              <div className="w-10 h-10 rounded-lg bg-[#b8956e]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#b8956e]" />
              </div>
              <div>
                <span className="text-[#f5f5f0]">
                  {socialProof.peopleInLocation} people in {car.location.split(",")[0]} are searching
                </span>
              </div>
            </motion.div>

            {/* Live deals counter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 p-3 bg-[#141414] rounded-lg border border-white/[0.06]"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <span className="text-[#f5f5f0]">
                  <motion.span
                    key={socialProof.dealsFoundToday}
                    initial={{ scale: 1.5, color: "#b8956e" }}
                    animate={{ scale: 1, color: "#f5f5f0" }}
                    className="font-bold"
                  >
                    {socialProof.dealsFoundToday.toLocaleString()}
                  </motion.span>
                  {" "}deals found today
                </span>
              </div>
            </motion.div>

            {/* Recent activity feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 p-4 bg-[#0a0a0a] rounded-xl border border-white/[0.06]"
            >
              <h4 className="text-sm font-medium text-[#666666] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent Activity
              </h4>
              <div className="space-y-3">
                {socialProof.recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="text-lg">{activity.avatar}</span>
                    <div className="flex-1">
                      <span className="text-[#f5f5f0]">{activity.name}</span>
                      {" "}
                      <span className="text-[#666666]">{activity.action}</span>
                      {" "}
                      <span className="text-[#b8956e]">{activity.car}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium">+${activity.savings.toLocaleString()}</div>
                      <div className="text-xs text-[#666666]">{activity.timeAgo}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
