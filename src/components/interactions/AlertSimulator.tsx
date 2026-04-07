"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

interface ToastProps {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  onClose?: (id: string) => void;
}

export function Toast({ id, message, type = "info", onClose }: ToastProps) {
  const colors = {
    success: "bg-green-500/20 border-green-500/30 text-green-400",
    error: "bg-red-500/20 border-red-500/30 text-red-400",
    info: "bg-[#b8956e]/20 border-[#b8956e]/30 text-[#b8956e]",
  };

  const icons = {
    success: <Check className="w-4 h-4" />,
    error: <X className="w-4 h-4" />,
    info: null,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl ${colors[type]}`}
      onClick={() => onClose?.(id)}
    >
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
}

interface ToastContainerProps {
  children: ReactNode;
}

export function ToastContainer({ children }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {children}
    </div>
  );
}

interface AlertSimulatorProps {
  onSimulate?: (email: string) => void;
}

export function AlertSimulator({ onSimulate }: AlertSimulatorProps) {
  const [email, setEmail] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSimulating(true);

    // Simulate the alert creation process
    setTimeout(() => {
      setIsSimulating(false);
      setShowSuccess(true);
      onSimulate?.(email);

      // Hide success after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setEmail("");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email for alerts"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-white/[0.08] rounded-xl text-[#f5f5f0] placeholder:text-[#666666] focus:border-[#b8956e]/50 focus:outline-none transition-colors"
          disabled={isSimulating}
        />
        <motion.button
          type="submit"
          disabled={isSimulating || !email}
          className="px-6 py-3 bg-[#b8956e] hover:bg-[#c9a67f] text-[#0a0a0a] font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          {isSimulating ? (
            <motion.div
              className="w-5 h-5 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            "Create Alert"
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-16 left-0 right-0"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Alert Created!</p>
                <p className="text-xs text-green-400/70">You&apos;ll be notified when prices drop</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AlertSimulator;
