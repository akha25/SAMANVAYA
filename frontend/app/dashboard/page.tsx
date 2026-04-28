"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Activity, Flame, HeartPulse, Footprints, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

export default function DashboardOverviewPage() {
  const [healthData, setHealthData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Fetch profile and health data
    const fetchData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          setUserName(user.name || "User");
        }

        const res = await api.get('/health/get');
        if (res.data.success) {
          setHealthData(res.data.data.reverse()); // latest at the end for charts
        }
      } catch (error) {
        toast.error("Failed to fetch health data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-full flex items-center justify-center text-teal-600"><Loader2 className="animate-spin w-8 h-8" /></div>;
  }

  // Calculate totals or latest values
  const latestEntry = healthData.length > 0 ? healthData[healthData.length - 1] : null;
  const currentSteps = latestEntry?.steps || 0;
  const currentCalories = latestEntry?.calories || 0;
  const currentHeartRate = latestEntry?.heartRate || 0;
  const currentActivity = latestEntry?.activityType || "None";

  // Chart data formatting
  const chartData = healthData.map(d => ({
    date: new Date(d.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
    steps: d.steps,
    calories: d.calories
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Greeting Card */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl p-8 text-slate-800 shadow-md shadow-teal-500/20">
        <h1 className="text-4xl font-bold mb-2">Hello, {userName} 👋</h1>
        <p className="text-teal-50 text-lg">Here is your daily health summary.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Cards */}
        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 flex items-center gap-2"><Footprints size={18} className="text-teal-500"/> Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-slate-800">{currentSteps.toLocaleString()}</div>
            <p className="text-xs text-slate-400 mt-1">Today</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 flex items-center gap-2"><Flame size={18} className="text-orange-500"/> Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-slate-800">{currentCalories.toLocaleString()}</div>
            <p className="text-xs text-slate-400 mt-1">kcal burned</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 flex items-center gap-2"><HeartPulse size={18} className="text-rose-500"/> Heart Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-slate-800">{currentHeartRate} <span className="text-xl text-slate-400 font-medium">bpm</span></div>
            <p className="text-xs text-slate-400 mt-1">Average today</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 flex items-center gap-2"><Activity size={18} className="text-blue-500"/> Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800 capitalize truncate">{currentActivity}</div>
            <p className="text-xs text-slate-400 mt-1">Latest session</p>
          </CardContent>
        </Card>

        {/* Charts */}
        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Steps Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
             {chartData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={chartData}>
                   <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                   <Line type="monotone" dataKey="steps" stroke="#0D9488" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                 </LineChart>
               </ResponsiveContainer>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-400">No data available</div>
             )}
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Calories Per Day</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
             {chartData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{ fill: '#f1f5f9' }} />
                   <Bar dataKey="calories" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             ) : (
               <div className="h-full flex items-center justify-center text-slate-400">No data available</div>
             )}
          </CardContent>
        </Card>

        {/* Recent Activity Timeline */}
        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl col-span-1 md:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {healthData.length > 0 ? (
              <div className="space-y-4">
                {[...healthData].reverse().slice(0, 5).map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-full shadow-sm">
                        <Activity className="text-teal-500 w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 capitalize">{entry.activityType}</p>
                        <p className="text-sm text-slate-500">{new Date(entry.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">{entry.calories} kcal</p>
                      <p className="text-sm text-slate-500">{entry.steps} steps</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">No recent activity found. Add some data!</div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
