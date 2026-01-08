
import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Calendar, 
  TrendingUp, 
  ArrowRight,
  MessageCircle,
  Video
} from 'lucide-react';
import { User } from '../../types';
import { Link } from 'react-router-dom';

const CounsellorHome: React.FC<{ user: User }> = ({ user }) => {
  const stats = [
    { label: 'Total Sessions', value: '142', icon: <CheckCircle2 className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Active Students', value: '18', icon: <Users className="text-indigo-600" />, color: 'bg-indigo-50' },
    { label: 'Earnings', value: '₹42,500', icon: <TrendingUp className="text-blue-600" />, color: 'bg-blue-50' },
  ];

  const appointments = [
    { id: 'app1', name: 'SafeUser_421', time: '10:30 AM', date: 'Today', type: 'Video' },
    { id: 'app2', name: 'SafeUser_99', time: '02:00 PM', date: 'Today', type: 'Chat' },
    { id: 'app3', name: 'SafeUser_104', time: '11:00 AM', date: 'Tomorrow', type: 'Video' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.fullName}</h1>
          <p className="text-slate-400 max-w-lg mb-6">You have 2 sessions scheduled for today. Ready to make a difference?</p>
          <div className="flex gap-4">
             <Link to="/c-schedule" className="bg-white text-slate-900 px-6 py-2 rounded-xl font-bold hover:bg-slate-100 transition-all text-sm">Update Schedule</Link>
             <Link to="/c-history" className="bg-slate-800 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-700 transition-all text-sm">View Records</Link>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-2xl flex items-center justify-center`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Calendar size={20} className="text-indigo-500" /> Upcoming Sessions
            </h3>
            <Link to="/c-history" className="text-sm font-bold text-indigo-600 hover:underline">View All</Link>
          </div>
          
          <div className="space-y-4">
            {appointments.map((app) => (
              <div key={app.id} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/30 flex items-center justify-between group hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${app.type === 'Video' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'} rounded-xl flex items-center justify-center`}>
                    {app.type === 'Video' ? <Video size={20} /> : <MessageCircle size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{app.name}</p>
                    <p className="text-xs text-slate-500">{app.date} • {app.time} • {app.type} Session</p>
                  </div>
                </div>
                <Link
                  to={`/c-session/${app.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2"
                >
                  Join <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-lg space-y-4">
             <h4 className="font-bold text-xl">Quick Stats</h4>
             <div className="space-y-3">
               <div className="flex justify-between text-sm">
                 <span className="text-indigo-200">Satisfaction Rate</span>
                 <span className="font-bold">98%</span>
               </div>
               <div className="w-full h-1.5 bg-white/20 rounded-full">
                 <div className="h-full bg-white w-[98%] rounded-full"></div>
               </div>
               <div className="flex justify-between text-sm pt-2">
                 <span className="text-indigo-200">New Patients</span>
                 <span className="font-bold">+4 this week</span>
               </div>
             </div>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-800 mb-4">Verification Status</h4>
              <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 p-4 rounded-2xl">
                 <CheckCircle2 size={24} />
                 <div>
                   <p className="font-bold">Verified Professional</p>
                   <p className="text-xs">Your license MH-92381 is active.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellorHome;
