"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { Droplet, Flame, Target, Trophy, Dumbbell, Sparkles } from "lucide-react";

const weightData = [
  { weight: 72 }, { weight: 71.5 }, { weight: 71.2 }, { weight: 70.8 }, { weight: 70.5 }, { weight: 70.2 }
];

export default function DashboardOverviewPage() {
  const userName = "Alex"; // This would normally come from context/API
  const caloriesConsumed = 1450;
  const calorieGoal = 2200;
  const waterGlasses = 5;
  
  return (
    <div className="space-y-8">
      {/* 1. Greeting Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Good Morning, {userName}! 🌅</h1>
        <p className="text-blue-100 text-lg">Ready to crush your goals today? Let's make it count.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 2. Calorie Ring */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center items-center py-6">
          <CardTitle className="text-sm text-zinc-400 mb-4 flex items-center gap-2"><Flame size={16} className="text-orange-500"/> Daily Calories</CardTitle>
          <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-zinc-800">
            <div 
              className="absolute inset-0 rounded-full border-8 border-orange-500" 
              style={{ clipPath: `polygon(0 0, 100% 0, 100% ${(caloriesConsumed/calorieGoal)*100}%, 0 100%)` }} 
            />
            <div className="text-center">
              <span className="text-2xl font-bold block">{caloriesConsumed}</span>
              <span className="text-xs text-zinc-400">/ {calorieGoal} kcal</span>
            </div>
          </div>
        </Card>

        {/* 3. Water Tracker */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2"><Droplet size={16} className="text-blue-500"/> Hydration</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-full pb-8">
            <div className="text-4xl font-bold text-blue-400 mb-2">{waterGlasses} <span className="text-lg text-zinc-500">/ 8</span></div>
            <p className="text-xs text-zinc-400">Glasses today</p>
          </CardContent>
        </Card>

        {/* 4. Today's Workout */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2"><Dumbbell size={16} className="text-purple-500"/> Today's Plan</CardTitle>
          </CardHeader>
          <CardContent className="h-full pb-8 flex flex-col justify-center">
             <div className="font-bold text-xl text-white mb-1">Upper Body Power</div>
             <p className="text-sm text-zinc-400 mb-4">45 mins • 6 exercises</p>
             <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-md text-sm transition-colors">Start Workout</button>
          </CardContent>
        </Card>

        {/* 5. Weight Trend Sparkline */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400">Weight Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-full pb-8">
             <div className="text-2xl font-bold text-white mb-2">70.2 <span className="text-sm text-green-500">-1.8 kg</span></div>
             <div className="h-16 w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={weightData}>
                   <YAxis domain={['dataMin', 'dataMax']} hide />
                   <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={3} dot={false} />
                 </LineChart>
               </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>

        {/* 6. Daily Wellness Tip */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100 col-span-1 md:col-span-2">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="bg-blue-600/20 p-3 rounded-full text-blue-500 shrink-0">
               <Sparkles size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Aanya's Tip of the Day</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Drinking a glass of warm water with lemon first thing in the morning can kickstart your digestion and provide a gentle dose of Vitamin C. Try it tomorrow!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 7. Streak Counter */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2"><Trophy size={16} className="text-yellow-500"/> Current Streak</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2 pb-6">
            <div className="text-5xl font-bold text-yellow-500 mb-2">12</div>
            <p className="text-sm text-zinc-400">Days active!</p>
          </CardContent>
        </Card>

        {/* 8. Goal Progress */}
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-zinc-400 flex items-center gap-2"><Target size={16} className="text-green-500"/> Weekly Goal</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6 space-y-4">
             <div>
               <div className="flex justify-between text-xs text-zinc-400 mb-1">
                 <span>Workouts (3/5)</span>
                 <span>60%</span>
               </div>
               <Progress value={60} className="h-2 bg-zinc-800 [&>div]:bg-green-500" />
             </div>
             <div>
               <div className="flex justify-between text-xs text-zinc-400 mb-1">
                 <span>Calorie Adherence</span>
                 <span>85%</span>
               </div>
               <Progress value={85} className="h-2 bg-zinc-800 [&>div]:bg-blue-500" />
             </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
