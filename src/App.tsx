// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Changed imports
import { GoogleGenAI } from "@google/genai";
import { LogOut } from 'lucide-react';

// Imports
import { Candidate, Job, MatchResult, UserRole } from './types';
import { INITIAL_CANDIDATE, INITIAL_MOCK_JOBS, MOCK_POOL_CANDIDATES } from './data/mockData';
import { calculateMatch } from './services/engine';

import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import CandidateDashboard from './components/pages/CandidateDashboard';
import EmployerDashboard from './components/pages/EmployerDashboard';
import CandidateProfileView from './components/pages/CandidateProfile';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState<UserRole>('candidate');
  const [activeTab, setActiveTab] = useState<'matches' | 'profile'>('matches');
  
  // Dashboard State
  const [activeCandidate, setActiveCandidate] = useState<Candidate>(INITIAL_CANDIDATE);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_MOCK_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(INITIAL_MOCK_JOBS[0]);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [isAiExplaining, setIsAiExplaining] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  
  // New Job Form State
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: '', company: 'TechCorp', location: 'Bangalore', required_skills: [], experience_required: '1-3 years', salary_range: [1000000, 2000000]
  });

  // Engine Logic
  const runEngine = useCallback(() => {
    if (userRole === 'candidate') {
      const results = jobs.map(job => calculateMatch(activeCandidate, job));
      results.sort((a, b) => b.match_score - a.match_score);
      setMatches(results);
      if (results.length > 0 && !selectedMatch) setSelectedMatch(results[0]);
    } else {
      if (!selectedJob) return;
      const results = MOCK_POOL_CANDIDATES.map(cand => ({
        ...calculateMatch(cand, selectedJob),
        candidate_details: cand
      }));
      results.sort((a, b) => b.match_score - a.match_score);
      setMatches(results);
      if (results.length > 0 && !selectedMatch) setSelectedMatch(results[0]);
    }
  }, [userRole, activeCandidate, jobs, selectedJob, selectedMatch]);

  useEffect(() => {
    // Run engine only when on dashboard routes
    if (location.pathname.includes('dashboard')) {
      runEngine();
    }
  }, [runEngine, location.pathname, selectedJob]);

  // Determine if we should show the Header (Hide on Landing/Auth)
  const showHeader = location.pathname.includes('dashboard') || location.pathname === '/profile';

  const handleLogout = () => {
    navigate('/');
  };

  const handleCreateJob = () => {
    if (!newJob.title) return;
    const fullJob: Job = { ...newJob as Job, job_id: `J-${Date.now()}` };
    setJobs([...jobs, fullJob]);
    setSelectedJob(fullJob);
    setIsJobModalOpen(false);
    setNewJob({ title: '', company: 'TechCorp', location: 'Bangalore', required_skills: [], experience_required: '1-3 years', salary_range: [1000000, 2000000] });
  };

  return (
    <div className={`min-h-screen bg-slate-50 pb-20 transition-colors duration-500 ${userRole === 'candidate' ? 'bg-emerald-50/20' : 'bg-indigo-50/20'}`}>
      
      {/* GLOBAL HEADER (Only visible when logged in) */}
      {showHeader && (
        <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">W</div>
            <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase">
              {userRole === 'candidate' ? 'CANDIDATE' : 'EMPLOYER'}<span className="text-indigo-600">PRO</span>
            </h1>
          </div>
          <div className="flex items-center gap-8">
            {userRole === 'candidate' && (
              <nav className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
                <button 
                  onClick={() => navigate('/candidate-dashboard')} 
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${location.pathname === '/candidate-dashboard' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  Discover
                </button>
                <button 
                  onClick={() => navigate('/profile')} 
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${location.pathname === '/profile' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  My Profile
                </button>
              </nav>
            )}
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-black text-slate-800 uppercase leading-none mb-1">{userRole === 'candidate' ? activeCandidate.name : 'Talent Acquisition'}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{userRole}</div>
              </div>
              <button onClick={handleLogout} className="p-3 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ROUTING LOGIC */}
      <main className={showHeader ? "max-w-7xl mx-auto px-6 py-8" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage onStart={(type) => navigate('/auth')} />} />
          <Route path="/auth" element={<AuthPage />} />
          
          <Route path="/candidate-dashboard" element={
            <CandidateDashboard 
              matches={matches} 
              selectedMatch={selectedMatch} 
              setSelectedMatch={setSelectedMatch} 
              activeCandidate={activeCandidate}
              isAiExplaining={isAiExplaining}
              aiExplanation={aiExplanation}
            />
          } />

          <Route path="/profile" element={
            <CandidateProfileView candidate={activeCandidate} editable onUpdate={setActiveCandidate} />
          } />

          <Route path="/employer-dashboard" element={
            <EmployerDashboard 
               jobs={jobs}
               selectedJob={selectedJob}
               setSelectedJob={setSelectedJob}
               matches={matches}
               selectedMatch={selectedMatch}
               setSelectedMatch={setSelectedMatch}
               isJobModalOpen={isJobModalOpen}
               setIsJobModalOpen={setIsJobModalOpen}
               newJob={newJob}
               setNewJob={setNewJob}
               handleCreateJob={handleCreateJob}
               isAiExplaining={isAiExplaining}
               aiExplanation={aiExplanation}
            />
          } />
        </Routes>
      </main>
    </div>
  );
};

export default App;