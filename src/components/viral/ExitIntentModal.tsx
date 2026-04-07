"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, TrendingDown, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGamification } from "@/contexts/GamificationContext";

interface ExitIntentModalProps {
  car?: {
    id: string;
    make: string;
    model: string;
    price: number;
  };
}

export function ExitIntentModal({ car }: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const { addPoints } = useGamification();

  // Track mouse position for exit intent
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);

      // Trigger when mouse goes near top of page (exit intent)
      if (e.clientY < 50 && !isVisible && !isSubmitted) {
        // Only trigger once per session
        const hasShown = sessionStorage.getItem("exitIntentShown");
        if (!hasShown) {
          setIsVisible(true);
          sessionStorage.setItem("exitIntentShown", "true");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible, isSubmitted]);

  // Also trigger on scroll after certain point
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

      // If scrolled more than 70% and trying to leave
      if (scrollPercent > 70 && mouseY < 100 && !isVisible && !isSubmitted) {
        const hasShown = sessionStorage.getItem("exitIntentShown");
        if (!hasShown) {
          setIsVisible(true);
          sessionStorage.setItem("exitIntentShown", "true");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mouseY, isVisible, isSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Save to localStorage (in production, send to API)
    const alerts = JSON.parse(localStorage.getItem("priceAlerts") || "[]");
    alerts.push({
      email,
      carId: car?.id,
      make: car?.make,
      model: car?.model,
      targetPrice: car ? car.price * 0.95 : null, // 5% below current
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("priceAlerts", JSON.stringify(alerts));

    // Award points
    addPoints(50, {
      id: `alert_${Date.now()}`,
      type: "save_search",
      description: `Set price alert for ${car?.make || "new car"} ${car?.model || ""}`,
      points: 50,
      timestamp: new Date().toISOString(),
    });

    setIsSubmitted(true);

    // Close after delay
    setTimeout(() => {
      setIsVisible(false);
    }, 2000);
  };

  const close = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md"
          >
            <div className="bg-[#141414] rounded-2xl border border-white/[0.1] shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-r from-[#b8956e]/20 to-transparent p-6">
                <button
                  onClick={close}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-[#666666]" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#b8956e]/20 flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <Bell className="w-8 h-8 text-[#b8956e]" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#f5f5f0]">
                      {isSubmitted ? "You're all set!" : "Wait!"}
                    </h3>
                    <p className="text-[#a0a0a0] text-sm mt-1">
                      {isSubmitted
                        ? "We'll notify you of price drops"
                        : "Don't miss out on price drops"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {!isSubmitted ? (
                  <>
                    {/* Value props */}
                    <div className="space-y-3 mb-6">
                      {[
                        { icon: TrendingDown, text: "Get instant price drop alerts" },
                        { icon: Clock, text: "Track deal history over time" },
                        { icon: Check, text: "Be first to know about new listings" },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#b8956e]/10 flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-[#b8956e]" />
                          </div>
                          <span className="text-[#a0a0a0] text-sm">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 bg-[#0a0a0a] border-white/[0.1] text-[#f5f5f0] placeholder:text-[#666666] pr-32"
                          required
                        />
                        <Button
                          type="submit"
                          className="absolute right-1 top-1 h-10 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold"
                        >
                          Set Alert
                        </Button>
                      </div>
                      <p className="text-xs text-[#666666] text-center">
                        No spam, unsubscribe anytime. +50 points when you sign up!
                      </p>
                    </form>

                    {/* Car context if available */}
                    {car && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 p-3 bg-[#0a0a0a] rounded-lg border border-white/[0.06]"
                      >
                        <p className="text-xs text-[#666666]">Setting alert for:</p>
                        <p className="text-sm text-[#f5f5f0] font-medium">
                          {car.make} {car.model}
                        </p>
                        <p className="text-xs text-green-400">
                          Target: ${(car.price * 0.95).toLocaleString()} (5% off)
                        </p>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#f5f5f0] mb-2">
                      Alert Set Successfully!
                    </h4>
                    <p className="text-[#666666]">
                      You earned{" "}
                      <span className="text-[#b8956e] font-bold">+50 points</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
