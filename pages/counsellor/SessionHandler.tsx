
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mic, MicOff, 
  Video as VideoIcon, VideoOff, 
  PhoneOff, 
  MessageCircle, 
  FileText,
  Lock,
  Share2
} from 'lucide-react';

const SessionHandler: React.FC<{ user: any }> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const endSession = () => {
    if (confirm('Are you sure you want to end this session?')) {
      navigate('/c-home');
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6">
      <div className="flex-1 flex flex-col bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl">
        {/* Main Feed */}
        <div className="flex-1 relative flex items-center justify-center p-8">
           <div className="w-full max-w-4xl aspect-video bg-slate-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
             {video ? (
               <img src="https://picsum.photos/seed/student/1280/720" className="w-full h-full object-cover opacity-80" />
             ) : (
               <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">S</div>
             )}
             <div className="absolute top-6 left-6 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-white font-bold uppercase tracking-wider">Session Active • 24:12</span>
             </div>
             <div className="absolute bottom-6 left-6 text-white text-sm font-bold bg-slate-900/60 px-3 py-1 rounded-lg">SafeUser_421 (Student)</div>
           </div>

           {/* Self Feed */}
           <div className="absolute bottom-12 right-12 w-48 aspect-video bg-slate-700 border-2 border-white/20 rounded-xl overflow-hidden shadow-2xl">
             <img src="https://picsum.photos/seed/counsellor/400/225" className="w-full h-full object-cover" />
             <div className="absolute bottom-2 left-2 text-[10px] text-white font-bold bg-black/40 px-1 rounded">You</div>
           </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-900/80 backdrop-blur p-6 flex items-center justify-center gap-4">
           <button 
             onClick={() => setMic(!mic)}
             className={`p-4 rounded-2xl transition-all ${mic ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}
           >
             {mic ? <Mic size={24} /> : <MicOff size={24} />}
           </button>
           <button 
             onClick={() => setVideo(!video)}
             className={`p-4 rounded-2xl transition-all ${video ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}
           >
             {video ? <VideoIcon size={24} /> : <VideoOff size={24} />}
           </button>
           <button 
             onClick={() => setShowNotes(!showNotes)}
             className={`p-4 rounded-2xl transition-all ${showNotes ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
           >
             <FileText size={24} />
           </button>
           <button 
             onClick={endSession}
             className="p-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-500/20"
           >
             <PhoneOff size={24} />
           </button>
        </div>

        {/* Info Header */}
        <div className="absolute top-6 right-6 flex items-center gap-3">
           <div className="flex items-center gap-2 bg-indigo-600/20 text-indigo-400 px-4 py-2 rounded-xl border border-indigo-500/30 text-xs font-bold uppercase">
             <Lock size={14} /> End-to-End Encrypted
           </div>
        </div>
      </div>

      {/* Side Panel (Notes/Shared Data) */}
      {showNotes && (
        <div className="w-80 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col animate-in slide-in-from-right-4">
          <div className="p-6 border-b border-slate-100">
             <h3 className="font-bold text-slate-800">Session Notes</h3>
             <p className="text-xs text-slate-400">Private to you. Not shared with student.</p>
          </div>
          <div className="flex-1 p-4">
             <textarea
               className="w-full h-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-slate-900 placeholder:text-slate-400"
               placeholder="Take private notes during the session..."
               value={notes}
               onChange={(e) => setNotes(e.target.value)}
             />
          </div>
          <div className="p-4 bg-indigo-50 rounded-b-3xl">
             <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm shadow-md">
               <Share2 size={16} /> Student Shared Data
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionHandler;
