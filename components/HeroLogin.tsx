
import React, { useState, useEffect, useRef } from 'react';
import NewsAnnouncements from './NewsAnnouncements';
import Testimonials from './Testimonials';
import FeaturedCourses from './FeaturedCourses';
import TeachingHeart from './TeachingHeart';
import CourseEnquiry from './CourseEnquiry';
import WhyChooseUs from './WhyChooseUs';
import { supabaseFetch } from '../services/supabase';

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
    if (isNaN(numericValue)) return;

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMobileEnquiry, setShowMobileEnquiry] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const loginUrl = "https://img.freepik.com/free-vector/login-template_1017-6719.jpg";
  const whatsappUrl = "https://wa.me/917593038781?text=i%20would%20like%20to%20join%20centum";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setBlogsLoading(true);
      try {
        const [bData, blogData] = await Promise.all([
          supabaseFetch<Brochure>('centumbrosher?select=*'),
          supabaseFetch<BlogPreview>('centum_blogs?select=*&order=created_at.desc&limit=3')
        ]);

        if (bData && bData.length > 0) setBrochures(bData);
        if (blogData && blogData.length > 0) setBlogs(blogData);
      } catch (error) {
        console.error("HeroLogin data fetch failed:", error);
      } finally {
        setLoading(false);
        setBlogsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading || brochures.length <= 1 || showMobileEnquiry) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [loading, brochures, showMobileEnquiry, currentIndex]);

  const handleNext = () => {
    if (scrollContainerRef.current && brochures.length > 0) {
      const container = scrollContainerRef.current;
      const nextIdx = (currentIndex + 1) % brochures.length;
      setCurrentIndex(nextIdx);
      container.scrollTo({ 
        left: container.clientWidth * nextIdx, 
        behavior: 'smooth' 
      });
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current && brochures.length > 0) {
      const container = scrollContainerRef.current;
      const prevIdx = (currentIndex - 1 + brochures.length) % brochures.length;
      setCurrentIndex(prevIdx);
      container.scrollTo({ 
        left: container.clientWidth * prevIdx, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* 1. Brochure Gallery */}
      <section className="relative overflow-hidden shadow-2xl bg-slate-100 group -mx-4 sm:-mx-8 lg:-mx-16 z-0">
        {loading ? (
          <div className="w-full h-[350px] sm:h-[500px] lg:h-[650px] xl:h-[800px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
               <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
               <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">Loading Content...</span>
            </div>
          </div>
        ) : brochures.length > 0 ? (
          <div className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] xl:h-[90vh] min-h-[500px]">
            <div ref={scrollContainerRef} className="flex overflow-hidden w-full h-full">
              {brochures.map((item) => (
                <div key={item.id} className="shrink-0 w-full h-full relative">
                  <img 
                    src={item.image_url} 
                    className="w-full h-full object-cover block border-none transition-transform duration-[10s] hover:scale-105" 
                    alt={item.description || item.title || "Centum Education"} 
                  />
                  <div className="absolute inset-0 bg-black/40 lg:bg-black/10 transition-colors duration-1000"></div>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 z-40 flex items-center justify-center px-4 sm:px-12 lg:px-24 pointer-events-none">
              <div className="hidden lg:block w-full pointer-events-auto">
                <div className="flex justify-end">
                   <CourseEnquiry />
                </div>
              </div>

              <div className="lg:hidden w-full text-center flex flex-col items-center justify-center pointer-events-auto animate-in fade-in duration-500">
                {showMobileEnquiry ? (
                  <div className="w-full flex flex-col items-center animate-in zoom-in-95 duration-500">
                    <button 
                      onClick={() => setShowMobileEnquiry(false)}
                      className="mb-4 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                    >
                      <i className="fas fa-arrow-left"></i>
                      Close Form
                    </button>
                    <CourseEnquiry />
                  </div>
                ) : (
                  <div className="space-y-4 animate-in slide-in-from-bottom-8 duration-700 animate-gentle-nudge">
                    {currentIndex % 2 === 0 ? (
                      <>
                        <p className="text-white text-[10px] sm:text-xs font-medium tracking-wide drop-shadow-lg opacity-90">
                          Classes for CBSE 8th, 9th, 10th, 11th and 12th students
                        </p>
                        <h2 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-none drop-shadow-2xl">
                          OUR CBSE COURSES <br/> 2025-26
                        </h2>
                        <p className="text-white/80 text-[11px] sm:text-sm font-medium italic drop-shadow-lg">
                          Power packed live interactive sessions
                        </p>
                        <button 
                          onClick={() => setShowMobileEnquiry(true)}
                          className="mt-2 bg-[#00b894] hover:bg-emerald-400 text-white px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(0,184,148,0.4)] transition-all active:scale-95"
                        >
                          Read More
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] drop-shadow-lg opacity-90">
                          2024 - 2025 Academic Year
                        </p>
                        <h2 className="text-white text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-none drop-shadow-2xl">
                          Our 10th/ Plus Two Results
                        </h2>
                        <div className="flex flex-col items-center gap-3 mt-4">
                          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 shadow-lg">
                             <i className="fas fa-trophy text-amber-400 text-lg"></i>
                             <div className="text-left">
                               <p className="text-white text-xl font-black leading-none">1330</p>
                               <p className="text-white/70 text-[8px] font-bold uppercase tracking-widest">Full A+/A1 in 10th</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10 shadow-lg">
                             <i className="fas fa-medal text-slate-200 text-lg"></i>
                             <div className="text-left">
                               <p className="text-white text-xl font-black leading-none">365</p>
                               <p className="text-white/70 text-[8px] font-bold uppercase tracking-widest">Full A+/A1 in Plus Two</p>
                             </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setShowMobileEnquiry(true)}
                          className="mt-4 bg-[#00b894] hover:bg-emerald-400 text-white px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-[0_10px_30px_rgba(0,184,148,0.4)] transition-all active:scale-95"
                        >
                          Book a Demo Class
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden z-50 transition-opacity duration-300 ${showMobileEnquiry ? 'opacity-0' : 'opacity-100'}`}>
               {brochures.map((_, i) => (
                 <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-[#00b894]' : 'w-2 bg-white/40'}`}></div>
               ))}
            </div>

            <button onClick={handlePrev} className="hidden lg:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 h-16 bg-white/10 hover:bg-white backdrop-blur-md rounded-full items-center justify-center text-white hover:text-red-800 transition-all opacity-0 group-hover:opacity-100 border border-white/20 shadow-2xl z-50 group/btn">
              <i className="fas fa-arrow-left text-sm transition-transform group-hover/btn:-translate-x-1"></i>
            </button>
            <button onClick={handleNext} className="hidden lg:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 h-16 bg-white/10 hover:bg-white backdrop-blur-md rounded-full items-center justify-center text-white hover:text-red-800 transition-all opacity-0 group-hover:opacity-100 border border-white/20 shadow-2xl z-50 group/btn">
              <i className="fas fa-arrow-right text-sm transition-transform group-hover/btn:translate-x-1"></i>
            </button>
          </div>
        ) : (
          <div className="w-full h-[400px] bg-slate-50 flex items-center justify-center">
            <p className="font-black uppercase tracking-widest text-slate-400 text-[10px] sm:text-xs text-center px-4">Catalogue information currently unavailable.</p>
          </div>
        )}
      </section>

      {/* 2. Dashboard Bar - Full Width Transition */}
      <section className="relative z-10 -mx-4 sm:-mx-8 lg:-mx-16 bg-gradient-to-r from-blue-700 to-blue-900 border-y border-blue-950/20 px-6 sm:px-10 lg:px-16 py-8 lg:py-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center text-blue-700 shadow-xl shadow-blue-900/20 shrink-0">
            <i className="fas fa-user-lock text-sm sm:text-lg"></i>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">Student Dashboard</h2>
            <p className="text-blue-100 text-[11px] sm:text-sm font-medium mt-1">Quick access to resources and portal login.</p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <a 
            href={loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-6 lg:px-10 py-4 text-center bg-white text-blue-900 rounded-xl lg:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-xl active:scale-95"
          >
             Login
          </a>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-6 lg:px-10 py-4 text-center bg-transparent border border-white/40 text-white rounded-xl lg:rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
          >
            Register
          </a>
        </div>
      </section>
      
      {/* 3. Main Content Sections */}
      <div className="space-y-20 sm:space-y-32 py-16 sm:py-24">
        <FeaturedCourses />
        <TeachingHeart />
        <NewsAnnouncements onNavigate={onNavigate} />
        
        {/* Why Choose Us Section - Moved here */}
        <WhyChooseUs />

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

      {/* 4. Global Stats Section */}
      <section className="relative -mx-4 sm:-mx-8 lg:-mx-16 overflow-hidden py-24 sm:py-32 shadow-2xl group/stats">
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
