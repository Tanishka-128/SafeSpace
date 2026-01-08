
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Wind, 
  BookOpen, 
  Calendar, 
  Activity, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { User } from '../../types';
import { HELPLINES, MOTIVATIONAL_QUOTES } from '../../constants';

interface StudentHomeProps {
  user: User;
}

const StudentHome: React.FC<StudentHomeProps> = ({ user }) => {
  const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

  const quickLinks = [
    { title: 'Chat with Aira', desc: 'AI Emotional Support', path: '/aira', icon: <MessageCircle className="text-pink-500" />, color: 'bg-pink-50' },
    { title: 'Relaxation', desc: 'Breathing & Sounds', path: '/relax', icon: <Wind className="text-blue-500" />, color: 'bg-blue-50' },
    { title: 'Counselling', desc: 'Book Professional Help', path: '/counselling', icon: <Calendar className="text-emerald-500" />, color: 'bg-emerald-50' },
    { title: 'Daily Journal', desc: 'Reflect on your day', path: '/journal', icon: <BookOpen className="text-amber-500" />, color: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Header */}
      <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Hello, {user.anonymousName}!</h1>
          <p className="text-indigo-100 max-w-lg mb-6">Welcome to your safe space. Remember, you're not alone on this journey.</p>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 inline-block italic text-sm">
            "{randomQuote}"
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Access */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center`}>
                    {link.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{link.title}</h4>
                    <p className="text-sm text-slate-500">{link.desc}</p>
                  </div>
                </div>
                <ArrowRight className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" size={20} />
              </Link>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-indigo-500" /> Recent Trackers
            </h3>
            <div className="flex gap-4">
               <div className="flex-1 p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Mood</p>
                 <p className="text-xl">😊 Happy</p>
               </div>
               <div className="flex-1 p-4 bg-slate-50 rounded-xl border border-slate-100">
                 <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Water</p>
                 <p className="text-xl">1.2L / 2L</p>
               </div>
            </div>
          </div>
        </div>

        {/* Crisis Panel */}
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2">
              <ShieldAlert size={20} /> Crisis Helplines
            </h3>
            <div className="space-y-4">
              {HELPLINES.map((line) => (
                <div key={line.number} className="bg-white p-3 rounded-xl border border-red-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-500">{line.name}</p>
                    <p className="font-bold text-red-600">{line.number}</p>
                  </div>
                  <a href={`tel:${line.number}`} className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors">
                    Call
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-red-600 italic">
              * Available 24/7. Always reach out if you're in immediate danger.
            </p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
             <h4 className="font-bold text-indigo-800 mb-2">Feeling Overwhelmed?</h4>
             <p className="text-sm text-indigo-700 mb-4">Aira, our AI companion, is always ready to talk and help you ground yourself.</p>
             <Link to="/aira" className="w-full inline-block text-center bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">
               Talk to Aira
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
