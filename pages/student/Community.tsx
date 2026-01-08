
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, ShieldAlert, Plus } from 'lucide-react';

const Community: React.FC<{ user: any }> = ({ user }) => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'GentlePanda',
      content: 'Taking a deep breath today. Exam season is tough but we are tougher! 🍀',
      likes: 12,
      comments: 3,
      time: '2h ago'
    },
    {
      id: '2',
      author: 'QuietSky',
      content: 'Has anyone tried the 4-7-8 breathing? It really helped with my sleep anxiety last night.',
      likes: 8,
      comments: 1,
      time: '5h ago'
    }
  ]);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now().toString(),
      author: user.anonymousName,
      content: newPost,
      likes: 0,
      comments: 0,
      time: 'Just now'
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="bg-indigo-600 p-6 rounded-3xl text-white shadow-lg">
        <h2 className="text-xl font-bold mb-2">Peer Support Community</h2>
        <p className="text-indigo-100 text-sm">A judgment-free zone to share and support. All posts are anonymous.</p>
        <div className="flex items-center gap-2 mt-4 text-[10px] uppercase font-bold text-indigo-200">
           <ShieldAlert size={12} /> Community Guidelines: Be kind, no harassment, no self-harm talk.
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Plus className="text-slate-400" />
        </div>
        <div className="flex-1 space-y-3">
          <textarea
            className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-slate-900 placeholder:text-slate-400"
            placeholder="Share what's on your mind anonymously..."
            rows={3}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="flex justify-end">
             <button
               onClick={handlePost}
               disabled={!newPost.trim()}
               className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
             >
               <Send size={16} /> Post
             </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
                 {post.author[0]}
               </div>
               <div>
                 <p className="text-sm font-bold text-slate-800">{post.author}</p>
                 <p className="text-[10px] text-slate-400">{post.time}</p>
               </div>
             </div>
             <p className="text-slate-700 leading-relaxed">{post.content}</p>
             <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
               <button className="flex items-center gap-2 text-slate-400 hover:text-pink-500 transition-colors">
                 <Heart size={18} /> <span className="text-sm font-medium">{post.likes}</span>
               </button>
               <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors">
                 <MessageCircle size={18} /> <span className="text-sm font-medium">{post.comments}</span>
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
