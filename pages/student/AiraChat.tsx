
import React, { useState, useRef, useEffect } from 'react';
import { Send, User as UserIcon, Bot, AlertTriangle, ArrowRight } from 'lucide-react';
import { getAiraResponse } from '../../geminiService';
import { User } from '../../types';
import { Link } from 'react-router-dom';

const AiraChat: React.FC<{ user: User }> = ({ user }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'aira'; text: string; urgent?: boolean }[]>([
    { role: 'aira', text: `Hi ${user.anonymousName}, I'm Aira. How are you feeling today? I'm here to listen.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const history = messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: m.text }));
    const responseText = await getAiraResponse(userMsg, history);
    
    const isUrgent = responseText.includes('[URGENT_RECOMMENDATION]');
    const cleanedResponse = responseText.replace('[URGENT_RECOMMENDATION]', '').trim();

    setMessages(prev => [...prev, { role: 'aira', text: cleanedResponse, urgent: isUrgent }]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 p-4 px-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold">Aira AI</h3>
            <p className="text-xs text-indigo-100">AI Companion • Always Here</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
              </div>
              <div className="space-y-3">
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'}`}>
                  {msg.text}
                </div>
                {msg.urgent && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex flex-col gap-3 animate-pulse">
                    <div className="flex items-start gap-2 text-red-700">
                      <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold">It sounds like you might be going through a very tough time.</p>
                    </div>
                    <Link to="/counselling" className="bg-red-600 text-white text-center py-2 rounded-lg text-sm font-bold hover:bg-red-700 flex items-center justify-center gap-2">
                      Connect with a Professional <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                <Bot size={16} />
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 flex gap-1">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 placeholder:text-slate-400"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3">
          Aira is an AI companion and does not replace professional therapy. In crisis, please use the helplines.
        </p>
      </div>
    </div>
  );
};

export default AiraChat;
