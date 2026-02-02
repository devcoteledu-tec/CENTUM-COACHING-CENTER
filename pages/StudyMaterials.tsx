
import React, { useState, useEffect } from 'react';

interface Material {
  id: string;
  title: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'General';
  category: 'Notes' | 'Formula Sheet' | 'Mock Test' | 'Previous Year';
  exam: '8th' | '9th' | '10th' | '+1' | '+2' | 'Foundation' | 'Entrance' | 'All';
  file_size: string;
  file_type: string;
  downloads: string;
  url: string;
  is_new?: boolean;
}

const StudyMaterials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeExam, setActiveExam] = useState('All');
  const [activeSubject, setActiveSubject] = useState('All');

  // Request Section State
  const [requestTopic, setRequestTopic] = useState('');
  const [requestUserName, setRequestUserName] = useState('');

  // Supabase Configuration
  const SUPABASE_URL = 'https://xhmisvxohwofpzxkizpi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_n7cCpkRy1wBo95YQHwQykw_gxA98bNd';

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/centum_study_materials?select=*&order=created_at.desc`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMaterials(data);
        }
      } catch (error) {
        console.error("Error fetching study materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const handleRequestSubmit = () => {
    if (!requestTopic.trim() || !requestUserName.trim()) {
      alert("Please enter both your name and the topic details.");
      return;
    }

    const email = "krishnadevthekeettil@gmail.com";
    const subject = encodeURIComponent(`Study Material Request: ${requestTopic}`);
    const body = encodeURIComponent(
      `Hello Centum Team,\n\nI am ${requestUserName}. I would like to request study materials for the following topic:\n\nTopic/Chapter: ${requestTopic}\n\nPlease let me know once this resource is uploaded to the portal.\n\nThank you!`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExam = activeExam === 'All' || m.exam === activeExam || m.exam === 'All';
    const matchesSubject = activeSubject === 'All' || m.subject === activeSubject;
    return matchesSearch && matchesExam && matchesSubject;
  });

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'Chemistry': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Mathematics': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'Biology': return 'text-rose-600 bg-rose-50 border-rose-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-800 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
            <i className="fas fa-layer-group"></i>
            Learning Repository
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">Study Materials</h2>
          <p className="text-slate-500 font-medium max-w-xl text-lg border-l-4 border-red-800 pl-4">Premium academic resources curated by Centum's expert faculty for focused preparation.</p>
        </div>
        
        <div className="w-full lg:w-96 relative">
          <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input 
            type="text" 
            placeholder="Search topics, chapters..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-red-800/5 focus:border-red-800 transition-all placeholder:text-slate-400 shadow-sm"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <div className="flex flex-wrap gap-2">
          {['All', '8th', '9th', '10th', '+1', '+2', 'Foundation', 'Entrance'].map((exam) => (
            <button
              key={exam}
              onClick={() => setActiveExam(exam)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeExam === exam 
                  ? 'bg-slate-900 text-white shadow-xl' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {exam}
            </button>
          ))}
        </div>
        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
        <div className="flex flex-wrap gap-2">
          {['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology'].map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                activeSubject === sub 
                  ? 'bg-red-800 text-white shadow-xl shadow-red-900/10' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:text-red-800 hover:border-red-800/30'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="aspect-[4/5] bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100"></div>
          ))
        ) : filteredMaterials.length > 0 ? (
          filteredMaterials.map((item) => (
            <div key={item.id} className="group bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-red-100 transition-all flex flex-col relative overflow-hidden">
              {item.is_new && (
                <div className="absolute top-0 right-0">
                  <div className="bg-red-800 text-white text-[8px] font-black px-8 py-1 uppercase tracking-widest rotate-45 translate-x-4 translate-y-2 shadow-lg">
                    New
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg border ${getSubjectColor(item.subject)} shadow-sm`}>
                  <i className={`fas ${
                    item.subject === 'Physics' ? 'fa-atom' : 
                    item.subject === 'Chemistry' ? 'fa-flask-vial' : 
                    item.subject === 'Mathematics' ? 'fa-calculator' : 
                    item.subject === 'Biology' ? 'fa-dna' : 'fa-graduation-cap'
                  }`}></i>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight line-clamp-1">{item.subject}</h4>
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-red-800 transition-colors mb-4 flex-1">
                {item.title}
              </h3>

              <div className="flex flex-col gap-6 py-6 border-t border-slate-50 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <i className="far fa-file-pdf text-red-600 text-xs"></i>
                      <span className="text-[10px] font-bold text-slate-600">{item.file_type} • {item.file_size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="far fa-eye text-slate-400 text-[10px]"></i>
                      <span className="text-[10px] font-bold text-slate-400">{item.downloads} Accesses</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-slate-900 text-white text-[8px] font-black rounded-full uppercase tracking-widest">
                    Target: {item.exam}
                  </span>
                </div>
                
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-50 text-slate-900 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-800 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Access Material
                  <i className="fas fa-external-link-alt text-[8px]"></i>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-24 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
            <i className="fas fa-folder-open text-4xl text-slate-200 mb-6"></i>
            <h4 className="text-slate-900 font-black uppercase tracking-widest">No resources found</h4>
            <p className="text-slate-400 text-sm mt-2 font-medium">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {/* Request Section */}
      <section className="bg-slate-900 rounded-[3rem] p-10 sm:p-20 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-20 opacity-5 rotate-12 pointer-events-none text-red-500">
           <i className="fas fa-file-signature text-[15rem]"></i>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
           <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-tight">Can't find what you're looking for?</h3>
           <p className="text-slate-400 font-medium text-lg leading-relaxed">
             Request specific notes, chapter-wise questions, or mock tests. Our academic team will upload them for you within 24 hours.
           </p>
           <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={requestUserName}
                  onChange={(e) => setRequestUserName(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-800 text-white placeholder:text-slate-500 transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Name of Topic / Chapter" 
                  value={requestTopic}
                  onChange={(e) => setRequestTopic(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-800 text-white placeholder:text-slate-500 transition-all"
                />
              </div>
              <button 
                onClick={handleRequestSubmit}
                className="w-full bg-red-800 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all shadow-xl active:scale-95 whitespace-nowrap"
              >
                Request Material
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default StudyMaterials;
