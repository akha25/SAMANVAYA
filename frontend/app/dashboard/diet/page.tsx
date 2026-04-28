"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function DietPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any | null>(null);
  const [portion, setPortion] = useState(100);
  const [mealType, setMealType] = useState("Breakfast");
  const [waterGlasses, setWaterGlasses] = useState(0);

  // Stats
  const dailyGoal = 2000;
  const consumed = 1250;
  const macros = { protein: 80, carbs: 120, fat: 40 };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchQuery}&search_simple=1&action=process&json=1`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch (err) {
      console.error("Failed to fetch food data");
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
      await fetch("http://localhost:5000/api/diet/log", {
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
      // Clear selection
      setSelectedFood(null);
      setSearchQuery("");
      setSearchResults([]);
      setPortion(100);
    } catch (err) {
      console.error("Failed to log meal");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Diet Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Summary */}
        <Card className="col-span-2 bg-white border-slate-100 text-slate-800">
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8 items-center">
            {/* Simple Calorie Donut */}
            <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-slate-100">
              <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, opacity: 0.8 }} />
              <div className="text-center">
                <span className="text-2xl font-bold">{consumed}</span>
                <span className="block text-sm text-slate-500">/ {dailyGoal} kcal</span>
              </div>
            </div>

            {/* Macros */}
            <div className="flex-1 space-y-4 w-full">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Protein</span>
                  <span className="text-slate-500">{macros.protein}g</span>
                </div>
                <Progress value={60} className="bg-slate-50 [&>div]:bg-red-500 h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Carbs</span>
                  <span className="text-slate-500">{macros.carbs}g</span>
                </div>
                <Progress value={45} className="bg-slate-50 [&>div]:bg-green-500 h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Fat</span>
                  <span className="text-slate-500">{macros.fat}g</span>
                </div>
                <Progress value={30} className="bg-slate-50 [&>div]:bg-yellow-500 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Water Tracker */}
        <Card className="bg-white border-slate-100 text-slate-800">
          <CardHeader>
            <CardTitle>Water Intake</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="text-4xl font-bold text-blue-400">{waterGlasses} <span className="text-lg text-slate-500">/ 8</span></div>
            <p className="text-sm text-slate-500">glasses (250ml each)</p>
            <Button onClick={() => setWaterGlasses(Math.min(8, waterGlasses + 1))} className="bg-blue-600 hover:bg-blue-700 w-full mt-4">
              + Add Glass
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Food Search */}
        <Card className="bg-white border-slate-100 text-slate-800">
          <CardHeader>
            <CardTitle>Food Search</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Search food (e.g. Banana)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 border-slate-200"
              />
              <Button onClick={handleSearch} className="bg-slate-50 text-slate-800 hover:bg-slate-100">Search</Button>
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2">
              {searchResults.slice(0, 5).map((food) => (
                <div key={food.id} className="p-3 bg-slate-50 rounded-md flex justify-between items-center cursor-pointer hover:bg-slate-100" onClick={() => setSelectedFood(food)}>
                  <span className="font-medium text-sm truncate max-w-[200px]">{food.product_name || 'Unknown'}</span>
                  <span className="text-xs text-slate-500">{food.nutriments["energy-kcal_100g"] || 0} kcal/100g</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meal Logger */}
        <Card className={`bg-white border-slate-100 text-slate-800 ${!selectedFood ? 'opacity-50 pointer-events-none' : ''}`}>
          <CardHeader>
            <CardTitle>Log Meal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedFood ? (
              <>
                <h3 className="font-medium text-lg">{selectedFood.product_name}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-500">Meal Type</label>
                    <Select onValueChange={(val) => setMealType(val || "")} value={mealType}>
                      <SelectTrigger className="bg-slate-50 border-slate-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Snacks">Snacks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-slate-500">Portion (g)</label>
                    <Input type="number" value={portion} onChange={(e) => setPortion(Number(e.target.value))} className="bg-slate-50 border-slate-200" />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg flex justify-between text-sm">
                  <div>
                    <span className="block text-slate-500">Calories</span>
                    <span className="font-bold">{((selectedFood.nutriments["energy-kcal_100g"] || 0) * (portion/100)).toFixed(0)}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Protein</span>
                    <span className="font-bold">{((selectedFood.nutriments.proteins_100g || 0) * (portion/100)).toFixed(1)}g</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Carbs</span>
                    <span className="font-bold">{((selectedFood.nutriments.carbohydrates_100g || 0) * (portion/100)).toFixed(1)}g</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Fat</span>
                    <span className="font-bold">{((selectedFood.nutriments.fat_100g || 0) * (portion/100)).toFixed(1)}g</span>
                  </div>
                </div>

                <Button onClick={handleLogMeal} className="w-full bg-blue-600 hover:bg-blue-700">
                  Save Meal Log
                </Button>
              </>
            ) : (
              <p className="text-sm text-slate-400 py-8 text-center">Select a food from the search to log it.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
