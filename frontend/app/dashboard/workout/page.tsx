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
          <Button variant={activeTab === "builder" ? "default" : "outline"} onClick={() => setActiveTab("builder")} className={activeTab === "builder" ? "bg-blue-600 text-white" : "border-zinc-700 text-zinc-300"}>Builder</Button>
          <Button variant={activeTab === "library" ? "default" : "outline"} onClick={() => setActiveTab("library")} className={activeTab === "library" ? "bg-blue-600 text-white" : "border-zinc-700 text-zinc-300"}>Library</Button>
          <Button variant={activeTab === "history" ? "default" : "outline"} onClick={() => setActiveTab("history")} className={activeTab === "history" ? "bg-blue-600 text-white" : "border-zinc-700 text-zinc-300"}>History</Button>
        </div>
      </div>

      {activeTab === "builder" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="Plan Name (e.g. Monday Push Day)" 
                value={planName} 
                onChange={(e) => setPlanName(e.target.value)}
                className="bg-zinc-800 border-zinc-700"
              />
              {currentExercises.length === 0 ? (
                <p className="text-sm text-zinc-500 text-center py-4">Add exercises from the library to start.</p>
              ) : (
                <div className="space-y-4">
                  {currentExercises.map((ex, idx) => (
                    <div key={idx} className="p-4 bg-zinc-800 rounded-md space-y-2">
                      <div className="font-bold">{ex.name}</div>
                      <div className="flex gap-4">
                        <div>
                          <label className="text-xs text-zinc-400">Sets</label>
                          <Input type="number" value={ex.sets} onChange={(e) => {
                            const newEx = [...currentExercises];
                            newEx[idx].sets = Number(e.target.value);
                            setCurrentExercises(newEx);
                          }} className="w-20 bg-zinc-700 border-zinc-600 h-8" />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-400">Reps</label>
                          <Input type="number" value={ex.reps} onChange={(e) => {
                            const newEx = [...currentExercises];
                            newEx[idx].reps = Number(e.target.value);
                            setCurrentExercises(newEx);
                          }} className="w-20 bg-zinc-700 border-zinc-600 h-8" />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-400">Weight (kg)</label>
                          <Input type="number" value={ex.weight} onChange={(e) => {
                            const newEx = [...currentExercises];
                            newEx[idx].weight = Number(e.target.value);
                            setCurrentExercises(newEx);
                          }} className="w-20 bg-zinc-700 border-zinc-600 h-8" />
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

          <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
            <CardHeader>
              <CardTitle>Quick Add Exercises</CardTitle>
              <CardDescription className="text-zinc-400">Select exercises to add to your plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <Input 
                placeholder="Search..." 
                className="bg-zinc-800 border-zinc-700 mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                {MOCK_EXERCISES.filter(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase())).map((ex) => (
                  <div key={ex.id} className="flex justify-between items-center p-3 bg-zinc-800 rounded-md">
                    <div>
                      <div className="font-medium">{ex.name}</div>
                      <div className="text-xs text-zinc-400">{ex.target} • {ex.equipment}</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => addExerciseToPlan(ex)} className="border-zinc-600 text-zinc-300 hover:bg-zinc-700">Add</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "library" && (
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader>
            <CardTitle>Exercise Library (Mock Data)</CardTitle>
            <CardDescription className="text-zinc-400">Browse over 300+ exercises (placeholder).</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_EXERCISES.map((ex) => (
                  <div key={ex.id} className="p-4 bg-zinc-800 rounded-md border border-zinc-700">
                    <h3 className="font-bold text-lg mb-2">{ex.name}</h3>
                    <p className="text-sm text-zinc-400 mb-1"><strong>Target:</strong> {ex.target}</p>
                    <p className="text-sm text-zinc-400 mb-4"><strong>Equipment:</strong> {ex.equipment}</p>
                    <Dialog>
                      {/* @ts-expect-error - asChild is missing from types but works at runtime */}
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-zinc-600 text-zinc-300 hover:bg-zinc-700">View Demo</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-zinc-900 text-zinc-100 border-zinc-800">
                        <DialogHeader>
                          <DialogTitle>{ex.name}</DialogTitle>
                        </DialogHeader>
                        <div className="w-full h-48 bg-zinc-800 flex items-center justify-center rounded-md text-zinc-500">
                          GIF / Video Placeholder
                        </div>
                        <p className="text-sm text-zinc-400 mt-4">Instructions: Keep your core tight and maintain a neutral spine...</p>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "history" && (
        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <CardHeader>
            <CardTitle>Workout History</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-zinc-400">History charts will populate here as you log workouts.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
