
import React, { useState, useEffect, useRef } from 'react';
import FreeClasses from './FreeClasses';
import StudyMaterialsPreview from './StudyMaterialsPreview';
import NewsAnnouncements from './NewsAnnouncements';
import Testimonials from './Testimonials';

interface Brochure {
  id: number;
  image_url: string;
  title?: string;
  description?: string;
}

interface BlogPreview {
  id: number;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
  read_time: string;
  content_html?: string;
}

interface HeroLoginProps {
  onNavigate?: (tab: string) => void;
}

const Counter = ({ value, duration = 2000 }: { value: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return (
    <div ref={countRef}>
      {count}{value.includes('%') ? '%' : value.includes('+') ? '+' : ''}
    </div>
  );
};

const HeroLogin: React.FC<HeroLoginProps> = ({ onNavigate }) => {
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [blogs, setBlogs] = useState<BlogPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const SUPABASE_URL = 'https://xhmisvxohwofpzxkizpi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_n7cCpkRy1wBo95YQHwQykw_gxA98bNd';
  const loginUrl = "https://img.freepik.com/free-vector/login-template_1017-6719.jpg";
  const whatsappUrl = "https://wa.me/917593038781?text=i%20would%20like%20to%20join%20centum";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brochuresRes, blogsRes] = await Promise.all([
          fetch(`${SUPABASE_URL}/rest/v1/centumbrosher?select=*`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
          }),
          fetch(`${SUPABASE_URL}/rest/v1/centum_blogs?select=*&order=created_at.desc&limit=3`, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
          })
        ]);

        if (brochuresRes.ok) {
          const bData = await brochuresRes.json();
          setBrochures(bData);
        }
        if (blogsRes.ok) {
          const blogData = await blogsRes.json();
          setBlogs(blogData);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
        setBlogsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading || brochures.length <= 1) return;
    const interval = setInterval(() => handleNext(), 8000);
    return () => clearInterval(interval);
  }, [loading, brochures]);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollTo({ left: container.scrollLeft + container.clientWidth, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        container.scrollTo({ left: container.scrollLeft - container.clientWidth, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* 1. Brochure Gallery - Full-Bleed & Flush with Dashboard */}
      <section className="relative overflow-hidden shadow-2xl bg-slate-100 group -mx-4 sm:-mx-8 lg:-mx-16 z-0">
        {loading ? (
          <div className="w-full h-[350px] sm:h-[500px] lg:h-[650px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
               <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
               <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Content...</span>
            </div>
          </div>
        ) : brochures.length > 0 ? (
          <>
            <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide w-full">
              {brochures.map((item) => (
                <div key={item.id} className="snap-center shrink-0 w-full min-h-[400px] h-[55vh] sm:h-[65vh] lg:h-[80vh] max-h-[900px] overflow-hidden bg-white relative">
                  <img 
                    src={item.image_url} 
                    className="w-full h-full object-cover block border-none transition-transform duration-[10s] hover:scale-105" 
                    alt={item.description || item.title || "Centum Education"} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-end p-6 sm:p-12 lg:p-16">
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-4">
                      <div className="max-w-2xl">
                        <p className="text-red-500 font-black text-[8px] sm:text-[10px] uppercase tracking-[0.3em] mb-2">Academic Excellence</p>
                        <h3 className="text-white text-xl sm:text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] sm:leading-none">
                          {item.description || item.title || 'Centum Education'}
                        </h3>
                      </div>
                      <button 
                        onClick={() => onNavigate?.('notifications')}
                        className="bg-red-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-2xl hover:bg-white hover:text-red-800 transition-all active:scale-95 whitespace-nowrap"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Nav Arrows */}
            <button onClick={handlePrev} className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 h-16 bg-white/10 hover:bg-white backdrop-blur-md rounded-full items-center justify-center text-white hover:text-red-800 transition-all opacity-0 group-hover:opacity-100 border border-white/20 shadow-2xl z-30 group/btn">
              <i className="fas fa-arrow-left text-sm transition-transform group-hover/btn:-translate-x-1"></i>
            </button>
            <button onClick={handleNext} className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 h-16 bg-white/10 hover:bg-white backdrop-blur-md rounded-full items-center justify-center text-white hover:text-red-800 transition-all opacity-0 group-hover:opacity-100 border border-white/20 shadow-2xl z-30 group/btn">
              <i className="fas fa-arrow-right text-sm transition-transform group-hover/btn:translate-x-1"></i>
            </button>
          </>
        ) : (
          <div className="w-full h-[400px] bg-slate-50 flex items-center justify-center">
            <p className="font-black uppercase tracking-widest text-slate-400 text-[10px] sm:text-xs text-center px-4">Catalogue information currently unavailable.</p>
          </div>
        )}
      </section>

      {/* 2. Main Portal Section - Pulled up to stretch near brochure gallery */}
      <section className="relative z-10 -mt-6 sm:-mt-10 lg:-mt-16 bg-white rounded-[2rem] sm:rounded-[3.5rem] lg:rounded-[4.5rem] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden">
        <div className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 px-6 sm:px-10 lg:px-12 py-8 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-red-800 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-900/10 shrink-0">
              <i className="fas fa-user-lock text-sm sm:text-lg"></i>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Student Dashboard</h2>
              <p className="text-slate-500 text-[11px] sm:text-sm font-medium mt-1">Quick access to resources and portal login.</p>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <a 
              href={loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-6 lg:px-10 py-4 text-center bg-slate-900 text-white rounded-xl lg:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-800 transition-colors shadow-xl active:scale-95"
            >
               Login
            </a>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-6 lg:px-10 py-4 text-center bg-white border border-slate-200 text-slate-600 rounded-xl lg:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors active:scale-95"
            >
              Register
            </a>
          </div>
        </div>
        
        <div className="p-6 sm:p-10 lg:p-16 space-y-16 sm:space-y-24">
          <FreeClasses />
          <StudyMaterialsPreview onNavigate={onNavigate} />
          <NewsAnnouncements onNavigate={onNavigate} />
          <Testimonials onNavigate={onNavigate} />

          {/* Blog Preview Section */}
          <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-3">
                  <i className="fas fa-feather-pointed text-red-800"></i>
                  Latest Academic Blogs
                </h3>
                <p className="text-slate-500 text-sm font-medium mt-1">Expert insights to supercharge your preparation.</p>
              </div>
              <button 
                onClick={() => onNavigate?.('blogs')}
                className="w-full sm:w-auto text-red-800 font-black text-[10px] uppercase tracking-widest px-8 py-4 border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-all text-center"
              >
                View All Blogs
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogsLoading ? (
                [1, 2, 3].map(i => <div key={i} className="aspect-[16/11] bg-slate-50 animate-pulse rounded-3xl"></div>)
              ) : blogs.length > 0 ? (
                blogs.map((blog) => (
                  <a 
                    key={blog.id} 
                    href={blog.content_html || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-red-900/5 transition-all flex flex-col h-full"
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img src={blog.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={blog.title} />
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-800/95 backdrop-blur text-white px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-lg">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest mb-4">
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        <span>{blog.read_time}</span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900 group-hover:text-red-800 transition-colors leading-tight line-clamp-2 mb-4">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 mb-8">
                        {blog.excerpt}
                      </p>
                      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                         <span className="text-[9px] font-black text-red-800 uppercase tracking-widest">Read Article</span>
                         <i className="fas fa-arrow-right text-[10px] text-slate-300 group-hover:text-red-800 group-hover:translate-x-1 transition-all"></i>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-full py-16 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No blogs available at the moment.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>

      {/* 3. Global Stats */}
      <section className="relative mt-16 sm:mt-24 lg:mt-32 overflow-hidden rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] py-16 sm:py-24 lg:py-32 shadow-2xl group/stats">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0 scale-105 transition-transform duration-[20s] group-hover/stats:scale-100" 
          style={{ backgroundImage: `url('https://t4.ftcdn.net/jpg/02/76/15/85/360_F_276158586_h5RkwIgMQhvW1mfi7dNPV2GW1NGg3Fvb.jpg')` }}
        >
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-12 lg:gap-20">
            {[
              { label: 'Success Rate', val: '98%', icon: 'fa-chart-line' },
              { label: 'Total Toppers', val: '500+', icon: 'fa-trophy' },
              { label: 'Expert Faculty', val: '100+', icon: 'fa-chalkboard-user' },
              { label: 'Study Centers', val: '2', icon: 'fa-map-location' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center group/card transition-transform hover:-translate-y-1 duration-500">
                <div className="w-12 h-12 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center mb-4 sm:mb-6 group-hover/card:bg-red-800 group-hover/card:border-red-600 transition-all duration-500 shadow-2xl">
                  <i className={`fas ${s.icon} text-lg sm:text-2xl`}></i>
                </div>
                <div className="text-white text-3xl sm:text-5xl lg:text-7xl font-black leading-none tracking-tighter mb-2 sm:mb-4 drop-shadow-xl">
                  <Counter value={s.val} />
                </div>
                <p className="text-[7px] sm:text-[9px] lg:text-[10px] font-black text-white/80 uppercase tracking-[0.15em] sm:tracking-[0.3em] border-t border-white/10 pt-3 sm:pt-4 w-full max-w-[90px] sm:max-w-[140px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroLogin;
