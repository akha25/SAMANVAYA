"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Plus, Trash2, Search, Play, History, Library, ChevronRight, Check } from "lucide-react";
import { toast } from "react-hot-toast";

// Mock Exercise Data
const MOCK_EXERCISES = [
  { id: 1, name: "Barbell Bench Press", target: "Chest", equipment: "Barbell", color: "from-blue-400 to-blue-600" },
  { id: 2, name: "Squat", target: "Legs", equipment: "Barbell", color: "from-emerald-400 to-emerald-600" },
  { id: 3, name: "Pull-up", target: "Back", equipment: "Bodyweight", color: "from-indigo-400 to-indigo-600" },
  { id: 4, name: "Dumbbell Curl", target: "Biceps", equipment: "Dumbbell", color: "from-rose-400 to-rose-600" },
  { id: 5, name: "Plank", target: "Core", equipment: "Bodyweight", color: "from-amber-400 to-amber-600" },
];

export default function WorkoutPage() {
  const [activeTab, setActiveTab] = useState("builder");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Workout Builder State
  const [planName, setPlanName] = useState("");
  const [currentExercises, setCurrentExercises] = useState<{id: number, name: string, sets: number, reps: number, weight: number}[]>([]);

  const addExerciseToPlan = (exercise: any) => {
    setCurrentExercises([...currentExercises, { id: Date.now(), name: exercise.name, sets: 3, reps: 10, weight: 0 }]);
    toast.success(`Added ${exercise.name} to plan`);
  };

  const removeExercise = (id: number) => {
    setCurrentExercises(currentExercises.filter(ex => ex.id !== id));
  };

  const handleLogWorkout = async () => {
    if (currentExercises.length === 0) {
      toast.error("Please add at least one exercise");
      return;
    }
    if (!planName) {
      toast.error("Please name your workout plan");
      return;
    }

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
          planName: planName,
          exercises: currentExercises,
          totalDuration: 45, // static for now
          caloriesBurned: 300,
          completed: true
        })
      });
      toast.success("Workout Logged Successfully!");
      setPlanName("");
      setCurrentExercises([]);
      setActiveTab("history");
    } catch (error) {
      toast.error("Error logging workout");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg text-white">
            <Dumbbell size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Workout Hub</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Build routines and crush your goals</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-1 overflow-x-auto">
          <button 
            onClick={() => setActiveTab("builder")} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "builder" ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            <Play size={16} /> Builder
          </button>
          <button 
            onClick={() => setActiveTab("library")} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "library" ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            <Library size={16} /> Library
          </button>
          <button 
            onClick={() => setActiveTab("history")} 
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "history" ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
          >
            <History size={16} /> History
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "builder" && (
          <motion.div key="builder" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Current Plan */}
            <div className="lg:col-span-3">
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden min-h-[600px] flex flex-col">
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <CardHeader className="px-8 pt-8 pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100">Current Routine</CardTitle>
                  <CardDescription className="text-base text-slate-500 dark:text-slate-400 mt-2">Design your perfect workout session</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                  <div className="group relative mb-8">
                    <Input 
                      placeholder="Name your routine (e.g. Push Day, Full Body)" 
                      value={planName} 
                      onChange={(e) => setPlanName(e.target.value)}
                      className="py-7 text-lg font-semibold rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all dark:text-white placeholder:font-normal"
                    />
                  </div>
                  
                  {currentExercises.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center">
                      <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-6">
                        <Dumbbell size={32} className="text-slate-300 dark:text-slate-600" />
                      </div>
                      <p className="text-xl font-bold text-slate-600 dark:text-slate-300 mb-2">Your routine is empty</p>
                      <p className="max-w-xs mx-auto">Select exercises from the library panel to start building your workout.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 flex-1">
                      <AnimatePresence>
                        {currentExercises.map((ex, idx) => (
                          <motion.div 
                            key={ex.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, x: -20 }}
                            className="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm relative group hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors"
                          >
                            <button 
                              onClick={() => removeExercise(ex.id)}
                              className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={18} />
                            </button>
                            
                            <div className="flex items-center gap-3 mb-4 pr-10">
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                                {idx + 1}
                              </div>
                              <div className="font-bold text-lg text-slate-800 dark:text-slate-100">{ex.name}</div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Sets</label>
                                <Input type="number" value={ex.sets} onChange={(e) => {
                                  const newEx = [...currentExercises];
                                  newEx[idx].sets = Number(e.target.value);
                                  setCurrentExercises(newEx);
                                }} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 font-medium text-center rounded-xl" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Reps</label>
                                <Input type="number" value={ex.reps} onChange={(e) => {
                                  const newEx = [...currentExercises];
                                  newEx[idx].reps = Number(e.target.value);
                                  setCurrentExercises(newEx);
                                }} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 font-medium text-center rounded-xl" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Weight (kg)</label>
                                <Input type="number" value={ex.weight} onChange={(e) => {
                                  const newEx = [...currentExercises];
                                  newEx[idx].weight = Number(e.target.value);
                                  setCurrentExercises(newEx);
                                }} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 font-medium text-center rounded-xl" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8">
                    <Button 
                      onClick={handleLogWorkout} 
                      disabled={currentExercises.length === 0}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-7 text-lg font-bold rounded-2xl shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none border-0"
                    >
                      <Check className="mr-2" size={24}/> Complete & Log Workout
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Add Library */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none rounded-[2rem] h-full flex flex-col">
                <CardHeader className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Quick Add</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input 
                      placeholder="Search exercises..." 
                      className="pl-10 py-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                    {MOCK_EXERCISES.filter(ex => ex.name.toLowerCase().includes(searchQuery.toLowerCase())).map((ex) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        key={ex.id} 
                        className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-xl transition-all group cursor-pointer"
                        onClick={() => addExerciseToPlan(ex)}
                      >
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-100">{ex.name}</div>
                          <div className="text-xs font-semibold mt-1 flex gap-2">
                            <span className="text-blue-500 dark:text-blue-400">{ex.target}</span>
                            <span className="text-slate-300 dark:text-slate-600">•</span>
                            <span className="text-slate-500 dark:text-slate-400">{ex.equipment}</span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <Plus size={16} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === "library" && (
          <motion.div key="library" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="bg-white dark:bg-slate-900 border-none shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem]">
              <CardHeader className="px-8 pt-8 pb-4">
                <CardTitle className="text-2xl font-bold">Exercise Library</CardTitle>
                <CardDescription className="text-base text-slate-500">Browse and learn proper form for over 300+ exercises.</CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_EXERCISES.map((ex, i) => (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} key={ex.id} className="group flex flex-col bg-slate-50 dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all">
                        <div className={`h-2 w-full bg-gradient-to-r ${ex.color}`}></div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-bold text-xl mb-3 text-slate-800 dark:text-slate-100">{ex.name}</h3>
                          <div className="flex gap-2 mb-6">
                            <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">{ex.target}</span>
                            <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">{ex.equipment}</span>
                          </div>
                          
                          <div className="mt-auto">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="w-full border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-semibold">
                                  View Demo <ChevronRight size={16} className="ml-1" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-[2rem] p-0 overflow-hidden sm:max-w-lg">
                                <div className={`h-2 w-full bg-gradient-to-r ${ex.color}`}></div>
                                <div className="p-8">
                                  <DialogHeader className="mb-6">
                                    <DialogTitle className="text-2xl font-bold">{ex.name}</DialogTitle>
                                  </DialogHeader>
                                  <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center rounded-2xl text-slate-400 relative overflow-hidden group">
                                    <Play size={48} className="opacity-50 group-hover:scale-110 transition-transform group-hover:opacity-100 group-hover:text-blue-500" />
                                  </div>
                                  <div className="mt-6 space-y-4">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Instructions</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                                      Keep your core tight and maintain a neutral spine. Focus on the mind-muscle connection and control the eccentric portion of the movement.
                                    </p>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                 </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div key="history" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Card className="bg-white dark:bg-slate-900 border-none shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] min-h-[400px] flex flex-col items-center justify-center text-center p-12">
               <History size={64} className="text-slate-200 dark:text-slate-700 mb-6" />
               <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">No History Yet</h3>
               <p className="text-slate-500 max-w-md">Your completed workouts will appear here. Head over to the Builder tab to log your first session!</p>
               <Button onClick={() => setActiveTab("builder")} className="mt-8 bg-blue-600 hover:bg-blue-700 rounded-xl px-8">Start a Workout</Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
