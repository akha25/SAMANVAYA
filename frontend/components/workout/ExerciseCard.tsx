"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Flame, Info } from "lucide-react";

export function ExerciseCard({ exercise }: { exercise: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const diffColors: Record<string, string> = {
    beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
  };

  return (
    <Dialog>
      <DialogTrigger>
        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer"
        >
          <Card className={`overflow-hidden border-2 transition-all duration-200 h-full ${isHovered ? 'border-teal-400 shadow-teal-500/20 shadow-xl' : 'border-slate-100 dark:border-slate-800'}`}>
            <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                  <Play className="text-slate-400 opacity-50" size={32} />
                </div>
              )}
              <img 
                src={exercise.gifUrl} 
                alt={exercise.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${!isHovered ? 'grayscale-[50%]' : 'grayscale-0'}`}
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <Badge variant="secondary" className="bg-white/90 text-slate-800 border-none backdrop-blur shadow-sm">
                  <Flame size={12} className="text-orange-500 mr-1" /> {exercise.caloriesPerMin} / min
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 line-clamp-1">{exercise.name}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="border-teal-200 text-teal-700 dark:border-teal-800 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 capitalize">
                    {exercise.muscleGroup}
                  </Badge>
                  <Badge variant="outline" className={`border-none capitalize ${diffColors[exercise.difficulty]}`}>
                    {exercise.difficulty}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{exercise.name}</DialogTitle>
          <DialogDescription className="flex gap-2 capitalize mt-2">
            <Badge variant="secondary">{exercise.category}</Badge>
            <Badge variant="secondary">{exercise.equipment}</Badge>
            <Badge variant="secondary">{exercise.muscleGroup}</Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <img src={exercise.gifUrl} alt={exercise.name} className="w-full h-auto" />
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-3 text-slate-800 dark:text-slate-200">
                <Info size={18} className="text-teal-500" /> Instructions
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {exercise.instructions?.map((inst: string, i: number) => (
                  <li key={i}>{inst}</li>
                ))}
              </ol>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-semibold text-sm mb-2">Pro Tips</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                {exercise.tips?.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <p className="text-xs text-slate-500">Recommended</p>
                <p className="font-semibold">{exercise.defaultSets} sets × {exercise.defaultReps} reps</p>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg shadow-teal-500/20">
                Add to Workout
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
