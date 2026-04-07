"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  cursor = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      const startTimeout = setTimeout(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
            setTimeout(() => setShowCursor(false), 1000);
          }
        }, speed);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(startTimeout);
    }
  }, [isInView, text, speed, delay, hasStarted]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && showCursor && hasStarted && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  );
}

interface StaggerTextProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerText({
  children,
  className = "",
  staggerDelay = 0.05,
  initialDelay = 0,
}: StaggerTextProps) {
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className = "",
  animate = true,
}: GradientTextProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-[#b8956e] via-[#d4b896] to-[#b8956e] bg-clip-text text-transparent ${
        animate ? "bg-[length:200%_auto]" : ""
      } ${className}`}
      animate={
        animate
          ? {
              backgroundPosition: ["0% center", "200% center"],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }
          : undefined
      }
      style={animate ? { backgroundSize: "200% auto" } : undefined}
    >
      {children}
    </motion.span>
  );
}

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export function RevealText({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: RevealTextProps) {
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <div className="overflow-hidden">
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
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default TypewriterText;
