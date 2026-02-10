
import React, { useState, useEffect } from 'react';
import { supabaseFetch } from '../services/supabase';

interface Material {
  id: string;
  title: string;
  subject: string;
  category: string;
  url: string;
  is_new?: boolean;
}

interface StudyMaterialsPreviewProps {
  onNavigate?: (tab: string) => void;
}

const StudyMaterialsPreview: React.FC<StudyMaterialsPreviewProps> = ({ onNavigate }) => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  
  // The URL for the Centum Student Portal
  const loginUrl = "https://img.freepik.com/free-vector/login-template_1017-6719.jpg";

  useEffect(() => {
    const fetchRecentMaterials = async () => {
      try {
        const data = await supabaseFetch<Material>('centum_study_materials?select=id,title,subject,category,url,is_new&order=created_at.desc&limit=4');
        if (data) setMaterials(data);
      } catch (error) {
        console.error("Error fetching preview materials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentMaterials();
  }, []);

  const getSubjectIcon = (subject: string) => {
    switch (subject) {
      case 'Physics': return { icon: 'fa-atom', color: 'text-blue-600 bg-blue-50' };
      case 'Chemistry': return { icon: 'fa-flask-vial', color: 'text-emerald-600 bg-emerald-50' };
      case 'Mathematics': return { icon: 'fa-calculator', color: 'text-purple-600 bg-purple-50' };
      case 'Biology': return { icon: 'fa-dna', color: 'text-rose-600 bg-rose-50' };
      default: return { icon: 'fa-book', color: 'text-slate-600 bg-slate-50' };
    }
  };

  return (
    <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-6">
        <div className="text-center sm:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-800 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-100">
            <i className="fas fa-file-pdf"></i>
            Premium Downloads
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 flex items-center justify-center sm:justify-start gap-3 uppercase tracking-tight">
            Free Study Materials
          </h3>
          <p className="text-slate-500 text-sm font-medium">Expert-curated notes and formula sheets for competitive edge.</p>
        </div>
        <button 
          onClick={() => onNavigate?.('study-materials')}
          className="w-full sm:w-auto text-red-800 font-black text-[10px] uppercase tracking-widest px-8 py-4 border-2 border-slate-100 rounded-xl hover:bg-red-800 hover:text-white transition-all shadow-sm active:scale-95"
        >
          Browse All Materials
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? (
          [1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-slate-50 animate-pulse rounded-3xl"></div>)
        ) : materials.length > 0 ? (
          materials.map((item) => {
            const theme = getSubjectIcon(item.subject);
            return (
              <div key={item.id} className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:border-red-100 transition-all flex flex-col relative overflow-hidden">
                {item.is_new && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-800 text-white text-[7px] font-black px-2 py-1 rounded uppercase tracking-widest">New</span>
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm border ${theme.color} border-current/10 shadow-sm`}>
                    <i className={`fas ${theme.icon}`}></i>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">{item.category}</span>
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{item.subject}</h4>
                  </div>
                </div>

                <h5 className="text-sm font-black text-slate-800 leading-tight group-hover:text-red-800 transition-colors mb-6 line-clamp-2 flex-1">
                  {item.title}
                </h5>

                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-slate-50 text-slate-900 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-800 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  Access File
                  <i className="fas fa-external-link-alt text-[7px]"></i>
                </a>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Resources updating soon...</p>
          </div>
        )}
      </div>

      <div className="mt-12 bg-red-800/5 rounded-3xl p-6 border border-red-800/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-10 h-10 bg-red-800 text-white rounded-full flex items-center justify-center shrink-0">
            <i className="fas fa-lightbulb"></i>
          </div>
          <div>
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-tight">Personalized Study Plan?</h4>
            <p className="text-slate-500 text-[10px] font-medium">Join our portal to track your progress and get custom recommendations.</p>
          </div>
        </div>
        <a 
          href={loginUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-red-800 transition-colors shadow-lg active:scale-95 text-center"
        >
          Join Portal Now
        </a>
      </div>
    </section>
  );
};

export default StudyMaterialsPreview;
