"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BMIPage() {
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("male");
  
  // Calculate BMI
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  let category = "Normal";
  let color = "text-green-500";
  
  if (bmi < 18.5) { category = "Underweight"; color = "text-yellow-500"; }
  else if (bmi >= 25 && bmi < 30) { category = "Overweight"; color = "text-orange-500"; }
  else if (bmi >= 30) { category = "Obese"; color = "text-red-500"; }

  // Calculate Ideal Weight
  const idealWeightMin = (18.5 * heightM * heightM).toFixed(1);
  const idealWeightMax = (24.9 * heightM * heightM).toFixed(1);

  // Calculate BMR (Mifflin-St Jeor)
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  bmr = gender === "male" ? bmr + 5 : bmr - 161;

  const tdeeSedentary = bmr * 1.2;

  const handleLogMetrics = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/health/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          weight,
          bmi,
          bodyFatPercent: 15, // placeholder
          waistCm: 80 // placeholder
        })
      });
      alert("Metrics logged successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">BMI & Health</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.location.href='/dashboard/reports'}>
          View Weekly Reports
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader>
            <CardTitle>BMI Calculator</CardTitle>
            <CardDescription className="text-zinc-400">Calculate your Body Mass Index</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm text-zinc-400">Height (cm)</label>
                <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="bg-zinc-800 border-zinc-700" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm text-zinc-400">Weight (kg)</label>
                <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="bg-zinc-800 border-zinc-700" />
              </div>
            </div>
            
            <div className="pt-6 flex flex-col items-center">
              <div className={`text-5xl font-bold ${color}`}>{bmi.toFixed(1)}</div>
              <div className="text-xl font-medium mt-2">{category}</div>
              <p className="text-sm text-zinc-400 mt-2">
                Ideal weight range: {idealWeightMin}kg - {idealWeightMax}kg
              </p>
            </div>
            
            {/* Simple Gauge */}
            <div className="w-full h-4 bg-zinc-800 rounded-full mt-4 overflow-hidden flex">
              <div className="h-full bg-yellow-500" style={{ width: '18.5%' }} title="Underweight"></div>
              <div className="h-full bg-green-500" style={{ width: '31.5%' }} title="Normal"></div>
              <div className="h-full bg-orange-500" style={{ width: '25%' }} title="Overweight"></div>
              <div className="h-full bg-red-500" style={{ width: '25%' }} title="Obese"></div>
            </div>
            {/* Pointer */}
            <div className="relative w-full h-2">
               <div className="absolute top-0 w-2 h-2 bg-white rounded-full transform -translate-x-1/2" style={{ left: `${Math.min(100, Math.max(0, (bmi / 40) * 100))}%` }}></div>
            </div>

            <Button onClick={handleLogMetrics} className="w-full mt-4 bg-zinc-800 hover:bg-zinc-700">Save Today's Metrics</Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader>
            <CardTitle>BMR & TDEE</CardTitle>
            <CardDescription className="text-zinc-400">Your Energy Expenditure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-1">Basal Metabolic Rate (BMR)</h3>
              <p className="text-sm text-zinc-400 mb-2">Calories burned at rest.</p>
              <div className="text-3xl font-bold text-blue-400">{Math.round(bmr)} <span className="text-sm text-zinc-400">kcal/day</span></div>
            </div>
            
            <div className="bg-zinc-800 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-1">Total Daily Energy Expenditure</h3>
              <p className="text-sm text-zinc-400 mb-2">Calories burned based on activity.</p>
              <div className="flex justify-between items-center text-sm mb-1">
                <span>Sedentary:</span>
                <span className="font-bold">{Math.round(tdeeSedentary)} kcal</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span>Lightly Active:</span>
                <span className="font-bold">{Math.round(bmr * 1.375)} kcal</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-1">
                <span>Very Active:</span>
                <span className="font-bold">{Math.round(bmr * 1.725)} kcal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
