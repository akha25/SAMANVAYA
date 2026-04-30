"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Scale, Flame, Activity, Save, TrendingUp } from "lucide-react";
import { toast } from "react-hot-toast";

export default function BMIPage() {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  
  // Calculate BMI
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  let category = "Normal";
  let color = "text-emerald-500";
  let bgGradient = "from-emerald-400 to-teal-500";
  let shadowColor = "shadow-emerald-500/30";
  
  if (bmi < 18.5) { 
    category = "Underweight"; 
    color = "text-amber-500"; 
    bgGradient = "from-amber-400 to-orange-500";
    shadowColor = "shadow-amber-500/30";
  } else if (bmi >= 25 && bmi < 30) { 
    category = "Overweight"; 
    color = "text-orange-500"; 
    bgGradient = "from-orange-400 to-red-500";
    shadowColor = "shadow-orange-500/30";
  } else if (bmi >= 30) { 
    category = "Obese"; 
    color = "text-red-500"; 
    bgGradient = "from-red-500 to-rose-600";
    shadowColor = "shadow-red-500/30";
  }

  // Calculate Ideal Weight
  const idealWeightMin = (18.5 * heightM * heightM).toFixed(1);
  const idealWeightMax = (24.9 * heightM * heightM).toFixed(1);

  // Calculate BMR (Mifflin-St Jeor)
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  bmr = gender === "male" ? bmr + 5 : bmr - 161;

  const tdeeSedentary = bmr * 1.2;

  const handleLogMetrics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${API_URL}/health/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          weight,
          bmi,
          bodyFatPercent: 15, // placeholder
          waistCm: 80 // placeholder
        })
      });
      toast.success("Health metrics logged successfully!");
    } catch (err) {
      toast.error("Failed to log metrics");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg text-white">
            <Scale size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Body Metrics</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Calculate and track your vital health statistics</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={() => window.location.href='/dashboard/reports'} variant="outline" className="h-12 px-6 rounded-xl font-bold border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-sm">
            <TrendingUp size={18} className="mr-2" /> View Reports
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BMI Calculator */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] flex-1 overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${bgGradient} transition-all duration-500`}></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">BMI Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Height (cm)</label>
                  <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-cyan-500 font-semibold text-xl text-center" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Weight (kg)</label>
                  <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-cyan-500 font-semibold text-xl text-center" />
                </div>
              </div>
              
              <div className="pt-8 pb-4 flex flex-col items-center relative">
                <div className={`absolute inset-0 bg-gradient-to-b ${bgGradient} opacity-5 blur-2xl rounded-full`}></div>
                <motion.div 
                  key={bmi} 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  className={`text-7xl font-extrabold ${color} tracking-tighter drop-shadow-sm transition-colors duration-500`}
                >
                  {bmi.toFixed(1)}
                </motion.div>
                <div className="text-xl font-bold mt-2 text-slate-700 dark:text-slate-200 uppercase tracking-widest">{category}</div>
                <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                  <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Ideal Range:</span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{idealWeightMin}kg - {idealWeightMax}kg</span>
                </div>
              </div>
              
              {/* BMI Gauge */}
              <div className="space-y-2 pt-4">
                <div className="flex justify-between text-xs font-bold text-slate-400 dark:text-slate-500 mb-1 px-1">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
                <div className="relative w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="absolute top-0 h-full bg-amber-400" style={{ left: '0%', width: '18.5%' }}></div>
                  <div className="absolute top-0 h-full bg-emerald-400" style={{ left: '18.5%', width: '31.5%' }}></div>
                  <div className="absolute top-0 h-full bg-orange-400" style={{ left: '50%', width: '25%' }}></div>
                  <div className="absolute top-0 h-full bg-red-500" style={{ left: '75%', width: '25%' }}></div>
                </div>
                {/* Pointer */}
                <div className="relative w-full h-2">
                   <motion.div 
                     animate={{ left: `${Math.min(100, Math.max(0, (bmi / 40) * 100))}%` }} 
                     transition={{ type: "spring", stiffness: 100, damping: 15 }}
                     className="absolute top-0 w-3 h-3 bg-white border-2 border-slate-800 dark:border-white dark:bg-slate-800 rounded-full transform -translate-x-1/2 -translate-y-1 shadow-md z-10"
                   ></motion.div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                <Button onClick={handleLogMetrics} disabled={loading} className={`w-full h-14 bg-gradient-to-r ${bgGradient} hover:opacity-90 text-white font-bold text-lg rounded-2xl shadow-lg ${shadowColor} border-0 transition-all`}>
                  <Save className="mr-2" size={20} /> Save Today's Metrics
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* BMR & TDEE Calculator */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] flex-1">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Flame className="text-orange-500" /> BMR & Energy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Age</label>
                  <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-orange-500 font-semibold text-xl text-center" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Gender</label>
                  <Select onValueChange={(val) => setGender(val || "male")} value={gender}>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-orange-500 font-semibold text-lg text-center px-4">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700 shadow-xl">
                      <SelectItem value="male" className="py-3">Male</SelectItem>
                      <SelectItem value="female" className="py-3">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-500/10 dark:to-red-500/10 border border-orange-100 dark:border-orange-500/20 p-6 rounded-2xl relative overflow-hidden">
                <Flame className="absolute -right-4 -bottom-4 text-orange-500/10 dark:text-orange-500/5" size={120} />
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg mb-1 relative z-10">Basal Metabolic Rate</h3>
                <p className="text-sm font-medium text-orange-600/80 dark:text-orange-400/80 mb-4 relative z-10">Calories burned resting.</p>
                <div className="text-5xl font-extrabold text-orange-500 tracking-tighter relative z-10">
                  {Math.round(bmr)} <span className="text-xl font-bold text-orange-600/50 dark:text-orange-400/50 tracking-normal">kcal</span>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 p-6 rounded-2xl">
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-lg mb-1">Total Daily Energy</h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">Calories burned based on activity level.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Sedentary</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{Math.round(tdeeSedentary)} kcal</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Lightly Active</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{Math.round(bmr * 1.375)} kcal</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Very Active</span>
                    </div>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{Math.round(bmr * 1.725)} kcal</span>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
