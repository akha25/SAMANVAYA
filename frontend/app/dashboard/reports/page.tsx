"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from "framer-motion";
import { Download, FileText, TrendingDown, Activity, Flame, Droplets, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

const mockData = [
  { name: 'Mon', weight: 71, calories: 1950 },
  { name: 'Tue', weight: 70.8, calories: 2100 },
  { name: 'Wed', weight: 70.5, calories: 2000 },
  { name: 'Thu', weight: 70.6, calories: 1850 },
  { name: 'Fri', weight: 70.2, calories: 2200 },
  { name: 'Sat', weight: 70.0, calories: 2500 },
  { name: 'Sun', weight: 69.8, calories: 1900 },
];

export default function ReportsPage() {
  const reportRef = useRef(null);

  const downloadPDF = async () => {
    toast.loading("Generating PDF Report...", { id: "pdf" });
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = reportRef.current;
      if (!element) return;
      await html2pdf().from(element).set({
        margin: 1,
        filename: 'samanvaya_weekly_report.pdf',
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).save();
      toast.success("Report downloaded successfully!", { id: "pdf" });
    } catch (err) {
      toast.error("Failed to generate PDF.", { id: "pdf" });
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
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-lg text-white">
            <FileText size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Health Reports</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Weekly insights and analytics</p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button onClick={downloadPDF} className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-xl shadow-lg shadow-indigo-500/30 border-0 h-12 px-6 font-bold">
            <Download size={18} className="mr-2" /> Download PDF Report
          </Button>
        </motion.div>
      </div>

      <div ref={reportRef} className="space-y-6 bg-[#F8FAFC] dark:bg-slate-950 p-2 sm:p-6 rounded-[2.5rem]">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 inline-block mb-2">Weekly Summary</h2>
          <p className="text-slate-500 dark:text-slate-400 font-semibold">October 1st - October 7th</p>
        </div>

        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Stat Cards */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                  <TrendingDown size={24} />
                </div>
                <div className="text-3xl font-extrabold text-emerald-500 tracking-tight mb-1">-1.2 <span className="text-base font-semibold">kg</span></div>
                <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Weight Change</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center mb-4">
                  <Activity size={24} />
                </div>
                <div className="text-3xl font-extrabold text-blue-500 tracking-tight mb-1">4</div>
                <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Workouts</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-500/20 text-orange-500 flex items-center justify-center mb-4">
                  <Flame size={24} />
                </div>
                <div className="text-3xl font-extrabold text-orange-500 tracking-tight mb-1">2071 <span className="text-base font-semibold">kcal</span></div>
                <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Calories</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-bl-full transition-transform group-hover:scale-110"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-50 dark:bg-cyan-500/20 text-cyan-500 flex items-center justify-center mb-4">
                  <Droplets size={24} />
                </div>
                <div className="text-3xl font-extrabold text-cyan-500 tracking-tight mb-1">6.5 <span className="text-base font-semibold">gl</span></div>
                <div className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Water</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-2 border-b border-slate-100 dark:border-slate-800 px-8 py-6">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Weight Trend</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} dy={10} />
                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 600 }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold' }} 
                      itemStyle={{ color: '#38bdf8' }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorWeight)" activeDot={{ r: 8, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20 border border-indigo-500/20 dark:border-indigo-500/30 p-8 rounded-[2rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-20 text-indigo-500"><Sparkles size={100} /></div>
             <h3 className="font-extrabold mb-6 text-2xl flex items-center gap-2 text-indigo-900 dark:text-indigo-100 relative z-10">
               <BotIcon className="text-indigo-500" /> AI Coach Insights
             </h3>
             <ul className="space-y-4 relative z-10">
               <li className="flex items-start gap-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-4 rounded-2xl">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5"><CheckIcon /></div>
                 <p className="text-slate-700 dark:text-slate-200 font-medium">You hit your calorie goal <strong className="text-emerald-600 dark:text-emerald-400">5 out of 7 days</strong> — excellent consistency!</p>
               </li>
               <li className="flex items-start gap-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-4 rounded-2xl">
                 <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0 mt-0.5"><CheckIcon /></div>
                 <p className="text-slate-700 dark:text-slate-200 font-medium">Your protein intake averaged <strong className="text-blue-600 dark:text-blue-400">110g</strong>, which is perfect for your muscle maintenance goal while losing weight.</p>
               </li>
               <li className="flex items-start gap-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-4 rounded-2xl">
                 <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5"><AlertIcon /></div>
                 <p className="text-slate-700 dark:text-slate-200 font-medium">Remember to drink more water on the weekends; you dropped to <strong className="text-amber-600 dark:text-amber-400">4 glasses</strong> on Saturday.</p>
               </li>
             </ul>
          </div>
        </motion.div>

        {/* Footer for PDF */}
        <div className="text-center pt-8 pb-4 text-slate-400 font-medium text-sm">
          Generated by Samanvaya AI Coach • {new Date().toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
}

function BotIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
}

function CheckIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"/></svg>;
}

function AlertIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}
