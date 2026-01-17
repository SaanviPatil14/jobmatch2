import React from 'react';
import { Zap, BrainCircuit, Sparkles } from 'lucide-react';
import { MatchResult, Candidate } from '../types';

interface CandidateDashboardProps {
  matches: MatchResult[];
  selectedMatch: MatchResult | null;
  setSelectedMatch: (match: MatchResult) => void;
  activeCandidate: Candidate;
  isAiExplaining: boolean;
  aiExplanation: string;
}

const CandidateDashboard: React.FC<CandidateDashboardProps> = ({
  matches,
  selectedMatch,
  setSelectedMatch,
  activeCandidate,
  isAiExplaining,
  aiExplanation,
}) => {
  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Left Sidebar - Matches List */}
      <div className="lg:col-span-4 space-y-6">
        <section className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 overflow-hidden relative">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-100 text-emerald-600">
                <Zap size={20}/>
              </div>
              <h2 className="text-xl font-black text-slate-900">Best Matches</h2>
            </div>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {matches.map(m => (
              <button key={m.job_id} onClick={() => setSelectedMatch(m)} className={`w-full p-5 rounded-3xl text-left transition-all relative ${selectedMatch?.job_id === m.job_id ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100 scale-[1.02]' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                <div className="flex justify-between items-start mb-2">
                   <div className="font-black text-lg leading-none">{m.job_details?.title}</div>
                   <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${selectedMatch?.job_id === m.job_id ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
                    {Math.round(m.match_score)}%
                   </div>
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedMatch?.job_id === m.job_id ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {m.job_details?.company} • {m.job_details?.location}
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-8 space-y-6">
         {/* Context Header */}
         <div className="rounded-[32px] p-10 text-white shadow-2xl overflow-hidden relative transition-all duration-700 bg-emerald-600">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <BrainCircuit className="text-white animate-pulse" size={32} />
                <div className="text-sm font-black tracking-widest uppercase opacity-70">
                  Global Career Opportunities
                </div>
            </div>
            <h2 className="text-4xl font-black mb-4">
              Optimized for Your Path
            </h2>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full translate-x-20 -translate-y-20"></div>
        </div>

        <div className="md:col-span-2">
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

              {/* Job details */}
              {selectedMatch.job_details && (
                  <div className="bg-white rounded-[32px] border border-slate-100 p-10 shadow-sm space-y-8">
                    <div className="flex justify-between items-start">
                       <div>
                          <h2 className="text-4xl font-black text-slate-900 mb-2">{selectedMatch.job_details.title}</h2>
                          <div className="text-xl font-bold text-indigo-600">{selectedMatch.job_details.company}</div>
                       </div>
                       <div className="bg-indigo-50 text-indigo-600 px-6 py-4 rounded-[24px] font-black text-2xl">
                          {Math.round(selectedMatch.match_score)}% Match
                       </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                       <div className="p-6 bg-slate-50 rounded-[24px]">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Location</div>
                          <div className="font-bold">{selectedMatch.job_details.location}</div>
                       </div>
                       <div className="p-6 bg-slate-50 rounded-[24px]">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Experience</div>
                          <div className="font-bold">{selectedMatch.job_details.experience_required}</div>
                       </div>
                       <div className="p-6 bg-slate-50 rounded-[24px]">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Salary Range</div>
                          <div className="font-bold">${selectedMatch.job_details.salary_range[0].toLocaleString()} - ${selectedMatch.job_details.salary_range[1].toLocaleString()}</div>
                       </div>
                    </div>

                    <div>
                       <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Required Stack</h3>
                       <div className="flex flex-wrap gap-2">
                          {selectedMatch.job_details.required_skills.map(s => (
                             <span key={s} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeCandidate.skills.includes(s) ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                {s}
                             </span>
                          ))}
                       </div>
                    </div>
                    
                    <button className="w-full py-6 bg-emerald-600 text-white rounded-[24px] font-black text-xl shadow-xl shadow-emerald-100 hover:scale-[1.02] transition-all">Submit Application</button>
                  </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-[32px] border-dashed border-2 border-slate-200 p-24 text-center">
              <p className="text-slate-400 font-bold">Select a job opportunity to review analytics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;