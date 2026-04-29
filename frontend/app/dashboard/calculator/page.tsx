"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Calculator as CalculatorIcon, Activity, Flame, Save, Dumbbell, Apple } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CalculatorPage() {
  const [form, setForm] = useState({
    age: 25,
    weight: 70,
    height: 175,
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculate();
  }, [form]);

  const calculate = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${url}/calculator/bmr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setResult(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${url}/calculator/save`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        toast.success("Profile saved successfully");
      }
    } catch (e) {
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const pieData = result ? [
    { name: 'Protein', value: result.macros.protein * 4, color: '#3B82F6' },
    { name: 'Fat', value: result.macros.fat * 9, color: '#F59E0B' },
    { name: 'Carbs', value: result.macros.carbs * 4, color: '#10B981' }
  ] : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl shadow-lg shadow-teal-500/30 text-white">
          <CalculatorIcon size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">Fitness Calculator</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Determine your BMR, TDEE, and daily macros</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-5 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm h-fit">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <CardTitle className="font-bold text-xl flex items-center gap-2">
              <Activity size={20} className="text-teal-500" /> Your Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-400 font-bold ml-1">Age</Label>
                <Input 
                  type="number" 
                  value={form.age} 
                  onChange={(e) => setForm({...form, age: Number(e.target.value)})}
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-12 rounded-xl text-lg px-4 font-semibold" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-400 font-bold ml-1">Gender</Label>
                <Select value={form.gender} onValueChange={(v) => setForm({...form, gender: v})}>
                  <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-12 rounded-xl text-lg px-4 font-semibold capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="male" className="py-3 font-medium">Male</SelectItem>
                    <SelectItem value="female" className="py-3 font-medium">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-400 font-bold ml-1">Weight (kg)</Label>
                <Input 
                  type="number" 
                  value={form.weight} 
                  onChange={(e) => setForm({...form, weight: Number(e.target.value)})}
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-12 rounded-xl text-lg px-4 font-semibold" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 dark:text-slate-400 font-bold ml-1">Height (cm)</Label>
                <Input 
                  type="number" 
                  value={form.height} 
                  onChange={(e) => setForm({...form, height: Number(e.target.value)})}
                  className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-12 rounded-xl text-lg px-4 font-semibold" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 dark:text-slate-400 font-bold ml-1">Activity Level</Label>
              <Select value={form.activityLevel} onValueChange={(v) => setForm({...form, activityLevel: v})}>
                <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-12 rounded-xl text-base px-4 font-semibold capitalize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="sedentary" className="py-3 font-medium">Sedentary (Little/no exercise)</SelectItem>
                  <SelectItem value="light" className="py-3 font-medium">Light (Exercise 1-3 times/week)</SelectItem>
                  <SelectItem value="moderate" className="py-3 font-medium">Moderate (Exercise 3-5 times/week)</SelectItem>
                  <SelectItem value="active" className="py-3 font-medium">Active (Exercise 6-7 times/week)</SelectItem>
                  <SelectItem value="very-active" className="py-3 font-medium">Very Active (Hard physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600 dark:text-slate-400 font-bold ml-1">Goal</Label>
              <Select value={form.goal} onValueChange={(v) => setForm({...form, goal: v})}>
                <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-12 rounded-xl text-base px-4 font-semibold capitalize">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="lose" className="py-3 font-medium text-red-600 dark:text-red-400">Lose Weight (Deficit)</SelectItem>
                  <SelectItem value="maintain" className="py-3 font-medium text-blue-600 dark:text-blue-400">Maintain Weight</SelectItem>
                  <SelectItem value="gain" className="py-3 font-medium text-teal-600 dark:text-teal-400">Gain Muscle (Surplus)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="w-full h-12 bg-slate-800 hover:bg-slate-700 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 rounded-xl font-bold shadow-md mt-4"
            >
              <Save size={18} className="mr-2" /> {loading ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-7 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-none rounded-3xl shadow-lg shadow-blue-500/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-100 font-medium">Daily Calorie Target</p>
                    <h3 className="text-4xl font-extrabold mt-2">{result?.calories || 0} <span className="text-xl font-medium text-blue-200">kcal</span></h3>
                  </div>
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Flame size={24} />
                  </div>
                </div>
                <div className="mt-6 flex justify-between text-sm text-blue-100">
                  <span className="flex items-center"><Dumbbell size={14} className="mr-1" /> BMR: {result?.bmr} kcal</span>
                  <span className="flex items-center"><Activity size={14} className="mr-1" /> TDEE: {result?.tdee} kcal</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl">
                    <Apple size={20} />
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">Macronutrients</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className="text-blue-600 dark:text-blue-400">Protein</span>
                      <span>{result?.macros.protein || 0}g</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className="text-emerald-600 dark:text-emerald-400">Carbs</span>
                      <span>{result?.macros.carbs || 0}g</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className="text-amber-600 dark:text-amber-400">Fat</span>
                      <span>{result?.macros.fat || 0}g</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm h-[320px]">
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <CardTitle className="font-bold text-xl">Macro Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${Math.round(value)} kcal`, 'Calories']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
