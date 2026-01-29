"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import { useState } from "react";

interface ConsentToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
}

export function ConsentToggle({ enabled, onChange, disabled }: ConsentToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (disabled || isAnimating) return;
    setIsAnimating(true);
    onChange(!enabled);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={disabled || isAnimating}
      className={cn(
        "relative w-16 h-9 rounded-full transition-all duration-300",
        "border-2",
        enabled
          ? "bg-accent/20 border-accent"
          : "bg-white/[0.02] border-glass-border",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Track glow */}
      {enabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-full bg-accent/10 blur-sm"
        />
      )}

      {/* Thumb */}
      <motion.div
        animate={{
          x: enabled ? 28 : 4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full",
          "flex items-center justify-center",
          "transition-colors duration-300",
          enabled ? "bg-accent" : "bg-foreground-muted"
        )}
      >
        {enabled ? (
          <Unlock className="w-3 h-3 text-background" />
        ) : (
          <Lock className="w-3 h-3 text-background" />
        )}
      </motion.div>

      {/* Status indicator ring */}
      {enabled && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -inset-1 rounded-full border border-accent/30"
        />
      )}
    </button>
  );
}
