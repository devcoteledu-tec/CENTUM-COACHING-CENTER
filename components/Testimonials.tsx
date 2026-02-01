
import React, { useState } from 'react';

interface TestimonialsProps {
  onNavigate?: (tab: string) => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const SUPABASE_URL = 'https://xhmisvxohwofpzxkizpi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_n7cCpkRy1wBo95YQHwQykw_gxA98bNd';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/centum_subscribers`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const stories = [
    {
      name: "Ajesh",
      rank: "AIR 45 - UPSC CSE (IAS)",
      quote: "The analytical foundation I built at Centum during my early years stayed with me. Their focus on logic and conceptual clarity is what sets them apart in competitive coaching.",
      img: "https://img1.wsimg.com/isteam/ip/8146ca66-1e3f-445d-b78d-795d3d7c852c/Ajesh%20A%20photo.jpeg/:/cr=t:4.01%25,l:0%25,w:100%25,h:77.78%25/rs=w:365,h:365,cg:true/:/cr=t:4.01%25,l:0%25,w:100%25,h:77.78%25/rs=w:365,h:365,cg:true",
      type: "IAS",
      year: "2015"
    },
    {
      name: "Arya",
      rank: "AIR 12 - JEE Advanced",
      quote: "The personalized focus and doubt-clearing sessions at Centum made all the difference in my preparation journey. The faculty provided constant support and guidance.",
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
      type: "JEE",
      year: "2024"
    },
    {
      name: "Sneha Nair",
      rank: "695/720 - NEET (UG)",
      quote: "The test series is exceptionally well-structured. It accurately simulates the actual exam environment and high-pressure situations, which was crucial for my score.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      type: "NEET",
      year: "2024"
    }
  ];

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] sm:rounded-[4rem] p-6 sm:p-12 lg:p-20 bg-slate-50 border border-slate-200/60 shadow-inner">
      {/* Background Decorative Text */}
      <div className="absolute top-10 left-10 text-[12rem] font-black text-slate-100/50 select-none pointer-events-none uppercase tracking-tighter hidden lg:block">
        EXCELLENCE
      </div>

      <div className="relative z-10">
        {/* Email Registration Section */}
        <div className="mb-16 sm:mb-20 bg-white rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-800/5 rounded-full blur-[80px] group-hover:bg-red-800/10 transition-colors"></div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center lg:text-left space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-red-800 mb-2">
                <i className="fas fa-envelope-open-text text-xl"></i>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Stay Updated</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">Never Miss an Update</h3>
              <p className="text-slate-500 font-medium text-xs sm:text-sm max-w-md">Register your email to receive the latest news, announcements, and success strategies from Centum Coaching Center.</p>
            </div>
            <form onSubmit={handleRegister} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                className="px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-red-800/20 focus:border-red-800 transition-all w-full sm:w-72"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className={`px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 whitespace-nowrap ${
                  status === 'success' ? 'bg-emerald-600 text-white' : 
                  status === 'error' ? 'bg-slate-900 text-white' : 
                  'bg-red-800 text-white hover:bg-slate-900 shadow-red-900/10'
                }`}
              >
                {status === 'loading' ? 'Registering...' : 
                 status === 'success' ? 'Success!' : 
                 status === 'error' ? 'Try Again' : 
                 'Register Now'}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-amber-100 shadow-sm">
            <i className="fas fa-crown"></i>
            Student Success Stories
          </div>
          <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
            Our Hall of <span className="text-red-800">Excellence</span>
          </h3>
          <p className="text-slate-500 text-sm sm:text-lg font-medium mt-6 max-w-2xl mx-auto leading-relaxed">
            From the corridors of IAS to the halls of IITs and Medical colleges, Centum Cherpulassery students continue to lead with brilliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {stories.map((s, i) => (
            <div key={i} className="group bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-xl shadow-slate-200/60 border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-2">
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img 
                  src={s.img} 
                  alt={s.name} 
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-white/20">
                  Batch {s.year}
                </div>
                <div className={`absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 rounded-xl text-white font-black text-[10px] uppercase tracking-widest shadow-lg ${
                  s.type === 'IAS' ? 'bg-amber-600' : s.type === 'JEE' ? 'bg-red-800' : 'bg-emerald-700'
                }`}>
                  <i className={`fas ${s.type === 'IAS' ? 'fa-landmark' : s.type === 'JEE' ? 'fa-atom' : 'fa-stethoscope'}`}></i>
                  {s.type} Topper
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase mb-1">{s.name}</h4>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${
                    s.type === 'IAS' ? 'text-amber-600' : s.type === 'JEE' ? 'text-red-800' : 'text-emerald-700'
                  }`}>
                    {s.rank}
                  </p>
                </div>

                <div className="relative flex-1">
                  <i className="fas fa-quote-left text-slate-100 text-4xl absolute -top-4 -left-2 z-0"></i>
                  <p className="text-slate-600 text-sm leading-relaxed relative z-10 font-medium italic">
                    {s.quote}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <i key={star} className="fas fa-star text-[8px] text-amber-400"></i>
                    ))}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <i className="fas fa-shield-check text-emerald-500"></i>
                    Centum Alumnus
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <button 
            onClick={() => onNavigate?.('results')}
            className="bg-red-800 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-red-900/20 flex items-center justify-center gap-3 mx-auto"
          >
            View All Results
            <i className="fas fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
