"use client";

import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    const html2pdf = (await import("html2pdf.js")).default;
    const element = reportRef.current;
    if (!element) return;
    html2pdf().from(element).set({
      margin: 1,
      filename: 'weekly_health_report.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).save();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Weekly Health Report</h1>
        <Button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700 text-slate-800">
          Download as PDF
        </Button>
      </div>

      <div ref={reportRef} className="space-y-6">
        <Card className="bg-white border-slate-100 text-slate-800">
          <CardHeader>
            <CardTitle>Week Summary: Oct 1 - Oct 7</CardTitle>
            <CardDescription className="text-slate-500">Great job! You are consistently hitting your goals.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-green-500">-1.2 kg</div>
                <div className="text-sm text-slate-500">Weight Change</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-blue-400">4</div>
                <div className="text-sm text-slate-500">Workouts</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-yellow-500">2071</div>
                <div className="text-sm text-slate-500">Avg Calories</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-md text-center">
                <div className="text-2xl font-bold text-cyan-400">6.5</div>
                <div className="text-sm text-slate-500">Avg Water (Glasses)</div>
              </div>
            </div>

            <h3 className="font-bold mb-4">Weight Trend</h3>
            <div className="h-64 w-full text-slate-800">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                  <XAxis dataKey="name" stroke="#a1a1aa" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="#a1a1aa" />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none', color: '#fff' }} />
                  <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 bg-slate-50 p-6 rounded-md">
               <h3 className="font-bold mb-2 text-lg text-slate-800">AI Insights</h3>
               <ul className="list-disc pl-5 space-y-2 text-slate-600">
                 <li>You hit your calorie goal 5 out of 7 days — excellent consistency!</li>
                 <li>Your protein intake averaged 110g, which is perfect for your muscle gain goal.</li>
                 <li>Remember to drink more water on the weekends; you dropped to 4 glasses on Saturday.</li>
               </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
