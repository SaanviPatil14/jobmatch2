import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Edit3, Save, Award, FileText, Target } from 'lucide-react';
import { Candidate } from '../types';

interface CandidateProfileProps {
  candidate: Candidate;
  editable?: boolean;
  onUpdate?: (c: Candidate) => void;
}

const CandidateProfileView: React.FC<CandidateProfileProps> = ({ candidate, editable, onUpdate }) => {
  const [localCandidate, setLocalCandidate] = useState(candidate);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleSave = () => {
    if (onUpdate) onUpdate(localCandidate);
    setIsEditMode(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[32px] bg-indigo-50 border-4 border-white shadow-xl flex items-center justify-center text-indigo-600 font-black text-4xl overflow-hidden">
              {candidate.name.charAt(0)}
            </div>
            {editable && (
              <button className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 opacity-0 group-hover:opacity-100 transition-all">
                <Camera size={18} />
              </button>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-black text-slate-900 leading-none mb-2">{candidate.name}</h2>
                <div className="flex flex-wrap gap-4 text-slate-400 font-bold text-sm">
                  <span className="flex items-center gap-1.5"><Mail size={16} /> {candidate.contact_email || 'No email'}</span>
                  <span className="flex items-center gap-1.5"><Phone size={16} /> {candidate.contact_phone || 'No phone'}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={16} /> {candidate.preferred_locations.join(", ")}</span>
                </div>
              </div>
              {editable && (
                <button 
                  onClick={() => isEditMode ? handleSave() : setIsEditMode(true)} 
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${isEditMode ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {isEditMode ? <><Save size={18} /> Save Profile</> : <><Edit3 size={18} /> Edit Profile</>}
                </button>
              )}
            </div>
            
            {isEditMode ? (
              <textarea 
                className="w-full p-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 transition-all outline-none font-medium text-slate-600"
                rows={3}
                value={localCandidate.bio}
                onChange={e => setLocalCandidate({...localCandidate, bio: e.target.value})}
              />
            ) : (
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-3xl">
                {candidate.bio || "No professional summary provided yet."}
              </p>
            )}
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-50 rounded-full blur-[80px] opacity-40 pointer-events-none"></div>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Expertise Bento */}
        <div className="md:col-span-2 bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Award className="text-indigo-600" size={24} />
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest text-[14px]">Technical Expertise</h3>
            </div>
            {isEditMode ? (
              <input 
                className="w-full p-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-indigo-500 transition-all outline-none font-bold"
                value={localCandidate.skills.join(", ")}
                onChange={e => setLocalCandidate({...localCandidate, skills: e.target.value.split(",").map(s => s.trim())})}
                placeholder="Skills (Comma separated)"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(s => (
                  <span key={s} className="px-5 py-3 bg-indigo-50 text-indigo-700 rounded-2xl text-sm font-black border border-indigo-100/50 hover:scale-105 transition-transform cursor-default">{s}</span>
                ))}
              </div>
            )}
        </div>

        {/* Core Metrics */}
        <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-2">Experience</div>
                  <div className="text-3xl font-black">{candidate.experience_years} Years</div>
              </div>
              <div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-2">Salary Expectations</div>
                  <div className="text-3xl font-black">${candidate.expected_salary.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] mb-2">Availability</div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold"><div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div> Open for Opportunities</div>
            </div>
        </div>

        {/* Education & Role Prefs */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-indigo-600" size={24} />
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest text-[14px]">Education</h3>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-2xl">
                  <div className="font-black text-slate-900">{candidate.education.degree} in {candidate.education.field}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">GPA: {candidate.education.cgpa}</div>
              </div>
              <div className="text-xs text-slate-400 font-medium italic">Verified via Wevolve Blockchain Registry</div>
            </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Target className="text-indigo-600" size={24} />
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest text-[14px]">Role Preferences</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Target Roles</div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.preferred_roles.map(r => <span key={r} className="text-sm font-bold text-slate-700">{r}</span>)}
                  </div>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Preferred Tech Hubs</div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.preferred_locations.map(l => <span key={l} className="text-sm font-bold text-slate-700">{l}</span>)}
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileView;