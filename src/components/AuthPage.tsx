import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupEmail, loginEmail, continueWithGoogle, resendVerificationEmail } from '../authService';

// Ensure onLogin is destructured from props here
const AuthPage = ({ onLogin }) => {
  const [userType, setUserType] = useState('candidate');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLoginMode) {
        const { role } = await loginEmail(email, password);
        // Call the global state updater
        if (onLogin) onLogin(role); 
        navigate(role === 'employer' ? '/employer-dashboard' : '/candidate-dashboard');
      } else {
        await signupEmail(email, password, userType, name);
        alert("Account created! Please check your email.");
        setIsLoginMode(true);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const { role } = await continueWithGoogle(userType);
      if (onLogin) onLogin(role);
      navigate(role === 'employer' ? '/employer-dashboard' : '/candidate-dashboard');
    } catch (error) {
      alert("Google Sign In failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-xl shadow-indigo-200">W</div>
          <h2 className="text-3xl font-black text-slate-900">{isLoginMode ? 'Welcome Back' : 'Create Account'}</h2>
        </div>

        <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
          <button type="button" onClick={() => setUserType('candidate')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${userType === 'candidate' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>Candidate</button>
          <button type="button" onClick={() => setUserType('employer')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${userType === 'employer' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>Employer</button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLoginMode && <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-medium" onChange={(e) => setName(e.target.value)} required />}
          <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-medium" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-medium" onChange={(e) => setPassword(e.target.value)} required />
          <button disabled={loading} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all mt-4">{loading ? 'Processing...' : (isLoginMode ? 'Sign In' : 'Join Wevolve')}</button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-xs uppercase font-bold"><span className="px-4 bg-white text-slate-400">Or Continue With</span></div>
        </div>

        <button type="button" onClick={handleGoogle} className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold flex items-center justify-center gap-3">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
          <span>Google</span>
        </button>

        <div className="mt-10 text-center">
          <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="text-sm text-slate-400 font-medium hover:text-indigo-600">{isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Login"}</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;