"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal, Bot, User as UserIcon } from "lucide-react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Namaste! I'm Aanya, your personal Samanvaya AI Coach. How can I support your wellness journey today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    "Suggest a meal fitting my macros",
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
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-center shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">AI Coach Aanya</h1>
      </div>

      <Card className="flex-1 bg-zinc-900 border-zinc-800 flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              
              <div className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-sm' 
                  : 'bg-zinc-800 text-zinc-100 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                  <UserIcon size={18} className="text-zinc-300" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-zinc-800 text-zinc-100 rounded-tl-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-75"></span>
                <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-150"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900 shrink-0">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(action)}
                className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full transition-colors border border-zinc-700"
              >
                {action}
              </button>
            ))}
          </div>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="flex gap-2"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message Aanya..." 
              className="flex-1 bg-zinc-800 border-zinc-700 h-12 text-md"
            />
            <Button type="submit" disabled={!input.trim() || isTyping} className="bg-blue-600 hover:bg-blue-700 h-12 px-6">
              <SendHorizontal size={20} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
