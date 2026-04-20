"use client";

// ─────────────────────────────────────────────────────────────────────────────
//  Vehicle Intelligence Report checkout form ($19, one-off)
//
//  Collects VIN *or* rego+state, POSTs to the Autoharvester backend's
//  /api/subscription/checkout/report endpoint, then window.location.href's
//  to the Stripe-hosted Checkout URL. No auth required.
//
//  Graceful-degradation contract:
//    - If NEXT_PUBLIC_API_BASE is unset, the button shows a disabled state
//      explaining that checkout is coming soon — no broken redirects.
//    - If the backend responds non-200, we surface the error inline so
//      the user can retry rather than hitting a blank Stripe error.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { startReportCheckout, apiConfigured } from "@/lib/api";

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const;

interface Props {
  ctaLabel?: string;
  compact?: boolean;
}

export function VehicleReportCheckoutForm({
  ctaLabel = "Run report — $19",
  compact = false,
}: Props) {
  const [mode, setMode] = useState<"vin" | "rego">("vin");
  const [vin, setVin] = useState("");
  const [rego, setRego] = useState("");
  const [state, setState] = useState<string>("NSW");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = apiConfigured();

  const normalisedVin = vin.trim().toUpperCase();
  const normalisedRego = rego.trim().toUpperCase();
  const canSubmit =
    ready &&
    !submitting &&
    ((mode === "vin" && normalisedVin.length >= 11) ||
      (mode === "rego" && normalisedRego.length >= 2 && state.length >= 2));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!ready) {
      setError(
        "Checkout is not available yet — the backend API base URL has not been configured on this build."
      );
      return;
    }
    setSubmitting(true);
    try {
      const payload =
        mode === "vin"
          ? { vin: normalisedVin }
          : { rego: normalisedRego, state };
      const { url } = await startReportCheckout(payload);
      // Hard redirect off-site to Stripe-hosted checkout
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
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-3 max-w-xl ${compact ? "" : ""}`}
    >
      <div className="flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => setMode("vin")}
          className={`px-3 py-1.5 rounded-full border transition-colors ${
            mode === "vin"
              ? "bg-[#b8956e] text-[#0a0a0a] border-[#b8956e]"
              : "border-white/[0.1] text-[#a0a0a0] hover:text-[#f5f5f0]"
          }`}
        >
          VIN
        </button>
        <button
          type="button"
          onClick={() => setMode("rego")}
          className={`px-3 py-1.5 rounded-full border transition-colors ${
            mode === "rego"
              ? "bg-[#b8956e] text-[#0a0a0a] border-[#b8956e]"
              : "border-white/[0.1] text-[#a0a0a0] hover:text-[#f5f5f0]"
          }`}
        >
          Rego + State
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {mode === "vin" ? (
          <input
            name="vin"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder="17-character VIN (or last 11 chars)"
            maxLength={17}
            autoComplete="off"
            spellCheck={false}
            className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[#f5f5f0] placeholder-[#666666] focus:outline-none focus:border-[#b8956e]/50"
          />
        ) : (
          <div className="flex-1 flex gap-2">
            <input
              name="rego"
              value={rego}
              onChange={(e) => setRego(e.target.value)}
              placeholder="Rego plate (e.g. ABC123)"
              maxLength={16}
              autoComplete="off"
              spellCheck={false}
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[#f5f5f0] placeholder-[#666666] focus:outline-none focus:border-[#b8956e]/50"
            />
            <select
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="px-3 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[#f5f5f0] focus:outline-none focus:border-[#b8956e]/50"
            >
              {AU_STATES.map((s) => (
                <option key={s} value={s} className="bg-[#0a0a0a]">
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

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
              {ctaLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>

      {!ready && (
        <p className="text-xs text-amber-400/80">
          Reports go live as soon as the backend is wired — bookmark this page
          or{" "}
          <a href="/contact?topic=report" className="underline">
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
    </form>
  );
}
