"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, Trash2, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Optional, can fake size if not installed
import { toast } from "react-hot-toast";

export function WorkoutLogger({ plan, onComplete }: { plan?: any, onComplete: () => void }) {
  const [exercises, setExercises] = useState<any[]>(plan?.days[0]?.exercises || []);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasPR, setHasPR] = useState(false);

  // Fallback window size if useWindowSize isn't installed
  const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const height = typeof window !== 'undefined' ? window.innerHeight : 1000;

  const toggleSet = (exIndex: number, setIndex: number) => {
    const newEx = [...exercises];
    newEx[exIndex].sets[setIndex].completed = !newEx[exIndex].sets[setIndex].completed;
    setExercises(newEx);
  };

  const updateSet = (exIndex: number, setIndex: number, field: string, value: string) => {
    const newEx = [...exercises];
    newEx[exIndex].sets[setIndex][field] = Number(value);
    setExercises(newEx);
  };

  const addSet = (exIndex: number) => {
    const newEx = [...exercises];
    const prevSet = newEx[exIndex].sets[newEx[exIndex].sets.length - 1];
    newEx[exIndex].sets.push({ 
      reps: prevSet ? prevSet.reps : 10, 
      weight: prevSet ? prevSet.weight : 0, 
      completed: false 
    });
    setExercises(newEx);
  };

  const finishWorkout = async () => {
    try {
      const token = localStorage.getItem("token");
      // Simulated PR logic
      const prDetect = Math.random() > 0.5; 
      if (prDetect) setHasPR(true);

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/sessions` : 'http://localhost:5000/api/sessions', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          planId: plan?._id,
          duration: 45, // static for now
          totalCalories: 350,
          exercises: exercises,
          mood: "great"
        })
      });

      if (res.ok) {
        setShowConfetti(true);
        toast.success("Workout Complete!");
        setTimeout(() => {
          setShowConfetti(false);
          onComplete();
        }, 5000);
      }
    } catch (e) {
      toast.error("Failed to log workout");
    }
  };

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}
      
      {hasPR && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 p-4 rounded-2xl flex items-center gap-3 text-yellow-800 dark:text-yellow-400">
          <Trophy size={24} className="text-yellow-500" />
          <span className="font-bold">New Personal Record detected! Keep it up!</span>
        </motion.div>
      )}

      {exercises.length === 0 ? (
        <Card className="border-dashed border-2 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center h-48">
          <p className="text-slate-500 font-medium">No exercises added yet. Search the library to build your workout.</p>
        </Card>
      ) : (
        exercises.map((ex, exIndex) => (
          <Card key={exIndex} className="overflow-hidden border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="bg-slate-100 dark:bg-slate-800/80 p-3 font-bold text-slate-800 dark:text-slate-100 flex justify-between items-center">
              <span>{ex.exerciseId?.name || ex.name || "Unknown Exercise"}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500">
                <Trash2 size={16} />
              </Button>
            </div>
            <CardContent className="p-0">
              <div className="grid grid-cols-[3rem_1fr_1fr_3rem] gap-2 p-3 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <div className="text-center">Set</div>
                <div>kg</div>
                <div>Reps</div>
                <div className="text-center">Done</div>
              </div>
              <AnimatePresence>
                {ex.sets?.map((set: any, setIndex: number) => (
                  <motion.div 
                    key={setIndex}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className={`grid grid-cols-[3rem_1fr_1fr_3rem] gap-2 p-2 items-center transition-colors ${set.completed ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}
                  >
                    <div className="text-center font-medium text-slate-500">{setIndex + 1}</div>
                    <Input 
                      type="number" 
                      value={set.weight} 
                      onChange={(e) => updateSet(exIndex, setIndex, 'weight', e.target.value)}
                      className="h-9 bg-slate-50 dark:bg-slate-900 text-center font-medium rounded-lg" 
                    />
                    <Input 
                      type="number" 
                      value={set.reps} 
                      onChange={(e) => updateSet(exIndex, setIndex, 'reps', e.target.value)}
                      className="h-9 bg-slate-50 dark:bg-slate-900 text-center font-medium rounded-lg" 
                    />
                    <div className="flex justify-center">
                      <button 
                        onClick={() => toggleSet(exIndex, setIndex)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${set.completed ? 'bg-green-500 text-white shadow-md shadow-green-500/20' : 'bg-slate-200 dark:bg-slate-700 text-transparent hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                      >
                        <Check size={16} className={set.completed ? "opacity-100" : "opacity-0"} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                <Button 
                  variant="ghost" 
                  onClick={() => addSet(exIndex)}
                  className="w-full text-slate-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-sm font-semibold rounded-lg"
                >
                  <Plus size={16} className="mr-1" /> Add Set
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {exercises.length > 0 && (
        <Button 
          onClick={finishWorkout}
          className="w-full h-14 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-2xl text-lg font-bold shadow-lg shadow-teal-500/30"
        >
          Finish Workout
        </Button>
      )}
    </div>
  );
}
