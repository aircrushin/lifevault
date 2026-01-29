"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn, formatCurrency } from "@/lib/utils";
import { motion, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Shield, Lock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface TotalEquityProps {
  value: number;
  change: number;
  securityLevel: "maximum" | "high" | "medium";
}

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) =>
    formatCurrency(Math.floor(current))
  );
  const [displayValue, setDisplayValue] = useState("$0.00");

  useEffect(() => {
    spring.set(value);
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [value, spring, display]);

  return <span>{displayValue}</span>;
}

export function TotalEquity({ value, change, securityLevel }: TotalEquityProps) {
  const securityConfig = {
    maximum: { color: "text-accent", label: "Maximum Security", icon: Shield },
    high: { color: "text-accent-secondary", label: "High Security", icon: Lock },
    medium: { color: "text-warning", label: "Medium Security", icon: Lock },
  };

  const config = securityConfig[securityLevel];
  const SecurityIcon = config.icon;

  return (
    <GlassCard
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-medium text-foreground-muted">
              Total Data Equity
            </span>
          </div>
          
          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full",
              "bg-accent/10 border border-accent/20"
            )}
          >
            <SecurityIcon className={cn("w-3.5 h-3.5", config.color)} />
            <span className={cn("text-xs font-medium", config.color)}>
              {config.label}
            </span>
          </motion.div>
        </div>

        {/* Main Value */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          <h2 className="text-5xl font-bold tracking-tight text-gradient-accent">
            <AnimatedNumber value={value} />
          </h2>
        </motion.div>

        {/* Change Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md",
              change >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
            )}
          >
            <TrendingUp
              className={cn("w-3 h-3", change < 0 && "rotate-180")}
            />
            <span className="text-sm font-medium">
              {change >= 0 ? "+" : ""}{change.toFixed(1)}%
            </span>
          </div>
          <span className="text-sm text-foreground-muted">
            vs last month
          </span>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-glass-border"
        >
          <div>
            <p className="text-xs text-foreground-muted mb-1">Data Assets</p>
            <p className="text-lg font-semibold">12</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted mb-1">Active Consents</p>
            <p className="text-lg font-semibold">3</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted mb-1">Monthly Yield</p>
            <p className="text-lg font-semibold text-accent">$47.50</p>
          </div>
        </motion.div>
      </div>
    </GlassCard>
  );
}
