"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import {
  Shield,
  Key,
  Fingerprint,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Lock,
  Smartphone,
  History,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const securityFeatures = [
  {
    icon: Key,
    title: "Encryption Key",
    description: "Your unique 256-bit AES encryption key",
    status: "active",
  },
  {
    icon: Fingerprint,
    title: "Biometric Auth",
    description: "Face ID / Touch ID authentication",
    status: "enabled",
  },
  {
    icon: Smartphone,
    title: "2FA Authentication",
    description: "Two-factor authentication via authenticator app",
    status: "enabled",
  },
  {
    icon: History,
    title: "Access Logs",
    description: "Complete history of data access events",
    status: "12 events",
  },
];

const accessLogs = [
  {
    id: 1,
    event: "Data accessed by Pfizer Research Labs",
    timestamp: "2026-01-28 14:32:00",
    type: "read",
  },
  {
    id: 2,
    event: "New encryption key generated",
    timestamp: "2026-01-25 09:15:00",
    type: "security",
  },
  {
    id: 3,
    event: "Data accessed by Stanford AI Health",
    timestamp: "2026-01-22 11:45:00",
    type: "read",
  },
  {
    id: 4,
    event: "Consent granted to MIT Longevity Lab",
    timestamp: "2026-01-20 16:20:00",
    type: "consent",
  },
];

export default function SecurityPage() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const mockKey = "0x7f3a9c2e1d4b5a6f8e9c0d1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f";

  const handleCopy = () => {
    navigator.clipboard.writeText(mockKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          Security Center
        </h1>
        <p className="text-foreground-muted">
          Manage your encryption keys, authentication, and access controls.
        </p>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Security Status */}
          <GlassCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center glow-accent">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Vault Status: Secured</h2>
                  <p className="text-sm text-foreground-muted">
                    All security measures are active and up to date
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-glass-border"
                  >
                    <feature.icon className="w-5 h-5 text-accent mb-2" />
                    <h3 className="text-sm font-medium mb-1">{feature.title}</h3>
                    <p className="text-xs text-accent">{feature.status}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Encryption Key */}
          <GlassCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-gold" />
                  <h3 className="font-medium">Private Encryption Key</h3>
                </div>
                <span className="px-2 py-1 rounded-full bg-danger/10 text-danger text-xs flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Never share this key
                </span>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-glass-border font-mono text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="truncate text-foreground-muted">
                    {showKey ? mockKey : "••••••••••••••••••••••••••••••••••••••••••••••••"}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                    >
                      {showKey ? (
                        <EyeOff className="w-4 h-4 text-foreground-muted" />
                      ) : (
                        <Eye className="w-4 h-4 text-foreground-muted" />
                      )}
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                    >
                      <Copy className={cn(
                        "w-4 h-4 transition-colors",
                        copied ? "text-accent" : "text-foreground-muted"
                      )} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-glass-border text-sm hover:border-glass-border-hover transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  Regenerate Key
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.02] border border-glass-border text-sm hover:border-glass-border-hover transition-colors">
                  <Lock className="w-4 h-4" />
                  Export Backup
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Access Logs */}
          <GlassCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-5 h-5 text-foreground-muted" />
                  <h3 className="font-medium">Recent Access Logs</h3>
                </div>
                <button className="text-xs text-accent hover:text-accent/80 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {accessLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        log.type === "read" && "bg-info",
                        log.type === "security" && "bg-warning",
                        log.type === "consent" && "bg-accent"
                      )} />
                      <span className="text-sm">{log.event}</span>
                    </div>
                    <span className="text-xs text-foreground-muted font-mono">
                      {log.timestamp}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Security Score */}
          <GlassCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 45}
                    initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 45 * 0.05 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">95%</span>
                </div>
              </div>
              <h3 className="font-medium mb-1">Security Score</h3>
              <p className="text-xs text-foreground-muted">Excellent protection level</p>
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-6">
              <h3 className="font-medium mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full p-3 rounded-xl bg-white/[0.02] border border-glass-border text-sm text-left hover:border-glass-border-hover transition-colors flex items-center gap-3">
                  <Lock className="w-4 h-4 text-accent" />
                  Lock Vault
                </button>
                <button className="w-full p-3 rounded-xl bg-white/[0.02] border border-glass-border text-sm text-left hover:border-glass-border-hover transition-colors flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-gold" />
                  Rotate Keys
                </button>
                <button className="w-full p-3 rounded-xl bg-danger/10 border border-danger/20 text-sm text-left hover:bg-danger/20 transition-colors flex items-center gap-3 text-danger">
                  <AlertTriangle className="w-4 h-4" />
                  Emergency Wipe
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </MainLayout>
  );
}
