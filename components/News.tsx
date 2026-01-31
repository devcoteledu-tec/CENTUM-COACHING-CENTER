
import React, { useState, useEffect } from 'react';

interface NewsData {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
  is_urgent: boolean;
  read_more_url?: string; // Corrected column name as per user request
}

const News: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Subscription state
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Supabase Configuration
  const SUPABASE_URL = 'https://xhmisvxohwofpzxkizpi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_n7cCpkRy1wBo95YQHwQykw_gxA98bNd';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/centum_news?select=*&order=created_at.desc`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setNewsItems(data);
        }
      } catch (error) {
        console.error("Error fetching Centum News:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes('@')) return;

    setSubStatus('loading');
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/centum_subscribers`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ email: subEmail })
      });

      if (response.ok) {
        setSubStatus('success');
        setSubEmail('');
        setTimeout(() => setSubStatus('idle'), 3000);
      } else {
        setSubStatus('error');
        setTimeout(() => setSubStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setSubStatus('error');
      setTimeout(() => setSubStatus('idle'), 3000);
    }
  };

  // Derive unique categories from fetched data
  const categories = ['All', ...new Set(newsItems.map(item => item.category))];

  // Combined Filtering Logic: Category + Search Query
  const filteredNews = newsItems.filter(item => {
    const matchesCategory = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Find the most recent urgent news for the banner
  const urgentNews = newsItems.find(item => item.is_urgent);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-lg text-[9px] font-black uppercase tracking-widest border border-orange-100">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
            Real-Time Notifications
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">News & Alerts</h2>
          <p className="text-slate-500 font-medium max-w-xl text-lg underline decoration-slate-200 decoration-2 underline-offset-8">
            Stay updated with essential exam cycles and institutional milestones.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
          {/* Enhanced Search Bar */}
          <div className="relative w-full sm:w-64">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input 
              type="text" 
              placeholder="Search news..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === cat 
                    ? 'bg-orange-600 text-white shadow-xl shadow-orange-100' 
                    : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured News / Alert Banner */}
      {urgentNews ? (
        <section className="bg-orange-600 rounded-[2.5rem] p-6 sm:p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl shadow-orange-900/20 animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shrink-0 backdrop-blur-md border border-white/30">
            <i className="fas fa-bullhorn text-white"></i>
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-100">Flash Notification</span>
            <h3 className="text-xl sm:text-2xl font-black mt-1">{urgentNews.title}</h3>
          </div>
          <a 
            href={urgentNews.read_more_url || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl inline-block"
          >
            Check Details
          </a>
        </section>
      ) : (
        <section className="bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 text-white flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-3xl shrink-0">
            <i className="fas fa-info-circle"></i>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-black uppercase tracking-tight">Centum News Portal</h3>
            <p className="text-slate-400 text-xs font-medium">Browse our latest updates, exam alerts, and institutional achievements below.</p>
          </div>
        </section>
      )}

      {/* News Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-20">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-48 bg-slate-100 animate-pulse rounded-[2.5rem]"></div>
          ))}
        </div>
      ) : filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {filteredNews.map((news) => (
            <div key={news.id} className="group flex flex-col sm:flex-row gap-6 bg-white p-5 rounded-[2.5rem] border border-slate-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-pointer">
              <div className="w-full sm:w-48 h-48 rounded-[1.8rem] overflow-hidden shrink-0 relative shadow-sm">
                <img 
                  src={news.image_url || "https://images.unsplash.com/photo-1523240715639-99a8a7ae9b18?auto=format&fit=crop&q=80&w=800"} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                {news.is_urgent && (
                  <div className="absolute top-3 left-3 bg-orange-600 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest animate-pulse shadow-lg">
                    Urgent
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center space-y-3 pr-2">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest">{news.category}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">
                    {new Date(news.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                  {news.title}
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                  {news.excerpt}
                </p>
                <div className="pt-2">
                  <a 
                    href={news.read_more_url || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-black text-slate-400 group-hover:text-slate-900 uppercase tracking-widest transition-colors inline-flex items-center gap-2"
                  >
                    Read More <i className="fas fa-chevron-right text-[8px] text-orange-600 group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <i className="fas fa-search text-4xl text-slate-300 mb-4"></i>
          <p className="text-slate-400 font-bold uppercase tracking-widest">No articles found matching your criteria.</p>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Media Gallery Call-out */}
      <section className="bg-slate-100 rounded-[3rem] p-8 sm:p-16 text-center text-slate-900 relative overflow-hidden border border-slate-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 space-y-6">
          <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full mb-4"></div>
          <h3 className="text-3xl font-black tracking-tight uppercase">Centum Media Center</h3>
          <p className="text-slate-500 max-w-xl mx-auto font-medium">Access official press releases, institutional logs, and campus photography for journalistic use.</p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-100">Media Portal</button>
            <button className="bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Download Assets</button>
          </div>
        </div>
      </section>

      {/* Subscription Call-out */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-xl font-black uppercase tracking-tight">Stay Ahead of the Curve</h4>
          <p className="text-slate-400 text-sm font-medium">Get instant alerts via email for sudden schedule changes.</p>
        </div>
        <form className="flex w-full md:w-auto gap-2" onSubmit={handleSubscribe}>
          <input 
            type="email" 
            placeholder="Your Email" 
            value={subEmail}
            onChange={(e) => setSubEmail(e.target.value)}
            className="flex-1 md:w-64 bg-white/10 border border-white/20 rounded-xl px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 text-white placeholder:text-slate-500" 
            required 
          />
          <button 
            type="submit" 
            disabled={subStatus === 'loading'}
            className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
              subStatus === 'success' ? 'bg-emerald-600' :
              subStatus === 'error' ? 'bg-red-600' :
              'bg-orange-600 hover:bg-orange-500'
            }`}
          >
            {subStatus === 'loading' ? 'Joining...' :
             subStatus === 'success' ? 'Joined!' :
             subStatus === 'error' ? 'Error' : 'Join'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default News;
