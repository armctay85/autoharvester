import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileText, Mail } from "lucide-react";

// Dynamic — we read searchParams (report_id, session_id) to show the user what
// they just purchased. No secrets in the URL; the report itself is fetched via
// the report_id in a follow-up /api/reports/:id call (not rendered SSR here
// because the backend URL is only in client-runtime env).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your report is on the way | AutoHarvester",
  description:
    "Thanks for your purchase. Your Vehicle Intelligence Report is being generated and will arrive by email within 60 seconds.",
};

interface Props {
  searchParams: Promise<{ report_id?: string; session_id?: string }>;
}

export default async function ReportReadyPage({ searchParams }: Props) {
  const { report_id, session_id } = await searchParams;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#b8956e]/10 border border-[#b8956e]/40 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#b8956e]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Payment received — your report is being compiled.
          </h1>
          <p className="text-lg text-[#a0a0a0] max-w-xl mb-10">
            We&apos;re pulling PPSR, NEVDIS, and market data right now. Your
            branded PDF will land in your inbox within 60 seconds. If it
            doesn&apos;t, check spam, then email{" "}
            <a
              className="underline text-[#b8956e]"
              href="mailto:support@autoharvester.com.au"
            >
              support@autoharvester.com.au
            </a>{" "}
            with the reference below and we&apos;ll chase it personally.
          </p>

          {(report_id || session_id) && (
            <div className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-left mb-10">
              <p className="text-xs uppercase tracking-wider text-[#666666] mb-3">
                Your reference
              </p>
              <dl className="space-y-2 text-sm">
                {report_id && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[#a0a0a0] flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Report ID
                    </dt>
                    <dd className="font-mono text-[#f5f5f0] break-all">
                      {report_id}
                    </dd>
                  </div>
                )}
                {session_id && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[#a0a0a0] flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Stripe session
                    </dt>
                    <dd className="font-mono text-[#f5f5f0] break-all text-xs">
                      {session_id}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {report_id ? (
              <Link
                href={`/report/${report_id}`}
                className="px-6 py-3 rounded-xl bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold text-sm transition-colors"
              >
                View your report now
              </Link>
            ) : (
              <Link
                href="/pricing"
                className="px-6 py-3 rounded-xl bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold text-sm transition-colors"
              >
                Subscribe to Watchlist — $9/mo
              </Link>
            )}
            <Link
              href="/"
              className="px-6 py-3 rounded-xl border border-white/[0.15] text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
