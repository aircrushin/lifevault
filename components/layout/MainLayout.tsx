"use client";

import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      
      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="ml-0 lg:ml-64 min-h-screen"
      >
        {/* Top gradient fade */}
        <div className="fixed top-0 left-0 lg:left-64 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-40" />
        
        {/* Content */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
