"use client";

import { motion } from "framer-motion";
import { Bell, Check, Mail, Smartphone, TrendingDown, Percent, DollarSign, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PriceAlertProps {
  car?: {
    make: string;
    model: string;
    currentPrice: number;
  };
}

export function PriceAlertCreator({ car }: PriceAlertProps) {
  const [email, setEmail] = useState("");
  const [threshold, setThreshold] = useState(5);
  const [notifications, setNotifications] = useState({ email: true, sms: false });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-[#141414] rounded-xl border border-green-500/30 p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Check className="w-8 h-8 text-green-500" />
        </motion.div>
        <h3 className="text-[#f5f5f0] font-semibold text-lg mb-2">Alert Created!</h3>
        <p className="text-[#a0a0a0] text-sm">We'll notify you when the price drops by {threshold}%</p>
      </motion.div>
    );
  }

  return (
    <div className="w-full bg-[#141414] rounded-xl border border-white/[0.06] p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#b8956e]/10 flex items-center justify-center">
          <Bell className="w-5 h-5 text-[#b8956e]" />
        </div>
        <div>
          <h3 className="text-[#f5f5f0] font-semibold">Price Drop Alert</h3>
          {car && (
            <p className="text-[#666666] text-sm">
              {car.make} {car.model} — ${(car.currentPrice / 1000).toFixed(0)}k
            </p>
          )}
        </div>
      </div>

      {/* Threshold Selection */}
      <div className="mb-6">
        <label className="text-[#a0a0a0] text-sm mb-3 block">Notify me when price drops by:</label>
        <div className="grid grid-cols-4 gap-2">
          {[3, 5, 10, 15].map((percent) => (
            <motion.button
              key={percent}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setThreshold(percent)}
              className={`py-3 px-4 rounded-lg border transition-all ${
                threshold === percent
                  ? "bg-[#b8956e] border-[#b8956e] text-[#0a0a0a]"
                  : "bg-[#0a0a0a] border-white/[0.06] text-[#a0a0a0] hover:border-[#b8956e]/30"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <TrendingDown className="w-4 h-4" />
                <span className="font-semibold">{percent}%</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Email Input */}
      <div className="mb-6">
        <label className="text-[#a0a0a0] text-sm mb-3 block">Email address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-[#0a0a0a] border-white/[0.06] text-[#f5f5f0] placeholder:text-[#666666] focus:border-[#b8956e]/50"
          />
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="mb-6">
        <label className="text-[#a0a0a0] text-sm mb-3 block">Notification preferences</label>
        <div className="space-y-2">
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => setNotifications((prev) => ({ ...prev, email: !prev.email }))}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
              notifications.email
                ? "bg-[#b8956e]/10 border-[#b8956e]/30"
                : "bg-[#0a0a0a] border-white/[0.06]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                notifications.email ? "bg-[#b8956e]" : "bg-[#1a1a1a]"
              }`}>
                <Mail className={`w-4 h-4 ${notifications.email ? "text-[#0a0a0a]" : "text-[#666666]"}`} />
              </div>
              <div className="text-left">
                <p className="text-[#f5f5f0] text-sm font-medium">Email Alerts</p>
                <p className="text-[#666666] text-xs">Get notified via email</p>
              </div>
            </div>
            {notifications.email && <Check className="w-5 h-5 text-[#b8956e]" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => setNotifications((prev) => ({ ...prev, sms: !prev.sms }))}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
              notifications.sms
                ? "bg-[#b8956e]/10 border-[#b8956e]/30"
                : "bg-[#0a0a0a] border-white/[0.06]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                notifications.sms ? "bg-[#b8956e]" : "bg-[#1a1a1a]"
              }`}>
                <Smartphone className={`w-4 h-4 ${notifications.sms ? "text-[#0a0a0a]" : "text-[#666666]"}`} />
              </div>
              <div className="text-left">
                <p className="text-[#f5f5f0] text-sm font-medium">SMS Alerts</p>
                <p className="text-[#666666] text-xs">Get instant SMS notifications</p>
              </div>
            </div>
            {notifications.sms && <Check className="w-5 h-5 text-[#b8956e]" />}
          </motion.button>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!email}
        className="w-full bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold h-12 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Bell className="w-4 h-4 mr-2" />
        Create Price Alert
      </Button>

      <p className="text-[#666666] text-xs text-center mt-4">
        We'll only notify you when the price drops. Unsubscribe anytime.
      </p>
    </div>  );
}

// Preview component for features page
export function PriceAlertPreview() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <PriceAlertCreator
        car={{ make: "Tesla", model: "Model 3", currentPrice: 61900 }}
      />
    </div>
  );
}

export default PriceAlertCreator;
