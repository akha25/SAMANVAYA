"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy, Star, ShieldCheck, Bell, Save, Trash2, Zap, UserCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProfileSettingsPage() {
  const [user, setUser] = useState<any>(null);
  
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

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Profile & Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account preferences and goals.</p>
        </div>
        <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700 text-slate-800 rounded-xl shadow-md shadow-teal-600/20">
          <Save size={16} className="mr-2"/> Save Changes
        </Button>
      </div>

      {/* User Info Section */}
      <Card className="bg-white border-slate-100 shadow-sm rounded-3xl">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center shrink-0">
            <UserCircle size={80} className="text-slate-300"/>
          </div>
          <div className="text-center md:text-left flex-1 space-y-2">
            <h2 className="text-3xl font-bold text-slate-800">{user?.name || "User"}</h2>
            <p className="text-slate-500">{user?.email || "user@example.com"}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100 capitalize">
                Role: {user?.role || "user"}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
                Member since: {user?.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Body Metrics & Goals */}
        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="text-slate-800">Body Metrics & Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-slate-600">Height ({unitSystem === 'metric' ? 'cm' : 'in'})</label>
                <Input type="number" value={metrics.height} onChange={(e) => setMetrics({...metrics, height: Number(e.target.value)})} className="rounded-xl border-slate-200 focus-visible:ring-teal-500" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-slate-600">Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</label>
                <Input type="number" value={metrics.weight} onChange={(e) => setMetrics({...metrics, weight: Number(e.target.value)})} className="rounded-xl border-slate-200 focus-visible:ring-teal-500" />
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-600">Daily Calorie Goal</label>
              <Input type="number" value={metrics.calorieGoal} onChange={(e) => setMetrics({...metrics, calorieGoal: Number(e.target.value)})} className="rounded-xl border-slate-200 focus-visible:ring-teal-500" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-slate-600">Protein (g)</label>
                <Input type="number" value={metrics.protein} onChange={(e) => setMetrics({...metrics, protein: Number(e.target.value)})} className="rounded-xl border-slate-200 focus-visible:ring-teal-500" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-slate-600">Carbs (g)</label>
                <Input type="number" value={metrics.carbs} onChange={(e) => setMetrics({...metrics, carbs: Number(e.target.value)})} className="rounded-xl border-slate-200 focus-visible:ring-teal-500" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-xs font-semibold text-slate-600">Fat (g)</label>
                <Input type="number" value={metrics.fat} onChange={(e) => setMetrics({...metrics, fat: Number(e.target.value)})} className="rounded-xl border-slate-200 focus-visible:ring-teal-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Preferences */}
          <Card className="bg-white border-slate-100 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800"><Bell size={18} className="text-teal-500"/> Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Unit System</span>
                <select 
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-sm p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={unitSystem}
                  onChange={(e) => setUnitSystem(e.target.value)}
                >
                  <option value="metric">Metric (kg, cm)</option>
                  <option value="imperial">Imperial (lbs, in)</option>
                </select>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="font-bold text-sm text-slate-800">Notifications</h3>
                {[
                  { key: 'meals', label: 'Meal Reminders' },
                  { key: 'water', label: 'Water Reminders (every 2h)' },
                  { key: 'workouts', label: 'Workout Reminders' },
                  { key: 'weeklyReport', label: 'Weekly Report Alerts' }
                ].map(notif => (
                   <div key={notif.key} className="flex items-center justify-between">
                     <span className="text-sm text-slate-600">{notif.label}</span>
                     <button 
                       onClick={() => toggleNotification(notif.key as keyof typeof notifications)}
                       className={`w-10 h-5 rounded-full relative transition-colors ${notifications[notif.key as keyof typeof notifications] ? 'bg-teal-500' : 'bg-slate-200'}`}
                     >
                        <span className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${notifications[notif.key as keyof typeof notifications] ? 'right-0.5' : 'left-0.5'}`}></span>
                     </button>
                   </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-white border-red-100 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-red-500 flex items-center gap-2"><Trash2 size={18}/> Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <Button variant="destructive" className="w-full rounded-xl">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
