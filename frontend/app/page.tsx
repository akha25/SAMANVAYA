"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Apple, Dumbbell, Bot, Users, Trophy, CheckCircle2, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tight text-white">Samanvaya</div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#ai-coach" className="hover:text-white transition-colors">AI Coach</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-300 hover:text-white">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <SparklesIcon className="w-4 h-4" /> The Future of Wellness is Here
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Harmony of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Body, Mind & Soul</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Samanvaya is your all-in-one holistic health platform. Track your diet, log workouts, monitor health metrics, and get guided by your personal AI wellness coach.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg w-full sm:w-auto">
                Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 h-14 px-8 text-lg w-full sm:w-auto">
                View Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Features Overview */}
      <section id="features" className="py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Replace six different apps with one unified platform designed to keep your holistic health in perfect sync.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Smart Diet Tracking", icon: Apple, desc: "Log meals instantly with our Open Food Facts integration and track macros dynamically." },
              { title: "Workout Builder", icon: Dumbbell, desc: "Create custom workout plans, track sets and reps, and monitor your volume history." },
              { title: "Health Metrics", icon: Activity, desc: "Calculate your BMI, BMR, TDEE, and track your body weight trends over time." },
              { title: "AI Coach Aanya", icon: Bot, desc: "Chat with an advanced AI that knows your goals, macros, and preferences." },
              { title: "Community Hub", icon: Users, desc: "Share progress, read expert blogs, and climb the weekly leaderboard." },
              { title: "Gamification", icon: Trophy, desc: "Earn badges, level up, and build streaks by staying consistent with your routines." }
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How it Works */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Samanvaya Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-zinc-800 -z-10"></div>
            {[
              { step: 1, title: "Set Your Goals", desc: "Tell us your body metrics, goals, and diet preferences." },
              { step: 2, title: "Track Daily", desc: "Log your food, water, and workouts with ease." },
              { step: 3, title: "Get Insights", desc: "Review weekly PDF reports and AI feedback to improve." }
            ].map((s) => (
              <div key={s.step} className="text-center bg-zinc-950 p-6">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 outline outline-8 outline-zinc-950">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-zinc-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AI Coach Preview */}
      <section id="ai-coach" className="py-24 bg-blue-600">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 text-white">
              <h2 className="text-4xl font-bold mb-6">Meet Aanya, Your AI Coach</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                Powered by Anthropic's Claude 3.5 Sonnet, Aanya isn't just a generic chatbot. She has full context of your daily calorie intake, remaining macros, and fitness goals to provide highly personalized, actionable advice.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-blue-300"/> Personalized meal suggestions</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-blue-300"/> Dynamic workout planning</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-blue-300"/> Mental wellness check-ins</li>
              </ul>
            </div>
            <div className="lg:w-1/2 w-full max-w-md mx-auto">
              <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-700">
                <div className="p-4 bg-zinc-800 border-b border-zinc-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"><Bot size={20}/></div>
                  <div>
                    <div className="font-bold text-white">Aanya</div>
                    <div className="text-xs text-green-400">Online</div>
                  </div>
                </div>
                <div className="p-6 space-y-4 h-64 flex flex-col justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm self-end max-w-[80%] text-sm">
                    Can you suggest a high-protein dinner? I have 40g of protein and 400 calories left.
                  </div>
                  <div className="bg-zinc-800 text-zinc-100 p-3 rounded-2xl rounded-tl-sm self-start max-w-[90%] text-sm">
                    Absolutely! How about a Grilled Lemon Herb Chicken Breast (200g) with a side of steamed broccoli? That hits exactly 42g of protein and comes in around 350 calories. Perfect for your muscle gain goal! 🥗
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by our Community</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", text: "Samanvaya completely changed how I track my meals. The AI coach is incredibly smart!" },
              { name: "David L.", text: "Having my workouts and diet in one place, along with the weekly PDF reports, keeps me accountable." },
              { name: "Priya K.", text: "The UI is stunning. It actually makes me want to log my habits every single day." }
            ].map((t, i) => (
              <div key={i} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
                <div className="flex gap-1 text-yellow-500 mb-4">
                  <Star fill="currentColor" size={16}/> <Star fill="currentColor" size={16}/> <Star fill="currentColor" size={16}/> <Star fill="currentColor" size={16}/> <Star fill="currentColor" size={16}/>
                </div>
                <p className="text-zinc-300 italic mb-6">"{t.text}"</p>
                <div className="font-bold text-white">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pricing */}
      <section id="pricing" className="py-24 bg-zinc-900 border-y border-zinc-800 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">100% Free to Start.</h2>
          <p className="text-xl text-zinc-400 mb-10">We believe holistic health should be accessible to everyone. Join today and get full access to Diet Tracking, Workout Builder, and AI Coach Aanya.</p>
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-12 text-lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-xl text-white">Samanvaya</div>
          <div className="text-zinc-500 text-sm">© 2026 Samanvaya Health Connect. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="text-zinc-400 hover:text-white">Twitter</a>
            <a href="#" className="text-zinc-400 hover:text-white">Instagram</a>
            <a href="#" className="text-zinc-400 hover:text-white">Support</a>
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
