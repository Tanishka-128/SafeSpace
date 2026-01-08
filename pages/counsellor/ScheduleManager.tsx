
import React, { useState } from 'react';
import { Calendar, Clock, DollarSign, CheckCircle, Save } from 'lucide-react';

const ScheduleManager: React.FC<{ user: any }> = ({ user }) => {
  const [fee, setFee] = useState(1500);
  const [availability, setAvailability] = useState({
    Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false
  });
  const [slots, setSlots] = useState([
    '09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'
  ]);

  const toggleDay = (day: string) => {
    setAvailability(prev => ({ ...prev, [day]: !prev[day as keyof typeof prev] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Schedule</h2>
          <p className="text-slate-500">Set your working days, hours, and session charges.</p>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <DollarSign className="text-emerald-500" size={20} /> Session Fee
          </h3>
          <div className="flex items-center gap-4">
             <div className="relative flex-1 max-w-xs">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
               <input
                 type="number"
                 className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                 value={fee}
                 onChange={(e) => setFee(parseInt(e.target.value))}
               />
             </div>
             <p className="text-sm text-slate-400 italic">Recommended: ₹1000 - ₹3000</p>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="text-indigo-500" size={20} /> Working Days
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.keys(availability).map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`w-12 h-12 rounded-xl font-bold transition-all flex items-center justify-center ${
                  availability[day as keyof typeof availability] ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {day[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-slate-50">
          <div className="flex justify-between items-center">
             <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <Clock className="text-amber-500" size={20} /> Active Time Slots
             </h3>
             <button className="text-xs font-bold text-indigo-600">+ Add New</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
             {slots.map((slot) => (
               <div key={slot} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group">
                 <span className="font-bold text-slate-700">{slot}</span>
                 <button className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">✕</button>
               </div>
             ))}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex justify-end">
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2">
            <Save size={20} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager;
