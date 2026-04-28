"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Apple, Dumbbell, Activity, Bot, Users, UserCircle } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Add Data", href: "/dashboard/add-data", icon: Activity },
    { name: "Diet", href: "/dashboard/diet", icon: Apple },
    { name: "Workout", href: "/dashboard/workout", icon: Dumbbell },
    { name: "Requests", href: "/dashboard/requests", icon: Users },
    { name: "AI Coach", href: "/dashboard/ai-coach", icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col md:flex-row pb-16 md:pb-0 font-sans">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 p-6 flex-col gap-6 sticky top-0 h-screen shadow-sm">
        <div className="font-bold text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500 mb-8">
          SAMANVAYA
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                pathname === item.href 
                  ? "bg-teal-50 text-teal-600 font-semibold" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-teal-600"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
          <Link 
            href="/dashboard/profile" 
            className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-all mt-auto ${
              pathname === "/dashboard/profile" 
                ? "bg-teal-50 text-teal-600 font-semibold" 
                : "text-slate-500 hover:bg-slate-50 hover:text-teal-600"
            }`}
          >
            <UserCircle size={20} />
            Profile
          </Link>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div className="font-bold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
            SAMANVAYA
          </div>
          <Link href="/dashboard/profile" className="text-slate-500">
            <UserCircle size={24} />
          </Link>
        </div>
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center p-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.slice(0, 5).map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex flex-col items-center gap-1 ${
              pathname === item.href ? "text-teal-600 font-medium" : "text-slate-400"
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px]">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
