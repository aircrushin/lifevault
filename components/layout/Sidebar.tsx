"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Upload,
  Store,
  Settings,
  ChevronLeft,
  ChevronRight,
  Lock,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Upload, label: "Upload", href: "/upload" },
  { icon: Store, label: "Marketplace", href: "/marketplace" },
  { icon: Lock, label: "Security", href: "/security" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

function SidebarContent({
  collapsed,
  setCollapsed,
  pathname,
  onNavClick,
  isMobile = false,
}: {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  pathname: string;
  onNavClick?: () => void;
  isMobile?: boolean;
}) {
  return (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-glass-border">
        <Link href="/" className="flex items-center gap-3" onClick={onNavClick}>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo-icon.svg" 
              alt="LifeVault" 
              className="w-10 h-10"
            />
            {/* Pulse indicator */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full pulse-glow" />
          </div>
          {(isMobile || !collapsed) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-lg font-semibold tracking-tight">LifeVault</h1>
              <p className="text-xs text-foreground-muted">Data Swiss Bank</p>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Mobile Close Button */}
      {isMobile && (
        <button
          onClick={onNavClick}
          className={cn(
            "absolute top-4 right-4",
            "w-10 h-10 rounded-xl",
            "bg-white/[0.02] border border-glass-border",
            "flex items-center justify-center",
            "text-foreground-muted hover:text-foreground",
            "transition-colors duration-200"
          )}
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={onNavClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl",
                  "transition-all duration-200",
                  "group relative overflow-hidden",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-foreground-muted hover:text-foreground hover:bg-white/[0.02]"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId={isMobile ? "activeIndicatorMobile" : "activeIndicator"}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full"
                  />
                )}
                
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-accent" : "group-hover:text-accent"
                  )}
                />
                
                {(isMobile || !collapsed) && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Vault Status */}
      {(isMobile || !collapsed) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-4 mx-4 mb-4 rounded-xl bg-accent/5 border border-accent/20"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">Vault Secured</span>
          </div>
          <p className="text-xs text-foreground-muted">
            256-bit encryption active
          </p>
        </motion.div>
      )}

      {/* Collapse Toggle - Desktop only */}
      {!isMobile && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "absolute -right-3 top-1/2 -translate-y-1/2",
            "w-6 h-6 rounded-full",
            "bg-background-secondary border border-glass-border",
            "flex items-center justify-center",
            "text-foreground-muted hover:text-foreground",
            "transition-colors duration-200"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      )}
    </>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className={cn(
          "fixed left-4 top-4 z-50 lg:hidden",
          "w-12 h-12 rounded-xl",
          "bg-background-secondary/80 backdrop-blur-xl",
          "border border-glass-border",
          "flex items-center justify-center",
          "text-foreground-muted hover:text-foreground",
          "transition-colors duration-200"
        )}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                "fixed left-0 top-0 h-screen z-50 lg:hidden",
                "w-72",
                "bg-background-secondary/95 backdrop-blur-xl",
                "border-r border-glass-border",
                "flex flex-col"
              )}
            >
              <SidebarContent
                collapsed={false}
                setCollapsed={setCollapsed}
                pathname={pathname}
                onNavClick={() => setMobileOpen(false)}
                isMobile={true}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed left-0 top-0 h-screen z-50",
          "bg-background-secondary/80 backdrop-blur-xl",
          "border-r border-glass-border",
          "flex-col",
          "transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          "hidden lg:flex"
        )}
      >
        <SidebarContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          pathname={pathname}
        />
      </motion.aside>
    </>
  );
}
