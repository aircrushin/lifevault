"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Wallet,
  Globe,
  Moon,
  Shield,
  CreditCard,
  Mail,
  Smartphone,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Profile Information", description: "Update your name and email" },
      { icon: Wallet, label: "Connected Wallets", description: "MetaMask, Coinbase Wallet" },
      { icon: CreditCard, label: "Payment Methods", description: "Manage payout preferences" },
    ],
  },
  {
    title: "Notifications",
    items: [
      { icon: Bell, label: "Push Notifications", description: "Earnings, security alerts" },
      { icon: Mail, label: "Email Preferences", description: "Weekly reports, updates" },
      { icon: Smartphone, label: "SMS Alerts", description: "High-priority security only" },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      { icon: Shield, label: "Data Sharing Defaults", description: "Default consent settings" },
      { icon: Moon, label: "Appearance", description: "Dark mode (always on)" },
      { icon: Globe, label: "Language & Region", description: "English, United States" },
    ],
  },
];

export default function SettingsPage() {
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
          Settings
        </h1>
        <p className="text-foreground-muted">
          Manage your account preferences and application settings.
        </p>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <GlassCard
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl",
                        "bg-white/[0.02] border border-glass-border",
                        "hover:bg-white/[0.04] hover:border-glass-border-hover",
                        "transition-all duration-200 text-left group"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{item.label}</h3>
                          <p className="text-xs text-foreground-muted">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-foreground-muted group-hover:text-foreground transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Account Summary */}
          <GlassCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-2xl font-bold text-background">
                  A
                </div>
                <div>
                  <h3 className="font-semibold">Alex Chen</h3>
                  <p className="text-sm text-foreground-muted">alex@example.com</p>
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Pro Member
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground-muted">Member since</span>
                  <span className="text-sm font-medium">Oct 2025</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground-muted">Data assets</span>
                  <span className="text-sm font-medium">12 files</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground-muted">Active consents</span>
                  <span className="text-sm font-medium">3 active</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Connected Wallet */}
          <GlassCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-6">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-gold" />
                Connected Wallet
              </h3>
              
              <div className="p-4 rounded-xl bg-white/[0.02] border border-glass-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <span className="text-orange-500 text-xs font-bold">MM</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">MetaMask</p>
                    <p className="text-xs text-foreground-muted font-mono">
                      0x7f3a...0a1f
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs text-accent">Connected</span>
                </div>
              </div>

              <button className="w-full mt-4 p-3 rounded-xl border border-dashed border-glass-border text-sm text-foreground-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
                <Wallet className="w-4 h-4" />
                Connect Another Wallet
              </button>
            </div>
          </GlassCard>

          {/* Help & Support */}
          <GlassCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="p-6">
              <h3 className="font-medium mb-4">Help & Support</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-sm">Documentation</span>
                  <ExternalLink className="w-4 h-4 text-foreground-muted" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-sm">Contact Support</span>
                  <ExternalLink className="w-4 h-4 text-foreground-muted" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-sm">Privacy Policy</span>
                  <ExternalLink className="w-4 h-4 text-foreground-muted" />
                </a>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </MainLayout>
  );
}
