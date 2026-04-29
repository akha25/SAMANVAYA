"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { TrendingUp, Award, Flame, Calendar, Plus, ChevronRight, Clock, History } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WorkoutLogger } from "@/components/workout/WorkoutLogger";
import { toast } from "react-hot-toast";

export default function MyWorkoutsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalSessions: 0, totalDuration: 0, totalCalories: 0, totalPRs: 0 });
  const [loading, setLoading] = useState(true);
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const [sessRes, statsRes] = await Promise.all([
        fetch(`${url}/sessions`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${url}/sessions/stats`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      if (sessRes.ok) setSessions(await sessRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (error) {
      toast.error("Failed to load workout data");
    } finally {
      setLoading(false);
    }
  };

  // Mock chart data
  const chartData = [
    { name: 'Mon', volume: 4000 },
    { name: 'Tue', volume: 3000 },
    { name: 'Wed', volume: 2000 },
    { name: 'Thu', volume: 2780 },
    { name: 'Fri', volume: 1890 },
    { name: 'Sat', volume: 2390 },
    { name: 'Sun', volume: 3490 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg shadow-blue-500/30 text-white">
            <TrendingUp size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">My Workouts</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Track progress and hit new PRs</p>
          </div>
        </div>

        <Dialog open={isLoggerOpen} onOpenChange={setIsLoggerOpen}>
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-lg shadow-blue-500/30 font-bold h-12 px-8">
            <Plus size={18} className="mr-2" /> Log Workout
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-3xl">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold">Log New Workout</DialogTitle>
            </DialogHeader>
            <WorkoutLogger onComplete={() => { setIsLoggerOpen(false); fetchData(); }} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <Calendar size={24} />
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Sessions</p>
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{stats.totalSessions}</h3>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
              <Flame size={24} />
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Calories Burned</p>
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{stats.totalCalories}</h3>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-4">
              <Award size={24} />
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">PRs Broken</p>
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{stats.totalPRs}</h3>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
              <Clock size={24} />
            </div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Minutes</p>
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{stats.totalDuration}</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <CardTitle className="font-bold text-xl flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" /> Weekly Volume (kg)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                  />
                  <Bar dataKey="volume" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <CardTitle className="font-bold text-xl flex items-center gap-2">
              <History size={20} className="text-slate-500" /> Recent History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto min-h-[300px]">
            {sessions.length === 0 ? (
              <div className="p-8 text-center text-slate-500 flex flex-col items-center justify-center h-full">
                <Calendar size={32} className="text-slate-300 mb-3" />
                <p>No workouts logged yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {sessions.slice(0, 5).map(session => (
                  <div key={session._id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between group cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {session.planId?.name || "Freestyle Workout"}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {new Date(session.date).toLocaleDateString()} · {session.duration}m
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
