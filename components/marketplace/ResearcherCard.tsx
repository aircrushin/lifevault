"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ConsentToggle } from "./ConsentToggle";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Building2,
  Beaker,
  GraduationCap,
  Calendar,
  Users,
  Shield,
  ExternalLink,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface Researcher {
  id: string;
  name: string;
  type: "pharma" | "research" | "university";
  logo?: string;
  purpose: string;
  dataTypes: string[];
  earnings: number;
  earningsType: "monthly" | "one-time" | "apy";
  apy?: number;
  duration: string;
  participants: number;
  verificationLevel: "verified" | "trusted" | "new";
}

interface ResearcherCardProps {
  researcher: Researcher;
  index: number;
  isConsented: boolean;
  onConsentChange: (id: string, enabled: boolean) => void;
}

const typeConfig: Record<string, { icon: LucideIcon; color: string; label: string }> = {
  pharma: { icon: Building2, color: "text-info", label: "Pharmaceutical" },
  research: { icon: Beaker, color: "text-accent", label: "Research Lab" },
  university: { icon: GraduationCap, color: "text-gold", label: "University" },
};

const verificationConfig: Record<string, { color: string; bg: string }> = {
  verified: { color: "text-accent", bg: "bg-accent/10" },
  trusted: { color: "text-info", bg: "bg-info/10" },
  new: { color: "text-foreground-muted", bg: "bg-white/[0.05]" },
};

export function ResearcherCard({
  researcher,
  index,
  isConsented,
  onConsentChange,
}: ResearcherCardProps) {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[researcher.type];
  const verification = verificationConfig[researcher.verificationLevel];
  const Icon = config.icon;

  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "transition-all duration-300",
        isConsented && "border-accent/30 glow-accent"
      )}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Logo/Icon */}
            <div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center",
                "bg-white/[0.03] border border-glass-border"
              )}
            >
              <Icon className={cn("w-7 h-7", config.color)} />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{researcher.name}</h3>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-medium capitalize",
                    verification.bg,
                    verification.color
                  )}
                >
                  {researcher.verificationLevel}
                </span>
              </div>
              <p className="text-xs text-foreground-muted">{config.label}</p>
            </div>
          </div>

          {/* Consent Toggle */}
          <div className="flex flex-col items-end gap-2">
            <ConsentToggle
              enabled={isConsented}
              onChange={(enabled) => onConsentChange(researcher.id, enabled)}
            />
            <span className="text-[10px] text-foreground-muted">
              {isConsented ? "Access Granted" : "Access Denied"}
            </span>
          </div>
        </div>

        {/* Purpose */}
        <p className="text-sm text-foreground-muted mb-4 line-clamp-2">
          {researcher.purpose}
        </p>

        {/* Data Types */}
        <div className="flex flex-wrap gap-2 mb-4">
          {researcher.dataTypes.map((type) => (
            <span
              key={type}
              className="px-2 py-1 rounded-md bg-white/[0.03] text-xs text-foreground-muted border border-glass-border"
            >
              {type}
            </span>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-glass-border">
          <div>
            <div className="flex items-center gap-1.5 text-foreground-muted mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-xs">Duration</span>
            </div>
            <p className="text-sm font-medium">{researcher.duration}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-foreground-muted mb-1">
              <Users className="w-3.5 h-3.5" />
              <span className="text-xs">Participants</span>
            </div>
            <p className="text-sm font-medium">
              {researcher.participants.toLocaleString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-foreground-muted mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-xs">Data Access</span>
            </div>
            <p className="text-sm font-medium">Anonymized</p>
          </div>
        </div>

        {/* Earnings */}
        <motion.div
          animate={isConsented ? { scale: [1, 1.02, 1] } : {}}
          className={cn(
            "p-4 rounded-xl mt-4 transition-all duration-300",
            isConsented
              ? "bg-accent/10 border border-accent/30"
              : "bg-white/[0.02] border border-glass-border"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-foreground-muted mb-1">
                {researcher.earningsType === "apy" ? "Annual Yield" : "Your Earnings"}
              </p>
              <p className={cn(
                "text-2xl font-bold",
                isConsented ? "text-accent" : "text-foreground"
              )}>
                {researcher.earningsType === "apy" 
                  ? `${researcher.apy}% APY`
                  : formatCurrency(researcher.earnings)}
                {researcher.earningsType === "monthly" && (
                  <span className="text-sm font-normal text-foreground-muted">/mo</span>
                )}
              </p>
            </div>
            {isConsented && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Active
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-4 py-2 text-xs text-foreground-muted hover:text-foreground transition-colors flex items-center justify-center gap-1"
        >
          <span>{expanded ? "Show less" : "View details"}</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </GlassCard>
  );
}
