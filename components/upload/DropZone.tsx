"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Image, Dna, X } from "lucide-react";
import { useCallback, useState } from "react";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

const acceptedTypes = {
  "application/pdf": { icon: FileText, label: "PDF" },
  "image/jpeg": { icon: Image, label: "JPG" },
  "image/png": { icon: Image, label: "PNG" },
  ".vcf": { icon: Dna, label: "VCF" },
  ".fastq": { icon: Dna, label: "FASTQ" },
};

export function DropZone({ onFilesSelected, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    onFilesSelected(files);
  }, [onFilesSelected, disabled]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    onFilesSelected(files);
  }, [onFilesSelected, disabled]);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-300",
          "min-h-[300px] flex flex-col items-center justify-center",
          isDragging
            ? "border-accent bg-accent/5 scale-[1.02]"
            : "border-glass-border hover:border-glass-border-hover",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Animated Background */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl overflow-hidden"
            >
              {/* Scanning lines */}
              <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                    initial={{ top: "0%", opacity: 0 }}
                    animate={{
                      top: ["0%", "100%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.vcf,.fastq"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
          disabled={disabled}
        />

        <motion.div
          animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
            "bg-accent/10 border border-accent/20",
            isDragging && "glow-accent"
          )}
        >
          <Upload className={cn(
            "w-7 h-7 transition-colors",
            isDragging ? "text-accent" : "text-foreground-muted"
          )} />
        </motion.div>

        <h3 className="text-lg font-medium mb-2">
          {isDragging ? "Release to encrypt" : "Deposit your health data"}
        </h3>
        <p className="text-sm text-foreground-muted mb-4">
          Drag & drop files or click to browse
        </p>

        {/* Accepted Formats */}
        <div className="flex items-center gap-3">
          {Object.entries(acceptedTypes).slice(0, 4).map(([type, config]) => (
            <div
              key={type}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] text-xs text-foreground-muted"
            >
              <config.icon className="w-3 h-3" />
              {config.label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Selected Files */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <p className="text-sm font-medium text-foreground-muted">
              Selected files ({selectedFiles.length})
            </p>
            {selectedFiles.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl",
                  "bg-white/[0.02] border border-glass-border"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-foreground-muted">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
                >
                  <X className="w-4 h-4 text-foreground-muted" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
