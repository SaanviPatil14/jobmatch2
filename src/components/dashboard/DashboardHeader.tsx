import React from "react";
import { LogOut } from "lucide-react";
import { UserRole } from "../../types";

interface DashboardHeaderProps {
  userRole: UserRole;
  userName: string;
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userRole,
  userName,
  onLogout,
}) => (
  <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-6 h-20 flex items-center justify-between">
    <div className="flex items-center gap-2 cursor-pointer" onClick={onLogout}>
      <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
        W
      </div>
      <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase">
        {userRole === "candidate" ? "CANDIDATE" : "EMPLOYER"}
        <span className="text-indigo-600">PRO</span>
      </h1>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right hidden sm:block">
        <div className="text-sm font-black text-slate-800 uppercase leading-none mb-1">
          {userName}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          {userRole}
        </div>
      </div>
      <button
        onClick={onLogout}
        className="p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all group"
      >
        <LogOut
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
      </button>
    </div>
  </header>
);

export default DashboardHeader;
