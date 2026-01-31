
import React, { useState, useEffect } from 'react';

interface NewsData {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
  read_more_url?: string;
}

interface AnnouncementData {
  id: number;
  title: string;
  description?: string;
  read_more_url?: string;
  created_at: string;
  priority: number;
}

interface NewsAnnouncementsProps {
  onNavigate?: (tab: string) => void;
}

const NewsAnnouncements: React.FC<NewsAnnouncementsProps> = ({ onNavigate }) => {
  const [notices, setNotices] = useState<AnnouncementData[]>([]);
  const [newsItems, setNewsItems] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase Configuration
  const SUPABASE_URL = 'https://xhmisvxohwofpzxkizpi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_n7cCpkRy1wBo95YQHwQykw_gxA98bNd';

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        // Fetch Announcements from centum_announcements (Left Section)
        const announcementsPromise = fetch(`${SUPABASE_URL}/rest/v1/centum_announcements?select=*&order=priority.desc,created_at.desc&limit=4`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });

        // Fetch Regular News from centum_news (Right Section)
        const newsPromise = fetch(`${SUPABASE_URL}/rest/v1/centum_news?select=*&order=created_at.desc&limit=2`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });

        const [annRes, newsRes] = await Promise.all([announcementsPromise, newsPromise]);
        
        if (annRes.ok) {
          const annData = await annRes.json();
          setNotices(annData);
        }
        
        if (newsRes.ok) {
          const newsData = await newsRes.json();
          setNewsItems(newsData);
        }
      } catch (error) {
        console.error("Error fetching Home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  return (
    <section className="bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left Column: Announcements - Linked to Notifications Page */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg lg:text-xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
              <i className="fas fa-bullhorn text-red-800"></i>
              Announcements
            </h3>
            <button 
              onClick={() => onNavigate?.('notifications')}
              className="text-[9px] font-black text-red-800 uppercase tracking-widest bg-red-50 hover:bg-red-800 hover:text-white px-3 py-1 rounded-full transition-all"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {loading ? (
              [1, 2, 3, 4].map(n => <div key={n} className="h-24 bg-slate-50 animate-pulse rounded-2xl"></div>)
            ) : notices.length > 0 ? (
              notices.map((item) => {
                const { day, month } = formatDateShort(item.created_at);
                return (
                  <button 
                    key={item.id} 
                    onClick={() => onNavigate?.('notifications')}
                    className="w-full text-left group p-5 bg-slate-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-red-100 hover:shadow-xl hover:shadow-red-900/5 transition-all flex items-center gap-5 sm:gap-6 min-h-[90px]"
                  >
                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-xl border border-slate-100 shrink-0 group-hover:border-red-200 transition-colors shadow-sm">
                      <span className="text-[8px] font-black text-red-800 leading-none">{month}</span>
                      <span className="text-[14px] font-black text-slate-900">{day}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[13px] font-bold text-slate-800 leading-snug group-hover:text-red-800 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-[10px] text-slate-400 mt-1 line-clamp-1 font-medium">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <i className="fas fa-chevron-right text-[10px] text-slate-200 group-hover:text-red-800 group-hover:translate-x-1 transition-all"></i>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-300 font-bold uppercase tracking-widest text-[10px] border-2 border-dashed border-slate-100 rounded-2xl">
                No active announcements
              </div>
            )}
          </div>
        </div>

        {/* Right Column: News & Events */}
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg lg:text-xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tight">
              <i className="fas fa-newspaper text-red-800"></i>
              News & Events
            </h3>
            <button className="text-[10px] font-black text-red-800 uppercase tracking-widest hover:underline underline-offset-4">Read All</button>
          </div>

          <div className="space-y-6">
            {loading ? (
              [1, 2].map(n => <div key={n} className="h-32 bg-slate-50 animate-pulse rounded-2xl"></div>)
            ) : newsItems.length > 0 ? (
              newsItems.map((item) => (
                <a 
                  key={item.id} 
                  href={item.read_more_url || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row gap-5 group cursor-pointer bg-white p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:shadow-lg transition-all"
                >
                  <div className="w-full sm:w-24 sm:h-24 aspect-[16/9] sm:aspect-square flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                    <img 
                      src={item.image_url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=200"} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt="News" 
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[8px] font-black text-red-800 uppercase tracking-widest">{item.category}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h4 className="text-[14px] font-black text-slate-900 leading-tight group-hover:text-red-800 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-2 line-clamp-2 font-medium leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-12 text-slate-300 font-bold uppercase tracking-widest text-[10px] border-2 border-dashed border-slate-100 rounded-2xl">
                No recent news
              </div>
            )}
            
            <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-red-800 transition-colors shadow-xl">
              <div className="space-y-1">
                <h5 className="font-black text-xs uppercase tracking-tight">Academic Prospectus 2025</h5>
                <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest">Now available for download</p>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-sm border border-white/20 group-hover:bg-white group-hover:text-red-800 transition-all">
                <i className="fas fa-file-download"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsAnnouncements;
