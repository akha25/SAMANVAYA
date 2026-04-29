"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Save, Trash2, UserCircle, Activity, HeartPulse, Scale, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function ProfileSettingsPage() {
  const [user, setUser] = useState<any>(null);
  
  const [notifications, setNotifications] = useState({
    meals: true,
    water: true,
    workouts: true,
    weeklyReport: true
  });
  const [unitSystem, setUnitSystem] = useState("metric");

  const [metrics, setMetrics] = useState({
    height: 175,
    weight: 70,
    calorieGoal: 2200,
    protein: 140,
    carbs: 250,
    fat: 60
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/auth/me` : 'http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            return;
          }
        }
        const userStr = localStorage.getItem('user');
        if (userStr) {
          setUser(JSON.parse(userStr));
        } else {
          // Mock user for demo purposes
          setUser({ name: "Alex Johnson", email: "alex.j@example.com", role: "pro", createdAt: "2026-01-15T00:00:00Z" });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, []);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    toast.success("Profile settings saved successfully!");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg text-white">
            <UserCircle size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Profile & Settings</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your account preferences and goals</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={handleSave} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 border-0 h-12 px-6 font-bold">
            <Save size={18} className="mr-2"/> Save Changes
          </Button>
        </motion.div>
      </div>

      {/* User Info Card - Glassmorphic ID Card */}
      <motion.div variants={itemVariants}>
        <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 p-1">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-purple-500/40 to-pink-500/40 blur-xl z-0"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 z-0 mix-blend-overlay"></div>
          
          <div className="relative z-10 bg-white/10 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[1.8rem] border border-white/20 p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 p-1 shadow-2xl">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/50 dark:border-slate-800/50">
                  <UserCircle size={80} className="text-slate-300 dark:text-slate-600"/>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-lg"></div>
            </div>
            
            <div className="text-center md:text-left flex-1 space-y-3">
              <h2 className="text-4xl font-extrabold text-white tracking-tight">{user?.name || "User"}</h2>
              <p className="text-indigo-200 text-lg font-medium">{user?.email || "user@example.com"}</p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-3">
                <span className="px-4 py-1.5 bg-indigo-500/20 text-indigo-100 rounded-full text-sm font-bold border border-indigo-500/30 capitalize flex items-center gap-1.5 backdrop-blur-md">
                  <ShieldCheck size={16}/> {user?.role || "Member"}
                </span>
                <span className="px-4 py-1.5 bg-white/10 text-slate-200 rounded-full text-sm font-bold border border-white/20 backdrop-blur-md">
                  Joined {user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Body Metrics & Goals */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none rounded-[2rem] flex-1">
            <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="flex items-center gap-2 text-xl text-slate-800 dark:text-slate-100">
                <Scale className="text-teal-500" /> Body Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Height ({unitSystem === 'metric' ? 'cm' : 'in'})</label>
                  <Input type="number" value={metrics.height} onChange={(e) => setMetrics({...metrics, height: Number(e.target.value)})} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 font-semibold text-lg" />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</label>
                  <Input type="number" value={metrics.weight} onChange={(e) => setMetrics({...metrics, weight: Number(e.target.value)})} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 font-semibold text-lg" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="text-blue-500" size={20}/>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">Nutrition Goals</h3>
                </div>
                
                <div className="space-y-2 group">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Daily Calorie Goal</label>
                  <Input type="number" value={metrics.calorieGoal} onChange={(e) => setMetrics({...metrics, calorieGoal: Number(e.target.value)})} className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500 font-bold text-xl text-blue-600 dark:text-blue-400" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider ml-1">Protein (g)</label>
                    <Input type="number" value={metrics.protein} onChange={(e) => setMetrics({...metrics, protein: Number(e.target.value)})} className="h-12 rounded-xl bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30 focus-visible:ring-rose-500 font-semibold text-center" />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider ml-1">Carbs (g)</label>
                    <Input type="number" value={metrics.carbs} onChange={(e) => setMetrics({...metrics, carbs: Number(e.target.value)})} className="h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30 focus-visible:ring-emerald-500 font-semibold text-center" />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-[10px] font-bold text-amber-500 dark:text-amber-400 uppercase tracking-wider ml-1">Fat (g)</label>
                    <Input type="number" value={metrics.fat} onChange={(e) => setMetrics({...metrics, fat: Number(e.target.value)})} className="h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30 focus-visible:ring-amber-500 font-semibold text-center" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6 flex flex-col">
          {/* Preferences */}
          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none rounded-[2rem]">
              <CardHeader className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <CardTitle className="flex items-center gap-2 text-xl text-slate-800 dark:text-slate-100">
                  <Bell className="text-purple-500" /> Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Unit System</span>
                  <select 
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold shadow-sm"
                    value={unitSystem}
                    onChange={(e) => setUnitSystem(e.target.value)}
                  >
                    <option value="metric">Metric (kg, cm)</option>
                    <option value="imperial">Imperial (lbs, in)</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Push Notifications</h3>
                  <div className="space-y-2">
                    {[
                      { key: 'meals', label: 'Meal Reminders', icon: HeartPulse },
                      { key: 'water', label: 'Water Reminders (every 2h)', icon: Activity },
                      { key: 'workouts', label: 'Workout Reminders', icon: HeartPulse },
                      { key: 'weeklyReport', label: 'Weekly Report Alerts', icon: Bell }
                    ].map((notif, idx) => {
                      const Icon = notif.icon;
                      const isActive = notifications[notif.key as keyof typeof notifications];
                      return (
                        <div key={notif.key} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                              <Icon size={16} />
                            </div>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{notif.label}</span>
                          </div>
                          <button 
                            onClick={() => toggleNotification(notif.key as keyof typeof notifications)}
                            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isActive ? 'bg-purple-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                          >
                             <motion.span 
                               layout
                               className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm`}
                               animate={{ x: isActive ? 28 : 4 }}
                               transition={{ type: "spring", stiffness: 500, damping: 30 }}
                             />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div variants={itemVariants}>
            <Card className="bg-red-50 dark:bg-red-500/5 border-red-100 dark:border-red-500/20 shadow-sm rounded-[2rem]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl shrink-0">
                    <Trash2 size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-800 dark:text-red-400 text-lg mb-1">Danger Zone</h3>
                    <p className="text-sm text-red-600/80 dark:text-red-400/80 mb-4 font-medium leading-relaxed">Once you delete your account, all your health data will be permanently erased. This cannot be undone.</p>
                    <Button variant="destructive" className="w-full sm:w-auto rounded-xl font-bold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20">Permanently Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
