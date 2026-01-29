"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Activity } from "lucide-react";

interface HealthRadarProps {
  data: {
    category: string;
    value: number;
    fullMark: number;
  }[];
}

export function HealthRadar({ data }: HealthRadarProps) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-accent-secondary/10 flex items-center justify-center">
            <Activity className="w-4 h-4 text-accent-secondary" />
          </div>
          <div>
            <h3 className="text-sm font-medium">Health Profile</h3>
            <p className="text-xs text-foreground-muted">5 dimensions analyzed</p>
          </div>
        </div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-[280px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid
                stroke="rgba(255, 255, 255, 0.1)"
                strokeDasharray="3 3"
              />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: "#8b8b8b", fontSize: 11 }}
                tickLine={false}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Health"
                dataKey="value"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.2}
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "#10b981",
                  strokeWidth: 2,
                  stroke: "#050505",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {data.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02]"
            >
              <span className="text-xs text-foreground-muted">{item.category}</span>
              <span className="text-xs font-medium">{item.value}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
