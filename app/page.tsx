"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { TotalEquity } from "@/components/dashboard/TotalEquity";
import { HealthRadar } from "@/components/dashboard/HealthRadar";
import { HealthScore } from "@/components/dashboard/HealthScore";
import { OpportunityCard } from "@/components/dashboard/OpportunityCard";
import { motion } from "framer-motion";

// Mock data
const healthRadarData = [
  { category: "Cardiovascular", value: 85, fullMark: 100 },
  { category: "Metabolism", value: 72, fullMark: 100 },
  { category: "Immunity", value: 90, fullMark: 100 },
  { category: "Genetic Risk", value: 68, fullMark: 100 },
  { category: "Anti-aging", value: 78, fullMark: 100 },
];

const opportunities = [
  {
    id: "1",
    institution: "Pfizer Research Labs",
    type: "pharma" as const,
    purpose: "Cardiovascular drug efficacy study - Phase III",
    earnings: 85,
    period: "monthly" as const,
    dataTypes: ["Blood Panel", "ECG", "Genetics"],
    urgency: "high" as const,
  },
  {
    id: "2",
    institution: "Stanford Medical AI",
    type: "university" as const,
    purpose: "Machine learning model for early disease detection",
    earnings: 45,
    period: "monthly" as const,
    dataTypes: ["Full Checkup", "Medical History"],
    urgency: "medium" as const,
  },
  {
    id: "3",
    institution: "Genentech Bio",
    type: "research" as const,
    purpose: "Rare genetic variant research program",
    earnings: 120,
    period: "one-time" as const,
    dataTypes: ["Genome Sequence"],
    urgency: "high" as const,
  },
];

export default function Dashboard() {
  return (
    <MainLayout>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome back, <span className="text-gradient-accent">Alex</span>
        </h1>
        <p className="text-foreground-muted">
          Your health data vault is secure and generating yield.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Total Equity - Full Width */}
        <div className="col-span-12">
          <TotalEquity
            value={2847.50}
            change={12.5}
            securityLevel="maximum"
          />
        </div>

        {/* Health Radar - Left */}
        <div className="col-span-12 lg:col-span-5">
          <HealthRadar data={healthRadarData} />
        </div>

        {/* Health Score - Right */}
        <div className="col-span-12 lg:col-span-7">
          <HealthScore
            score={742}
            trend={23}
          />
        </div>

        {/* Opportunities - Full Width */}
        <div className="col-span-12">
          <OpportunityCard opportunities={opportunities} />
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 grid grid-cols-3 gap-4"
      >
        <QuickAction
          title="Upload Data"
          description="Add new health records"
          href="/upload"
          gradient="from-accent/20 to-accent/5"
        />
        <QuickAction
          title="Marketplace"
          description="Browse data requests"
          href="/marketplace"
          gradient="from-gold/20 to-gold/5"
        />
        <QuickAction
          title="Security"
          description="Manage encryption keys"
          href="/security"
          gradient="from-info/20 to-info/5"
        />
      </motion.div>
    </MainLayout>
  );
}

function QuickAction({
  title,
  description,
  href,
  gradient,
}: {
  title: string;
  description: string;
  href: string;
  gradient: string;
}) {
  return (
    <a
      href={href}
      className={`
        relative p-5 rounded-2xl overflow-hidden
        bg-gradient-to-br ${gradient}
        border border-glass-border
        hover:border-glass-border-hover
        transition-all duration-300
        group
      `}
    >
      <h3 className="font-medium mb-1 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-sm text-foreground-muted">{description}</p>
      
      {/* Hover arrow */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-5 h-5 text-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  );
}
