
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Introduction */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
            <i className="fas fa-landmark"></i>
            Our Heritage
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-tight">
            Decades of <br/> Academic <span className="text-red-800">Legacy</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Centum Education was founded with a singular vision: to democratize high-quality competitive coaching. What started as a small classroom of ten aspirants has grown into India's premier institution for JEE and NEET preparation.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
             <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <h4 className="text-3xl font-black text-red-800">15+</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Years of Excellence</p>
             </div>
             <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                <h4 className="text-3xl font-black text-red-800">50k+</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Students Guided</p>
             </div>
          </div>
        </div>
        <div className="relative">
           <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Centum Founders" />
           </div>
           <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-50 max-w-xs">
              <p className="text-slate-900 font-bold italic">"Education is not just about rankings; it's about the character we build in the process."</p>
              <p className="text-[10px] font-black text-red-800 uppercase tracking-widest mt-4">— The Founding Board</p>
           </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-900 rounded-[3.5rem] p-10 sm:p-20 text-white relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
           <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase tracking-widest text-red-500">Our Mission</h3>
              <p className="text-slate-300 text-lg leading-relaxed font-medium">
                To provide rigorous, results-oriented training that empowers every student to reach their peak potential, regardless of their starting point.
              </p>
           </div>
           <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase tracking-widest text-blue-400">Our Vision</h3>
              <p className="text-slate-300 text-lg leading-relaxed font-medium">
                To be the global benchmark for professional education, where innovation in pedagogy meets the timeless values of hard work and integrity.
              </p>
           </div>
        </div>
        <div className="absolute top-0 right-0 p-20 opacity-5">
           <i className="fas fa-shield-heart text-[20rem]"></i>
        </div>
      </section>

      {/* Core Values */}
      <section>
        <div className="text-center mb-16 space-y-4">
          <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">The Centum Philosophy</h3>
          <p className="text-slate-500 font-medium">The four pillars that define our daily academic operations.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { title: 'Pedagogy', desc: 'Custom research-backed curriculum for every level.', icon: 'fa-book-open-reader' },
             { title: 'Mentorship', desc: '24/7 access to faculty and psychological counselors.', icon: 'fa-people-group' },
             { title: 'Innovation', desc: 'AI-driven test analysis and progress tracking.', icon: 'fa-microchip' },
             { title: 'Integrity', desc: 'Transparent results and absolute academic honesty.', icon: 'fa-gavel' }
           ].map((v, i) => (
             <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 text-center space-y-4 hover:border-red-800 hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 bg-slate-50 text-red-800 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-inner">
                   <i className={`fas ${v.icon}`}></i>
                </div>
                <h4 className="text-lg font-black text-slate-900 uppercase">{v.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{v.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
