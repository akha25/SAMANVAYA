"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Loader2, Footprints, Flame, HeartPulse, ActivitySquare } from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AddHealthDataPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    steps: "",
    calories: "",
    heartRate: "",
    activityType: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.steps || !formData.calories || !formData.heartRate || !formData.activityType) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (Number(formData.steps) < 0 || Number(formData.calories) < 0 || Number(formData.heartRate) < 0) {
      toast.error("Values must be positive numbers.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/health/add', {
        steps: Number(formData.steps),
        calories: Number(formData.calories),
        heartRate: Number(formData.heartRate),
        activityType: formData.activityType
      });

      if (res.data.success) {
        toast.success("Health data saved successfully!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save health data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-teal-400 to-blue-500"></div>
          <CardHeader className="text-center pt-10 pb-8 px-8">
            <CardTitle className="text-3xl font-bold text-slate-800 dark:text-slate-100">Log Health Data</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-base mt-2">Keep track of your daily activities to reach your goals.</CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="group space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Steps</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Footprints size={18} className="text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <Input 
                    type="number" 
                    placeholder="e.g. 8500" 
                    className="pl-11 py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all text-base dark:text-slate-100"
                    value={formData.steps}
                    onChange={(e) => setFormData({...formData, steps: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="group space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Calories Burned</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Flame size={18} className="text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <Input 
                    type="number" 
                    placeholder="e.g. 450" 
                    className="pl-11 py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-orange-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all text-base dark:text-slate-100"
                    value={formData.calories}
                    onChange={(e) => setFormData({...formData, calories: e.target.value})}
                  />
                </div>
              </div>

              <div className="group space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Average Heart Rate (bpm)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HeartPulse size={18} className="text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                  </div>
                  <Input 
                    type="number" 
                    placeholder="e.g. 72" 
                    className="pl-11 py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-rose-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all text-base dark:text-slate-100"
                    value={formData.heartRate}
                    onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
                  />
                </div>
              </div>

              <div className="group space-y-2 relative">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Primary Activity Type</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <ActivitySquare size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <Select onValueChange={(val: string) => setFormData({...formData, activityType: val})}>
                    <SelectTrigger className="pl-11 py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-base dark:text-slate-100">
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700 shadow-xl dark:bg-slate-800">
                      <SelectItem value="walking" className="py-3 cursor-pointer">Walking</SelectItem>
                      <SelectItem value="running" className="py-3 cursor-pointer">Running</SelectItem>
                      <SelectItem value="cycling" className="py-3 cursor-pointer">Cycling</SelectItem>
                      <SelectItem value="yoga" className="py-3 cursor-pointer">Yoga</SelectItem>
                      <SelectItem value="gym" className="py-3 cursor-pointer">Gym / Weights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-2xl py-6 text-lg font-semibold transition-all shadow-lg shadow-teal-500/30 border-0"
                >
                  {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                  {loading ? "Saving..." : "Save Entry"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
