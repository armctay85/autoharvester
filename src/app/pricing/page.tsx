import type { Metadata } from "next";
import { Check, X, Sparkles, Building2, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Pricing | AutoHarvester",
  description:
    "Choose the plan that fits your needs. Free, Pro, Dealer, and Enterprise plans available. Start free, upgrade when you're ready.",
};

const plans = [
  {
    name: "Free",
    icon: Zap,
    price: "$0",
    period: "forever",
    description: "Perfect for occasional buyers who want to try the platform.",
    features: [
      { text: "Basic search", included: true },
      { text: "Limited price history (30 days)", included: true },
      { text: "View 5 sold prices/month", included: true },
      { text: "Email support", included: true },
      { text: "Price alerts", included: false },
      { text: "Market reports", included: false },
      { text: "API access", included: false },
      { text: "Bulk exports", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    icon: Users,
    price: "$29",
    period: "/month",
    description: "For serious buyers and sellers who need full access.",
    features: [
      { text: "Advanced search filters", included: true },
      { text: "Full price history", included: true },
      { text: "Unlimited sold prices", included: true },
      { text: "Price drop alerts (10)", included: true },
      { text: "Monthly market reports", included: true },
      { text: "Priority support", included: true },
      { text: "API access", included: false },
      { text: "Bulk exports", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Dealer",
    icon: Building2,
    price: "$299",
    period: "/month",
    description: "For dealerships and professionals who need it all.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "API access (10k calls/month)", included: true },
      { text: "Bulk data exports", included: true },
      { text: "Advanced analytics", included: true },
      { text: "White-label reports", included: true },
      { text: "Unlimited alerts", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom integrations", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer:
      "Yes, all paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, Amex) and PayPal. Dealer plans can also be paid via invoice.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f5f5f0] mb-6">
            Simple{" "}
            <span className="text-[#b8956e]">Pricing</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#a0a0a0] mb-8">
            Choose the plan that fits your needs. Start free, upgrade when
            you&apos;re ready. All plans include core search functionality.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 lg:p-8 rounded-xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-[#141414] border-[#b8956e]/30 scale-105 shadow-lg shadow-[#b8956e]/5"
                  : "bg-[#141414] border-white/[0.06] hover:border-white/[0.12]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-[#b8956e] text-[#0a0a0a] hover:bg-[#c9a67f]">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#b8956e]/10 flex items-center justify-center">
                  <plan.icon className="w-5 h-5 text-[#b8956e]" />
                </div>
                <h2 className="text-xl font-semibold text-[#f5f5f0]">{plan.name}</h2>
              </div>

              <div className="mb-4">
                <span className="text-4xl font-bold text-[#f5f5f0]">{plan.price}</span>
                <span className="text-[#a0a0a0]">{plan.period}</span>
              </div>

              <p className="text-sm text-[#a0a0a0] mb-6">{plan.description}</p>

              <Button
                className={`w-full mb-8 ${
                  plan.popular
                    ? "bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold"
                    : "bg-white/[0.05] hover:bg-white/10 text-[#f5f5f0]"
                }`}
              >
                {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-[#666666] flex-shrink-0" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? "text-[#a0a0a0]" : "text-[#666666]"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="bg-[#141414] rounded-2xl p-8 lg:p-12 border border-white/[0.06] mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] mb-4">
                Need{" "}
                <span className="text-[#b8956e]">Enterprise</span>{" "}
                Features?
              </h2>
              <p className="text-[#a0a0a0] mb-6">
                Custom data feeds, dedicated infrastructure, and bespoke
                integrations for large organizations. We work with finance
                companies, insurers, and enterprise dealers.
              </p>
              <Button className="bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold">
                Contact Enterprise Sales
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                "Custom data feeds",
                "Dedicated infrastructure",
                "SLA guarantees",
                "Bespoke integrations",
                "Volume pricing",
                "On-premise options",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#b8956e]" />
                  <span className="text-sm text-[#a0a0a0]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] text-center mb-8">
            Frequently Asked{" "}
            <span className="text-[#b8956e]">Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="p-6 rounded-xl bg-[#141414] border border-white/[0.06]"
              >
                <h3 className="text-lg font-medium text-[#f5f5f0] mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#a0a0a0]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
