"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Sparkles, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type Stage = "idle" | "scanning" | "encrypting" | "valuating" | "vaulted";

interface EncryptionAnimationProps {
  stage: Stage;
  fileName?: string;
  onComplete?: () => void;
}

const stages = [
  { id: "scanning", label: "Scanning Data", icon: Loader2 },
  { id: "encrypting", label: "Encrypting Locally", icon: Lock },
  { id: "valuating", label: "Calculating Value", icon: Sparkles },
  { id: "vaulted", label: "Asset Vaulted", icon: Check },
];

// Binary characters for the matrix effect
const binaryChars = "01";

function BinaryRain() {
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    setColumns(Array.from({ length: 30 }, () => Math.random()));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {columns.map((offset, i) => (
        <motion.div
          key={i}
          className="absolute top-0 font-mono text-xs text-accent/30"
          style={{ left: `${(i / columns.length) * 100}%` }}
          initial={{ y: "-100%" }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: offset * 2,
            ease: "linear",
          }}
        >
          {Array.from({ length: 20 }, () =>
            binaryChars[Math.floor(Math.random() * binaryChars.length)]
          ).join("\n")}
        </motion.div>
      ))}
    </div>
  );
}

function ScannerEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Horizontal scanner */}
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ top: 0, opacity: 0 }}
        animate={{
          top: ["0%", "100%", "0%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {/* Vertical scanner */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-accent to-transparent"
        initial={{ left: 0, opacity: 0 }}
        animate={{
          left: ["0%", "100%", "0%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

function LockAnimation() {
  return (
    <motion.div
      className="relative w-24 h-24"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-accent/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-accent/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Center lock */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Lock className="w-6 h-6 text-accent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function EncryptionAnimation({
  stage,
  fileName,
  onComplete,
}: EncryptionAnimationProps) {
  const currentStageIndex = stages.findIndex((s) => s.id === stage);

  useEffect(() => {
    if (stage === "vaulted" && onComplete) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [stage, onComplete]);

  if (stage === "idle") return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative rounded-2xl overflow-hidden bg-background-secondary/80 backdrop-blur-xl border border-glass-border"
    >
      {/* Background Effects */}
      <AnimatePresence mode="wait">
        {stage === "scanning" && (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScannerEffect />
          </motion.div>
        )}
        {stage === "encrypting" && (
          <motion.div
            key="binary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BinaryRain />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Central Animation */}
        <div className="flex justify-center mb-8">
          <AnimatePresence mode="wait">
            {stage === "encrypting" ? (
              <motion.div
                key="lock"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <LockAnimation />
              </motion.div>
            ) : stage === "vaulted" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center glow-accent"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Shield className="w-10 h-10 text-accent" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-10 h-10 text-accent" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* File Name */}
        {fileName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-foreground-muted mb-6"
          >
            {fileName}
          </motion.p>
        )}

        {/* Stage Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {stages.map((s, index) => {
            const isActive = s.id === stage;
            const isCompleted = index < currentStageIndex;
            const Icon = s.icon;

            return (
              <motion.div
                key={s.id}
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    isActive && "bg-accent/20 text-accent",
                    isCompleted && "text-accent",
                    !isActive && !isCompleted && "text-foreground-muted"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5",
                      isActive && "animate-spin"
                    )}
                  />
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={cn(
                      "w-8 h-px mx-1",
                      index < currentStageIndex ? "bg-accent" : "bg-glass-border"
                    )}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 rounded-full bg-glass-border overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStageIndex + 1) / stages.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Status Message */}
        <motion.p
          key={stage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm mt-4"
        >
          {stage === "scanning" && "Analyzing document structure..."}
          {stage === "encrypting" && "Applying 256-bit AES encryption..."}
          {stage === "valuating" && "Calculating data asset value..."}
          {stage === "vaulted" && (
            <span className="text-accent font-medium">
              Asset successfully deposited into vault!
            </span>
          )}
        </motion.p>
      </div>
    </motion.div>
  );
}
