import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Subscription active | AutoHarvester",
  description:
    "Your AutoHarvester subscription is now active. Welcome aboard.",
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SubscriptionSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#b8956e]/10 border border-[#b8956e]/40 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#b8956e]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            You&apos;re in.
          </h1>
          <p className="text-lg text-[#a0a0a0] max-w-xl mb-10">
            Your AutoHarvester subscription is active. Head to your dashboard to
            set price alerts, save cars, and access your included monthly
            report.
          </p>
          {session_id && (
            <p className="text-xs text-[#666666] mb-8 font-mono break-all">
              Stripe session: {session_id}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold text-sm transition-colors"
            >
              Open dashboard
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-xl border border-white/[0.15] text-sm font-medium hover:bg-white/5 transition-colors"
            >
              View plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
