"use client";

// ─────────────────────────────────────────────────────────────────────────────
//  Subscribe checkout form (Watchlist / Dealer Edge / Inventory IQ / Group)
//
//  Guest flow — collects email only, posts to the backend's
//  /api/subscription/checkout/guest endpoint, then redirects to Stripe-hosted
//  Checkout. The backend provisions a user row on webhook receipt so the
//  shopper never has to sign up twice.
//
//  Graceful-degradation contract mirrors VehicleReportCheckoutForm.tsx:
//    - If NEXT_PUBLIC_API_BASE is unset → disabled CTA + inline "coming soon"
//    - If backend errors → inline retryable error
// ─────────────────────────────────────────────────────────────────────────────

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  startGuestSubscriptionCheckout,
  apiConfigured,
  type SubscriptionTier,
} from "@/lib/api";

interface Props {
  tier: SubscriptionTier;
  planLabel: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlySaving: string;
}

export function SubscribeCheckoutForm({
  tier,
  planLabel,
  monthlyPrice,
  yearlyPrice,
  yearlySaving,
}: Props) {
  const [email, setEmail] = useState("");
  const [interval, setInterval] = useState<"month" | "year">("month");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = apiConfigured();
  const normalisedEmail = email.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalisedEmail);
  const canSubmit = ready && !submitting && emailValid;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!ready) {
      setError(
        "Checkout is not available yet — the backend API base URL has not been configured on this build."
      );
      return;
    }
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const { url } = await startGuestSubscriptionCheckout(
        normalisedEmail,
        tier,
        interval
      );
      window.location.href = url;
    } catch (err) {
      setSubmitting(false);
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong starting checkout. Please try again."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
      <div className="flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => setInterval("month")}
          className={`px-4 py-1.5 rounded-full border transition-colors ${
            interval === "month"
              ? "bg-[#b8956e] text-[#0a0a0a] border-[#b8956e]"
              : "border-white/[0.1] text-[#a0a0a0] hover:text-[#f5f5f0]"
          }`}
        >
          Monthly · {monthlyPrice}
        </button>
        <button
          type="button"
          onClick={() => setInterval("year")}
          className={`px-4 py-1.5 rounded-full border transition-colors ${
            interval === "year"
              ? "bg-[#b8956e] text-[#0a0a0a] border-[#b8956e]"
              : "border-white/[0.1] text-[#a0a0a0] hover:text-[#f5f5f0]"
          }`}
        >
          Yearly · {yearlyPrice}
          <span className="ml-1 text-[10px] opacity-70">({yearlySaving})</span>
        </button>
      </div>

      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        autoComplete="email"
        spellCheck={false}
        className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[#f5f5f0] placeholder-[#666666] focus:outline-none focus:border-[#b8956e]/50"
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className={`group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
          canSubmit
            ? "bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a]"
            : "bg-white/[0.06] text-[#666666] cursor-not-allowed"
        }`}
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Starting checkout…
          </>
        ) : (
          <>
            Start {planLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>

      {!ready && (
        <p className="text-xs text-amber-400/80">
          Subscriptions go live as soon as the backend is wired — bookmark this
          page or{" "}
          <a href={`/contact?topic=${tier}`} className="underline">
            drop us your email
          </a>{" "}
          and we&apos;ll tell you the moment it&apos;s on.
        </p>
      )}
      {error && (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}

      <p className="text-[11px] text-[#666666]">
        Secure checkout by Stripe. Cancel anytime from your account. No card
        charged during the trial.
      </p>
    </form>
  );
}
