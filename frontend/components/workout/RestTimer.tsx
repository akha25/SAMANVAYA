"use client";

import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, X } from "lucide-react";

export function RestTimer({ duration = 60, onClose }: { duration?: number, onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-slate-900 rounded-3xl p-4 shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4 animate-in slide-in-from-bottom-5">
      <div className="w-full flex justify-between items-center px-2">
        <span className="font-bold text-slate-700 dark:text-slate-200">Rest Timer</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
          <X size={18} />
        </button>
      </div>

      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={duration}
        colors={['#0D9488', '#3B82F6', '#F59E0B', '#EF4444']}
        colorsTime={[duration, duration * 0.6, duration * 0.3, 0]}
        size={120}
        strokeWidth={8}
        trailColor="#f1f5f9"
        onComplete={() => {
          // Play a sound or show a notification
          return { shouldRepeat: false };
        }}
      >
        {({ remainingTime }) => (
          <div className="flex flex-col items-center">
            <span className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
              {formatTime(remainingTime)}
            </span>
            <span className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
              {remainingTime > 0 ? 'Remaining' : 'Time Up!'}
            </span>
          </div>
        )}
      </CountdownCircleTimer>

      <div className="flex gap-2 w-full mt-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex-1 rounded-xl h-10 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => { setKey(prev => prev + 1); setIsPlaying(true); }}
          className="flex-1 rounded-xl h-10 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
        >
          <RotateCcw size={18} />
        </Button>
        <Button 
          onClick={() => setKey(prev => prev + 1)}
          className="flex-2 w-full rounded-xl h-10 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          +30s
        </Button>
      </div>
    </div>
  );
}
