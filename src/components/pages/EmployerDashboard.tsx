import React from 'react';
import { Briefcase, Plus, BrainCircuit, Sparkles, X } from 'lucide-react';
import { MatchResult, Job } from '../types';
import CandidateProfile from './CandidateProfile';

interface EmployerDashboardProps {
  jobs: Job[];
  selectedJob: Job | null;
  setSelectedJob: (job: Job) => void;
  matches: MatchResult[];
  selectedMatch: MatchResult | null;
  setSelectedMatch: (match: MatchResult) => void;
  isJobModalOpen: boolean;
  setIsJobModalOpen: (open: boolean) => void;
  newJob: Partial<Job>;
  setNewJob: (job: Partial<Job>) => void;
  handleCreateJob: () => void;
  isAiExplaining: boolean;
  aiExplanation: string;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  jobs, selectedJob, setSelectedJob,
  matches, selectedMatch, setSelectedMatch,
  isJobModalOpen, setIsJobModalOpen,
  newJob, setNewJob, handleCreateJob,
  isAiExplaining, aiExplanation
}) => {
  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Left Sidebar - Active Vacancies */}
      <div className="lg:col-span-4 space-y-6">
        <section className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-hidden relative">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-100 text-indigo-600">
                <Briefcase size={20}/>
              </div>
              <h2 className="text-xl font-black text-slate-900">Active Vacancies</h2>
            </div>
            <button onClick={() => setIsJobModalOpen(true)} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {jobs.map(job => (
              <button key={job.job_id} onClick={() => setSelectedJob(job)} className={`w-full p-5 rounded-3xl text-left transition-all relative ${selectedJob?.job_id === job.job_id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-[1.02]' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                <div className="flex justify-between items-start mb-2">
                   <div className="font-black text-lg leading-none">{job.title}</div>
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedJob?.job_id === job.job_id ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {job.location} • {job.experience_required}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-8 space-y-6">
         {/* Context Header */}
         <div className="rounded-[32px] p-10 text-white shadow-2xl overflow-hidden relative transition-all duration-700 bg-indigo-600">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <BrainCircuit className="text-white animate-pulse" size={32} />
                <div className="text-sm font-black tracking-widest uppercase opacity-70">
                  Hiring Intelligence: {selectedJob?.title}
                </div>
            </div>
            <h2 className="text-4xl font-black mb-4">
              {matches.length} Candidates Screened
            </h2>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full translate-x-20 -translate-y-20"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Secondary List (Pipeline) */}
          <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm flex flex-col h-[700px]">
            <div className="px-8 py-6 border-b bg-slate-50/50 flex items-center justify-between font-black text-[10px] uppercase text-slate-400 tracking-wider">
              Applicant Pipeline
            </div>
            <div className="divide-y overflow-y-auto flex-1 custom-scrollbar">
              {matches.map(m => (
                <button key={m.candidate_id} onClick={() => setSelectedMatch(m)} className={`w-full p-8 text-left flex items-center gap-6 transition-all hover:bg-slate-50 ${selectedMatch?.candidate_id === m.candidate_id ? 'bg-slate-50 border-l-[12px] border-l-indigo-600' : ''}`}>
                  <div className={`w-16 h-16 rounded-3xl flex flex-col items-center justify-center font-black ${m.match_score > 80 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    <div className="text-lg leading-none">{Math.round(m.match_score)}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-slate-900 text-xl leading-tight mb-1">{m.candidate_details?.name}</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{m.candidate_details?.education.degree}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Match Analysis */}
          <div>
            {selectedMatch ? (
              <div className="space-y-6">
                {/* AI Thinking Section */}
                <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em] flex items-center gap-2">
                      <Sparkles size={16}/> Gemini Synthesis
                    </h3>
                  </div>
                  {isAiExplaining ? (
                    <div className="space-y-4 animate-pulse">
                      <div className="h-4 bg-white/5 rounded-xl w-full"></div>
                      <div className="h-4 bg-white/5 rounded-xl w-5/6"></div>
                    </div>
                  ) : (
                    <div className="relative z-10">
                      <p className="text-lg font-medium text-slate-200 leading-relaxed italic border-l-4 border-indigo-500 pl-6 mb-8">
                        "{aiExplanation}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Candidate Profile Preview */}
                {selectedMatch.candidate_details && (
                  <CandidateProfile candidate={selectedMatch.candidate_details} />
                )}
              </div>
            ) : (
              <div className="bg-white rounded-[32px] border-dashed border-2 border-slate-200 p-24 text-center">
                <p className="text-slate-400 font-bold">Select a candidate to review analytics</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CREATE JOB MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsJobModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl relative z-10 p-10 overflow-hidden border border-slate-100">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">New Vacancy</h2>
                  <p className="text-slate-400 font-medium">Define your target professional profile.</p>
               </div>
               <button onClick={() => setIsJobModalOpen(false)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all"><X size={24} className="text-slate-400" /></button>
            </div>
            <div className="space-y-6">
               <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Job Title" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} />
                  <select className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})}>
                    <option>Remote</option><option>Bangalore</option><option>Hyderabad</option>
                  </select>
               </div>
               <input type="text" placeholder="Required Expertise (Comma separated)" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold" value={newJob.required_skills?.join(", ")} onChange={e => setNewJob({...newJob, required_skills: e.target.value.split(",").map(s => s.trim())})} />
               <button onClick={handleCreateJob} className="w-full py-6 bg-indigo-600 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all mt-6">Publish Opportunity</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;