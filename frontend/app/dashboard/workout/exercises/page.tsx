"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Library, Filter } from "lucide-react";
import { ExerciseCard } from "@/components/workout/ExerciseCard";
import { toast } from "react-hot-toast";

export default function ExerciseLibraryPage() {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");

  const categories = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Cardio"];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const url = new URL(process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/exercises` : 'http://localhost:5000/api/exercises');
        if (search) url.searchParams.append('search', search);
        if (activeCategory !== "All") url.searchParams.append('muscleGroup', activeCategory.toLowerCase());
        if (activeDifficulty !== "All") url.searchParams.append('difficulty', activeDifficulty.toLowerCase());

        const res = await fetch(url.toString());
        if (res.ok) {
          const data = await res.json();
          setExercises(data);
        }
      } catch (error) {
        toast.error("Failed to load exercises");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchExercises();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, activeCategory, activeDifficulty]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg shadow-teal-500/30 text-white">
            <Library size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">Exercise Library</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Master your form and build your routines</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Input 
            type="text" 
            placeholder="Search exercises by name..." 
            className="pl-10 h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mr-2">
            <Filter size={18} /> <span className="font-semibold text-sm">Category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mr-2">
            <Filter size={18} /> <span className="font-semibold text-sm">Difficulty</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${activeDifficulty === diff ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden h-[280px]">
              <div className="h-40 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {exercises.map((exercise) => (
              <motion.div key={exercise._id} variants={itemVariants} layoutId={exercise._id}>
                <ExerciseCard exercise={exercise} />
              </motion.div>
            ))}
          </AnimatePresence>
          {exercises.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500">
              <p className="text-xl font-semibold">No exercises found.</p>
              <p className="mt-2">Try adjusting your filters or search query.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
