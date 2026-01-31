
import React, { useState, useEffect } from 'react';

interface AnnouncementItem {
  id: number;
  title: string;
  description?: string;
  read_more_url?: string;
  created_at: string;
  priority: number; // 1: Info, 2: Update, 3: Urgent
}

const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const SUPABASE_URL = 'https://xhmisvxohwofpzxkizpi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_n7cCpkRy1wBo95YQHwQykw_gxA98bNd';

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/centum_announcements?select=*&order=priority.desc,created_at.desc`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const getPriorityStyles = (priority: number) => {
    switch (priority) {
      case 3: return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', accent: 'bg-red-600', label: 'Urgent Alert', icon: 'fa-triangle-exclamation' };
      case 2: return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', accent: 'bg-blue-600', label: 'Batch Update', icon: 'fa-rotate' };
      default: return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-100', accent: 'bg-slate-600', label: 'General Info', icon: 'fa-circle-info' };
    }
  };

  const filteredAnnouncements = announcements.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-800 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
            <i className="fas fa-bullhorn"></i>
            Notice Board
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">Announcements</h2>
          <p className="text-slate-500 font-medium max-w-xl text-lg border-l-4 border-red-800 pl-4">Official communication hub for Centum Education's academic schedules and exam alerts.</p>
        </div>
        
        <div className="w-full lg:w-96 relative">
          <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input 
            type="text" 
            placeholder="Search announcements..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-red-800/5 focus:border-red-800 transition-all placeholder:text-slate-400 shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-32 bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100"></div>
          ))}
        </div>
      ) : filteredAnnouncements.length > 0 ? (
        <div className="space-y-6">
          {filteredAnnouncements.map((note) => {
            const styles = getPriorityStyles(note.priority);
            return (
              <div 
                key={note.id} 
                className={`group relative overflow-hidden bg-white p-6 sm:p-10 rounded-[2.5rem] border ${styles.border} hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-10`}
              >
                {/* Priority Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${styles.accent}`}></div>
                
                <div className={`w-14 h-14 sm:w-20 sm:h-20 ${styles.bg} ${styles.text} rounded-[1.8rem] flex items-center justify-center text-xl sm:text-2xl shrink-0 border ${styles.border} shadow-inner`}>
                  <i className={`fas ${styles.icon}`}></i>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${styles.text}`}>
                      {styles.label}
                    </span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {new Date(note.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {note.title}
                  </h3>
                  
                  {note.description && (
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-3xl">
                      {note.description}
                    </p>
                  )}
                </div>

                {note.read_more_url && (
                  <a 
                    href={note.read_more_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl group-hover:translate-x-1 text-center"
                  >
                    View Notice
                  </a>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <i className="fas fa-bell-slash text-4xl text-slate-300 mb-6"></i>
          <h4 className="text-slate-900 font-black uppercase tracking-widest">No matching announcements</h4>
          <p className="text-slate-400 font-medium text-sm mt-2">Adjust your search or check back later for updates.</p>
        </div>
      )}

      {/* Subscription Callout */}
      <section className="bg-slate-900 rounded-[3rem] p-10 sm:p-20 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12 pointer-events-none text-red-500">
          <i className="fas fa-envelope-open-text text-[15rem]"></i>
        </div>
        <div className="relative z-10 max-w-2xl text-center md:text-left space-y-6">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">Never Miss a Deadline</h3>
          <p className="text-slate-400 font-medium text-lg leading-relaxed">
            Get automated SMS and Email alerts for scholarship tests, result declarations, and campus holidays.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <input 
              type="text" 
              placeholder="Your Mobile / Email" 
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder:text-slate-600 transition-all"
            />
            <button className="bg-red-800 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-xl active:scale-95">
              Enable Alerts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Announcements;
