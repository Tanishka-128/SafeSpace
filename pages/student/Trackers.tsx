
import React, { useState } from 'react';
import { 
  Droplet, 
  Activity, 
  Smile, 
  Calendar as CalendarIcon, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', mood: 3, water: 1.5, steps: 4000 },
  { name: 'Tue', mood: 4, water: 2.1, steps: 6000 },
  { name: 'Wed', mood: 2, water: 1.8, steps: 3500 },
  { name: 'Thu', mood: 5, water: 2.5, steps: 8000 },
  { name: 'Fri', mood: 4, water: 2.0, steps: 7200 },
  { name: 'Sat', mood: 5, water: 1.5, steps: 5000 },
  { name: 'Sun', mood: 4, water: 2.2, steps: 4500 },
];

const Trackers: React.FC<{ user: any }> = ({ user }) => {
  const [mood, setMood] = useState<string | null>(null);
  const [water, setWater] = useState(0);

  return (
    <div className="space-y-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Mood Tracker */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
             <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><Smile /></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase">Daily Mood</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">How are you?</h3>
          <div className="flex justify-between">
            {['😢', '😕', '😐', '🙂', '😊'].map((emoji, i) => (
              <button
                key={i}
                onClick={() => setMood(emoji)}
                className={`text-2xl p-2 rounded-lg transition-all ${mood === emoji ? 'bg-amber-100 scale-110' : 'hover:bg-slate-50'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
          {mood && <p className="text-center text-xs font-bold text-slate-700">Currently feeling: {mood}</p>}
        </div>

        {/* Water Tracker */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
             <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center"><Droplet /></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase">Hydration</span>
          </div>
          <div className="flex justify-between items-end">
             <div>
               <h3 className="text-2xl font-bold text-slate-900">{water} / 8</h3>
               <p className="text-xs text-slate-500 font-medium">Glasses of water</p>
             </div>
             <button onClick={() => setWater(prev => Math.min(8, prev + 1))} className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg hover:bg-blue-700 transition-shadow shadow-sm">+</button>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
             <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${(water / 8) * 100}%` }}></div>
          </div>
        </div>

        {/* Activity Tracker */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
             <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><Activity /></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase">Steps</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">6,432</h3>
          <p className="text-xs text-slate-500 font-medium">Goal: 10,000 steps</p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
             <div className="bg-emerald-500 h-full w-[64%]"></div>
          </div>
        </div>

        {/* Menstrual Tracker (Conditional) */}
        {user.gender === 'female' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
               <div className="w-10 h-10 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center"><CalendarIcon /></div>
               <span className="text-[10px] font-bold text-slate-500 uppercase">Cycle</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Day 12</h3>
            <p className="text-xs text-slate-500 font-medium">Next period in 16 days</p>
            <button className="text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-pink-100 transition-colors">Log Symptoms <ChevronRight size={12} /></button>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Health Trends</h3>
            <p className="text-sm text-slate-500 font-medium">Your progress over the last 7 days.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
               <div className="w-3 h-3 bg-indigo-500 rounded-full"></div> Mood
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
               <div className="w-3 h-3 bg-blue-500 rounded-full"></div> Water
            </div>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={10} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', color: '#1e293b' }}
              />
              <Area type="monotone" dataKey="mood" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorMood)" />
              <Area type="monotone" dataKey="water" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Trackers;
