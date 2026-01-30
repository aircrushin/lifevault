"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { History, FileText, Trash2, Clock, DollarSign, TrendingUp, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

interface UploadRecord {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  status: string;
  baseValue: string | null;
  totalValue: string | null;
  monthlyYield: string | null;
  completenessMultiplier: string | null;
  scarcityMultiplier: string | null;
  demandMultiplier: string | null;
  createdAt: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getFileIcon(fileType: string): string {
  if (fileType.includes("pdf")) return "📄";
  if (fileType.includes("image")) return "🖼️";
  if (fileType.includes("vcf") || fileType.includes("fastq")) return "🧬";
  return "📁";
}

export function UploadHistory() {
  const [uploads, setUploads] = useState<UploadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchUploads = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/uploads");
      if (!response.ok) {
        if (response.status === 401) {
          setError("Please log in to view upload history");
          return;
        }
        throw new Error("Failed to fetch uploads");
      }
      const data = await response.json();
      setUploads(data.uploads || []);
    } catch {
      setError("Failed to load upload history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this upload record?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/uploads/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setUploads((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Failed to delete upload record");
    } finally {
      setDeletingId(null);
    }
  };

  const totalValue = uploads.reduce(
    (sum, u) => sum + (parseFloat(u.totalValue || "0") || 0),
    0
  );
  const totalMonthlyYield = uploads.reduce(
    (sum, u) => sum + (parseFloat(u.monthlyYield || "0") || 0),
    0
  );

  return (
    <GlassCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="p-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-sm font-medium flex items-center gap-2">
            <History className="w-4 h-4 text-accent" />
            Upload History
            {uploads.length > 0 && (
              <span className="text-xs text-foreground-muted">
                ({uploads.length})
              </span>
            )}
          </h3>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-foreground-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-foreground-muted" />
          )}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 py-4 text-sm text-foreground-muted">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              ) : uploads.length === 0 ? (
                <div className="text-center py-8 text-foreground-muted text-sm">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No uploads yet
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-lg bg-white/[0.02]">
                    <div>
                      <p className="text-xs text-foreground-muted">Total Value</p>
                      <p className="text-lg font-semibold text-accent">
                        {formatCurrency(totalValue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground-muted">Monthly Yield</p>
                      <p className="text-lg font-semibold text-gold">
                        {formatCurrency(totalMonthlyYield)}/mo
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {uploads.map((upload, index) => (
                      <motion.div
                        key={upload.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "flex items-start gap-3 p-3 rounded-lg",
                          "bg-white/[0.02] hover:bg-white/[0.04] transition-colors",
                          "group"
                        )}
                      >
                        <span className="text-xl">{getFileIcon(upload.fileType)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" title={upload.fileName}>
                            {upload.fileName}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-foreground-muted">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(upload.createdAt)}
                            </span>
                            <span>{formatFileSize(upload.fileSize)}</span>
                          </div>
                          {upload.totalValue && (
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-accent flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {formatCurrency(parseFloat(upload.totalValue))}
                              </span>
                              {upload.monthlyYield && (
                                <span className="text-xs text-gold flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  {formatCurrency(parseFloat(upload.monthlyYield))}/mo
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDelete(upload.id)}
                          disabled={deletingId === upload.id}
                          className={cn(
                            "p-1.5 rounded-lg opacity-0 group-hover:opacity-100",
                            "text-foreground-muted hover:text-red-400 hover:bg-red-400/10",
                            "transition-all",
                            deletingId === upload.id && "opacity-50"
                          )}
                        >
                          {deletingId === upload.id ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
