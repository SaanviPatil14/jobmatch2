import React from "react";
import { User, Briefcase, Plus, Zap } from "lucide-react";
import { UserRole, Candidate, Job, MatchResult } from "../../types";

interface DashboardSidebarProps {
  userRole: UserRole;
  activeCandidate: Candidate;
  setActiveCandidate: (c: Candidate) => void;
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: (j: Job) => void;
  onOpenJobModal: () => void;
  matchesCount: number;
  totalPoolSize: number;
  onRunAnalysis: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  userRole,
  activeCandidate,
  setActiveCandidate,
  jobs,
  selectedJob,
  setSelectedJob,
  onOpenJobModal,
  matchesCount,
  totalPoolSize,
  onRunAnalysis,
}) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <section className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-hidden relative group">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                userRole === "candidate"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-indigo-100 text-indigo-600"
              }`}
            >
              {userRole === "candidate" ? (
                <User size={20} />
              ) : (
                <Briefcase size={20} />
              )}
            </div>
            <h2 className="text-xl font-black text-slate-900">
              {userRole === "candidate" ? "My Profile" : "My Vacancies"}
            </h2>
          </div>
          {userRole === "employer" && (
            <button
              onClick={onOpenJobModal}
              className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              <Plus size={20} />
            </button>
          )}
        </div>

        {userRole === "candidate" ? (
          <div className="space-y-4">
            <div className="relative group/input">
              <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block ml-1 tracking-widest">
                Expertise Areas
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all"
                value={activeCandidate.skills.join(", ")}
                onChange={(e) =>
                  setActiveCandidate({
                    ...activeCandidate,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block ml-1 tracking-widest">
                  Exp (Yrs)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all"
                  value={activeCandidate.experience_years}
                  onChange={(e) =>
                    setActiveCandidate({
                      ...activeCandidate,
                      experience_years: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase mb-1 block ml-1 tracking-widest">
                  Min Ask ($)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none text-sm font-bold transition-all"
                  value={activeCandidate.expected_salary}
                  onChange={(e) =>
                    setActiveCandidate({
                      ...activeCandidate,
                      expected_salary: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {jobs.map((job) => (
              <button
                key={job.job_id}
                onClick={() => setSelectedJob(job)}
                className={`w-full p-5 rounded-3xl text-left transition-all relative group/job ${
                  selectedJob?.job_id === job.job_id
                    ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-100 scale-[1.02]"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-black text-lg leading-none">
                    {job.title}
                  </div>
                  <div
                    className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                      selectedJob?.job_id === job.job_id
                        ? "bg-white/20 text-white"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {totalPoolSize} APPS
                  </div>
                </div>
                <div
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    selectedJob?.job_id === job.job_id
                      ? "text-indigo-100"
                      : "text-slate-400"
                  }`}
                >
                  {job.location} • {job.experience_required}
                </div>
              </button>
            ))}
            {jobs.length === 0 && (
              <div className="text-center py-10 text-slate-300 font-bold italic">
                No active job listings.
              </div>
            )}
          </div>
        )}
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-40 h-40 rounded-full blur-[80px] opacity-20 pointer-events-none group-hover:scale-125 transition-transform duration-1000 ${
            userRole === "candidate" ? "bg-emerald-400" : "bg-indigo-400"
          }`}
        ></div>
      </section>

      <section className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-amber-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              System Core v3.2
            </span>
          </div>
          <h3 className="text-2xl font-black mb-4 leading-tight italic">
            {userRole === "candidate"
              ? `${matchesCount} High-Yield Roles Found`
              : `${totalPoolSize} Profiles Synced for Review`}
          </h3>
          <button
            onClick={onRunAnalysis}
            className="w-full py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md"
          >
            {userRole === "candidate"
              ? "Optimize Profile"
              : "Run Batch Analysis"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default DashboardSidebar;
