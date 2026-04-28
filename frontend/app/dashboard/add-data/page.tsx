"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AddHealthDataPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    steps: "",
    calories: "",
    heartRate: "",
    activityType: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.steps || !formData.calories || !formData.heartRate || !formData.activityType) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (Number(formData.steps) < 0 || Number(formData.calories) < 0 || Number(formData.heartRate) < 0) {
      toast.error("Values must be positive numbers.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/health/add', {
        steps: Number(formData.steps),
        calories: Number(formData.calories),
        heartRate: Number(formData.heartRate),
        activityType: formData.activityType
      });

      if (res.data.success) {
        toast.success("Health data saved successfully!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save health data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 animate-in fade-in duration-500">
      <Card className="bg-white border-slate-100 shadow-sm rounded-3xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold text-slate-800">Log Health Data</CardTitle>
          <CardDescription className="text-slate-500">Keep track of your daily activities</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Steps</label>
              <Input 
                type="number" 
                placeholder="e.g. 8500" 
                className="rounded-xl border-slate-200 focus-visible:ring-teal-500"
                value={formData.steps}
                onChange={(e) => setFormData({...formData, steps: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Calories Burned</label>
              <Input 
                type="number" 
                placeholder="e.g. 450" 
                className="rounded-xl border-slate-200 focus-visible:ring-teal-500"
                value={formData.calories}
                onChange={(e) => setFormData({...formData, calories: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Average Heart Rate (bpm)</label>
              <Input 
                type="number" 
                placeholder="e.g. 72" 
                className="rounded-xl border-slate-200 focus-visible:ring-teal-500"
                value={formData.heartRate}
                onChange={(e) => setFormData({...formData, heartRate: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Primary Activity Type</label>
              <Select onValueChange={(val) => setFormData({...formData, activityType: val})}>
                <SelectTrigger className="rounded-xl border-slate-200 focus:ring-teal-500">
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-lg">
                  <SelectItem value="walking">Walking</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="cycling">Cycling</SelectItem>
                  <SelectItem value="yoga">Yoga</SelectItem>
                  <SelectItem value="gym">Gym / Weights</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-slate-800 rounded-xl py-6 text-lg transition-all shadow-md shadow-teal-600/20"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              Save Entry
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
