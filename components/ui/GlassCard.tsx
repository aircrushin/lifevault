"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  glow?: "accent" | "gold" | "none";
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = "none",
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-glass-bg backdrop-blur-xl",
        "border border-glass-border",
        hover && "transition-all duration-300 hover:border-glass-border-hover hover:bg-white/[0.03]",
        glow === "accent" && "glow-accent",
        glow === "gold" && "glow-gold",
        className
      )}
      {...props}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function GlassCardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-b border-glass-border",
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlassCardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
