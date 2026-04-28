"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Target, Activity, Apple, Scale } from "lucide-react";
import { toast } from "react-hot-toast";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // Form State
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [dietType, setDietType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          age: Number(age),
          gender,
          height: Number(height),
          weight: Number(weight),
          goal,
          activityLevel,
          dietType,
        }),
      });

      if (res.ok) {
        toast.success("Profile setup complete!");
        router.push("/dashboard");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to complete onboarding");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Personal Details", icon: Scale },
    { title: "Body Metrics", icon: Activity },
    { title: "Fitness Goals", icon: Target },
    { title: "Diet Preferences", icon: Apple },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] dark:bg-slate-950 p-4 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Progress Bar */}
        <div className="mb-8 px-4">
          <div className="flex justify-between mb-2">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = step >= i + 1;
              return (
                <div key={i} className={`flex flex-col items-center gap-2 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-600'} transition-colors duration-500`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm ${isActive ? 'bg-gradient-to-tr from-teal-400 to-blue-500 text-white shadow-teal-500/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    {step > i + 1 ? <Check size={18} /> : <Icon size={18} />}
                  </div>
                  <span className="text-xs font-semibold hidden sm:block">{s.title}</span>
                </div>
              );
            })}
          </div>
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-teal-400 to-blue-500"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            ></motion.div>
          </div>
        </div>

        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 to-blue-500"></div>
          
          <CardHeader className="pb-4 pt-8 px-8 text-center sm:text-left">
            <motion.h2 
              key={`title-${step}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white"
            >
              {steps[step - 1].title}
            </motion.h2>
            <motion.p 
              key={`desc-${step}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 font-medium"
            >
              Help us customize your holistic health journey.
            </motion.p>
          </CardHeader>
          
          <CardContent className="px-8 pb-8 pt-4 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <Label className="text-slate-700 dark:text-slate-300 font-semibold ml-1">Age</Label>
                      <Input 
                        type="number" 
                        placeholder="e.g. 28" 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)} 
                        className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 text-lg px-4" 
                      />
                    </div>
                    <div className="space-y-2 group">
                      <Label className="text-slate-700 dark:text-slate-300 font-semibold ml-1">Gender</Label>
                      <Select onValueChange={(val) => setGender(val || "")} value={gender}>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 text-lg px-4">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700 shadow-xl">
                          <SelectItem value="male" className="py-3">Male</SelectItem>
                          <SelectItem value="female" className="py-3">Female</SelectItem>
                          <SelectItem value="other" className="py-3">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <Label className="text-slate-700 dark:text-slate-300 font-semibold ml-1">Height (cm)</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          placeholder="e.g. 175" 
                          value={height} 
                          onChange={(e) => setHeight(e.target.value)} 
                          className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 text-lg px-4 pr-12" 
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">cm</span>
                      </div>
                    </div>
                    <div className="space-y-2 group">
                      <Label className="text-slate-700 dark:text-slate-300 font-semibold ml-1">Weight (kg)</Label>
                      <div className="relative">
                        <Input 
                          type="number" 
                          placeholder="e.g. 70" 
                          value={weight} 
                          onChange={(e) => setWeight(e.target.value)} 
                          className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 text-lg px-4 pr-12" 
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">kg</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2 group">
                      <Label className="text-slate-700 dark:text-slate-300 font-semibold ml-1">What is your primary goal?</Label>
                      <Select onValueChange={(val) => setGoal(val || "")} value={goal}>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 text-lg px-4">
                          <SelectValue placeholder="Select a goal" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700 shadow-xl">
                          <SelectItem value="lose weight" className="py-3">🔥 Lose Weight</SelectItem>
                          <SelectItem value="gain muscle" className="py-3">💪 Gain Muscle</SelectItem>
                          <SelectItem value="stay fit" className="py-3">🏃‍♂️ Maintain Fitness</SelectItem>
                          <SelectItem value="improve wellness" className="py-3">🧘‍♀️ Holistic Wellness</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 group">
                      <Label className="text-slate-700 dark:text-slate-300 font-semibold ml-1">Current Activity Level</Label>
                      <Select onValueChange={(val) => setActivityLevel(val || "")} value={activityLevel}>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 text-lg px-4">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700 shadow-xl">
                          <SelectItem value="sedentary" className="py-3">Sedentary (Desk job, little exercise)</SelectItem>
                          <SelectItem value="lightly active" className="py-3">Lightly Active (1-3 days/week)</SelectItem>
                          <SelectItem value="very active" className="py-3">Very Active (4-5 days/week)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2 group">
                      <Label className="text-slate-700 dark:text-slate-300 font-semibold ml-1">Dietary Preference</Label>
                      <Select onValueChange={(val) => setDietType(val || "")} value={dietType}>
                        <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 text-lg px-4">
                          <SelectValue placeholder="Select diet type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700 shadow-xl">
                          <SelectItem value="non-veg" className="py-3">🥩 Standard (Omnivore)</SelectItem>
                          <SelectItem value="vegetarian" className="py-3">🥗 Vegetarian</SelectItem>
                          <SelectItem value="vegan" className="py-3">🌱 Vegan</SelectItem>
                          <SelectItem value="keto" className="py-3">🥑 Keto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 p-5 rounded-2xl">
                      <h4 className="font-bold text-teal-800 dark:text-teal-300 mb-2">Almost there!</h4>
                      <p className="text-teal-600 dark:text-teal-400 text-sm font-medium">
                        Based on your profile, our AI Coach Aanya will curate a personalized macro and fitness plan just for you.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t border-slate-100 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900/50">
            <Button 
              variant="outline" 
              onClick={handlePrev} 
              disabled={step === 1} 
              className="border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 h-12 px-6 rounded-xl hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50"
            >
              <ArrowLeft size={18} className="mr-2" /> Back
            </Button>
            
            {step < 4 ? (
              <Button 
                onClick={handleNext} 
                className="bg-slate-800 dark:bg-white hover:bg-slate-700 dark:hover:bg-slate-200 text-white dark:text-slate-900 h-12 px-8 rounded-xl font-bold shadow-md transition-all"
              >
                Next Step <ArrowRight size={18} className="ml-2" />
              </Button>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleSubmit} 
                  disabled={loading}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white h-12 px-8 rounded-xl font-bold shadow-lg shadow-teal-500/30 border-0 transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Complete Setup"} <Check size={18} className="ml-2" />
                </Button>
              </motion.div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
