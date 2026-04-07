"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Quote, Star, TrendingDown, CheckCircle2, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import { GradientText, RevealText } from "@/components/animations/TextAnimations";
import { FadeInView, StaggerContainer, StaggerItem } from "@/components/animations/ScrollAnimations";
import { MagneticButton } from "@/components/interactions/MagneticButton";
import { TiltCard } from "@/components/interactions/TiltCard";

const testimonials = [
  {
    quote: "AutoHarvester saved me $4,200 on my BMW. I saw the price history, knew it had been sitting for months, and negotiated accordingly. The dealer was shocked I knew so much.",
    author: "Michael Chen",
    role: "Car Enthusiast",
    rating: 5,
    avatar: "/images/avatars/user-1.jpg",
    carImage: "/images/cars/bmw-3-series.jpg",
    carName: "2022 BMW 330i",
    savings: "$4,200 saved",
    location: "Sydney, NSW",
    story: "Found a BMW that had been listed for 180 days with 3 price drops. Used the data to negotiate from $58k down to $53,800.",
    verified: true,
  },
  {
    quote: "As a dealership owner, this data is gold. We use it to price our inventory competitively and understand what the market actually bears. It's completely changed how we operate.",
    author: "Sarah Williams",
    role: "Dealership Owner",
    rating: 5,
    avatar: "/images/avatars/user-2.jpg",
    carImage: "/images/cars/audi-q5.jpg",
    carName: "2021 Audi Q5",
    savings: "Better margins",
    location: "Melbourne, VIC",
    story: "Reduced our average days-on-lot from 45 to 28 by pricing according to actual market data instead of guesswork.",
    verified: true,
  },
  {
    quote: "Finally, transparency in the used car market. No more guessing what a fair price is. I bought my first car with complete confidence knowing exactly what I should pay.",
    author: "James Thompson",
    role: "First-time Buyer",
    rating: 5,
    avatar: "/images/avatars/user-3.jpg",
    carImage: "/images/cars/toyota-rav4.jpg",
    carName: "2023 Toyota RAV4",
    savings: "$2,800 saved",
    location: "Brisbane, QLD",
    story: "First-time buyer who avoided paying $2,800 over market value by checking sold prices before negotiating.",
    verified: true,
  },
  {
    quote: "The price alerts are incredible. I got notified the moment my dream car dropped in price. I clicked within 30 seconds of the alert and secured it before anyone else.",
    author: "Emily Parker",
    role: "Automotive Journalist",
    rating: 5,
    avatar: "/images/avatars/user-4.jpg",
    carImage: "/images/cars/tesla-model-3.jpg",
    carName: "2023 Tesla Model 3",
    savings: "$6,500 saved",
    location: "Perth, WA",
    story: "Set an alert for a Tesla Model 3 Performance. Got notified of a $6,500 price drop at 2am and bought it immediately.",
    verified: true,
  },
  {
    quote: "Worth every penny of the subscription. The market reports alone have saved me thousands. I flip cars part-time and this is now my secret weapon.",
    author: "David Liu",
    role: "Car Flipper",
    rating: 5,
    avatar: "/images/avatars/user-5.jpg",
    carImage: "/images/cars/porsche-911.jpg",
    carName: "2020 Porsche 911",
    savings: "$8,200 saved",
    location: "Adelaide, SA",
    story: "Used depreciation data to identify undervalued Porsches. Bought for $142k, market value was $150k+.",
    verified: true,
  },
  {
    quote: "I recommend AutoHarvester to all my clients. It's the only way to know you're getting a fair deal in today's market. The data doesn't lie.",
    author: "Rachel Green",
    role: "Automotive Consultant",
    rating: 5,
    avatar: "/images/avatars/user-6.jpg",
    carImage: "/images/cars/mercedes-c-class.jpg",
    carName: "2022 Mercedes C300",
    savings: "Verified deals",
    location: "Gold Coast, QLD",
    story: "Consults for high-net-worth clients. Uses AutoHarvester to verify every purchase recommendation.",
    verified: true,
  },
];

