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
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Header Section: Compact & Centered */}
      <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col items-center text-center gap-4 relative z-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-[24px] bg-indigo-50 border-4 border-white shadow-lg flex items-center justify-center text-indigo-600 font-black text-3xl">
              {candidate.name.charAt(0)}
            </div>
            {editable && (
              <button className="absolute -bottom-1 -right-1 p-2 bg-indigo-600 text-white rounded-xl shadow-md">
                <Camera size={14} />
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 leading-tight">{candidate.name}</h2>
            <div className="flex flex-col gap-1.5 text-slate-400 font-bold text-xs">
              <span className="flex items-center justify-center gap-1.5"><Mail size={14} /> {candidate.contact_email}</span>
              <span className="flex items-center justify-center gap-1.5"><MapPin size={14} /> {candidate.preferred_locations[0]}</span>
            </div>
          </div>

          {editable && (
            <button 
              onClick={() => isEditMode ? handleSave() : setIsEditMode(true)} 
              className={`mt-2 flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all ${isEditMode ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}
            >
              {isEditMode ? <><Save size={14} /> Save</> : <><Edit3 size={14} /> Edit</>}
            </button>
          )}
        </div>
      </div>

      {/* 2. Core Metrics: Dark Bento Style */}
      <div className="bg-slate-900 rounded-[32px] p-6 text-white shadow-xl space-y-5">
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Experience</div>
          <div className="text-xl font-black">{candidate.experience_years} Years</div>
        </div>
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Expectation</div>
          <div className="text-xl font-black">${candidate.expected_salary.toLocaleString()}</div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs pt-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> 
          Open for Opportunities
        </div>
      </div>

      {/* 3. Expertise Section: Wrapping Tags */}
      <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Award className="text-indigo-600" size={18} />
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Technical Expertise</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {candidate.skills.map(s => (
            <span key={s} className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black border border-indigo-100/50">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* 4. Education & Preferences: Stacked List */}
      <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="text-indigo-600" size={18} />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Education</h3>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="font-black text-slate-900 text-sm leading-tight">{candidate.education.degree}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">GPA: {candidate.education.cgpa}</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="text-indigo-600" size={18} />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Preferences</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl">
              <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Roles</div>
              <div className="flex flex-wrap gap-1.5">
                {candidate.preferred_roles.map(r => <span key={r} className="text-[10px] font-bold text-slate-700">{r}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileView;