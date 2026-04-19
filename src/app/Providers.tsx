"use client";

import { ReactNode } from "react";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { SmoothScrollProvider } from "@/components/smooth-scroll/SmoothScrollProvider";
import { ScrollProgressBar } from "@/components/smooth-scroll/ScrollProgress";
import { StickyPriceAlert, ExitIntentModal } from "@/components/viral";

// Single client boundary so the React 19 + Next 16 SSR pipeline doesn't try
// to evaluate `useReducer`/`useContext` against a null React snapshot during
// prerender of routes whose `layout.tsx` is a Server Component. Keep all
// browser‑only providers and floating UI in here.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <GamificationProvider>
      <SmoothScrollProvider>
        <ScrollProgressBar />
        {children}
        <StickyPriceAlert />
        <ExitIntentModal />
      </SmoothScrollProvider>
    </GamificationProvider>
  );
}
