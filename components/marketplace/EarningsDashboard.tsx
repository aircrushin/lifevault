"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn, formatCurrency } from "@/lib/utils";
import { motion, useSpring, useTransform } from "framer-motion";
import {
  TrendingUp,
  Wallet,
  Clock,
  ArrowUpRight,
  History,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EarningsDashboardProps {
  totalEarnings: number;
  pendingPayout: number;
  monthlyData: { month: string; earnings: number }[];
  recentPayouts: { date: string; amount: number; source: string }[];
}

function AnimatedValue({ value }: { value: number }) {
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

export function EarningsDashboard({
  totalEarnings,
  pendingPayout,
  monthlyData,
  recentPayouts,
}: EarningsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Earnings */}
        <GlassCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-accent" />
              </div>
              <span className="text-xs text-foreground-muted">Total Earnings</span>
            </div>
            <p className="text-2xl font-bold text-gradient-accent">
              <AnimatedValue value={totalEarnings} />
            </p>
            <div className="flex items-center gap-1 mt-2 text-success text-xs">
              <TrendingUp className="w-3 h-3" />
              <span>+12.5% this month</span>
            </div>
          </div>
        </GlassCard>

        {/* Pending Payout */}
        <GlassCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-gold" />
              </div>
              <span className="text-xs text-foreground-muted">Pending Payout</span>
            </div>
            <p className="text-2xl font-bold text-gradient-gold">
              <AnimatedValue value={pendingPayout} />
            </p>
            <p className="text-xs text-foreground-muted mt-2">
              Next payout: Feb 1, 2026
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Earnings Chart */}
      <GlassCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Earnings History</h3>
            <select className="text-xs bg-transparent text-foreground-muted border border-glass-border rounded-lg px-2 py-1">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>

          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8b8b8b", fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#8b8b8b", fontSize: 10 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10, 10, 10, 0.95)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    padding: "8px 12px",
                  }}
                  labelStyle={{ color: "#8b8b8b", fontSize: 11 }}
                  itemStyle={{ color: "#10b981", fontSize: 13 }}
                  formatter={(value) => [formatCurrency(value as number), "Earnings"]}
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#earningsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>

      {/* Recent Payouts */}
      <GlassCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-foreground-muted" />
            <h3 className="text-sm font-medium">Recent Payouts</h3>
          </div>

          <div className="space-y-3">
            {recentPayouts.map((payout, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{payout.source}</p>
                    <p className="text-xs text-foreground-muted">{payout.date}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-accent">
                  +{formatCurrency(payout.amount)}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Withdraw Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full mt-4 py-3 rounded-xl font-medium",
              "bg-gradient-to-r from-accent to-accent-secondary",
              "text-background text-sm",
              "transition-all duration-300",
              "hover:shadow-lg hover:shadow-accent/20"
            )}
          >
            Withdraw to Wallet
          </motion.button>
        </div>
      </GlassCard>
    </div>
  );
}
