"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { FileText, Shield, TrendingUp, Sparkles, Clock } from "lucide-react";

interface AssetPreviewProps {
  file: {
    name: string;
    size: number;
    type: string;
  };
  valuation: {
    baseValue: number;
    completenessMultiplier: number;
    scarcityMultiplier: number;
    demandMultiplier: number;
    totalValue: number;
    monthlyYield: number;
  };
}

export function AssetPreview({ file, valuation }: AssetPreviewProps) {
  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
            <FileText className="w-7 h-7 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{file.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-foreground-muted">
                {(file.size / 1024).toFixed(1)} KB
              </span>
              <span className="text-foreground-muted">·</span>
              <div className="flex items-center gap-1 text-xs text-accent">
                <Shield className="w-3 h-3" />
                Encrypted
              </div>
            </div>
          </div>
        </div>

        {/* Valuation Breakdown */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            Asset Valuation
          </h4>
          
          <div className="space-y-2">
            <ValuationRow
              label="Base Value"
              value={formatCurrency(valuation.baseValue)}
              delay={0}
            />
            <ValuationRow
              label="Completeness"
              value={`×${valuation.completenessMultiplier.toFixed(1)}`}
              highlight
              delay={0.1}
            />
            <ValuationRow
              label="Scarcity"
              value={`×${valuation.scarcityMultiplier.toFixed(1)}`}
              highlight
              delay={0.2}
            />
            <ValuationRow
              label="Market Demand"
              value={`×${valuation.demandMultiplier.toFixed(1)}`}
              highlight
              delay={0.3}
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-glass-border my-4" />

          {/* Total Value */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between"
          >
            <span className="text-sm font-medium">Total Asset Value</span>
            <span className="text-2xl font-bold text-gradient-accent">
              {formatCurrency(valuation.totalValue)}
            </span>
          </motion.div>
        </div>

        {/* Monthly Yield */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 rounded-xl bg-accent/5 border border-accent/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-sm">Estimated Monthly Yield</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-lg font-semibold text-accent">
                {formatCurrency(valuation.monthlyYield)}/mo
              </span>
            </div>
          </div>
        </motion.div>

        {/* Data Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <p className="text-xs text-foreground-muted mb-2">Detected data categories:</p>
          <div className="flex flex-wrap gap-2">
            {["Blood Panel", "Metabolic Markers", "Lipid Profile"].map((cat) => (
              <span
                key={cat}
                className="px-2 py-1 rounded-md bg-white/[0.03] text-xs text-foreground-muted"
              >
                {cat}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </GlassCard>
  );
}

function ValuationRow({
  label,
  value,
  highlight,
  delay,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02]"
    >
      <span className="text-sm text-foreground-muted">{label}</span>
      <span
        className={cn(
          "text-sm font-medium",
          highlight && "text-accent"
        )}
      >
        {value}
      </span>
    </motion.div>
  );
}