const caseStudies = [
  {
    name: "Jake's BMW Story",
    savings: "$4,200",
    timeframe: "3 weeks of monitoring",
    image: "/images/cars/bmw-3-series.jpg",
    quote: "I knew the dealer was desperate to move inventory.",
  },
  {
    name: "Sarah's Tesla Alert",
    savings: "$6,500",
    timeframe: "Same-day purchase",
    image: "/images/cars/tesla-model-3.jpg",
    quote: "The alert came through at 2am. I bought it before breakfast.",
  },
  {
    name: "David's Porsche Flip",
    savings: "$8,200",
    timeframe: "2 months research",
    image: "/images/cars/porsche-911.jpg",
    quote: "The depreciation data showed it was 15% below trend.",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section ref={containerRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a]"
        style={{ y: backgroundY }}
      />

      {/* Decorative glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#b8956e]/5 rounded-full blur-[150px]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeInView>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b8956e]/10 border border-[#b8956e]/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle2 className="w-4 h-4 text-[#b8956e]" />
              <span className="text-sm font-medium text-[#b8956e]">Real Success Stories</span>
            </motion.div>
          </FadeInView>

          <RevealText direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f0] mb-4">
              Loved by{" "}
              <GradientText>Smart Buyers</GradientText>
            </h2>
          </RevealText>

          <RevealText direction="up" delay={0.2}>
            <p className="text-lg text-[#a0a0a0]">
              Join thousands of Australians who never overpay for cars again.
            </p>
          </RevealText>
        </div>

        {/* Main Featured Testimonial - Video Style */}
        <FadeInView delay={0.3}>
          <div className="mb-20">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="grid lg:grid-cols-2 gap-8 items-center"
                >
                  {/* Car Image */}
                  <TiltCard tiltAmount={5} glareOpacity={0.15}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                      <Image
                        src={activeTestimonial.carImage}
                        alt={activeTestimonial.carName}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                      
                      {/* Savings Badge */}
                      <motion.div 
                        className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-xl border border-green-500/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                      >
                        <TrendingDown className="w-4 h-4 text-green-400" />
                        <span className="font-semibold text-green-400">{activeTestimonial.savings}</span>
                      </motion.div>

                      {/* Car Info */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <motion.p 
                          className="text-2xl font-bold text-[#f5f5f0] mb-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {activeTestimonial.carName}
                        </motion.p>
                        <motion.div 
                          className="flex items-center gap-2 text-sm text-[#a0a0a0]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>Verified Purchase</span>
                        </motion.div>
                      </div>

                      {/* Play button overlay */}
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-[#b8956e] flex items-center justify-center cursor-pointer">
                          <Play className="w-6 h-6 text-[#0a0a0a] ml-1" />
                        </div>
                      </motion.div>
                    </div>
                  </TiltCard>

                  {/* Testimonial Content */}
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 w-12 h-12 text-[#b8956e]/20" />
                    
                    <motion.blockquote 
                      className="text-xl lg:text-2xl text-[#f5f5f0] leading-relaxed mb-6 relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      "{activeTestimonial.quote}"
                    </motion.blockquote>

                    {/* Story */}
                    <motion.div 
                      className="p-4 rounded-xl bg-[#141414]/50 border border-white/[0.06] mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-sm text-[#a0a0a0]"><span className="text-[#b8956e]">The Story: </span>{activeTestimonial.story}</p>
                    </motion.div>

                    {/* Author */}
                    <motion.div 
                      className="flex items-center gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#b8956e]/20">
                        <Image
                          src={activeTestimonial.avatar}
                          alt={activeTestimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-semibold text-[#f5f5f0]">{activeTestimonial.author}</p>
                        <p className="text-sm text-[#666666]">{activeTestimonial.role}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                            >
                              <Star className="w-4 h-4 fill-[#b8956e] text-[#b8956e]" />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141414]/50 border border-white/[0.06]">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-xs text-[#a0a0a0]">{activeTestimonial.location}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setActiveIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? "w-8 bg-[#b8956e]"
                          : "bg-[#333333] hover:bg-[#555555]"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <MagneticButton
                    className="w-12 h-12 rounded-full bg-[#141414] border border-white/[0.08] flex items-center justify-center text-[#f5f5f0] hover:border-[#b8956e]/30 hover:bg-[#1a1a1a] transition-colors"
                    onClick={handlePrev}
                    strength={0.3}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </MagneticButton>

                  <MagneticButton
                    className="w-12 h-12 rounded-full bg-[#141414] border border-white/[0.08] flex items-center justify-center text-[#f5f5f0] hover:border-[#b8956e]/30 hover:bg-[#1a1a1a] transition-colors"
                    onClick={handleNext}
                    strength={0.3}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>

        {/* Case Studies Grid */}
        <FadeInView delay={0.4}>
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#f5f5f0] mb-8 text-center">
              Featured Case Studies
            </h3>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {caseStudies.map((study, index) => (
                <StaggerItem key={study.name}>
                  <TiltCard tiltAmount={8} glareOpacity={0.1}>
                    <div className="group relative bg-[#141414]/80 backdrop-blur-xl rounded-2xl border border-white/[0.06] overflow-hidden hover:border-[#b8956e]/20 transition-all"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={study.image}
                          alt={study.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                        
                        <motion.div 
                          className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-sm font-semibold text-green-400">{study.savings}</span>
                        </motion.div>
                      </div>

                      <div className="p-5">
                        <h4 className="font-semibold text-[#f5f5f0] mb-1">{study.name}</h4>
                        <p className="text-xs text-[#666666] mb-3">{study.timeframe}</p>
                        <p className="text-sm text-[#a0a0a0] italic">"{study.quote}"</p>
                      </div>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeInView>

        {/* Stats */}
        <FadeInView delay={0.5}>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50K+", label: "Happy Users", sublabel: "and growing" },
              { value: "$12M+", label: "Total Savings", sublabel: "tracked to date" },
              { value: "4.9/5", label: "Average Rating", sublabel: "across all platforms" },
              { value: "98%", label: "Would Recommend", sublabel: "to a friend" },
            ].map((stat, index) => (
              <StaggerItem key={stat.label}>
                <motion.div 
                  className="text-center p-6 rounded-2xl bg-[#141414]/60 backdrop-blur-sm border border-white/[0.06] hover:border-[#b8956e]/20 transition-all"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <motion.p 
                    className="text-4xl font-bold text-[#b8956e] mb-1"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-[#f5f5f0] font-medium">{stat.label}</p>
                  <p className="text-xs text-[#666666]">{stat.sublabel}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </FadeInView>
      </div>
    </section>
  );
}

export default TestimonialsSection;
