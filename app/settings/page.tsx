"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Loader2,
  LogOut,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { signIn } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";

interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  emailVerified: boolean;
  createdAt: string;
}

interface WalletData {
  id: number;
  address: string;
  walletType: string;
  isPrimary: boolean;
  createdAt: string;
}

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingName, setEditingName] = useState("");
  const [editingEmail, setEditingEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchWallets();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile(data.user);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWallets = async () => {
    try {
      const res = await fetch('/api/wallets');
      if (res.ok) {
        const data = await res.json();
        setWallets(data.wallets || []);
      }
    } catch (error) {
      console.error('Failed to fetch wallets:', error);
    }
  };

  const openProfileModal = () => {
    if (profile) {
      setEditingName(profile.name || "");
      setEditingEmail(profile.email);
      setSaveMessage(null);
      setShowProfileModal(true);
    }
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage(null);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingName, email: editingEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setProfile(data.user);
        setSaveMessage({ type: 'success', text: data.message });
        setTimeout(() => {
          setShowProfileModal(false);
        }, 1500);
      } else {
        setSaveMessage({ type: 'error', text: data.error || 'Failed to update profile' });
      }
    } catch (error) {
      setSaveMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutAction();
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
    }
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
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
                      onClick={item.label === "Profile Information" ? openProfileModal : undefined}
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
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-foreground-muted" />
                </div>
              ) : profile ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-2xl font-bold text-background">
                      {getInitials(profile.name, profile.email)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">
                        {profile.name || 'User'}
                      </h3>
                      <p className="text-sm text-foreground-muted truncate">
                        {profile.email}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {profile.emailVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-foreground-muted">Member since</span>
                      <span className="text-sm font-medium">{formatDate(profile.createdAt)}</span>
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

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className={cn(
                      "w-full mt-6 p-3 rounded-xl",
                      "border border-red-500/30 text-red-500",
                      "hover:bg-red-500/10 hover:border-red-500/50",
                      "transition-colors flex items-center justify-center gap-2 text-sm font-medium",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {loggingOut ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Logging out...
                      </>
                    ) : (
                      <>
                        <LogOut className="w-4 h-4" />
                        Logout
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-foreground-muted mb-4">
                    You are not logged in
                  </p>
                  <button
                    onClick={() => signIn()}
                    className={cn(
                      "w-full p-3 rounded-xl",
                      "bg-accent text-background font-medium",
                      "hover:bg-accent-hover",
                      "transition-colors flex items-center justify-center gap-2 text-sm"
                    )}
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </button>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Connected Wallets */}
          <GlassCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-6">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-gold" />
                Connected Wallets
              </h3>

              <div className="space-y-3 mb-4">
                {wallets.length === 0 ? (
                  <p className="text-sm text-foreground-muted text-center py-4">
                    No wallets connected
                  </p>
                ) : (
                  wallets.map((wallet) => (
                    <div
                      key={wallet.id}
                      className="p-4 rounded-xl bg-white/[0.02] border border-glass-border"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <span className="text-orange-500 text-xs font-bold">MM</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">MetaMask</p>
                          <p className="text-xs text-foreground-muted font-mono">
                            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                          </p>
                        </div>
                        {wallet.isPrimary && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 text-gold text-xs">
                            Primary
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        <span className="text-xs text-accent">Connected</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button
                className="w-full p-3 rounded-xl border border-dashed border-glass-border text-sm text-foreground-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                {wallets.length > 0 ? 'Connect Another Wallet' : 'Connect Wallet'}
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

      {/* Profile Edit Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative w-full max-w-md"
              >
                <GlassCard>
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Edit Profile</h2>
                      <button
                        onClick={() => setShowProfileModal(false)}
                        className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={saveProfile} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          placeholder="Enter your name"
                          className={cn(
                            "w-full px-4 py-3 rounded-xl",
                            "bg-white/[0.02] border border-glass-border",
                            "focus:outline-none focus:border-accent",
                            "placeholder:text-foreground-muted/50",
                            "transition-colors"
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editingEmail}
                          onChange={(e) => setEditingEmail(e.target.value)}
                          placeholder="Enter your email"
                          className={cn(
                            "w-full px-4 py-3 rounded-xl",
                            "bg-white/[0.02] border border-glass-border",
                            "focus:outline-none focus:border-accent",
                            "placeholder:text-foreground-muted/50",
                            "transition-colors"
                          )}
                        />
                        <p className="text-xs text-foreground-muted mt-2">
                          Changing email will require verification
                        </p>
                      </div>

                      {saveMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            "p-3 rounded-lg text-sm",
                            saveMessage.type === 'success'
                              ? "bg-accent/10 text-accent"
                              : "bg-red-500/10 text-red-500"
                          )}
                        >
                          {saveMessage.text}
                        </motion.div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowProfileModal(false)}
                          disabled={saving}
                          className={cn(
                            "flex-1 px-4 py-3 rounded-xl",
                            "border border-glass-border",
                            "hover:bg-white/[0.04]",
                            "transition-colors",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className={cn(
                            "flex-1 px-4 py-3 rounded-xl",
                            "bg-accent text-background font-medium",
                            "hover:bg-accent-hover",
                            "transition-colors flex items-center justify-center gap-2",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        >
                          {saving ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
