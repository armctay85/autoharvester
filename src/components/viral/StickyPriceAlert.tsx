"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, TrendingDown, Clock, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGamification } from "@/contexts/GamificationContext";

interface Notification {
  id: string;
  type: "price_drop" | "new_listing" | "deal_alert" | "reward";
  title: string;
  message: string;
  carId?: string;
  carName?: string;
  priceDrop?: number;
  timestamp: string;
  read: boolean;
}

function generateMockNotifications(): Notification[] {
  return [
    {
      id: "1",
      type: "price_drop",
      title: "Price Drop Alert!",
      message: "BMW 3 Series just dropped by $2,000",
      carId: "car-002",
      carName: "BMW 3 Series",
      priceDrop: 2000,
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      read: false,
    },
    {
      id: "2",
      type: "new_listing",
      title: "New Listing Match",
      message: "A new Tesla Model 3 was just listed in your area",
      carId: "car-001",
      carName: "Tesla Model 3",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      read: false,
    },
    {
      id: "3",
      type: "reward",
      title: "Points Earned!",
      message: "You earned 200 points for sharing a deal",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      read: true,
    },
  ];
}

export function StickyPriceAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { addPoints } = useGamification();

  useEffect(() => {
    setNotifications(generateMockNotifications());

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length);
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const alerts = JSON.parse(localStorage.getItem("priceAlerts") || "[]");
    alerts.push({
      email,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("priceAlerts", JSON.stringify(alerts));

    addPoints(50, {
      id: `alert_${Date.now()}`,
      type: "save_search",
      description: "Set price alert",
      points: 50,
      timestamp: new Date().toISOString(),
    });

    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const formatTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <>
      {/* Sticky Alert Bar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-[#141414]/95 backdrop-blur-lg border-t border-white/[0.06]"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="relative p-2 rounded-lg bg-[#0a0a0a] border border-white/[0.06] hover:border-[#b8956e]/50 transition-colors"
                  >
                    <Bell className="w-5 h-5 text-[#b8956e]" />
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold"
                      >
                        {unreadCount}
                      </motion.span>
                    )}
                  </button>

                  <div className="hidden sm:block">
                    <p className="text-sm text-[#a0a0a0]">Get instant alerts when prices drop</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <form onSubmit={handleSubscribe} className="hidden md:flex items-center gap-2">
                    <Input
                      type="email"
                      placeholder="Email for alerts"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-48 h-9 bg-[#0a0a0a] border-white/[0.06] text-sm"
                      required
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="h-9 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a]"
                    >
                      {subscribed ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Subscribed!
                        </>
                      ) : (
                        "Set Alert"
                      )}
                    </Button>
                  </form>

                  <Button
                    onClick={() => setShowNotifications(true)}
                    size="sm"
                    className="md:hidden bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a]"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Alerts
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Modal */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowNotifications(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#141414] border-l border-white/[0.06] shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
                <h3 className="text-xl font-bold text-[#f5f5f0]">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-[#666666]" />
                </button>
              </div>

              <div className="md:hidden p-4 border-b border-white/[0.06]">
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-10 bg-[#0a0a0a] border-white/[0.06]"
                    />
                    <Button
                      type="submit"
                      className="h-10 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a]"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>

              <div className="overflow-y-auto h-[calc(100%-180px)]">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <Bell className="w-12 h-12 text-[#666666] mb-4" />
                    <p className="text-[#a0a0a0]">No notifications yet</p>
                    <p className="text-sm text-[#666666] mt-2">
                      Set up price alerts to get notified of deals
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.06]">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`p-4 hover:bg-[#0a0a0a] transition-colors cursor-pointer ${
                          !notification.read ? "bg-[#b8956e]/5" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              notification.type === "price_drop"
                                ? "bg-red-500/20 text-red-400"
                                : notification.type === "new_listing"
                                ? "bg-blue-500/20 text-blue-400"
                                : notification.type === "reward"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-[#b8956e]/20 text-[#b8956e]"
                            }`}
                          >
                            {notification.type === "price_drop" && <TrendingDown className="w-5 h-5" />}
                            {notification.type === "new_listing" && <Bell className="w-5 h-5" />}
                            {notification.type === "reward" && <Check className="w-5 h-5" />}
                          </div>

                          <div className="flex-1">
                            <p className="font-medium text-[#f5f5f0]">{notification.title}</p>
                            <p className="text-sm text-[#a0a0a0] mt-1">{notification.message}</p>

                            {notification.priceDrop && (
                              <p className="text-sm text-red-400 font-medium mt-1">
                                -${notification.priceDrop.toLocaleString()}
                              </p>
                            )}

                            <p className="text-xs text-[#666666] mt-2">
                              {formatTimeAgo(notification.timestamp)}
                            </p>
                          </div>

                          {!notification.read && <div className="w-2 h-2 rounded-full bg-[#b8956e]" />}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.06] bg-[#141414]">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#666666]">{unreadCount} unread</span>
                  <button
                    onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                    className="text-[#b8956e] hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
