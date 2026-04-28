"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Bot, User as UserIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Namaste! I'm Aanya, your personal Samanvaya AI Coach. How can I support your holistic wellness journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    "Suggest a high-protein dinner",
    "Plan a 30-min home workout",
    "I'm feeling stressed today",
    "How much water should I drink?"
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          message: text,
          chatHistory: messages.slice(1), // Exclude initial greeting
          todayLogs: {
            caloriesConsumed: 1250,
            proteinLeft: 40,
            carbsLeft: 60,
            fatLeft: 20
          }
        })
      });
      
      const data = await res.json();
      setMessages([...newMessages, { role: "ai", content: data.content }]);
    } catch (err) {
      setMessages([...newMessages, { role: "ai", content: "Oops, I'm having trouble connecting right now. Let's try again in a moment." }]);
      toast.error("Network error. Could not reach Aanya.");
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 shrink-0">
        <div className="relative">
          <div className="absolute inset-0 bg-teal-500 rounded-full blur-md opacity-50 animate-pulse"></div>
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white shadow-lg">
            <Bot size={28} />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Coach Aanya <Sparkles size={20} className="text-amber-400" />
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Your personalized AI wellness expert</p>
        </div>
      </div>

      <Card className="flex-1 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] flex flex-col overflow-hidden relative">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6 custom-scrollbar relative z-10">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center shrink-0 shadow-md text-white mt-auto">
                    <Bot size={20} />
                  </div>
                )}
                
                <div className={`px-6 py-4 rounded-3xl max-w-[85%] text-[15px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-br-sm' 
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 mt-auto">
                    <UserIcon size={20} className="text-slate-500 dark:text-slate-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-start items-end">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center shrink-0 shadow-md text-white">
                <Bot size={20} />
              </div>
              <div className="px-6 py-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-bl-sm flex items-center gap-1.5 shadow-sm">
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-teal-400 rounded-full"></motion.span>
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-blue-400 rounded-full"></motion.span>
                <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-indigo-400 rounded-full"></motion.span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 shrink-0 relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action, idx) => (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={idx}
                onClick={() => handleSend(action)}
                className="text-xs font-semibold px-4 py-2 bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-full transition-colors border border-slate-200 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 shadow-sm"
              >
                {action}
              </motion.button>
            ))}
          </div>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="flex gap-3 relative"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aanya anything about your health..." 
              className="flex-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-14 pl-6 pr-16 text-base rounded-2xl focus-visible:ring-teal-500 shadow-sm dark:text-slate-100"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="absolute right-2 top-2">
              <Button type="submit" disabled={!input.trim() || isTyping} className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 h-10 w-10 p-0 rounded-xl shadow-md border-0 transition-all disabled:opacity-50">
                <SendHorizontal size={18} className="text-white" />
              </Button>
            </motion.div>
          </form>
        </div>
      </Card>
    </div>
  );
}
