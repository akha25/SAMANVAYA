"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Apple, Dumbbell, Bot, Users, Trophy, CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 selection:bg-teal-500/30 font-sans transition-colors duration-300">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-50 transition-colors duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
            SAMANVAYA
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a href="#features" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">How it Works</a>
            <a href="#ai-coach" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">AI Coach</a>
            <a href="#pricing" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Pricing</a>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl transition-all">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl shadow-lg shadow-teal-500/20 border-0 transition-transform active:scale-95">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-teal-400/20 to-blue-500/20 dark:from-teal-900/30 dark:to-blue-900/30 rounded-full blur-3xl -z-10 mix-blend-multiply dark:mix-blend-lighten opacity-70 animate-pulse-slow"></div>
        
        <div className="container mx-auto text-center max-w-5xl mt-12 relative z-10">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="flex flex-col items-center">
            
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-8">
              <SparklesIcon className="w-4 h-4" /> The Future of Holistic Wellness
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Harmony of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500">Body, Mind & Soul</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Samanvaya is your premium all-in-one health platform. Track diet, log workouts, and get personalized guidance from an AI wellness coach.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-2xl h-16 px-10 text-lg font-bold shadow-xl shadow-teal-500/30 border-0 transition-transform hover:-translate-y-1 active:scale-95">
                  Start Your Journey <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl h-16 px-10 text-lg font-bold transition-transform hover:-translate-y-1 active:scale-95">
                  View Live Demo
                </Button>
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 2. Features Overview */}
      <section id="features" className="py-32 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-800 dark:text-slate-100">Everything You Need</h2>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">Replace six different apps with one unified, beautifully designed platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Smart Diet Tracking", icon: Apple, color: "from-green-400 to-emerald-500", desc: "Log meals instantly with our Open Food Facts integration and track macros dynamically." },
              { title: "Workout Builder", icon: Dumbbell, color: "from-blue-400 to-indigo-500", desc: "Create custom workout plans, track sets and reps, and monitor your volume history." },
              { title: "Health Metrics", icon: Activity, color: "from-rose-400 to-pink-500", desc: "Calculate your BMI, BMR, TDEE, and track your body weight trends over time." },
              { title: "AI Coach Aanya", icon: Bot, color: "from-purple-400 to-violet-500", desc: "Chat with an advanced AI that knows your goals, macros, and preferences." },
              { title: "Community Hub", icon: Users, color: "from-amber-400 to-orange-500", desc: "Share progress, read expert blogs, and climb the weekly leaderboard." },
              { title: "Gamification", icon: Trophy, color: "from-yellow-400 to-amber-500", desc: "Earn badges, level up, and build streaks by staying consistent with your routines." }
            ].map((f, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                key={i} 
                className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI Coach Preview */}
      <section id="ai-coach" className="py-32 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-600/20 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-sm font-semibold mb-8">
                <Bot className="w-4 h-4" /> Powered by Advanced AI
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Meet Aanya, <br/> Your AI Coach</h2>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 font-medium">
                Aanya isn't just a generic chatbot. She has full context of your daily calorie intake, remaining macros, and fitness goals to provide highly personalized, actionable advice.
              </p>
              <ul className="space-y-6 mb-8 text-lg font-medium text-slate-200">
                <li className="flex items-center gap-4"><div className="p-1 rounded-full bg-teal-500/20 text-teal-400"><CheckCircle2 size={24}/></div> Personalized meal suggestions</li>
                <li className="flex items-center gap-4"><div className="p-1 rounded-full bg-teal-500/20 text-teal-400"><CheckCircle2 size={24}/></div> Dynamic workout planning</li>
                <li className="flex items-center gap-4"><div className="p-1 rounded-full bg-teal-500/20 text-teal-400"><CheckCircle2 size={24}/></div> Mental wellness check-ins</li>
              </ul>
            </div>
            
            <div className="lg:w-1/2 w-full max-w-xl mx-auto perspective-1000">
              <motion.div 
                initial={{ rotateY: 10, rotateX: 5, opacity: 0 }}
                whileInView={{ rotateY: -5, rotateX: 5, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform-gpu"
              >
                <div className="p-4 bg-white/5 border-b border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white shadow-lg"><Bot size={24}/></div>
                  <div>
                    <div className="font-bold text-white text-lg">Aanya</div>
                    <div className="text-xs text-teal-400 font-medium flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span> Online</div>
                  </div>
                </div>
                <div className="p-6 space-y-6 h-80 flex flex-col justify-end bg-black/20">
                  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 rounded-3xl rounded-br-sm self-end max-w-[80%] text-[15px] shadow-lg">
                    Can you suggest a high-protein dinner? I have 40g of protein and 400 calories left.
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="bg-white/10 backdrop-blur-md border border-white/10 text-white p-4 rounded-3xl rounded-bl-sm self-start max-w-[90%] text-[15px] shadow-lg">
                    Absolutely! How about a Grilled Lemon Herb Chicken Breast (200g) with a side of steamed broccoli? That hits exactly 42g of protein and comes in around 350 calories. Perfect for your muscle gain goal! 🥗
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pricing */}
      <section id="pricing" className="py-32 bg-[#F8FAFC] dark:bg-slate-950 text-center transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-4xl relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal-500/10 dark:bg-teal-500/5 blur-3xl -z-10 rounded-full"></div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-slate-800 dark:text-slate-100 tracking-tight">100% Free to Start.</h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-12 font-medium max-w-3xl mx-auto leading-relaxed">
            We believe holistic health should be accessible to everyone. Join today and get full access to Diet Tracking, Workout Builder, and AI Coach Aanya.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white h-16 px-12 text-xl font-bold rounded-2xl shadow-xl shadow-teal-500/30 transition-transform hover:-translate-y-1 border-0">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 tracking-tight">SAMANVAYA</div>
          <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">© 2026 Samanvaya Health Connect. All rights reserved.</div>
          <div className="flex gap-6 font-medium">
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Twitter</a>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Instagram</a>
            <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
    </svg>
  );
}
