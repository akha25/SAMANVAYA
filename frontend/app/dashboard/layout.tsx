"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Apple, Dumbbell, Activity, Bot, Users, UserCircle, Search, Menu, X, LogOut, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Add Data", href: "/dashboard/add-data", icon: Activity },
    { name: "Diet", href: "/dashboard/diet", icon: Apple },
    { name: "Workout", href: "/dashboard/workout", icon: Dumbbell },
    { name: "Requests", href: "/dashboard/requests", icon: Users },
    { name: "AI Coach", href: "/dashboard/ai-coach", icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans transition-colors duration-300">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shadow-xl md:shadow-sm`}>
        <div className="flex items-center justify-between mb-8">
          <div className="font-bold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
            SAMANVAYA
          </div>
          <button className="md:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`px-4 py-3 rounded-2xl flex items-center gap-3 transition-all duration-200 group relative overflow-hidden ${
                  isActive 
                    ? "text-white shadow-md shadow-teal-500/20" 
                    : "text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon size={20} className={`z-10 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
                <span className="z-10 font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto space-y-2">
          <Link 
            href="/dashboard/profile" 
            className={`px-4 py-3 rounded-2xl flex items-center gap-3 transition-all duration-200 group relative overflow-hidden ${
              pathname === "/dashboard/profile" 
                ? "text-white shadow-md shadow-teal-500/20" 
                : "text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            }`}
          >
            {pathname === "/dashboard/profile" && (
              <motion.div 
                layoutId="sidebar-active"
                className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 z-0"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <UserCircle size={20} className="z-10 group-hover:scale-110 transition-transform" />
            <span className="z-10 font-medium">Profile</span>
          </Link>
          <button className="w-full px-4 py-3 rounded-2xl flex items-center gap-3 transition-all duration-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 font-medium group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4 flex items-center justify-between transition-colors duration-300 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-teal-500/20 rounded-full text-sm outline-none transition-all w-64 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <Link href="/dashboard/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold leading-none">Alex</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Premium Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 p-0.5 shadow-md shadow-teal-500/20">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 border-2 border-transparent flex items-center justify-center overflow-hidden">
                  <UserCircle size={24} className="text-slate-400" />
                </div>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
