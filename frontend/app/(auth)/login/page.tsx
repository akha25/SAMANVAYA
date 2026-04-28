"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Loader2, Dumbbell, Apple, HeartPulse } from "lucide-react";

import api from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      if (res.data.isOnboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-300">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 mb-8">
              <Activity className="text-teal-500" /> SAMANVAYA
            </Link>
            <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-3">Welcome back</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Enter your credentials to access your account</p>
          </div>

          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 to-blue-500"></div>
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2 group">
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold ml-1">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all px-4 text-base dark:text-white"
                  />
                </div>
                <div className="space-y-2 group">
                  <div className="flex items-center justify-between ml-1">
                    <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-semibold">Password</Label>
                    <a href="#" className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">Forgot password?</a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all px-4 text-base dark:text-white"
                  />
                </div>
                
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl text-center">
                    {error}
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                  <Button type="submit" disabled={loading} className="w-full h-14 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-teal-500/30 border-0 transition-all">
                    {loading ? <Loader2 className="animate-spin mr-2" /> : "Sign in to Dashboard"}
                  </Button>
                </motion.div>
              </form>

              <div className="mt-8 flex items-center justify-between">
                <span className="w-1/4 border-b border-slate-200 dark:border-slate-800"></span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">or continue with</span>
                <span className="w-1/4 border-b border-slate-200 dark:border-slate-800"></span>
              </div>
              
              <Button variant="outline" className="w-full mt-8 h-14 rounded-2xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold bg-white dark:bg-slate-900">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
            </CardContent>
            <CardFooter className="justify-center border-t border-slate-100 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900/50">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-teal-600 dark:text-teal-400 font-bold hover:underline">
                  Sign up for free
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Right Column - Graphic */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900 justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-600/20 mix-blend-overlay z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        {/* Floating Icons */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-teal-300 shadow-2xl z-20">
          <Dumbbell size={36} />
        </motion.div>
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }} className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-rose-300 shadow-2xl z-20">
          <HeartPulse size={44} />
        </motion.div>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 2 }} className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-emerald-300 shadow-2xl z-20 transform rotate-12">
          <Apple size={30} />
        </motion.div>

        <div className="relative z-20 text-center px-12 max-w-xl">
          <h2 className="text-5xl font-extrabold text-white mb-6 leading-tight">Your Health,<br/>Perfectly Synced.</h2>
          <p className="text-xl text-teal-100/80 font-medium leading-relaxed">
            Join thousands of users who have transformed their lives with our AI-powered holistic wellness platform.
          </p>
        </div>
      </div>
    </div>
  );
}
