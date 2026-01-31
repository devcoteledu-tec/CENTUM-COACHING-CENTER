
import React, { useState, useEffect } from 'react';

interface TopperData {
  id: number;
  student_name: string;
  rank: string;
  exam_type: string;
  score: string;
  image_url: string;
  achievement: string;
  exam_year: number;
}

const Results: React.FC = () => {
  const [activeExam, setActiveExam] = useState('JEE Advanced');
  const [results, setResults] = useState<TopperData[]>([]);
  const [loading, setLoading] = useState(true);

  const exams = ['JEE Advanced', 'JEE Main', 'NEET (UG)', 'KEAM', 'Foundation'];

  const SUPABASE_URL = 'https://xhmisvxohwofpzxkizpi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_n7cCpkRy1wBo95YQHwQykw_gxA98bNd';

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/centum_results?select=*&order=exam_year.desc`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        console.error("Error fetching Centum Results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const filteredToppers = results.filter(topper => topper.exam_type === activeExam);

  const stats = [
    { label: "Selections in IITs", value: "450+", icon: "fa-university" },
    { label: "Selections in MBBS", value: "820+", icon: "fa-user-md" },
    { label: "Top 100 AIRs", value: "12", icon: "fa-star" },
    { label: "Qualified for Mains", value: "2800+", icon: "fa-check-double" }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Results Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-800 rounded-lg text-[9px] font-black uppercase tracking-widest border border-purple-100 mx-auto lg:mx-0">
            <i className="fas fa-trophy text-purple-600"></i>
            Legacy of Excellence
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">Academic Results</h2>
          <p className="text-slate-500 font-medium max-w-xl text-base sm:text-lg border-l-4 border-purple-200 pl-4 mx-auto lg:mx-0 text-left">Year after year, Centum students set new benchmarks in national entrance examinations.</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
          {exams.map((exam) => (
            <button
              key={exam}
              onClick={() => setActiveExam(exam)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${
                activeExam === exam 
                  ? 'bg-purple-900 text-white shadow-xl shadow-purple-200' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:bg-purple-50 hover:text-purple-800'
              }`}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>

      {/* Hall of Fame */}
      <section>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-widest">Hall of Fame 2024</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{activeExam} Highlights</span>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="aspect-[3/4] bg-slate-100 animate-pulse rounded-[2.5rem]"></div>
            ))}
          </div>
        ) : filteredToppers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredToppers.map((topper) => (
              <div key={topper.id} className="group bg-white rounded-[2rem] sm:rounded-[2.5rem] p-6 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-purple-200 transition-all flex flex-col">
                <div className="relative mb-8">
                  <div className="aspect-square rounded-[1.8rem] overflow-hidden border-4 border-white shadow-lg bg-slate-50">
                    <img 
                      src={topper.image_url || `https://i.pravatar.cc/150?u=${topper.id}`} 
                      alt={topper.student_name} 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-purple-900 text-white px-5 py-2 rounded-xl text-[12px] font-black shadow-xl border border-purple-800/20 whitespace-nowrap z-10">
                    {topper.rank}
                  </div>
                </div>
                <div className="text-center flex-1 flex flex-col">
                  <h4 className="font-black text-slate-900 text-base sm:text-lg uppercase tracking-tight line-clamp-1">{topper.student_name}</h4>
                  <p className="text-purple-700 text-[10px] font-black uppercase tracking-widest mt-1">{topper.score}</p>
                  <div className="mt-auto pt-6 flex flex-col gap-2">
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{topper.exam_type} {topper.exam_year}</span>
                     <p className="text-[10px] text-slate-500 italic bg-slate-50 py-3 px-4 rounded-xl border border-slate-100 group-hover:bg-purple-50 group-hover:text-purple-900 transition-colors leading-relaxed">
                       {topper.achievement}
                     </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
            <i className="fas fa-award text-4xl text-slate-300 mb-4"></i>
            <p className="text-slate-400 font-bold uppercase tracking-widest px-4">No results found for {activeExam} yet.</p>
          </div>
        )}
      </section>

      {/* Statistics Section */}
      <section className="bg-purple-950 rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-20 text-white relative overflow-hidden shadow-2xl shadow-purple-900/20">
        <div className="absolute top-0 right-0 p-10 sm:p-20 opacity-10 rotate-12 pointer-events-none text-white hidden sm:block">
          <i className="fas fa-award text-[10rem] sm:text-[15rem] text-white"></i>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 sm:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-4 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl mx-auto backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-500">
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div>
                <h3 className="text-2xl sm:text-5xl font-black text-white mb-2 tracking-tighter">{stat.value}</h3>
                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-purple-200 opacity-70 leading-tight">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Result Verification */}
      <section className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 p-8 sm:p-16 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-900 via-purple-400 to-purple-900 opacity-50"></div>
        <div className="max-w-3xl mx-auto space-y-10 text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Check Your Performance</h3>
            <p className="text-slate-500 font-medium text-sm sm:text-base">Secure access to individual rank cards and detailed subject analysis.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Enrollment ID" 
              className="flex-1 bg-slate-50 border border-slate-200 px-6 py-4 rounded-xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-300 transition-all text-center sm:text-left"
            />
            <button className="bg-purple-900 text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl active:scale-95 whitespace-nowrap">
              Verify Result
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
