import type { Metadata } from "next";
import { Target, Eye, Heart, Building2, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | AutoHarvester",
  description:
    "Learn about AutoHarvester's mission to bring price transparency to the Australian car market. Part of the Develoop family.",
};

const values = [
  {
    icon: Target,
    title: "Transparency",
    description:
      "We believe car buyers and sellers deserve access to complete price information, not just what's convenient for listing sites.",
  },
  {
    icon: Eye,
    title: "Accuracy",
    description:
      "Every data point is verified and cross-referenced. We never compromise on the quality of our information.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "We build tools that solve real problems. Every feature is designed to help our users make better decisions.",
  },
];

const stats = [
  { value: "500K+", label: "Vehicles Tracked" },
  { value: "2.5M+", label: "Price Points" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "50K+", label: "Happy Users" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 lg:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f5f5f0] mb-6">
            Our{" "}
            <span className="text-[#b8956e]">Story</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#a0a0a0]">
            We started when we noticed something was broken in the Australian car
            market.
          </p>
        </div>

        {/* Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] mb-6">
              The Problem We{" "}
              <span className="text-[#b8956e]">Noticed</span>
            </h2>
            <div className="space-y-4 text-[#a0a0a0]">
              <p>
                It started with a simple frustration: searching for a used car
                and finding listings with no price history. When a car sold,
                its price disappeared from the internet forever.
              </p>
              <p>
                We realized this wasn't just annoying—it was fundamentally
                unfair. Buyers had no way to know if they were paying a fair
                price. Sellers couldn't see market trends. Dealers operated in
                the dark.
              </p>
              <p>
                Meanwhile, major listing sites like Carsales were deleting sold
                prices, effectively erasing the market's memory. This
                information asymmetry hurt everyone except the platforms
                themselves.
              </p>
            </div>
          </div>
          
          <div className="aspect-square rounded-2xl bg-[#141414] border border-white/[0.06] p-8 flex items-center justify-center">
            <div className="text-center">
              <Building2 className="w-24 h-24 text-[#b8956e]/20 mx-auto mb-4" />
              <p className="text-[#666666] text-sm uppercase tracking-wider">
                The Beginning
              </p>
            </div>
          </div>
        </div>

        {/* Our Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1 aspect-square rounded-2xl bg-[#141414] border border-white/[0.06] p-8 flex items-center justify-center">
            <div className="text-center">
              <Award className="w-24 h-24 text-[#b8956e]/20 mx-auto mb-4" />
              <p className="text-[#666666] text-sm uppercase tracking-wider">
                Our Mission
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] mb-6">
              Our{" "}
              <span className="text-[#b8956e]">Solution</span>
            </h2>
            <div className="space-y-4 text-[#a0a0a0]">
              <p>
                We built AutoHarvester to solve this problem. Our platform
                continuously monitors car listings across Australia, capturing
                and preserving price data before it disappears.
              </p>
              <p>
                Today, we maintain the largest database of sold car prices in
                Australia—over 500,000 vehicles and counting. Every price
                change, every sale, every market trend is preserved forever.
              </p>
              <p>
                Our mission is simple: bring price transparency to the
                Australian car market. We believe everyone deserves access to
                the information they need to make informed decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-[#141414] border border-white/[0.06]"
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#b8956e] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[#a0a0a0]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] text-center mb-12">
            Our{" "}
            <span className="text-[#b8956e]">Values</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl bg-[#141414] border border-white/[0.06]"
              >
                <value.icon className="w-10 h-10 text-[#b8956e] mb-4" />
                <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-[#a0a0a0]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Develoop Connection */}
        <div className="bg-[#141414] rounded-2xl p-8 lg:p-12 border border-white/[0.06]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] mb-4">
                Part of the{" "}
                <a
                  href="https://develoop.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b8956e] hover:underline"
                >
                  Develoop
                </a>{" "}
                Family
              </h2>
              <p className="text-[#a0a0a0] mb-6">
                AutoHarvester is proudly part of the Develoop group—an
                Australian technology company building premium digital
                products. We share the same commitment to quality,
                craftsmanship, and customer obsession.
              </p>
              <a
                href="https://develoop.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#b8956e] hover:underline"
              >
                Visit Develoop
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl bg-[#b8956e]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#b8956e]">D</span>
                </div>
                <p className="text-[#a0a0a0]">Developed with excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] mb-4">
            Meet the{" "}
            <span className="text-[#b8956e]">Team</span>
          </h2>
          <p className="text-[#a0a0a0] mb-12 max-w-2xl mx-auto">
            We're a small but dedicated team of automotive enthusiasts, data
            scientists, and software engineers passionate about bringing
            transparency to the car market.
          </p>

          <div className="flex items-center justify-center gap-2 text-[#666666]">
            <Users className="w-5 h-5" />
            <span>Growing team — hiring soon!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
