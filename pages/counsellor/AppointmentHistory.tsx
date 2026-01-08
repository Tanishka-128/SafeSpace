
import React from 'react';
import { Search, Filter, MessageCircle, Video, FileText } from 'lucide-react';

const AppointmentHistory: React.FC<{ user: any }> = ({ user }) => {
  const records = [
    { id: '1', patient: 'SafeUser_12', date: 'Oct 24, 2023', type: 'Video', status: 'Completed', notes: 'Discussed anxiety triggers...' },
    { id: '2', patient: 'SafeUser_44', date: 'Oct 22, 2023', type: 'Chat', status: 'Completed', notes: 'Grief counselling session 2' },
    { id: '3', patient: 'SafeUser_5', date: 'Oct 20, 2023', type: 'Video', status: 'Completed', notes: 'Follow-up on breathing tech' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Session History & Records</h2>
        <div className="flex gap-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input type="text" className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400" placeholder="Search students..." />
           </div>
           <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500"><Filter size={20} /></button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-slate-50/50 transition-all">
                <td className="px-6 py-6 font-bold text-slate-700">{record.patient}</td>
                <td className="px-6 py-6 text-slate-500 text-sm">{record.date}</td>
                <td className="px-6 py-6">
                   <div className="flex items-center gap-2 text-slate-500">
                     {record.type === 'Video' ? <Video size={16} /> : <MessageCircle size={16} />}
                     <span className="text-xs font-medium">{record.type}</span>
                   </div>
                </td>
                <td className="px-6 py-6">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <FileText size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 && (
          <div className="p-12 text-center text-slate-400">No records found.</div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
