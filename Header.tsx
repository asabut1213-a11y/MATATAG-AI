
import React from 'react';
import { GraduationCap, ShieldCheck, Settings, Heart } from 'lucide-react';

interface HeaderProps {
  onSupportClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSupportClick }) => {
  return (
    <header className="glass border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative group cursor-pointer">
            <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl shadow-slate-200 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
              MATATAG <span className="text-blue-600 font-black">AI</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mt-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" /> Professional Edition
            </p>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={onSupportClick}
              className="p-2.5 text-slate-400 hover:text-rose-500 transition-all hover:bg-rose-50 rounded-xl group relative"
              title="Support the Creator"
            >
              <Heart className="w-5 h-5 group-hover:fill-rose-500" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            </button>
            <button className="p-2.5 text-slate-400 hover:text-slate-600 transition-all hover:bg-slate-50 rounded-xl">
              <Settings className="w-5 h-5" />
            </button>
            <button className="bg-slate-900 text-white text-[10px] font-black px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:translate-y-px uppercase tracking-widest">
              Premium Account
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
