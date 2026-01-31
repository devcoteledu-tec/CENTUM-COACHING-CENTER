
import React from 'react';

const FreeClasses: React.FC = () => {
  const lectures = [
    { 
      title: "Mastering Thermodynamics for JEE 2025", 
      subject: "Physics", 
      views: "12.4K", 
      duration: "45:20", 
      thumb: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    { 
      title: "Organic Chemistry: Key SN1/SN2 Strategies", 
      subject: "Chemistry", 
      views: "8.2K", 
      duration: "32:15", 
      thumb: "https://images.unsplash.com/photo-1532187875605-7fe3b25198bf?auto=format&fit=crop&q=80&w=400",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    { 
      title: "Calculus Foundation: Limits & Continuity", 
      subject: "Mathematics", 
      views: "15.1K", 
      duration: "58:40", 
      thumb: "https://images.unsplash.com/photo-1509228468518-180dd482195e?auto=format&fit=crop&q=80&w=400",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
  ];

  return (
    <section>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-3">
            <i className="fab fa-youtube text-red-600 text-3xl"></i>
            Free Learning Resources
          </h3>
          <p className="text-slate-500 text-sm font-medium mt-1">Concept deep-dives by our senior academic faculty.</p>
        </div>
        <a 
          href="https://www.youtube.com/@CentumEducation" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-red-800 font-black text-[10px] uppercase tracking-widest px-6 py-3 border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-all text-center"
        >
          Browse Channel
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {lectures.map((video, idx) => (
          <a 
            key={idx} 
            href={video.videoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block"
          >
            <div className="aspect-video relative rounded-3xl overflow-hidden shadow-xl mb-5 group-hover:shadow-red-900/10 transition-all">
              <img src={video.thumb} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={video.title} />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-16 h-16 bg-white/95 backdrop-blur rounded-full flex items-center justify-center text-red-700 shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                    <i className="fas fa-play ml-1"></i>
                 </div>
              </div>
              <span className="absolute bottom-4 right-4 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
                {video.duration}
              </span>
              <div className="absolute top-4 left-4 bg-red-700 text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-xl">
                {video.subject}
              </div>
            </div>
            <div className="px-1">
              <h4 className="font-black text-slate-800 group-hover:text-red-800 transition-colors leading-tight text-base sm:text-lg mb-2">
                {video.title}
              </h4>
              <div className="flex items-center gap-2 mb-3">
                <i className="fab fa-youtube text-red-600 text-xs"></i>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Centum Official YouTube</span>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span><i className="far fa-eye mr-2"></i> {video.views} Views</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>Updated Today</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FreeClasses;
