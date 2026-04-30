"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Search, Droplets, Plus, Utensils, Info, Check, Apple } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DietPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any | null>(null);
  const [portion, setPortion] = useState(100);
  const [mealType, setMealType] = useState("Breakfast");
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  // Stats
  const dailyGoal = 2000;
  const consumed = 1250;
  const macros = { protein: 80, carbs: 120, fat: 40 };

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&search_simple=1&action=process&json=1`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch (err) {
      toast.error("Failed to fetch food data");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogMeal = async () => {
    if (!selectedFood) return;
    
    const multiplier = portion / 100;
    const calories = (selectedFood.nutriments["energy-kcal_100g"] || 0) * multiplier;
    const protein = (selectedFood.nutriments.proteins_100g || 0) * multiplier;
    const carbs = (selectedFood.nutriments.carbohydrates_100g || 0) * multiplier;
    const fat = (selectedFood.nutriments.fat_100g || 0) * multiplier;

    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      await fetch(`${API_URL}/diet/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          mealType,
          foodName: selectedFood.product_name,
          portionGrams: portion,
          calories,
          protein,
          carbs,
          fat
        })
      });
      
      toast.success("Meal logged successfully!");
      setSelectedFood(null);
      setSearchQuery("");
      setSearchResults([]);
      setPortion(100);
    } catch (err) {
      toast.error("Failed to log meal");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg text-white">
          <Utensils size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Diet Tracker</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Log meals and monitor your macros</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Summary */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Daily Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-10 items-center justify-between px-8 pb-8">
              {/* Calorie Donut */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Background Ring */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                  {/* Foreground Ring */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent" 
                    stroke="url(#calorieGradient)" 
                    strokeWidth="8" 
                    strokeDasharray={`${(consumed / dailyGoal) * 251.2} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#34D399" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center flex flex-col items-center">
                  <span className="text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">{consumed}</span>
                  <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-1">/ {dailyGoal} kcal</span>
                </div>
              </div>

              {/* Macros */}
              <div className="flex-1 space-y-6 w-full">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Protein</span>
                    <span className="text-slate-500">{macros.protein}g</span>
                  </div>
                  <Progress value={60} className="h-3 bg-slate-100 dark:bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-rose-400 [&>div]:to-pink-500 shadow-inner rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Carbs</span>
                    <span className="text-slate-500">{macros.carbs}g</span>
                  </div>
                  <Progress value={45} className="h-3 bg-slate-100 dark:bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-emerald-400 [&>div]:to-teal-500 shadow-inner rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Fat</span>
                    <span className="text-slate-500">{macros.fat}g</span>
                  </div>
                  <Progress value={30} className="h-3 bg-slate-100 dark:bg-slate-800 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-orange-500 shadow-inner rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Water Tracker */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-none text-white shadow-xl shadow-blue-500/20 rounded-[2rem] overflow-hidden relative h-full">
            <div className="absolute top-0 right-0 p-6 opacity-20"><Droplets size={120} /></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold">Water Intake</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-6 relative z-10 h-[calc(100%-80px)]">
              <div className="text-6xl font-extrabold tracking-tight">{waterGlasses} <span className="text-2xl text-blue-200 font-medium">/ 8</span></div>
              <p className="text-sm text-blue-100 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">glasses (250ml each)</p>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full mt-auto pt-4">
                <Button 
                  onClick={() => setWaterGlasses(Math.min(8, waterGlasses + 1))} 
                  className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl h-14 text-lg font-bold shadow-lg"
                >
                  <Plus className="mr-2" /> Add Glass
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Food Search */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none rounded-[2rem]">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Search Food</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-3">
                <div className="relative flex-1 group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
                  <Input
                    placeholder="Search food (e.g. Banana, Chicken)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all text-base dark:text-slate-100"
                  />
                </div>
                <Button onClick={handleSearch} disabled={isSearching} className="bg-slate-800 dark:bg-teal-600 hover:bg-slate-700 dark:hover:bg-teal-700 text-white rounded-2xl px-6 h-[50px] transition-colors">
                  {isSearching ? "..." : "Search"}
                </Button>
              </div>
              
              <div className="space-y-3 min-h-[200px]">
                {searchResults.length === 0 && !isSearching && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-2 py-10">
                    <Info size={32} className="opacity-50" />
                    <p className="font-medium">Search for a food item to log it.</p>
                  </div>
                )}
                {searchResults.slice(0, 5).map((food) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    key={food.id} 
                    className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                      selectedFood?.id === food.id 
                        ? 'bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/30' 
                        : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedFood(food)}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {selectedFood?.id === food.id ? (
                        <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm"><Check size={16}/></div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center shrink-0"><Utensils size={14}/></div>
                      )}
                      <span className="font-semibold text-slate-700 dark:text-slate-200 truncate">{food.product_name || 'Unknown Item'}</span>
                    </div>
                    <div className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                      {food.nutriments["energy-kcal_100g"] || 0} kcal
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Meal Logger */}
        <motion.div variants={itemVariants}>
          <Card className={`bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none rounded-[2rem] h-full transition-all duration-300 ${!selectedFood ? 'opacity-60 grayscale-[50%]' : ''}`}>
            <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
              <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">Log Nutrition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedFood ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 p-4 rounded-2xl flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm"><Apple size={24} className="text-teal-500" /></div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-1">{selectedFood.product_name}</h3>
                      <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Selected Item</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 relative group">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Meal Type</label>
                      <Select onValueChange={(val) => setMealType(val || "")} value={mealType}>
                        <SelectTrigger className="py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 dark:border-slate-700 shadow-xl dark:bg-slate-800">
                          <SelectItem value="Breakfast" className="py-3">Breakfast</SelectItem>
                          <SelectItem value="Lunch" className="py-3">Lunch</SelectItem>
                          <SelectItem value="Dinner" className="py-3">Dinner</SelectItem>
                          <SelectItem value="Snacks" className="py-3">Snacks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 relative group">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Portion (g)</label>
                      <Input 
                        type="number" 
                        value={portion} 
                        onChange={(e) => setPortion(Number(e.target.value))} 
                        className="py-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus-visible:ring-teal-500 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all font-medium" 
                      />
                    </div>
                  </div>

                  {/* Calculated Macros Box */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl grid grid-cols-4 gap-2 border border-slate-100 dark:border-slate-700">
                    <div className="text-center p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                      <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Cals</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{((selectedFood.nutriments["energy-kcal_100g"] || 0) * (portion/100)).toFixed(0)}</span>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                      <span className="block text-xs font-semibold text-rose-500 dark:text-rose-400 mb-1">Prot</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{((selectedFood.nutriments.proteins_100g || 0) * (portion/100)).toFixed(1)}g</span>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                      <span className="block text-xs font-semibold text-emerald-500 dark:text-emerald-400 mb-1">Carb</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{((selectedFood.nutriments.carbohydrates_100g || 0) * (portion/100)).toFixed(1)}g</span>
                    </div>
                    <div className="text-center p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
                      <span className="block text-xs font-semibold text-amber-500 dark:text-amber-400 mb-1">Fat</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{((selectedFood.nutriments.fat_100g || 0) * (portion/100)).toFixed(1)}g</span>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={handleLogMeal} className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white py-6 text-lg font-bold rounded-2xl shadow-lg shadow-teal-500/20 border-0 transition-all">
                      Save Meal Log
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 h-64 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                  <Utensils size={48} className="mb-4 opacity-20" />
                  <p className="font-semibold text-lg text-slate-600 dark:text-slate-300">No Food Selected</p>
                  <p className="text-sm mt-1">Select an item from the search panel to log it.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
