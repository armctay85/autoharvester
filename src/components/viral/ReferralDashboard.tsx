"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Copy, Check, Users, TrendingUp, Award, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/contexts/GamificationContext";

interface ReferralStats {
  totalReferrals: number;
  signedUp: number;
  converted: number;
  earnings: number;
}

export function ReferralDashboard() {
  const { state, generateReferralLink, addPoints, dispatch } = useGamification();
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [referralStats, setReferralStats] = useState<ReferralStats>({
    totalReferrals: 0,
    signedUp: 0,
    converted: 0,
    earnings: 0,
  });

  const referralLink = typeof window !== "undefined" ? generateReferralLink() : "";

  // Calculate stats from referrals
  useEffect(() => {
    const stats = {
      totalReferrals: state.referrals.length,
      signedUp: state.referrals.filter((r) => r.status === "signed_up" || r.status === "converted").length,
      converted: state.referrals.filter((r) => r.status === "converted").length,
      earnings: state.referrals.filter((r) => r.rewardClaimed).length,
    };
    setReferralStats(stats);
  }, [state.referrals]);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareVia = (platform: string) => {
    const text = encodeURIComponent(
      "I'm using AutoHarvester to find the best car deals in Australia. Get 50% off your first month with my link:"
    );
    const url = encodeURIComponent(referralLink);

    let shareUrl = "";
    switch (platform) {
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent("Check out AutoHarvester")}&body=${text}%0A%0A${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }

    setShowShareModal(false);
  };

  // Simulate a new referral for demo purposes
  const simulateReferral = () => {
    const newReferral = {
      id: `ref_${Date.now()}`,
      email: `friend${state.referrals.length + 1}@example.com`,
      status: "signed_up" as const,
      joinedAt: new Date().toISOString(),
      rewardClaimed: false,
    };

    dispatch({ type: "ADD_REFERRAL", payload: newReferral });
    addPoints(500, {
      id: `referral_${Date.now()}`,
      type: "refer_friend",
      description: "Friend signed up via referral",
      points: 500,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#b8956e]/20 via-[#141414] to-[#141414] rounded-2xl p-6 border border-[#b8956e]/30"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#b8956e]/20 flex items-center justify-center">
            <Gift className="w-7 h-7 text-[#b8956e]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#f5f5f0]">Refer & Earn</h3>
            <p className="text-[#a0a0a0] text-sm">Give 50% off, get 1 month Pro free</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Referrals", value: referralStats.totalReferrals, icon: Users },
            { label: "Signed Up", value: referralStats.signedUp, icon: TrendingUp },
            { label: "Rewards Earned", value: referralStats.earnings, icon: Award },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0a0a0a] rounded-xl p-4 text-center border border-white/[0.06]"
            >
              <stat.icon className="w-5 h-5 text-[#b8956e] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#f5f5f0]">{stat.value}</div>
              <div className="text-xs text-[#666666]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Referral Link */}
        <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/[0.06] mb-4">
          <label className="text-sm text-[#666666] mb-2 block">Your unique referral link</label>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#141414] rounded-lg px-4 py-3 text-sm text-[#a0a0a0] truncate border border-white/[0.06]">
              {referralLink}
            </div>
            <Button
              onClick={copyLink}
              variant="outline"
              className="border-[#b8956e]/50 text-[#b8956e] hover:bg-[#b8956e]/10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setShowShareModal(true)}
            className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </Button>
          <Button
            onClick={copyLink}
            variant="outline"
            className="border-white/[0.1] text-[#f5f5f0]"
          >
            <Link2 className="w-4 h-4 mr-2" />
            Copy Link
          </Button>
        </div>

        {/* How it works */}
        <div className="mt-6 pt-6 border-t border-white/[0.06]">
          <h4 className="text-sm font-medium text-[#f5f5f0] mb-3">How it works</h4>
          <div className="space-y-2">
            {[
              { step: 1, text: "Share your unique link with friends" },
              { step: 2, text: "They get 50% off their first month" },
              { step: 3, text: "You get 1 month Pro free per signup" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#b8956e]/20 text-[#b8956e] text-xs font-bold flex items-center justify-center">
                  {item.step}
                </div>
                <span className="text-sm text-[#a0a0a0]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo button - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <Button
            onClick={simulateReferral}
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-[#666666]"
          >
            [Demo] Simulate New Referral
          </Button>
        )}
      </motion.div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#141414] rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-lg font-bold text-[#f5f5f0] mb-4">Share via</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Email", icon: "✉️", action: () => shareVia("email") },
                  { name: "Twitter/X", icon: "𝕏", action: () => shareVia("twitter") },
                  { name: "Facebook", icon: "📘", action: () => shareVia("facebook") },
                  { name: "WhatsApp", icon: "💬", action: () => shareVia("whatsapp") },
                  { name: "LinkedIn", icon: "💼", action: () => shareVia("linkedin") },
                  { name: "Copy Link", icon: "📋", action: copyLink },
                ].map((platform) => (
                  <button
                    key={platform.name}
                    onClick={platform.action}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#0a0a0a] hover:bg-[#1a1a1a] transition-colors border border-white/[0.06]"
                  >
                    <span className="text-2xl">{platform.icon}</span>
                    <span className="text-sm text-[#a0a0a0]">{platform.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
