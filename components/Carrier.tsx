
import React, { useState } from 'react';

const Carrier: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState('All');

  const jobs = [
    {
      id: 'j1',
      title: "Senior Physics Faculty (IIT-JEE)",
      type: "Full-Time",
      location: "Bengaluru, HSR Layout",
      dept: "Academic",
      experience: "5+ Years",
    },
    {
      id: 'j-chem',
      title: "Chemistry Faculty (NEET/JEE)",
      type: "Full-Time",
      location: "Cherpulassery, Kerala",
      dept: "Academic",
      experience: "3+ Years",
    },
    {
      id: 'j-math',
      title: "Mathematics Faculty",
      type: "Full-Time",
      location: "Cherpulassery, Kerala",
      dept: "Academic",
      experience: "4+ Years",
    },
    {
      id: 'j3',
      title: "Biology Subject Matter Expert",
      type: "Remote / Hybrid",
      location: "National",
      dept: "Content",
      experience: "2+ Years",
    },
    {
      id: 'j-eng',
      title: "English Faculty (Foundation)",
      type: "Full-Time",
      location: "Cherpulassery, Kerala",
      dept: "Academic",
      experience: "2+ Years",
    },
    {
      id: 'j-hindi',
      title: "Hindi Language Educator",
      type: "Part-Time",
      location: "Cherpulassery, Kerala",
      dept: "Academic",
      experience: "2+ Years",
    },
    {
      id: 'j-writer',
      title: "Online Content Writer",
      type: "Remote",
      location: "National",
      dept: "Content",
      experience: "1+ Year",
    },
    {
      id: 'j5',
      title: "Front-End Developer (Learning App)",
      type: "Full-Time",
      location: "Remote",
      dept: "Technology",
      experience: "3+ Years",
    },
    {
      id: 'j2',
      title: "Academic Counselor",
      type: "Full-Time",
      location: "Kochi, Kerala",
      dept: "Sales & Support",
      experience: "1-3 Years",
    },
    {
      id: 'j4',
      title: "Operations Manager",
      type: "Full-Time",
      location: "Bengaluru, North",
      dept: "Administration",
      experience: "4+ Years",
    }
  ];

  const benefits = [
    { title: "Competitive Salary", icon: "fa-money-bill-trend-up" },
    { title: "Growth Opportunities", icon: "fa-arrow-up-right-dots" },
    { title: "Health Insurance", icon: "fa-heart-pulse" },
    { title: "Work-Life Balance", icon: "fa-seedling" }
  ];

  const depts = ['All', 'Academic', 'Content', 'Technology', 'Sales & Support', 'Administration'];

  const filteredJobs = selectedDept === 'All' 
    ? jobs 
    : jobs.filter(j => j.dept === selectedDept);

  const handleApply = (jobTitle: string) => {
    const email = "krishnadevthekeettil@gmail.com";
    const subject = encodeURIComponent(`Job Application: ${jobTitle}`);
    const body = encodeURIComponent(`I am interested to join as ${jobTitle} at Centum Education.`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Hero Section - Black & Green Theme */}
      <section className="relative bg-black rounded-[3rem] overflow-hidden p-8 sm:p-20 text-white border border-emerald-900/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            We Are Hiring
          </div>
          <h2 className="text-4xl sm:text-7xl font-black tracking-tight leading-none">
            Empower the <br/>
            <span className="text-emerald-500 underline decoration-white/20 underline-offset-8">Next Generation</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-xl font-medium leading-relaxed max-w-xl">
            Join India's most innovative academic team. At Centum, we don't just teach—we transform lives. Build your career while helping students build theirs.
          </p>
          <div className="pt-6">
            <a 
              href="#openings"
              className="inline-block bg-emerald-600 hover:bg-emerald-500 text-black font-black px-10 py-5 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 active:scale-95"
            >
              Explore Openings
            </a>
          </div>
        </div>
      </section>

      {/* Benefits - White Theme with Green Accents */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {benefits.map((b, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-emerald-200 transition-all group">
            <div className="w-14 h-14 bg-black text-emerald-500 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-emerald-600 group-hover:text-black transition-colors">
              <i className={`fas ${b.icon}`}></i>
            </div>
            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{b.title}</h4>
            <p className="text-slate-500 text-xs mt-3 font-medium leading-relaxed">Centum ensures an environment where performance meets wellness.</p>
          </div>
        ))}
      </section>

      {/* Job Board */}
      <section id="openings" className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-10">
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Current Openings</h3>
            <p className="text-slate-500 font-medium">Find a role that matches your expertise and passion.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedDept === d 
                    ? 'bg-black text-emerald-400 shadow-xl' 
                    : 'bg-white text-slate-500 border border-slate-100 hover:bg-emerald-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="group bg-white p-6 sm:p-10 rounded-[2.5rem] border border-slate-100 hover:border-emerald-500 hover:shadow-2xl transition-all flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg uppercase tracking-widest">
                      {job.dept}
                    </span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      {job.type}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {job.title}
                  </h4>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold text-slate-400">
                    <span><i className="fas fa-location-dot mr-2"></i>{job.location}</span>
                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                    <span><i className="fas fa-briefcase mr-2"></i>{job.experience}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleApply(job.title)}
                  className="w-full md:w-auto bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-black transition-all group-hover:translate-x-1"
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
              <i className="fas fa-search text-4xl text-slate-300 mb-4"></i>
              <p className="text-slate-400 font-bold uppercase tracking-widest">No positions found in this department.</p>
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1 relative h-[400px] rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Culture" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-10">
            <p className="text-white font-black text-xl italic leading-tight">"The collaborative energy at Centum is addictive. We grow as one team."</p>
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-8">
          <h3 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter leading-none">CULTURE AT <br/> <span className="text-emerald-600">CENTUM</span></h3>
          <p className="text-slate-500 font-medium leading-relaxed text-lg">
            We believe in radical transparency, extreme ownership, and continuous learning. Our faculty rooms are hubs of intellectual debate, and our support teams are the backbone of our student success.
          </p>
          <ul className="space-y-4">
            {['Weekly Skill-up Workshops', 'Annual International Retreat', 'Merit-based Bonus System'].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-sm font-black text-slate-800 uppercase tracking-widest">
                <i className="fas fa-check-circle text-emerald-500"></i>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bottom CTA Form */}
      <section className="bg-black rounded-[3rem] p-10 sm:p-20 text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">Can't find the right role?</h3>
          <p className="text-slate-400 font-medium">Drop your resume in our talent pool, and we'll reach out when a matching role opens up.</p>
          
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2.5rem] border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="bg-white/10 px-6 py-4 rounded-2xl border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <input type="email" placeholder="Email Address" className="bg-white/10 px-6 py-4 rounded-2xl border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500" />
            <div className="sm:col-span-2">
              <button 
                onClick={() => handleApply("General Application")}
                className="w-full bg-emerald-600 text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Submit Resume
              </button>
            </div>
          </div>
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">By submitting, you agree to our recruitment privacy policy.</p>
        </div>
      </section>

    </div>
  );
};

export default Carrier;
