"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  speed?: number;
}

export function Parallax({
  children,
  className = "",
  offset = 50,
  direction = "up",
  speed = 0.5,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const getTransform = (): MotionValue<number> => {
    switch (direction) {
      case "up":
        return useTransform(scrollYProgress, [0, 1], [offset, -offset * speed]);
      case "down":
        return useTransform(scrollYProgress, [0, 1], [-offset, offset * speed]);
      case "left":
        return useTransform(scrollYProgress, [0, 1], [offset, -offset * speed]);
      case "right":
        return useTransform(scrollYProgress, [0, 1], [-offset, offset * speed]);
      default:
        return useTransform(scrollYProgress, [0, 1], [offset, -offset * speed]);
    }
  };

  const x = direction === "left" || direction === "right" ? getTransform() : 0;
  const y = direction === "up" || direction === "down" ? getTransform() : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxLayer({
  children,
  className = "",
  speed = 0.5,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div ref={ref} className={`relative ${className}`} style={{ y }}>
      {children}
    </motion.div>
  );
}

interface FadeInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function FadeInView({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
}: FadeInViewProps) {
  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...directionOffset[direction],
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 100,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export default Parallax;
