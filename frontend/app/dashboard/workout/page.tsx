"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock Exercise Data
const MOCK_EXERCISES = [
  { id: 1, name: "Barbell Bench Press", target: "Chest", equipment: "Barbell" },
  { id: 2, name: "Squat", target: "Legs", equipment: "Barbell" },
  { id: 3, name: "Pull-up", target: "Back", equipment: "Bodyweight" },
  { id: 4, name: "Dumbbell Curl", target: "Biceps", equipment: "Dumbbell" },
  { id: 5, name: "Plank", target: "Core", equipment: "Bodyweight" },
];

export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState("builder");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Workout Builder State
  const [planName, setPlanName] = useState("");
  const [currentExercises, setCurrentExercises] = useState<{name: string, sets: number, reps: number, weight: number}[]>([]);

  const addExerciseToPlan = (exercise: any) => {
    setCurrentExercises([...currentExercises, { name: exercise.name, sets: 3, reps: 10, weight: 0 }]);
  };

  const handleLogWorkout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:5000/api/workout/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          planName: planName || "Custom Workout",
          exercises: currentExercises,
          totalDuration: 45, // static for now
          caloriesBurned: 300,
          completed: true
        })
      });
      alert("Workout Logged Successfully!");
      setPlanName("");
      setCurrentExercises([]);
    } catch (error) {
      console.error("Error logging workout", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Workout Hub</h1>
        <div className="space-x-2">
          <Button variant={activeTab === "builder" ? "default" : "outline"} onClick={() => setActiveTab("builder")} className={activeTab === "builder" ? "bg-blue-600 text-slate-800" : "border-slate-200 text-slate-600"}>Builder</Button>
          <Button variant={activeTab === "library" ? "default" : "outline"} onClick={() => setActiveTab("library")} className={activeTab === "library" ? "bg-blue-600 text-slate-800" : "border-slate-200 text-slate-600"}>Library</Button>
          <Button variant={activeTab === "history" ? "default" : "outline"} onClick={() => setActiveTab("history")} className={activeTab === "history" ? "bg-blue-600 text-slate-800" : "border-slate-200 text-slate-600"}>History</Button>
        </div>
      </div>

      {activeTab === "builder" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-slate-100 text-slate-800">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="Plan Name (e.g. Monday Push Day)" 
                value={planName} 
                onChange={(e) => setPlanName(e.target.value)}
                className="bg-slate-50 border-slate-200"
              />
              {currentExercises.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">Add exercises from the library to start.</p>
              ) : (
                <div className="space-y-4">
                  {currentExercises.map((ex, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-md space-y-2">
                      <div className="font-bold">{ex.name}</div>
                      <div className="flex gap-4">
                        <div>
                          <label className="text-xs text-slate-500">Sets</label>
                          <Input type="number" value={ex.sets} onChange={(e) => {
                            const newEx = [...currentExercises];
                            newEx[idx].sets = Number(e.target.value);
                            setCurrentExercises(newEx);
                          }} className="w-20 bg-slate-100 border-slate-300 h-8" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Reps</label>
                          <Input type="number" value={ex.reps} onChange={(e) => {
                            const newEx = [...currentExercises];
                            newEx[idx].reps = Number(e.target.value);
                            setCurrentExercises(newEx);
                          }} className="w-20 bg-slate-100 border-slate-300 h-8" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Weight (kg)</label>
                          <Input type="number" value={ex.weight} onChange={(e) => {
                            const newEx = [...currentExercises];
                            newEx[idx].weight = Number(e.target.value);
                            setCurrentExercises(newEx);
                          }} className="w-20 bg-slate-100 border-slate-300 h-8" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={handleLogWorkout} className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                    Complete & Log Workout
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-100 text-slate-800">
            <CardHeader>
              <CardTitle>Quick Add Exercises</CardTitle>
              <CardDescription className="text-slate-500">Select exercises to add to your plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <Input 
                placeholder="Search..." 
                className="bg-slate-50 border-slate-200 mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {MOCK_EXERCISES.filter(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase())).map((ex) => (
                  <div key={ex.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                    <div>
                      <div className="font-medium">{ex.name}</div>
                      <div className="text-xs text-slate-500">{ex.target} • {ex.equipment}</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => addExerciseToPlan(ex)} className="border-slate-300 text-slate-600 hover:bg-slate-100">Add</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "library" && (
        <Card className="bg-white border-slate-100 text-slate-800">
          <CardHeader>
            <CardTitle>Exercise Library (Mock Data)</CardTitle>
            <CardDescription className="text-slate-500">Browse over 300+ exercises (placeholder).</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_EXERCISES.map((ex) => (
                  <div key={ex.id} className="p-4 bg-slate-50 rounded-md border border-slate-200">
                    <h3 className="font-bold text-lg mb-2">{ex.name}</h3>
                    <p className="text-sm text-slate-500 mb-1"><strong>Target:</strong> {ex.target}</p>
                    <p className="text-sm text-slate-500 mb-4"><strong>Equipment:</strong> {ex.equipment}</p>
                    <Dialog>
                      {/* @ts-expect-error - asChild is missing from types but works at runtime */}
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-slate-300 text-slate-600 hover:bg-slate-100">View Demo</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white text-slate-800 border-slate-100">
                        <DialogHeader>
                          <DialogTitle>{ex.name}</DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-48 bg-slate-50 flex items-center justify-center rounded-md text-slate-400">
                          GIF / Video Placeholder
                        </div>
                        <p className="text-sm text-slate-500 mt-4">Instructions: Keep your core tight and maintain a neutral spine...</p>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "history" && (
        <Card className="bg-white border-slate-100 text-slate-800">
          <CardHeader>
            <CardTitle>Workout History</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-slate-500">History charts will populate here as you log workouts.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
