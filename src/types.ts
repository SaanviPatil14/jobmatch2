export type UserRole = 'candidate' | 'employer';

export interface Education {
  degree: string;
  field: string;
  cgpa: number;
}

export interface Candidate {
  id: string;
  name: string;
  skills: string[];
  experience_years: number;
  preferred_locations: string[];
  preferred_roles: string[];
  expected_salary: number;
  education: Education;
  bio: string;
  contact_email: string;
  contact_phone?: string;
}

export interface Job {
  job_id: string;
  title: string;
  required_skills: string[];
  experience_required: string;
  location: string;
  salary_range: [number, number];
  company: string;
}

export interface MatchResult {
  match_score: number;
  missing_skills: string[];
  job_id?: string;
  job_details?: Job;
  candidate_id?: string;
  candidate_details?: Candidate;
}