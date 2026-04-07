"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Activity, Zap } from "lucide-react";

const stats = [
  { value: 500000, suffix: "+", label: "Vehicles Tracked", prefix: "" },
  { value: 2.5, suffix: "M+", label: "Price Points", prefix: "" },
  { value: 98, suffix: "%", label: "Accuracy Rate", prefix: "" },
  { value: 50000, suffix: "+", label: "Active Users", prefix: "" },
];

// Live activity feed for social proof
const LIVE_ACTIVITIES = [
  { user: "Sarah M.", action: "saved", car: "BMW 3 Series", time: "2m ago" },
  { user: "James K.", action: "found", car: "Tesla Model 3", time: "5m ago" },
  { user: "Emma L.", action: "shared", car: "Toyota RAV4", time: "8m ago" },
  { user: "Michael R.", action: "alerted", car: "Mercedes C-Class", time: "12m ago" },
];

function AnimatedNumber({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  const displayValue = value % 1 !== 0 
    ? count.toFixed(1) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export function StatsSection() {
  const [dealsFoundToday, setDealsFoundToday] = useState(1247);
  const [activeViewers, setActiveViewers] = useState(328);
  const [activities, setActivities] = useState(LIVE_ACTIVITIES);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDealsFoundToday((prev) => prev + Math.floor(Math.random() * 3));
      setActiveViewers((prev) => Math.max(200, prev + Math.floor(Math.random() * 10) - 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-4 bg-[#141414] rounded-2xl border border-white/[0.06]"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-500"
              />
              <span className="text-sm text-green-400 font-medium">Live</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#b8956e]" />
              <span className="text-[#a0a0a0]">
                <motion.span
                  key={dealsFoundToday}
                  initial={{ color: "#b8956e" }}
                  animate={{ color: "#f5f5f0" }}
                  className="font-bold"
                >
                  {dealsFoundToday.toLocaleString()}
                </motion.span>
                {" "}deals found today
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#b8956e]" />
              <span className="text-[#a0a0a0]">
                <motion.span
                  key={activeViewers}
                  initial={{ color: "#b8956e" }}
                  animate={{ color: "#f5f5f0" }}
                  className="font-bold"
                >
                  {activeViewers}
                </motion.span>
                {" "}active users
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 grid grid-cols-2 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-[#141414] rounded-2xl border border-white/[0.06]"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#b8956e] mb-2">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <p className="text-sm text-[#a0a0a0]">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#141414] rounded-2xl border border-white/[0.06] p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-[#b8956e]" />
              <h4 className="font-semibold text-[#f5f5f0]">Live Activity</h4>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {activities.map((activity, index) => (
                  <motion.div
                    key={`${activity.user}-${index}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a0a] border border-white/[0.06]"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#b8956e]/20 flex items-center justify-center text-sm">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">
                        <span className="text-[#f5f5f0]">{activity.user}</span>
                        {" "}
                        <span className="text-[#666666]">{activity.action}</span>
                        {" "}
                        <span className="text-[#b8956e]">{activity.car}</span>
                      </p>
                    </div>
                    <span className="text-xs text-[#666666]">{activity.time}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#666666]">Total savings unlocked</span>
                <span className="text-green-400 font-bold">$2.8M+</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#666666]"
        >
          {[
            { icon: <Zap className="w-4 h-4" />, text: "Real-time Updates" },
            { icon: <Activity className="w-4 h-4" />, text: "Verified Data" },
            { icon: <Users className="w-4 h-4" />, text: "50K+ Users" },
            { icon: <TrendingUp className="w-4 h-4" />, text: "Market Leading" },
          ].map((badge, i) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-[#b8956e]">{badge.icon}</span>
              {badge.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
