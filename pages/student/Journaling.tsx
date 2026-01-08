
import React, { useState, useEffect } from 'react';
import { Save, Calendar, CheckCircle, Trash2, BookOpen } from 'lucide-react';
import { User, JournalEntry } from '../../types';

const Journaling: React.FC<{ user: User }> = ({ user }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`journal_${user.id}`);
    if (saved) setEntries(JSON.parse(saved));
  }, [user.id]);

  const handleSave = () => {
    if (!currentText.trim()) return;
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      userId: user.id,
      date: new Date().toLocaleDateString(),
      content: currentText
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem(`journal_${user.id}`, JSON.stringify(updated));
    setCurrentText('');
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 3000);
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem(`journal_${user.id}`, JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">What's on your mind?</h2>
          <p className="text-slate-500">Your journal is private and only visible to you.</p>
        </div>

        <div className="relative">
          <textarea
            className="w-full h-48 p-6 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all text-slate-900 placeholder:text-slate-400"
            placeholder="Write about your feelings, thoughts, or day..."
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
             {savedStatus && (
               <span className="flex items-center gap-1 text-emerald-600 text-sm font-medium animate-in fade-in slide-in-from-right-2">
                 <CheckCircle size={16} /> Saved
               </span>
             )}
             <button
               onClick={handleSave}
               disabled={!currentText.trim()}
               className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
             >
               <Save size={18} /> Save Entry
             </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Calendar size={20} className="text-indigo-500" /> Past Entries
        </h3>
        
        {entries.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">No journal entries yet. Start writing today!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {entries.map((entry) => (
              <div key={entry.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{entry.date}</span>
                  <button onClick={() => deleteEntry(entry.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Journaling;
