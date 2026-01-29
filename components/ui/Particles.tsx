"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
}

interface ParticlesProps {
  active: boolean;
  count?: number;
  colors?: string[];
  originX?: number;
  originY?: number;
}

export function Particles({
  active,
  count = 30,
  colors = ["#10b981", "#14b8a6", "#fbbf24", "#22c55e"],
  originX = 50,
  originY = 50,
}: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (active) {
      const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: originX,
        y: originY,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20 - 5,
        },
      }));
      setParticles(newParticles);

      // Clear particles after animation
      const timer = setTimeout(() => {
        setParticles([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [active, count, colors, originX, originY]);

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[100]"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: `calc(${particle.x}% + ${particle.velocity.x * 20}px)`,
            y: `calc(${particle.y}% + ${particle.velocity.y * 20}px)`,
            scale: 0,
            opacity: 0,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size}px ${particle.color}`,
            }}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// Success burst animation
export function SuccessBurst({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Central burst */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-32 h-32 rounded-full bg-accent/30"
          />
          
          {/* Radiating rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              className="absolute w-20 h-20 rounded-full border-2 border-accent"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
