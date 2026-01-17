import React, { useState } from "react";
import { X } from "lucide-react";
import { Job } from "../../types";

interface CreateJobModalProps {
  onClose: () => void;
  onCreate: (job: Partial<Job>) => void;
}

const CreateJobModal: React.FC<CreateJobModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [newJob, setNewJob] = useState<Partial<Job>>({
    title: "",
    company: "TechCorp",
    location: "Bangalore",
    required_skills: [],
    experience_required: "1-3 years",
    salary_range: [1000000, 2000000],
  });

  const handleSubmit = () => {
    if (!newJob.title) return;
    onCreate(newJob);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white w-full max-w-2xl rounded-[48px] shadow-2xl relative z-10 p-10 overflow-hidden border border-slate-100">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 leading-none mb-2">
              Create Vacancy
            </h2>
            <p className="text-slate-400 font-medium">
              Define your target professional profile.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                Job Title
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Architect"
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold"
                value={newJob.title}
                onChange={(e) =>
                  setNewJob({ ...newJob, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                Location
              </label>
              <select
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold appearance-none"
                value={newJob.location}
                onChange={(e) =>
                  setNewJob({ ...newJob, location: e.target.value })
                }
              >
                <option>Remote</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>SF / Bay Area</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
              Required Expertise (Comma separated)
            </label>
            <input
              type="text"
              placeholder="React, TypeScript, AWS..."
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold"
              value={newJob.required_skills?.join(", ")}
              onChange={(e) =>
                setNewJob({
                  ...newJob,
                  required_skills: e.target.value
                    .split(",")
                    .map((s) => s.trim()),
                })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                Experience Range
              </label>
              <select
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold appearance-none"
                value={newJob.experience_required}
                onChange={(e) =>
                  setNewJob({ ...newJob, experience_required: e.target.value })
                }
              >
                <option>0-2 years</option>
                <option>2-5 years</option>
                <option>5-8 years</option>
                <option>8+ years</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">
                Max Budget ($)
              </label>
              <input
                type="number"
                placeholder="2000000"
                className="w-full px-6 py-4 bg-slate-50 rounded-2xl border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none font-bold"
                value={newJob.salary_range?.[1]}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    salary_range: [1000000, Number(e.target.value)],
                  })
                }
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-6 bg-indigo-600 text-white rounded-[24px] font-black text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all mt-6"
          >
            Publish Opportunity
          </button>
        </div>
        <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-indigo-100 rounded-full blur-[80px] opacity-30 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CreateJobModal;
