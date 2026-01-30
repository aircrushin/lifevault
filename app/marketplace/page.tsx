"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { ResearcherCard } from "@/components/marketplace/ResearcherCard";
import { EarningsDashboard } from "@/components/marketplace/EarningsDashboard";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type AccessFilter = "all" | "granted" | "denied";

// Mock data
const researchers = [
  {
    id: "1",
    name: "Pfizer Research Labs",
    type: "pharma" as const,
    purpose: "Phase III clinical trial for cardiovascular drug efficacy. Seeking diverse genetic profiles and complete blood panel data for AI model training.",
    dataTypes: ["Blood Panel", "ECG Data", "Genetic Markers"],
    earnings: 85,
    earningsType: "monthly" as const,
    duration: "12 months",
    participants: 15420,
    verificationLevel: "verified" as const,
  },
  {
    id: "2",
    name: "Stanford AI Health",
    type: "university" as const,
    purpose: "Developing machine learning models for early disease detection using comprehensive health records and imaging data.",
    dataTypes: ["Medical History", "Lab Results", "Imaging"],
    earnings: 45,
    earningsType: "monthly" as const,
    duration: "6 months",
    participants: 8750,
    verificationLevel: "verified" as const,
  },
  {
    id: "3",
    name: "Genentech Rare Disease",
    type: "research" as const,
    purpose: "Researching rare genetic variants and their phenotypic expressions. Premium rates for rare mutation carriers.",
    dataTypes: ["Full Genome", "Phenotype Data"],
    earnings: 250,
    earningsType: "one-time" as const,
    duration: "One-time",
    participants: 2340,
    verificationLevel: "verified" as const,
  },
  {
    id: "4",
    name: "MIT Longevity Lab",
    type: "university" as const,
    purpose: "Studying biomarkers of aging and longevity. Looking for longitudinal health data spanning multiple years.",
    dataTypes: ["Biomarkers", "Lifestyle Data", "Wearable Data"],
    earnings: 60,
    earningsType: "monthly" as const,
    duration: "24 months",
    participants: 5200,
    verificationLevel: "trusted" as const,
  },
  {
    id: "5",
    name: "Novartis Diabetes Research",
    type: "pharma" as const,
    purpose: "Metabolic research for next-generation diabetes treatments. High demand for glucose monitoring and HbA1c data.",
    dataTypes: ["Glucose Data", "Metabolic Panel", "Diet Logs"],
    earnings: 95,
    earningsType: "monthly" as const,
    duration: "18 months",
    participants: 12800,
    verificationLevel: "verified" as const,
  },
];

const monthlyEarningsData = [
  { month: "Aug", earnings: 120 },
  { month: "Sep", earnings: 145 },
  { month: "Oct", earnings: 180 },
  { month: "Nov", earnings: 165 },
  { month: "Dec", earnings: 210 },
  { month: "Jan", earnings: 245 },
];

const recentPayouts = [
  { date: "Jan 15, 2026", amount: 85, source: "Pfizer Research Labs" },
  { date: "Jan 10, 2026", amount: 45, source: "Stanford AI Health" },
  { date: "Jan 1, 2026", amount: 60, source: "MIT Longevity Lab" },
];

const filters = ["All", "Pharmaceutical", "University", "Research Lab"];

export default function MarketplacePage() {
  const [consents, setConsents] = useState<Record<string, boolean>>({
    "1": true,
    "2": true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [accessFilter, setAccessFilter] = useState<AccessFilter>("all");
  const [showAccessDropdown, setShowAccessDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAccessDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConsentChange = (id: string, enabled: boolean) => {
    setConsents((prev) => ({ ...prev, [id]: enabled }));
  };

  const filteredResearchers = useMemo(() => {
    return researchers.filter((r) => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.purpose.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Pharmaceutical" && r.type === "pharma") ||
        (activeFilter === "University" && r.type === "university") ||
        (activeFilter === "Research Lab" && r.type === "research");
      const matchesAccess =
        accessFilter === "all" ||
        (accessFilter === "granted" && consents[r.id]) ||
        (accessFilter === "denied" && !consents[r.id]);
      return matchesSearch && matchesFilter && matchesAccess;
    });
  }, [searchQuery, activeFilter, accessFilter, consents]);

  const activeConsentsCount = Object.values(consents).filter(Boolean).length;

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
          Data Marketplace
        </h1>
        <p className="text-foreground-muted">
          Grant consent to research institutions and earn passive income from your data.
        </p>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8">
          {/* Search & Filters */}
          <GlassCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 overflow-visible"
          >
            <div className="p-4 overflow-visible">
              <div className="flex flex-col sm:flex-row gap-4 relative">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
                  <input
                    type="text"
                    placeholder="Search institutions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full pl-10 pr-4 py-2.5 rounded-xl",
                      "bg-white/[0.02] border border-glass-border",
                      "text-sm placeholder:text-foreground-muted",
                      "focus:outline-none focus:border-accent/50",
                      "transition-colors"
                    )}
                  />
                </div>

                {/* Filter Toggle */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowAccessDropdown(!showAccessDropdown)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                      "bg-white/[0.02] border border-glass-border",
                      "text-sm text-foreground-muted",
                      "hover:border-glass-border-hover transition-colors",
                      accessFilter !== "all" && "border-accent/50 text-accent"
                    )}
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {accessFilter !== "all" && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs bg-accent/20 rounded">1</span>
                    )}
                  </button>
                  {showAccessDropdown && (
                    <div className={cn(
                      "absolute right-0 top-full mt-2 w-48 z-[100]",
                      "bg-background/95 backdrop-blur-xl border border-glass-border rounded-xl",
                      "shadow-xl overflow-hidden"
                    )}>
                      <div className="p-2">
                        <p className="text-xs text-foreground-muted px-2 py-1.5 font-medium">Access Type</p>
                        {[
                          { value: "all", label: "All" },
                          { value: "granted", label: "Granted" },
                          { value: "denied", label: "Denied" },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setAccessFilter(option.value as AccessFilter);
                              setShowAccessDropdown(false);
                            }}
                            className={cn(
                              "w-full text-left px-2 py-1.5 rounded-lg text-sm transition-colors",
                              accessFilter === option.value
                                ? "bg-accent/20 text-accent"
                                : "text-foreground hover:bg-white/[0.05]"
                            )}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 mt-4">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      activeFilter === filter
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : "bg-white/[0.02] text-foreground-muted border border-glass-border hover:border-glass-border-hover"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-4"
          >
            <p className="text-sm text-foreground-muted">
              Showing {filteredResearchers.length} institutions
            </p>
            <p className="text-sm">
              <span className="text-accent font-medium">{activeConsentsCount}</span>
              <span className="text-foreground-muted"> active consents</span>
            </p>
          </motion.div>

          {/* Researcher Cards */}
          <div className="space-y-4">
            {filteredResearchers.map((researcher, index) => (
              <ResearcherCard
                key={researcher.id}
                researcher={researcher}
                index={index}
                isConsented={consents[researcher.id] || false}
                onConsentChange={handleConsentChange}
              />
            ))}
          </div>
        </div>

        {/* Sidebar - Earnings Dashboard */}
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-8">
            <EarningsDashboard
              totalEarnings={1065}
              pendingPayout={190}
              monthlyData={monthlyEarningsData}
              recentPayouts={recentPayouts}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
