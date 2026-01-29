"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { motion, useSpring, useTransform } from "framer-motion";
import { Gauge, TrendingUp, Info } from "lucide-react";
import { useEffect, useState } from "react";

interface HealthScoreProps {
  score: number;
  maxScore?: number;
  minScore?: number;
  trend: number;
}

function CircularProgress({ score, maxScore = 900, minScore = 300 }: { score: number; maxScore?: number; minScore?: number }) {
  const normalizedScore = ((score - minScore) / (maxScore - minScore)) * 100;
  const circumference = 2 * Math.PI * 88;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const spring = useSpring(circumference, { stiffness: 30, damping: 20 });
  
  useEffect(() => {
    spring.set(strokeDashoffset);
  }, [strokeDashoffset, spring]);

  const animatedOffset = useTransform(spring, (value) => value);
  const [currentOffset, setCurrentOffset] = useState(circumference);

  useEffect(() => {
    const unsubscribe = animatedOffset.on("change", (v) => setCurrentOffset(v));
    return () => unsubscribe();
  }, [animatedOffset]);

  // Score color gradient
  const getScoreColor = () => {
    if (normalizedScore >= 75) return "#10b981"; // Excellent - Green
    if (normalizedScore >= 50) return "#14b8a6"; // Good - Teal
    if (normalizedScore >= 25) return "#fbbf24"; // Fair - Gold
    return "#ef4444"; // Poor - Red
  };

  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Background circle */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="12"
        />
        {/* Progress arc */}
        <motion.circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke={getScoreColor()}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={currentOffset}
          style={{
            filter: `drop-shadow(0 0 8px ${getScoreColor()}40)`,
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-4xl font-bold"
          style={{ color: getScoreColor() }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-foreground-muted mt-1">Health Score</span>
      </div>
    </div>
  );
}

export function HealthScore({ score, maxScore = 900, minScore = 300, trend }: HealthScoreProps) {
  const getScoreLabel = () => {
    const normalizedScore = ((score - minScore) / (maxScore - minScore)) * 100;
    if (normalizedScore >= 75) return "Excellent";
    if (normalizedScore >= 50) return "Good";
    if (normalizedScore >= 25) return "Fair";
    return "Needs Attention";
  };

  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
              <Gauge className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Health Credit Score</h3>
              <p className="text-xs text-foreground-muted">Range: {minScore}-{maxScore}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors">
            <Info className="w-4 h-4 text-foreground-muted" />
          </button>
        </div>

        {/* Score Circle */}
        <CircularProgress score={score} maxScore={maxScore} minScore={minScore} />

        {/* Score Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-sm font-medium text-accent">{getScoreLabel()}</span>
          </div>
        </motion.div>

        {/* Trend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-2 mt-4"
        >
          <TrendingUp
            className={cn(
              "w-4 h-4",
              trend >= 0 ? "text-success" : "text-danger rotate-180"
            )}
          />
          <span className={cn(
            "text-sm font-medium",
            trend >= 0 ? "text-success" : "text-danger"
          )}>
            {trend >= 0 ? "+" : ""}{trend} pts this month
          </span>
        </motion.div>

        {/* Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-glass-border"
        >
          <p className="text-xs text-foreground-muted leading-relaxed">
            <span className="text-accent font-medium">Insight:</span> Your metabolic markers 
            are in high demand for diabetes research. Consider enabling consent for 
            additional earnings.
          </p>
        </motion.div>
      </div>
    </GlassCard>
  );
}
