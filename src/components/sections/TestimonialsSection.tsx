"use client";

import { motion } from "framer-motion";
import { Quote, Star, TrendingDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "AutoHarvester saved me $4,000 on my BMW. I could see the price history and knew exactly when to make my move.",
    author: "Michael Chen",
    role: "Car Enthusiast",
    rating: 5,
    avatar: "/images/avatars/user-1.jpg",
    carImage: "/images/cars/bmw-3-series.jpg",
    carName: "BMW 3 Series",
    savings: "$4,000 saved",
    location: "Sydney, NSW",
  },
  {
    quote: "As a dealer, this data is gold. We use it to price our inventory competitively and understand market trends.",
    author: "Sarah Williams",
    role: "Dealership Owner",
    rating: 5,
    avatar: "/images/avatars/user-2.jpg",
    carImage: "/images/cars/audi-q5.jpg",
    carName: "Audi Q5",
    savings: "Better margins",
    location: "Melbourne, VIC",
  },
  {
    quote: "Finally, transparency in the used car market. No more guessing what a fair price is.",
    author: "James Thompson",
    role: "First-time Buyer",
    rating: 5,
    avatar: "/images/avatars/user-3.jpg",
    carImage: "/images/cars/toyota-rav4.jpg",
    carName: "Toyota RAV4",
    savings: "$2,800 saved",
    location: "Brisbane, QLD",
  },
  {
    quote: "The price alerts are incredible. I got notified the moment my dream car dropped in price.",
    author: "Emily Parker",
    role: "Automotive Journalist",
    rating: 5,
    avatar: "/images/avatars/user-4.jpg",
    carImage: "/images/cars/tesla-model-3.jpg",
    carName: "Tesla Model 3",
    savings: "$6,500 saved",
    location: "Perth, WA",
  },
  {
    quote: "Worth every penny of the subscription. The market reports alone have saved me thousands.",
    author: "David Liu",
    role: "Car Flipper",
    rating: 5,
    avatar: "/images/avatars/user-5.jpg",
    carImage: "/images/cars/porsche-911.jpg",
    carName: "Porsche 911",
    savings: "$8,200 saved",
    location: "Adelaide, SA",
  },
  {
    quote: "I recommend AutoHarvester to all my clients. It's the only way to know you're getting a fair deal.",
    author: "Rachel Green",
    role: "Automotive Consultant",
    rating: 5,
    avatar: "/images/avatars/user-6.jpg",
    carImage: "/images/cars/mercedes-c-class.jpg",
    carName: "Mercedes C-Class",
    savings: "Verified deals",
    location: "Gold Coast, QLD",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f0] mb-4"
          >
            Loved by{" "}
            <span className="text-[#b8956e]">Smart Buyers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#a0a0a0]"
          >
            Join thousands of Australians making better car decisions.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-xl bg-[#141414] border border-white/[0.06] overflow-hidden hover:border-[#b8956e]/20 transition-all duration-300"
            >
              {/* Car Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={testimonial.carImage}
                  alt={testimonial.carName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                
                {/* Savings Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30">
                  <TrendingDown className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs font-medium text-green-400">{testimonial.savings}</span>
                </div>
                
                {/* Car Name */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm font-medium text-[#f5f5f0]">{testimonial.carName}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-8 h-8 text-[#b8956e]/30" />
                  
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#b8956e] text-[#b8956e]" />
                    ))}
                  </div>
                </div>
                
                <p className="text-[#a0a0a0] mb-6 leading-relaxed">"{testimonial.quote}" </p>
                
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#b8956e]/20"
                  >
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#f5f5f0]">{testimonial.author}</p>
                    <p className="text-xs text-[#666666]">{testimonial.role}</p>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[#666666] text-xs"
003e
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "50K+", label: "Happy Users" },
            { value: "$12M+", label: "Total Savings" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "98%", label: "Would Recommend" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center p-6 rounded-xl bg-[#141414] border border-white/[0.06]"
            >
              <p className="text-3xl font-bold text-[#b8956e] mb-1">{stat.value}</p>
              <p className="text-sm text-[#666666]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
