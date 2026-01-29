"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Beaker, GraduationCap } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Opportunity {
  id: string;
  institution: string;
  type: "pharma" | "research" | "university";
  purpose: string;
  earnings: number;
  period: "monthly" | "one-time";
  dataTypes: string[];
  urgency: "high" | "medium" | "low";
}

interface OpportunityCardProps {
  opportunities: Opportunity[];
}

const typeConfig: Record<string, { icon: LucideIcon; color: string }> = {
  pharma: { icon: Building2, color: "text-info" },
  research: { icon: Beaker, color: "text-accent" },
  university: { icon: GraduationCap, color: "text-gold" },
};

function OpportunityItem({ opportunity, index }: { opportunity: Opportunity; index: number }) {
  const config = typeConfig[opportunity.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className={cn(
        "group relative p-4 rounded-xl",
        "bg-white/[0.02] border border-glass-border",
        "hover:bg-white/[0.04] hover:border-glass-border-hover",
        "transition-all duration-300 cursor-pointer"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          "bg-white/[0.05]"
        )}>
          <Icon className={cn("w-5 h-5", config.color)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">{opportunity.institution}</h4>
            {opportunity.urgency === "high" && (
              <span className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px] font-medium">
                Hot
              </span>
            )}
          </div>
          <p className="text-xs text-foreground-muted mb-2 line-clamp-1">
            {opportunity.purpose}
          </p>
          <div className="flex items-center gap-2">
            {opportunity.dataTypes.slice(0, 2).map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 rounded-md bg-white/[0.05] text-[10px] text-foreground-muted"
              >
                {type}
              </span>
            ))}
            {opportunity.dataTypes.length > 2 && (
              <span className="text-[10px] text-foreground-muted">
                +{opportunity.dataTypes.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Earnings */}
        <div className="text-right shrink-0">
          <p className="text-lg font-semibold text-accent">
            {formatCurrency(opportunity.earnings)}
          </p>
          <p className="text-[10px] text-foreground-muted">
            {opportunity.period === "monthly" ? "/month" : "one-time"}
          </p>
        </div>

        {/* Arrow */}
        <ArrowRight className="w-4 h-4 text-foreground-muted opacity-0 group-hover:opacity-100 transition-opacity self-center" />
      </div>
    </motion.div>
  );
}

export function OpportunityCard({ opportunities }: OpportunityCardProps) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-medium">Monetization Opportunities</h3>
            <p className="text-xs text-foreground-muted">
              {opportunities.length} institutions seeking your data
            </p>
          </div>
          <button className="text-xs text-accent hover:text-accent/80 transition-colors font-medium">
            View All
          </button>
        </div>

        {/* Opportunities List */}
        <div className="space-y-3">
          {opportunities.map((opportunity, index) => (
            <OpportunityItem
              key={opportunity.id}
              opportunity={opportunity}
              index={index}
            />
          ))}
        </div>

        {/* Total Potential */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-muted">
              Total potential earnings
            </span>
            <span className="text-lg font-semibold text-accent">
              {formatCurrency(opportunities.reduce((sum, o) => sum + o.earnings, 0))}/mo
            </span>
          </div>
        </motion.div>
      </div>
    </GlassCard>
  );
}
