
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole, Gender } from '../types';

interface RegisterProps {
  onRegister: (user: User) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<number>(18);
  const [gender, setGender] = useState<Gender>('other');
  const [fullName, setFullName] = useState('');
  const [license, setLicense] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      anonymousName: role === UserRole.STUDENT ? `SafeUser_${Math.floor(Math.random() * 1000)}` : undefined,
      fullName: role === UserRole.COUNSELLOR ? fullName : undefined,
      licenseNumber: role === UserRole.COUNSELLOR ? license : undefined,
      age: role === UserRole.STUDENT ? age : undefined,
      gender,
    };
    
    localStorage.setItem('safespace_user', JSON.stringify(mockUser));
    onRegister(mockUser);
    navigate(role === UserRole.STUDENT ? '/home' : '/c-home');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
            <h1 className="text-2xl font-bold text-slate-800">SafeSpace</h1>
          </div>
          
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Join our Community</h2>
          <p className="text-slate-500 mb-8">Create an account to access professional help or anonymous tools.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
             <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setRole(UserRole.STUDENT)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${role === UserRole.STUDENT ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Student (Anonymous)
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.COUNSELLOR)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${role === UserRole.COUNSELLOR ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Professional Counsellor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {role === UserRole.STUDENT ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Age (Max 25)</label>
                  <input
                    type="number"
                    max="25"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">License Number</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
                    placeholder="e.g., MH-123456"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg mt-4 transition-all"
            >
              Complete Registration
            </button>
          </form>

          <p className="text-center mt-6 text-slate-500">
            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
