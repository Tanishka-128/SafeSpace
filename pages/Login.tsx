
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      anonymousName: role === UserRole.STUDENT ? `SafeUser_${Math.floor(Math.random() * 1000)}` : undefined,
      fullName: role === UserRole.COUNSELLOR ? 'Dr. Alex Rivera' : undefined,
      gender: 'female',
      age: 22,
    };
    
    localStorage.setItem('safespace_user', JSON.stringify(mockUser));
    onLogin(mockUser);
    navigate(role === UserRole.STUDENT ? '/home' : '/c-home');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
            <h1 className="text-2xl font-bold text-slate-800">SafeSpace</h1>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-8">Your journey to mental wellness continues here.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setRole(UserRole.STUDENT)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${role === UserRole.STUDENT ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.COUNSELLOR)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${role === UserRole.COUNSELLOR ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Counsellor
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500">
            Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
