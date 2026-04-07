"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Activity, TrendingUp, Award, Clock, Zap, Star, Target } from "lucide-react";

interface LiveActivity {
  id: string;
  type: "view" | "save" | "share" | "alert" | "purchase";
  user: string;
  car: string;
  location: string;
  value?: number;
  timestamp: Date;
}

// Generate realistic-looking mock activities
function generateActivities(): LiveActivity[] {
  const cars = ["Tesla Model 3", "BMW 3 Series", "Toyota RAV4", "Mercedes C-Class", "Audi A4", "Porsche 911"];
  const locations = ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"];
  const users = ["Sarah", "James", "Emma", "Michael", "Lisa", "David", "Anna"];
  const types: LiveActivity["type"][] = ["view", "save", "share", "alert", "purchase"];

  return Array.from({ length: 10 }, (_, i) => ({
    id: `act_${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    user: users[Math.floor(Math.random() * users.length)],
    car: cars[Math.floor(Math.random() * cars.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    value: Math.floor(Math.random() * 5000) + 1000,
    timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 30),
  }));
}

const ACTIVITY_CONFIG: Record<
  LiveActivity["type"],
  { icon: React.ReactNode; color: string; text: string }
> = {
  view: { icon: <Users className="w-4 h-4" />, color: "#666666", text: "viewing" },
  save: { icon: <Star className="w-4 h-4" />, color: "#b8956e", text: "saved" },
  share: { icon: <Activity className="w-4 h-4" />, color: "#3b82f6", text: "shared" },
  alert: { icon: <Target className="w-4 h-4" />, color: "#ef4444", text: "alert set" },
  purchase: { icon: <Zap className="w-4 h-4" />, color: "#22c55e", text: "purchased" },
};

export function SocialProofEngine() {
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [liveStats, setLiveStats] = useState({
    dealsFound: 1247,
    activeUsers: 328,
    totalSavings: 2847500,
  });

  useEffect(() => {
    setActivities(generateActivities());

    const interval = setInterval(() => {
      setActivities((prev) => {
        const newActivity: LiveActivity = {
          id: `act_${Date.now()}`,
          type: ["view", "save", "share", "alert"][Math.floor(Math.random() * 4)] as LiveActivity["type"],
          user: ["Alex", "Jordan", "Casey", "Taylor", "Morgan"][Math.floor(Math.random() * 5)],
          car: ["Tesla Model 3", "BMW 3 Series", "Toyota RAV4", "Mercedes C-Class"][
            Math.floor(Math.random() * 4)
          ],
          location: ["Sydney", "Melbourne", "Brisbane", "Perth"][Math.floor(Math.random() * 4)],
          value: Math.floor(Math.random() * 3000) + 1000,
          timestamp: new Date(),
        };

        return [newActivity, ...prev.slice(0, 9)];
      });

      setLiveStats((prev) => ({
        dealsFound: prev.dealsFound + Math.floor(Math.random() * 3),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        totalSavings: prev.totalSavings + Math.floor(Math.random() * 10000),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#141414] rounded-2xl border border-white/[0.06] overflow-hidden"
    >
      {/* Live Stats Header */}
      <div className="p-6 border-b border-white/[0.06] bg-gradient-to-r from-[#b8956e]/10 to-transparent">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-500"
          />
          <span className="text-sm font-medium text-green-400">Live</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <motion.div
              key={liveStats.dealsFound}
              initial={{ scale: 1.1, color: "#b8956e" }}
              animate={{ scale: 1, color: "#f5f5f0" }}
              className="text-2xl font-bold"
            >
              {liveStats.dealsFound.toLocaleString()}
            </motion.div>
            <div className="text-xs text-[#666666]">Deals Found Today</div>
          </div>

          <div className="text-center">
            <motion.div
              key={liveStats.activeUsers}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-[#f5f5f0]"
            >
              {liveStats.activeUsers}
            </motion.div>
            <div className="text-xs text-[#666666]">Active Users</div>
          </div>

          <div className="text-center">
            <motion.div
              key={liveStats.totalSavings}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-green-400"
            >
              ${(liveStats.totalSavings / 1000000).toFixed(1)}M
            </motion.div>
            <div className="text-xs text-[#666666]">Total Saved</div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-6 py-4 border-b border-white/[0.06]">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          {[
            { icon: <Award className="w-4 h-4" />, text: "Verified Sold Prices" },
            { icon: <TrendingUp className="w-4 h-4" />, text: "Market Data" },
            { icon: <Users className="w-4 h-4" />, text: "10K+ Users" },
            { icon: <Clock className="w-4 h-4" />, text: "Real-time Updates" },
          ].map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-1.5 text-[#666666]"
            >
              <span className="text-[#b8956e]">{badge.icon}</span>
              {badge.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-[#666666] mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Real-time Activity
        </h4>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {activities.map((activity) => {
              const config = ACTIVITY_CONFIG[activity.type];

              return (
                <motion.div
                  key={activity.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a0a] border border-white/[0.06]"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                  >
                    {config.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">
                      <span className="text-[#f5f5f0]">{activity.user}</span>{" "}
                      <span className="text-[#666666]">{config.text}</span>{" "}
                      <span className="text-[#b8956e]">{activity.car}</span>
                    </p>
                    <p className="text-xs text-[#666666]">in {activity.location}</p>
                  </div>

                  <div className="text-right">
                    {activity.value && activity.type === "purchase" && (
                      <p className="text-sm text-green-400 font-medium">
                        ${activity.value.toLocaleString()}
                      </p>
                    )}
                    <p className="text-xs text-[#666666]">{formatTimeAgo(activity.timestamp)}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
