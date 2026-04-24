"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Star, ShieldCheck, Bell, Save, Trash2, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProfileSettingsPage() {
  const [level, setLevel] = useState(5);
  const [xp, setXp] = useState(1250);
  const xpForNextLevel = 2000;
  
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

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Save size={16} className="mr-2"/> Save Changes
        </Button>
      </div>

      {/* Gamification Section */}
      <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy className="text-yellow-500"/> Gamification & Rewards</CardTitle>
          <CardDescription className="text-zinc-400">Earn XP by tracking meals and finishing workouts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 rounded-full bg-zinc-800 border-4 border-blue-600 flex items-center justify-center flex-col shrink-0">
               <span className="text-xs text-zinc-400 font-medium">LEVEL</span>
               <span className="text-2xl font-bold text-white">{level}</span>
             </div>
             <div className="flex-1 space-y-2">
               <div className="flex justify-between text-sm">
                 <span className="font-bold text-blue-400">{xp} XP</span>
                 <span className="text-zinc-500">{xpForNextLevel} XP to Level {level + 1}</span>
               </div>
               <Progress value={(xp / xpForNextLevel) * 100} className="h-3 bg-zinc-800 [&>div]:bg-blue-500" />
               <p className="text-xs text-zinc-400">+50 XP to earn your next badge!</p>
             </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-sm">Earned Badges</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              <div className="bg-zinc-800 p-4 rounded-xl flex flex-col items-center justify-center min-w-[100px] border border-zinc-700">
                <Star className="text-yellow-500 mb-2" size={24}/>
                <span className="text-xs font-bold text-center">7-Day Streak</span>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl flex flex-col items-center justify-center min-w-[100px] border border-zinc-700">
                <Zap className="text-blue-400 mb-2" size={24}/>
                <span className="text-xs font-bold text-center">First Workout</span>
              </div>
              <div className="bg-zinc-800 p-4 rounded-xl flex flex-col items-center justify-center min-w-[100px] border border-zinc-700">
                <ShieldCheck className="text-green-500 mb-2" size={24}/>
                <span className="text-xs font-bold text-center">Hydration Hero</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Body Metrics & Goals */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader>
            <CardTitle>Body Metrics & Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-xs text-zinc-400">Height ({unitSystem === 'metric' ? 'cm' : 'in'})</label>
                <Input type="number" value={metrics.height} onChange={(e) => setMetrics({...metrics, height: Number(e.target.value)})} className="bg-zinc-800 border-zinc-700" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-xs text-zinc-400">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</label>
                <Input type="number" value={metrics.weight} onChange={(e) => setMetrics({...metrics, weight: Number(e.target.value)})} className="bg-zinc-800 border-zinc-700" />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <label className="text-xs text-zinc-400">Daily Calorie Goal</label>
              <Input type="number" value={metrics.calorieGoal} onChange={(e) => setMetrics({...metrics, calorieGoal: Number(e.target.value)})} className="bg-zinc-800 border-zinc-700" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-xs text-zinc-400">Protein (g)</label>
                <Input type="number" value={metrics.protein} onChange={(e) => setMetrics({...metrics, protein: Number(e.target.value)})} className="bg-zinc-800 border-zinc-700" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-xs text-zinc-400">Carbs (g)</label>
                <Input type="number" value={metrics.carbs} onChange={(e) => setMetrics({...metrics, carbs: Number(e.target.value)})} className="bg-zinc-800 border-zinc-700" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-xs text-zinc-400">Fat (g)</label>
                <Input type="number" value={metrics.fat} onChange={(e) => setMetrics({...metrics, fat: Number(e.target.value)})} className="bg-zinc-800 border-zinc-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Preferences */}
          <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell size={18}/> Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Unit System</span>
                <select 
                  className="bg-zinc-800 border-zinc-700 text-sm p-2 rounded-md focus:outline-none"
                  value={unitSystem}
                  onChange={(e) => setUnitSystem(e.target.value)}
                >
                  <option value="metric">Metric (kg, cm)</option>
                  <option value="imperial">Imperial (lbs, in)</option>
                </select>
              </div>

              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <h3 className="font-bold text-sm">Notifications</h3>
                {[
                  { key: 'meals', label: 'Meal Reminders' },
                  { key: 'water', label: 'Water Reminders (every 2h)' },
                  { key: 'workouts', label: 'Workout Reminders' },
                  { key: 'weeklyReport', label: 'Weekly Report Alerts' }
                ].map(notif => (
                   <div key={notif.key} className="flex items-center justify-between">
                     <span className="text-sm text-zinc-300">{notif.label}</span>
                     <button 
                       onClick={() => toggleNotification(notif.key as keyof typeof notifications)}
                       className={`w-10 h-5 rounded-full relative transition-colors ${notifications[notif.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-zinc-700'}`}
                     >
                        <span className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white transition-all ${notifications[notif.key as keyof typeof notifications] ? 'right-1' : 'left-1'}`}></span>
                     </button>
                   </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-zinc-900 border-red-900/50 text-zinc-100">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center gap-2"><Trash2 size={18}/> Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-zinc-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">Delete Account</Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
