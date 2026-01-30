"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { DropZone } from "@/components/upload/DropZone";
import { EncryptionAnimation } from "@/components/upload/EncryptionAnimation";
import { AssetPreview } from "@/components/upload/AssetPreview";
import { UploadHistory } from "@/components/upload/UploadHistory";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Lock, Eye } from "lucide-react";
import { useState, useCallback } from "react";
import { sleep } from "@/lib/utils";

type Stage = "idle" | "scanning" | "encrypting" | "valuating" | "vaulted";

const features = [
  {
    icon: Lock,
    title: "Local Encryption",
    description: "Files are encrypted in your browser before upload",
  },
  {
    icon: Shield,
    title: "Zero Knowledge",
    description: "We never see your unencrypted data",
  },
  {
    icon: Zap,
    title: "Instant Valuation",
    description: "AI-powered asset pricing in seconds",
  },
  {
    icon: Eye,
    title: "Full Control",
    description: "You decide who can access your data",
  },
];

const mockValuation = {
  baseValue: 50,
  completenessMultiplier: 1.4,
  scarcityMultiplier: 1.2,
  demandMultiplier: 1.8,
  totalValue: 151.2,
  monthlyYield: 12.5,
};

export default function UploadPage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [historyKey, setHistoryKey] = useState(0);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    setCurrentFile(file);
    setShowPreview(false);

    // Simulate encryption process
    setStage("scanning");
    await sleep(1500);

    setStage("encrypting");
    await sleep(2500);

    setStage("valuating");
    await sleep(1500);

    setStage("vaulted");
    await sleep(1500);

    setShowPreview(true);

    try {
      await fetch("/api/uploads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type || "application/octet-stream",
          encryptionHash: `sha256-${Math.random().toString(36).substring(2)}`,
          baseValue: mockValuation.baseValue,
          totalValue: mockValuation.totalValue,
          monthlyYield: mockValuation.monthlyYield,
          completenessMultiplier: mockValuation.completenessMultiplier,
          scarcityMultiplier: mockValuation.scarcityMultiplier,
          demandMultiplier: mockValuation.demandMultiplier,
        }),
      });
      setHistoryKey((k) => k + 1);
    } catch (error) {
      console.error("Failed to save upload record:", error);
    }
  }, []);

  const handleComplete = useCallback(() => {
    setStage("idle");
  }, []);

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
          Upload Center
        </h1>
        <p className="text-foreground-muted">
          Deposit your health data into the vault. All files are encrypted locally.
        </p>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Upload Area */}
        <div className="col-span-12 lg:col-span-8">
          <AnimatePresence mode="wait">
            {stage === "idle" ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <DropZone
                  onFilesSelected={handleFilesSelected}
                  disabled={stage !== "idle"}
                />
              </motion.div>
            ) : (
              <motion.div
                key="encryption"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <EncryptionAnimation
                  stage={stage}
                  fileName={currentFile?.name}
                  onComplete={handleComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Asset Preview */}
          <AnimatePresence>
            {showPreview && currentFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-6"
              >
                <AssetPreview
                  file={{
                    name: currentFile.name,
                    size: currentFile.size,
                    type: currentFile.type,
                  }}
                  valuation={mockValuation}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Upload History */}
          <UploadHistory key={historyKey} />

          {/* Security Features */}
          <GlassCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6">
              <h3 className="text-sm font-medium mb-4">Security Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{feature.title}</h4>
                      <p className="text-xs text-foreground-muted">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Supported Formats */}
          <GlassCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-6">
              <h3 className="text-sm font-medium mb-4">Supported Formats</h3>
              <div className="space-y-2">
                <FormatItem
                  format="PDF"
                  description="Medical reports, lab results"
                />
                <FormatItem
                  format="JPG/PNG"
                  description="Scanned documents, images"
                />
                <FormatItem
                  format="VCF"
                  description="Genetic variant data"
                />
                <FormatItem
                  format="FASTQ"
                  description="Raw sequencing data"
                />
              </div>
            </div>
          </GlassCard>

          {/* Tips */}
          <GlassCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="p-6">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-xs text-foreground-muted">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Upload complete reports for higher valuations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Genetic data has the highest earning potential
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  Recent data (less than 6 months) is more valuable
                </li>
              </ul>
            </div>
          </GlassCard>
        </div>
      </div>
    </MainLayout>
  );
}

function FormatItem({
  format,
  description,
}: {
  format: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-white/[0.02]">
      <span className="text-sm font-medium">{format}</span>
      <span className="text-xs text-foreground-muted">{description}</span>
    </div>
  );
}
