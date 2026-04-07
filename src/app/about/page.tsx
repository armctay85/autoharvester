import type { Metadata } from "next";
import { Target, Eye, Heart, Building2, Award, Users, MapPin, Globe } from "lucide-react";
import Image from "next/image";

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
    image: "/images/insights/market-analysis.jpg",
  },
  {
    icon: Eye,
    title: "Accuracy",
    description:
      "Every data point is verified and cross-referenced. We never compromise on the quality of our information.",
    image: "/images/features/price-chart.jpg",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "We build tools that solve real problems. Every feature is designed to help our users make better decisions.",
    image: "/images/avatars/user-2.jpg",
  },
];

const stats = [
  { value: "500K+", label: "Vehicles Tracked" },
  { value: "2.5M+", label: "Price Points" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "50K+", label: "Happy Users" },
];

const teamMembers = [
  { name: "Alex Morrison", role: "Founder & CEO", avatar: "/images/avatars/user-1.jpg" },
  { name: "Sarah Chen", role: "Head of Data", avatar: "/images/avatars/user-2.jpg" },
  { name: "James Wilson", role: "Lead Engineer", avatar: "/images/avatars/user-3.jpg" },
  { name: "Emma Davis", role: "Product Designer", avatar: "/images/avatars/user-4.jpg" },
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
          
          <div className="relative aspect-square rounded-2xl bg-[#141414] border border-white/[0.06] overflow-hidden">
            <Image
              src="/images/about/team-office.jpg"
              alt="AutoHarvester Team"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-2 text-[#b8956e]">
                <Building2 className="w-5 h-5" />
                <span className="text-sm font-medium">Founded 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Our Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1 relative aspect-square rounded-2xl bg-[#141414] border border-white/[0.06] overflow-hidden">
            <Image
              src="/images/about/data-center.jpg"
              alt="Our Data Infrastructure"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6">
              <div className="flex items-center gap-2 text-green-500">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">500K+ Vehicles Tracked</span>
              </div>
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
                className="group rounded-xl bg-[#141414] border border-white/[0.06] overflow-hidden hover:border-[#b8956e]/20 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                  
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[#b8956e]/20 backdrop-blur-sm flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-[#b8956e]" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#f5f5f0] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#a0a0a0]">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#f5f5f0] text-center mb-4">
            Meet the{" "}
            <span className="text-[#b8956e]">Team</span>
          </h2>
          <p className="text-[#a0a0a0] text-center mb-12 max-w-2xl mx-auto">
            We're a small but dedicated team of automotive enthusiasts, data
            scientists, and software engineers passionate about bringing
            transparency to the car market.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="text-center p-6 rounded-xl bg-[#141414] border border-white/[0.06] hover:border-[#b8956e]/20 transition-all duration-300"
              >
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-[#b8956e]/20">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-sm font-semibold text-[#f5f5f0] mb-1">{member.name}</h3>
                <p className="text-xs text-[#666666]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <div className="rounded-2xl bg-[#141414] border border-white/[0.06] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#b8956e]/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#b8956e]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#f5f5f0]">Headquarters</h3>
                <p className="text-sm text-[#666666]">Sydney, Australia</p>
              </div>
            </div>
            
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/images/about/australia-map.jpg"
                alt="Australia Map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/50 to-transparent" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-[#b8956e] animate-ping absolute" />
                <div className="w-4 h-4 rounded-full bg-[#b8956e] relative" />
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl bg-[#141414] border border-white/[0.06] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#b8956e]/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#b8956e]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#f5f5f0]">Coverage</h3>
                <p className="text-sm text-[#666666]">Nationwide Data</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { state: "New South Wales", listings: "180K+" },
                { state: "Victoria", listings: "165K+" },
                { state: "Queensland", listings: "95K+" },
                { state: "Western Australia", listings: "45K+" },
                { state: "South Australia", listings: "15K+" },
              ].map((item) => (
                <div key={item.state} className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
                  <span className="text-[#a0a0a0]">{item.state}</span>
                  <span className="text-[#b8956e] font-medium">{item.listings}</span>
                </div>
              ))}
            </div>
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
              <div className="relative w-32 h-32 rounded-2xl bg-[#b8956e]/10 flex items-center justify-center">
                <span className="text-5xl font-bold text-[#b8956e]">D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
