"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Users, Star, TrendingUp, Award, Crown, Zap } from "lucide-react";
import { useGamification, Badge } from "@/contexts/GamificationContext";

const BADGE_DETAILS: Record<string, { icon: React.ReactNode; color: string }> = {
  deal_hunter: { icon: <Target className="w-4 h-4" />, color: "#cd7f32" },
  market_insider: { icon: <TrendingUp className="w-4 h-4" />, color: "#c0c0c0" },
  helper: { icon: <Users className="w-4 h-4" />, color: "#c0c0c0" },
  expert: { icon: <Award className="w-4 h-4" />, color: "#ffd700" },
  viral_legend: { icon: <Crown className="w-4 h-4" />, color: "#e5e4e2" },
};

const REWARDS = [
  { id: "pro_month", name: "1 Month Pro Free", points: 2000, icon: <Star className="w-4 h-4" /> },
  { id: "pro_lifetime", name: "Lifetime Pro", points: 5000, icon: <Crown className="w-4 h-4" /> },
  { id: "featured_home", name: "Featured on Homepage", points: 10000, icon: <Trophy className="w-4 h-4" /> },
];

export function GamificationUI() {
  const { state, getLeaderboard, canClaimReward, claimReward } = useGamification();
  const leaderboard = getLeaderboard();

  const currentUserRank = leaderboard.find((e) => e.isCurrentUser);

  return (
    <div className="space-y-6">
      {/* Points Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#b8956e]/30 via-[#b8956e]/10 to-transparent rounded-2xl p-6 border border-[#b8956e]/30"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#a0a0a0] text-sm mb-1">Your Points</p>
            <motion.div
              key={state.points}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-5xl font-bold text-[#f5f5f0]"
            >
              {state.points.toLocaleString()}
            </motion.div>
          </div>
          <div className="text-right">
            {currentUserRank && (
              <>
                <p className="text-[#a0a0a0] text-sm mb-1">Rank</p>
                <div className="text-3xl font-bold text-[#b8956e]">#{currentUserRank.rank}</div>
              </>
            )}
          </div>
        </div>

        {/* Progress to next reward */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-[#666666]">Progress to next reward</span>
            <span className="text-sm text-[#b8956e]">
              {state.points} / {REWARDS.find((r) => !state.unlockedRewards.includes(r.id))?.points || "MAX"}
            </span>
          </div>
          <div className="h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(
                  (state.points / (REWARDS.find((r) => !state.unlockedRewards.includes(r.id))?.points || state.points)) * 100,
                  100
                )}%`,
              }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-[#b8956e] to-[#c9a67f] rounded-full"
            />
          </div>
        </div>

        {/* Streak */}
        {state.streakDays > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-sm"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-[#a0a0a0]">
              <span className="text-yellow-400 font-bold">{state.streakDays} day streak!</span>
              {" "}Keep it up!
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Badges */}
      <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.06]">
        <h4 className="text-lg font-semibold text-[#f5f5f0] mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#b8956e]" />
          Badges ({state.badges.length})
        </h4>

        {state.badges.length === 0 ? (
          <p className="text-[#666666] text-center py-4">Start earning badges by using AutoHarvester!</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {state.badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-xl bg-[#0a0a0a] border border-white/[0.06]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${BADGE_DETAILS[badge.id]?.color}20`,
                      color: BADGE_DETAILS[badge.id]?.color,
                    }}
                  >
                    {BADGE_DETAILS[badge.id]?.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#f5f5f0]">{badge.name}</p>
                    <p className="text-xs text-[#666666]">{badge.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Rewards */}
      <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.06]">
        <h4 className="text-lg font-semibold text-[#f5f5f0] mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#b8956e]" />
          Rewards
        </h4>

        <div className="space-y-3">
          {REWARDS.map((reward) => {
            const unlocked = state.unlockedRewards.includes(reward.id);
            const canClaim = canClaimReward(reward.id);

            return (
              <div
                key={reward.id}
                className={`p-4 rounded-xl border ${
                  unlocked
                    ? "bg-green-500/10 border-green-500/30"
                    : canClaim
                    ? "bg-[#b8956e]/10 border-[#b8956e]/50"
                    : "bg-[#0a0a0a] border-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        unlocked ? "text-green-400 bg-green-500/20" : "text-[#b8956e] bg-[#b8956e]/20"
                      }`}
                    >
                      {reward.icon}
                    </div>
                    <div>
                      <p className={`font-medium ${unlocked ? "text-green-400" : "text-[#f5f5f0]"}`}>
                        {reward.name}
                      </p>
                      <p className="text-xs text-[#666666]">{reward.points.toLocaleString()} points</p>
                    </div>
                  </div>

                  {unlocked ? (
                    <span className="text-sm text-green-400 font-medium">Claimed ✓</span>
                  ) : canClaim ? (
                    <button
                      onClick={() => claimReward(reward.id)}
                      className="px-4 py-2 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] text-sm font-semibold rounded-lg transition-colors"
                    >
                      Claim
                    </button>
                  ) : (
                    <div className="text-right">
                      <div className="text-xs text-[#666666]">{Math.max(0, reward.points - state.points)} more pts</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-[#141414] rounded-2xl p-6 border border-white/[0.06]">
        <h4 className="text-lg font-semibold text-[#f5f5f0] mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#b8956e]" />
          Leaderboard
        </h4>

        <div className="space-y-2">
          {leaderboard.slice(0, 5).map((entry, index) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                entry.isCurrentUser ? "bg-[#b8956e]/10 border border-[#b8956e]/30" : "bg-[#0a0a0a]"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  entry.rank === 1
                    ? "bg-yellow-500/20 text-yellow-400"
                    : entry.rank === 2
                    ? "bg-gray-400/20 text-gray-300"
                    : entry.rank === 3
                    ? "bg-orange-600/20 text-orange-400"
                    : "bg-[#1a1a1a] text-[#666666]"
                }`}
              >
                {entry.rank}
              </div>

              <span className="text-lg">{entry.avatar}</span>

              <div className="flex-1">
                <p className={`font-medium ${entry.isCurrentUser ? "text-[#b8956e]" : "text-[#f5f5f0]"}`}>
                  {entry.name} {entry.isCurrentUser && "(You)"}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-[#f5f5f0]">{entry.points.toLocaleString()}</p>
                <p className="text-xs text-[#666666]">{entry.badges} badges</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
