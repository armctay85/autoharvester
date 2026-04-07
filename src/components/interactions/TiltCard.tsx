"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareOpacity?: number;
  scale?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  glareOpacity = 0.15,
  scale = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [tiltAmount, -tiltAmount]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltAmount, tiltAmount]), {
    stiffness: 300,
    damping: 30,
  });

  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,${isHovered ? glareOpacity : 0}), transparent 50%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
}

export function GlassCard({
  children,
  className = "",
  hoverScale = 1.02,
}: GlassCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] backdrop-blur-xl bg-[#141414]/60 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: hoverScale,
        borderColor: "rgba(184, 149, 110, 0.3)",
        boxShadow: "0 25px 50px -12px rgba(184, 149, 110, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#b8956e]/10 via-transparent to-[#b8956e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Inner glow */}
      <div className="absolute inset-[1px] rounded-2xl bg-[#141414]/80" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export default TiltCard;
