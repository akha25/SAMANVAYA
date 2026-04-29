"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Target, Clock, Plus, Dumbbell } from "lucide-react";
import { toast } from "react-hot-toast";

export default function WorkoutPlansPage() {
  const [activeTab, setActiveTab] = useState("system");
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans(activeTab);
  }, [activeTab]);

  const fetchPlans = async (type: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const endpoint = type === 'system' ? '/plans' : '/plans/mine';
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}${endpoint}` : `http://localhost:5000/api${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPlans(data);
      }
    } catch (error) {
      toast.error("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30 text-white">
            <CalendarDays size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">Workout Plans</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Structured routines for your goals</p>
          </div>
        </div>
        
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20 font-bold h-12 px-6">
          <Plus size={18} className="mr-2" /> Create Custom Plan
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-1 w-full md:w-auto overflow-x-auto">
        <button 
          onClick={() => setActiveTab("system")} 
          className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === "system" ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
        >
          System Plans
        </button>
        <button 
          onClick={() => setActiveTab("custom")} 
          className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === "custom" ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
        >
          My Custom Plans
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarDays size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">No Plans Found</h3>
          <p className="text-slate-500">You haven't created any custom plans yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div key={plan._id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="overflow-hidden border-slate-200 dark:border-slate-800 rounded-2xl h-full flex flex-col hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="h-2 w-full bg-gradient-to-r from-indigo-400 to-purple-500"></div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 leading-tight line-clamp-2 pr-2">{plan.name}</h3>
                    <Badge variant="outline" className="capitalize bg-indigo-50 text-indigo-700 border-none dark:bg-indigo-900/30 dark:text-indigo-400">
                      {plan.level}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <Target size={16} className="mr-2 text-indigo-400" />
                      Goal: <span className="ml-1 capitalize text-slate-800 dark:text-slate-200">{plan.goal.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 font-medium">
                      <Clock size={16} className="mr-2 text-indigo-400" />
                      Commitment: <span className="ml-1 text-slate-800 dark:text-slate-200">{plan.daysPerWeek} days/week</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-auto border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/30 rounded-xl font-bold transition-all">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
