"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Activity, Flame, HeartPulse, Footprints, AlertCircle } from "lucide-react";
import api from "@/lib/api";
import { motion } from "framer-motion";

export default function DashboardOverviewPage() {
  const [healthData, setHealthData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const userRes = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/auth/me` : 'http://localhost:5000/api/auth/me', {
              headers: { Authorization: `Bearer ${token}` }
            });
            if (userRes.ok) {
              const data = await userRes.json();
              localStorage.setItem("user", JSON.stringify(data));
              setUserName(data.name?.split(' ')[0] || "User");
            }
          } catch (e) {}
        } else {
          const userStr = localStorage.getItem('user');
          if (userStr) {
            const user = JSON.parse(userStr);
            setUserName(user.name?.split(' ')[0] || "User");
          }
        }

        const res = await api.get('/health/get');
        if (res.data.success) {
          setHealthData(res.data.data.reverse()); 
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-36 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
          <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full">
          <AlertCircle size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Failed to load data</h2>
        <p className="text-slate-500 dark:text-slate-400">Please check your connection or try again later.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:opacity-90 transition-opacity">
          Retry
        </button>
      </div>
    );
  }

  const latestEntry = healthData.length > 0 ? healthData[healthData.length - 1] : null;
  const currentSteps = latestEntry?.steps || 0;
  const currentCalories = latestEntry?.calories || 0;
  const currentHeartRate = latestEntry?.heartRate || 0;
  const currentActivity = latestEntry?.activityType || "None";

  const chartData = healthData.map(d => ({
    date: new Date(d.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
    steps: d.steps,
    calories: d.calories
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-100 dark:border-slate-700 p-3 rounded-2xl shadow-xl">
          <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{label}</p>
          {payload.map((p: any, idx: number) => (
            <p key={idx} className="text-sm font-medium" style={{ color: p.color }}>
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-teal-500 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-teal-500/20">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Hello, {userName} 👋</h1>
          <p className="text-blue-50 text-lg md:text-xl font-medium max-w-xl">Every step you take is a step towards a healthier you. Let's crush today's goals!</p>
        </div>
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-teal-300 opacity-20 rounded-full blur-3xl mix-blend-overlay"></div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-none shadow-lg shadow-slate-200/50 dark:shadow-none rounded-3xl hover:-translate-y-1 hover:shadow-xl dark:hover:bg-slate-800 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                  <Footprints size={24} />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Steps Today</p>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{currentSteps.toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-none shadow-lg shadow-slate-200/50 dark:shadow-none rounded-3xl hover:-translate-y-1 hover:shadow-xl dark:hover:bg-slate-800 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                  <Flame size={24} />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Calories Burned</p>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{currentCalories.toLocaleString()} <span className="text-lg text-slate-400 font-medium">kcal</span></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-none shadow-lg shadow-slate-200/50 dark:shadow-none rounded-3xl hover:-translate-y-1 hover:shadow-xl dark:hover:bg-slate-800 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-pink-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                  <HeartPulse size={24} />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Avg Heart Rate</p>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100">{currentHeartRate} <span className="text-lg text-slate-400 font-medium">bpm</span></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="group relative overflow-hidden bg-white dark:bg-slate-900 border-none shadow-lg shadow-slate-200/50 dark:shadow-none rounded-3xl hover:-translate-y-1 hover:shadow-xl dark:hover:bg-slate-800 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <Activity size={24} />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Latest Activity</p>
                <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 capitalize truncate">{currentActivity}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-slate-900 border-none shadow-lg shadow-slate-200/50 dark:shadow-none rounded-[2rem] p-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Steps Activity</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
               {chartData.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <defs>
                       <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800/50" />
                     <XAxis dataKey="date" stroke="currentColor" className="text-slate-400" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis stroke="currentColor" className="text-slate-400" fontSize={12} tickLine={false} axisLine={false} />
                     <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}/>
                     <Line type="monotone" dataKey="steps" name="Steps" stroke="#0D9488" strokeWidth={4} dot={false} activeDot={{ r: 8, strokeWidth: 0, fill: '#0D9488' }} />
                   </LineChart>
                 </ResponsiveContainer>
               ) : (
                 <div className="h-full flex items-center justify-center text-slate-400">No data available</div>
               )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-slate-900 border-none shadow-lg shadow-slate-200/50 dark:shadow-none rounded-[2rem] p-2">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Calories Burned</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
               {chartData.length > 0 ? (
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800/50" />
                     <XAxis dataKey="date" stroke="currentColor" className="text-slate-400" fontSize={12} tickLine={false} axisLine={false} />
                     <YAxis stroke="currentColor" className="text-slate-400" fontSize={12} tickLine={false} axisLine={false} />
                     <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', opacity: 0.05 }} />
                     <Bar dataKey="calories" name="Calories" fill="#3B82F6" radius={[8, 8, 8, 8]} barSize={32} />
                   </BarChart>
                 </ResponsiveContainer>
               ) : (
                 <div className="h-full flex items-center justify-center text-slate-400">No data available</div>
               )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity Timeline */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white dark:bg-slate-900 border-none shadow-lg shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {healthData.length > 0 ? (
              <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                {[...healthData].slice(0, 5).map((entry, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    {/* Timeline Dot */}
                    <div className="absolute left-0 md:left-1/2 flex items-center justify-center w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 bg-teal-500 shadow -translate-x-[11px] md:-translate-x-1/2 group-hover:scale-125 transition-transform duration-300"></div>
                    
                    <div className="flex w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 ml-4 md:ml-0">
                      <div className="flex items-center gap-4 w-full">
                        <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-3 rounded-2xl shadow-sm text-white shrink-0 group-hover:rotate-12 transition-transform duration-300">
                          <Activity size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-lg text-slate-800 dark:text-slate-100 capitalize truncate">{entry.activityType}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(entry.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-lg text-slate-800 dark:text-slate-100">{entry.calories} <span className="text-sm font-medium text-slate-500">kcal</span></p>
                          <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">{entry.steps.toLocaleString()} steps</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
                  <Footprints size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">No activity yet</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Start logging your daily steps and workouts to see your progress here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  );
}
