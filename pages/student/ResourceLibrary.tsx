
import React, { useState } from 'react';
import { Play, FileText, Search, ExternalLink } from 'lucide-react';
import { RESOURCE_ARTICLES, RESOURCE_VIDEOS } from '../../constants';
import { getArticleSummary } from '../../geminiService';

const ResourceLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [loadingSummary, setLoadingSummary] = useState<string | null>(null);

  const fetchSummary = async (id: string, title: string, content: string) => {
    if (summaries[id]) return;
    setLoadingSummary(id);
    const summary = await getArticleSummary(title, content);
    setSummaries(prev => ({ ...prev, [id]: summary }));
    setLoadingSummary(null);
  };

  const filteredArticles = RESOURCE_ARTICLES.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredVideos = RESOURCE_VIDEOS.filter(v => v.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Resource Library</h2>
          <p className="text-slate-500">Learn more about mental wellness through curated content.</p>
        </div>
        <div className="relative max-w-md w-full">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
           <input
             type="text"
             className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm text-slate-900 placeholder:text-slate-400"
             placeholder="Search articles or videos..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FileText className="text-indigo-500" /> Articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-48 h-48 md:h-auto bg-slate-200">
                <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-6 space-y-4">
                <h4 className="text-lg font-bold text-slate-800">{article.title}</h4>
                <p className="text-sm text-slate-500">{summaries[article.id] || article.summary}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => fetchSummary(article.id, article.title, article.summary)}
                    disabled={!!loadingSummary}
                    className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-all disabled:opacity-50"
                  >
                    {loadingSummary === article.id ? 'Summarizing...' : summaries[article.id] ? 'AI Summary Ready' : 'Get AI Summary'}
                  </button>
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600">
                    Read Full <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Play className="text-indigo-500" /> Videos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div key={video.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col cursor-pointer transition-all hover:-translate-y-1">
              <div className="relative h-48 bg-slate-200">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-indigo-600 shadow-xl scale-90 group-hover:scale-100 transition-all">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-6 flex justify-between items-center">
                <h4 className="font-bold text-slate-800 line-clamp-1">{video.title}</h4>
                <a href={video.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResourceLibrary;
