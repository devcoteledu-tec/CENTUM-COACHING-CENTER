
import React, { useState, useEffect } from 'react';

interface NotificationItem {
  id: number;
  title: string;
  description?: string;
  read_more_url?: string;
  created_at: string;
  priority: number; // 1: Info, 2: Update, 3: Urgent
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const SUPABASE_URL = 'https://xhmisvxohwofpzxkizpi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_n7cCpkRy1wBo95YQHwQykw_gxA98bNd';

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/centum_announcements?select=*&order=priority.desc,created_at.desc`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const getPriorityStyles = (priority: number) => {
    switch (priority) {
      case 3: return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', label: 'Urgent Alert', icon: 'fa-triangle-exclamation' };
      case 2: return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', label: 'Batch Update', icon: 'fa-rotate' };
      default: return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-100', label: 'Information', icon: 'fa-circle-info' };
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-800 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
            Live Updates Center
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">Notifications</h2>
          <p className="text-slate-500 font-medium max-w-xl text-lg border-l-4 border-red-800 pl-4">Stay informed about exam schedules, scholarship results, and institutional announcements.</p>
        </div>
        <div className="hidden lg:block">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Helpdesk</p>
              <p className="text-lg font-black text-slate-950">+91 98765 43210</p>
           </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-32 bg-slate-100 animate-pulse rounded-[2rem]"></div>
          ))}
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-6">
          {notifications.map((note) => {
            const styles = getPriorityStyles(note.priority);
            return (
              <div 
                key={note.id} 
                className={`group relative overflow-hidden bg-white p-6 sm:p-10 rounded-[2.5rem] border ${styles.border} hover:shadow-2xl hover:shadow-slate-200/50 transition-all flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-10`}
              >
                {/* Priority Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-2 ${styles.bg.replace('50', '600')}`}></div>
                
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
                    className="w-full md:w-auto bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-800 transition-all shadow-xl group-hover:translate-x-1 text-center"
                  >
                    View Document
                  </a>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <i className="fas fa-bell-slash text-4xl text-slate-300 mb-4"></i>
          <p className="text-slate-400 font-bold uppercase tracking-widest">No notifications at the moment.</p>
        </div>
      )}

      {/* Subscription Callout */}
      <section className="bg-slate-950 rounded-[3rem] p-10 sm:p-20 text-white relative overflow-hidden shadow-2xl">
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
              placeholder="Mobile Number" 
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
            />
            <button className="bg-red-800 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-xl">
              Enable SMS Alerts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Notifications;
