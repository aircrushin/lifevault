"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { GlassCard, GlassCardContent, GlassCardHeader } from "@/components/ui/GlassCard";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const errorParam = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      {verified && (
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-4">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-emerald-400 text-sm">Email verified! You can now sign in.</span>
        </div>
      )}

      {(error || errorParam) && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-4">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-400 text-sm">{error || "Authentication failed"}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <p className="text-center text-gray-400 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="text-emerald-400 hover:underline">
          Sign up
        </Link>
      </p>
    </>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <GlassCard>
          <GlassCardHeader>
            <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
            <p className="text-gray-400 text-center mt-2">
              Sign in to your LifeVault account
            </p>
          </GlassCardHeader>
          <GlassCardContent>
            <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
              <SignInForm />
            </Suspense>
          </GlassCardContent>
        </GlassCard>
      </motion.div>
    </div>
  );
}
