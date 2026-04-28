"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Apple, Dumbbell, Activity, Bot, Users, UserCircle } from "lucide-react";

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Diet", href: "/dashboard/diet", icon: Apple },
    { name: "Workout", href: "/dashboard/workout", icon: Dumbbell },
    { name: "BMI & Reports", href: "/dashboard/bmi", icon: Activity },
    { name: "AI Coach", href: "/dashboard/ai-coach", icon: Bot },
    { name: "Community", href: "/community", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-100 p-6 flex-col gap-6 sticky top-0 h-screen">
        <div className="font-bold text-2xl tracking-tight text-slate-800 mb-8">
          Samanvaya
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`px-4 py-2 rounded-lg flex items-center gap-3 transition-colors ${
                pathname.startsWith(item.href) && item.href !== "/dashboard" || pathname === item.href
                  ? "bg-slate-50 text-slate-800 font-medium" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
          <Link 
            href="/dashboard/profile" 
            className={`px-4 py-2 rounded-lg flex items-center gap-3 transition-colors mt-auto ${
              pathname === "/dashboard/profile" 
                ? "bg-slate-50 text-slate-800 font-medium" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <UserCircle size={20} />
            Profile
          </Link>
        </nav>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center p-3 z-50">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex flex-col items-center gap-1 ${
               pathname.startsWith(item.href) && item.href !== "/dashboard" || pathname === item.href ? "text-blue-500" : "text-slate-500"
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
