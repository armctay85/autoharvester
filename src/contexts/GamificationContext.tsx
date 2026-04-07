"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";

// Types
export interface UserGamificationState {
  points: number;
  badges: Badge[];
  referrals: Referral[];
  activities: Activity[];
  savedSearches: string[];
  sharedDeals: string[];
  contributedPrices: number;
  dealsFound: number;
  streakDays: number;
  lastActive: string;
  referralCode: string;
  unlockedRewards: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

export interface Referral {
  id: string;
  email: string;
  status: "pending" | "signed_up" | "converted";
  joinedAt?: string;
  rewardClaimed: boolean;
}

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  points: number;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export type ActivityType =
  | "signup"
  | "save_search"
  | "share_deal"
  | "refer_friend"
  | "contribute_price"
  | "find_deal"
  | "daily_streak"
  | "badge_unlocked"
  | "reward_claimed";

interface GamificationContextType {
  state: UserGamificationState;
  dispatch: React.Dispatch<GamificationAction>;
  addPoints: (amount: number, activity: Activity) => void;
  unlockBadge: (badge: Badge) => void;
  checkAndUnlockBadges: () => void;
  getLeaderboard: () => LeaderboardEntry[];
  canClaimReward: (rewardId: string) => boolean;
  claimReward: (rewardId: string) => boolean;
  generateReferralLink: () => string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  badges: number;
  isCurrentUser?: boolean;
}

type GamificationAction =
  | { type: "ADD_POINTS"; payload: { amount: number; activity: Activity } }
  | { type: "UNLOCK_BADGE"; payload: Badge }
  | { type: "ADD_REFERRAL"; payload: Referral }
  | { type: "UPDATE_REFERRAL_STATUS"; payload: { id: string; status: Referral["status"] } }
  | { type: "SAVE_SEARCH"; payload: string }
  | { type: "SHARE_DEAL"; payload: string }
  | { type: "CONTRIBUTE_PRICE" }
  | { type: "FOUND_DEAL" }
  | { type: "CLAIM_REWARD"; payload: string }
  | { type: "UPDATE_STREAK" }
  | { type: "HYDRATE_STATE"; payload: UserGamificationState };

const BADGES: Omit<Badge, "unlockedAt">[] = [
  {
    id: "deal_hunter",
    name: "Deal Hunter",
    description: "Found 5 great deals",
    icon: "🎯",
    tier: "bronze",
  },
  {
    id: "market_insider",
    name: "Market Insider",
    description: "Contributed 10 sold prices",
    icon: "📊",
    tier: "silver",
  },
  {
    id: "helper",
    name: "Helper",
    description: "Referred 3 friends",
    icon: "🤝",
    tier: "silver",
  },
  {
    id: "expert",
    name: "Expert",
    description: "Earned 1000+ points",
    icon: "🏆",
    tier: "gold",
  },
  {
    id: "viral_legend",
    name: "Viral Legend",
    description: "Shared 20 deals",
    icon: "🚀",
    tier: "platinum",
  },
];

const REWARDS = [
  { id: "pro_month", name: "1 Month Pro Free", points: 2000 },
  { id: "pro_lifetime", name: "Lifetime Pro", points: 5000 },
  { id: "featured_home", name: "Featured on Homepage", points: 10000 },
];

const INITIAL_STATE: UserGamificationState = {
  points: 0,
  badges: [],
  referrals: [],
  activities: [],
  savedSearches: [],
  sharedDeals: [],
  contributedPrices: 0,
  dealsFound: 0,
  streakDays: 0,
  lastActive: new Date().toISOString(),
  referralCode: "",
  unlockedRewards: [],
};

const STORAGE_KEY = "autoharvester_gamification";

function generateReferralCode(): string {
  return "AH" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function gamificationReducer(
  state: UserGamificationState,
  action: GamificationAction
): UserGamificationState {
  switch (action.type) {
    case "ADD_POINTS": {
      const newPoints = state.points + action.payload.amount;
      return {
        ...state,
        points: newPoints,
        activities: [action.payload.activity, ...state.activities].slice(0, 100),
      };
    }

    case "UNLOCK_BADGE": {
      if (state.badges.some((b) => b.id === action.payload.id)) return state;
      return {
        ...state,
        badges: [...state.badges, action.payload],
      };
    }

    case "ADD_REFERRAL":
      return {
        ...state,
        referrals: [...state.referrals, action.payload],
      };

    case "UPDATE_REFERRAL_STATUS":
      return {
        ...state,
        referrals: state.referrals.map((r) =>
          r.id === action.payload.id ? { ...r, status: action.payload.status } : r
        ),
      };

    case "SAVE_SEARCH":
      if (state.savedSearches.includes(action.payload)) return state;
      return {
        ...state,
        savedSearches: [...state.savedSearches, action.payload],
      };

    case "SHARE_DEAL":
      if (state.sharedDeals.includes(action.payload)) return state;
      return {
        ...state,
        sharedDeals: [...state.sharedDeals, action.payload],
      };

    case "CONTRIBUTE_PRICE":
      return {
        ...state,
        contributedPrices: state.contributedPrices + 1,
      };

    case "FOUND_DEAL":
      return {
        ...state,
        dealsFound: state.dealsFound + 1,
      };

    case "CLAIM_REWARD":
      if (state.unlockedRewards.includes(action.payload)) return state;
      return {
        ...state,
        unlockedRewards: [...state.unlockedRewards, action.payload],
      };

    case "UPDATE_STREAK": {
      const lastActive = new Date(state.lastActive);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

      let streakDays = state.streakDays;
      if (diffDays === 1) {
        streakDays += 1;
      } else if (diffDays > 1) {
        streakDays = 1;
      }

      return {
        ...state,
        streakDays,
        lastActive: now.toISOString(),
      };
    }

    case "HYDRATE_STATE":
      return {
        ...action.payload,
        referralCode: action.payload.referralCode || generateReferralCode(),
      };

    default:
      return state;
  }
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gamificationReducer, INITIAL_STATE);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({ type: "HYDRATE_STATE", payload: parsed });
      } catch {
        dispatch({ type: "HYDRATE_STATE", payload: { ...INITIAL_STATE, referralCode: generateReferralCode() } });
      }
    } else {
      dispatch({ type: "HYDRATE_STATE", payload: { ...INITIAL_STATE, referralCode: generateReferralCode() } });
    }
  }, []);

  // Save to localStorage on state change
  useEffect(() => {
    if (state.referralCode) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  // Update streak on mount
  useEffect(() => {
    dispatch({ type: "UPDATE_STREAK" });
  }, []);

  const addPoints = (amount: number, activity: Activity) => {
    dispatch({
      type: "ADD_POINTS",
      payload: { amount, activity },
    });

    // Check for badge unlocks after adding points
    setTimeout(checkAndUnlockBadges, 0);
  };

  const unlockBadge = (badge: Badge) => {
    if (!state.badges.some((b) => b.id === badge.id)) {
      dispatch({ type: "UNLOCK_BADGE", payload: badge });
      addPoints(100, {
        id: `badge_${Date.now()}`,
        type: "badge_unlocked",
        description: `Unlocked ${badge.name} badge`,
        points: 100,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const checkAndUnlockBadges = () => {
    BADGES.forEach((badge) => {
      if (state.badges.some((b) => b.id === badge.id)) return;

      let shouldUnlock = false;
      switch (badge.id) {
        case "deal_hunter":
          shouldUnlock = state.dealsFound >= 5;
          break;
        case "market_insider":
          shouldUnlock = state.contributedPrices >= 10;
          break;
        case "helper":
          shouldUnlock = state.referrals.filter((r) => r.status === "signed_up").length >= 3;
          break;
        case "expert":
          shouldUnlock = state.points >= 1000;
          break;
        case "viral_legend":
          shouldUnlock = state.sharedDeals.length >= 20;
          break;
      }

      if (shouldUnlock) {
        unlockBadge({
          ...badge,
          unlockedAt: new Date().toISOString(),
        });
      }
    });
  };

  const getLeaderboard = (): LeaderboardEntry[] => {
    // Simulated leaderboard - in production, fetch from API
    const mockUsers = [
      { name: "Sarah M.", avatar: "👩", points: 5840, badges: 4 },
      { name: "James K.", avatar: "👨", points: 4230, badges: 3 },
      { name: "Emma L.", avatar: "👱", points: 3890, badges: 3 },
      { name: "Michael R.", avatar: "🧔", points: 3150, badges: 2 },
      { name: "Lisa T.", avatar: "👩‍🦰", points: 2780, badges: 2 },
    ];

    const currentUserEntry: LeaderboardEntry = {
      rank: 0,
      name: "You",
      avatar: "😎",
      points: state.points,
      badges: state.badges.length,
      isCurrentUser: true,
    };

    const allEntries = [
      ...mockUsers.map((u, i) => ({ ...u, rank: i + 1 })),
      currentUserEntry,
    ].sort((a, b) => b.points - a.points);

    return allEntries.map((e, i) => ({ ...e, rank: i + 1 }));
  };

  const canClaimReward = (rewardId: string): boolean => {
    if (state.unlockedRewards.includes(rewardId)) return false;
    const reward = REWARDS.find((r) => r.id === rewardId);
    return reward ? state.points >= reward.points : false;
  };

  const claimReward = (rewardId: string): boolean => {
    if (!canClaimReward(rewardId)) return false;
    dispatch({ type: "CLAIM_REWARD", payload: rewardId });
    return true;
  };

  const generateReferralLink = (): string => {
    return `${window.location.origin}?ref=${state.referralCode}`;
  };

  return (
    <GamificationContext.Provider
      value={{
        state,
        dispatch,
        addPoints,
        unlockBadge,
        checkAndUnlockBadges,
        getLeaderboard,
        canClaimReward,
        claimReward,
        generateReferralLink,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider");
  }
  return context;
}
