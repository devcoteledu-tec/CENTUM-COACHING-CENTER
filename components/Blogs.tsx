
import React, { useState, useEffect } from 'react';

interface BlogData {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  author: string;
  created_at: string;
  read_time: string;
  content_html?: string; // Column containing the link to the full article
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Newsletter state
  const [subEmail, setSubEmail] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Supabase Configuration
  const SUPABASE_URL = 'https://xhmisvxohwofpzxkizpi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_n7cCpkRy1wBo95YQHwQykw_gxA98bNd';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/centum_blogs?select=*&order=created_at.desc`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        console.error("Error fetching Centum Blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
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
  const categories = ['All', ...new Set(blogs.map(item => item.category))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory;
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Blog Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4 flex-1">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">Academic Blog</h2>
          <p className="text-slate-500 font-medium max-w-xl text-lg border-l-4 border-emerald-900 pl-4">Insights, strategies, and success tips from India's top academic mentors.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-900 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-emerald-900 text-white shadow-xl shadow-emerald-100' 
                    : 'bg-white text-slate-500 border border-slate-100 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-10">
          <div className="h-[400px] bg-slate-100 animate-pulse rounded-[2.5rem]"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[2rem]"></div>)}
          </div>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <>
          {/* Featured Post (Always the first one in the list) */}
          {activeCategory === 'All' && !searchQuery && (
            <section className="group cursor-pointer relative overflow-hidden rounded-[2.5rem] bg-emerald-950 text-white min-h-[400px] flex items-end p-8 sm:p-16 shadow-2xl transition-all hover:shadow-emerald-900/20">
              <img 
                src={filteredBlogs[0].image_url || "https://images.unsplash.com/photo-1434039347656-ad76cb03175c?auto=format&fit=crop&q=80&w=800"} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[10s]" 
                alt="Featured" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
              
              <div className="relative z-10 max-w-3xl space-y-6">
                <span className="px-3 py-1 bg-emerald-900 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-800">Featured Post</span>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">{filteredBlogs[0].title}</h3>
                <p className="text-emerald-100/70 text-sm sm:text-lg font-medium leading-relaxed">{filteredBlogs[0].excerpt}</p>
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-emerald-300/60">
                  <span>{filteredBlogs[0].author}</span>
                  <span className="w-1 h-1 bg-emerald-800 rounded-full"></span>
                  <span>{new Date(filteredBlogs[0].created_at).toLocaleDateString()}</span>
                  <span className="w-1 h-1 bg-emerald-800 rounded-full"></span>
                  <span>{filteredBlogs[0].read_time}</span>
                </div>
                <a 
                  href={filteredBlogs[0].content_html || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 text-emerald-400 font-black text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform"
                >
                  Read Full Article <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </section>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {(activeCategory === 'All' && !searchQuery ? filteredBlogs.slice(1) : filteredBlogs).map((blog) => (
              <article key={blog.id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all group">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={blog.image_url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-50/95 backdrop-blur px-3 py-1.5 rounded-xl text-[9px] font-black text-emerald-900 uppercase tracking-widest shadow-lg border border-emerald-100">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                    <span>{blog.read_time}</span>
                  </div>
                  
                  <a href={blog.content_html || "#"} target="_blank" rel="noopener noreferrer">
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-emerald-900 transition-colors leading-tight line-clamp-2">
                      {blog.title}
                    </h4>
                  </a>
                  
                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-900 border border-emerald-100">
                        <i className="fas fa-user text-[10px]"></i>
                      </div>
                      <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{blog.author}</span>
                    </div>
                    <a 
                      href={blog.content_html || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-900 group-hover:text-white transition-all flex items-center justify-center"
                    >
                      <i className="fas fa-arrow-right text-xs"></i>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="py-24 text-center bg-emerald-50/30 rounded-[3rem] border border-dashed border-emerald-200">
          <i className="fas fa-book-open text-4xl text-emerald-200 mb-4"></i>
          <p className="text-emerald-900/40 font-black uppercase tracking-widest">No articles found matching your criteria.</p>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-emerald-700 font-black text-[10px] uppercase tracking-widest hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Newsletter Signup */}
      <section className="bg-emerald-900 rounded-[2.5rem] p-10 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl shadow-emerald-900/20 text-white">
        <div className="space-y-4 max-w-lg text-center lg:text-left">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">Get Exam Strategies Weekly</h3>
          <p className="text-emerald-100/60 font-medium text-sm sm:text-base leading-relaxed">
            Join 5,000+ students receiving expert guidance from Centum faculty directly in their inbox.
          </p>
        </div>
        <div className="w-full max-w-md">
          <form onSubmit={handleSubscribe} className="bg-white/10 backdrop-blur-md p-2 rounded-2xl flex items-center gap-2 border border-white/20">
            <input 
              type="email" 
              required
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 bg-transparent text-sm font-medium focus:outline-none placeholder:text-white/30"
            />
            <button 
              type="submit"
              disabled={subStatus === 'loading'}
              className={`px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg ${
                subStatus === 'success' ? 'bg-emerald-500 text-white' : 
                subStatus === 'error' ? 'bg-red-500 text-white' :
                'bg-white text-emerald-900 hover:bg-emerald-100'
              }`}
            >
              {subStatus === 'loading' ? 'Subscribing...' : 
               subStatus === 'success' ? 'Success!' :
               subStatus === 'error' ? 'Error' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
