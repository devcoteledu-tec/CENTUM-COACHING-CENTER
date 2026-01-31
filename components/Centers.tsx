
import React from 'react';

const Centers: React.FC = () => {
  const centers = [
    {
      id: 'c1',
      name: "Centum Mains",
      tagline: "Premier Hub for JEE & NEET Excellence",
      image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800",
      location: "cherpulassery town near plaza theater ,3rd floor",
      phone: "+91 98765 43210",
      email: "mains@centumeducation.in",
      facilities: ["Smart Classrooms", " Library", "Doubt Clearing sections", "tec support"],
      isResidential: false,
      description: "Our flagship urban center equipped with state-of-the-art digital infrastructure and the most experienced faculty pool for day-scholars.",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Centum+Education+HSR+Layout+Sector+2+Bengaluru"
    },
    {
      id: 'c2',
      name: "Acharya Campus",
      tagline: "Excellence & Holistic Growth",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
      location: "Near cherpulassery kavu ,HP pumbs opposite ,3rd floor",
      phone: "+91 98765 00112",
      email: "acharya@centumeducation.in",
      facilities: ["Premium class", "student support org", "24/7 Mentors", "Organic contents"],
      isResidential: false,
      description: "A serene, campus designed to provide 24/7 academic immersion away from  distractions.",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Centum+Education+Electronic+City+Phase+II+Bengaluru"
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-slate-100 pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950 text-amber-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-900/20">
            <i className="fas fa-map-marked-alt"></i>
            Our Campuses
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter uppercase">Learning Centers</h2>
          <p className="text-slate-500 font-medium max-w-xl text-lg">Strategically located environments designed to foster focus, innovation, and academic success.</p>
        </div>
        
        <div className="flex gap-4">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Support</p>
              <p className="text-lg font-black text-slate-950">1800-456-7890</p>
           </div>
        </div>
      </div>

      {/* Centers Display */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {centers.map((center) => (
          <div key={center.id} className="group bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-amber-500/5 transition-all flex flex-col">
            {/* Image Section */}
            <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
              <img src={center.image} alt={center.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-white text-slate-950 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {center.name.split(' ')[1] || 'Campus'}
                </span>
                {center.isResidential && (
                  <span className="bg-amber-500 text-slate-950 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Residential
                  </span>
                )}
              </div>

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase mb-1">{center.name}</h3>
                <p className="text-amber-500 font-medium uppercase text-xs tracking-[0.2em]">{center.tagline}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 sm:p-12 flex-1 flex flex-col space-y-8">
              <p className="text-slate-500 font-medium leading-relaxed italic">
                "{center.description}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <i className="fas fa-info-circle text-amber-600"></i> Contact Details
                   </h4>
                   <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <i className="fas fa-location-dot mt-1 text-slate-400"></i>
                        <span className="text-sm font-bold text-slate-700">{center.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <i className="fas fa-phone mt-0.5 text-slate-400"></i>
                        <span className="text-sm font-bold text-slate-700">{center.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <i className="fas fa-envelope mt-0.5 text-slate-400"></i>
                        <span className="text-sm font-bold text-slate-700">{center.email}</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                     <i className="fas fa-star text-amber-600"></i> Key Facilities
                   </h4>
                   <div className="grid grid-cols-2 gap-2">
                      {center.facilities.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2 rounded-lg">
                          <i className="fas fa-check text-[8px] text-amber-500"></i>
                          {f}
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:7593038781"
                  className="flex-1 bg-slate-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 hover:text-slate-950 transition-all shadow-xl shadow-slate-200 text-center"
                >
                  Contact Us
                </a>
                <a 
                  href={center.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-white border-2 border-slate-100 text-slate-600 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-slate-950 hover:text-slate-950 transition-all text-center"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Center Facilities Icon Section */}
      <section className="bg-slate-50 rounded-[3rem] p-10 sm:p-20 border border-slate-100">
        <div className="text-center mb-16 space-y-3">
          <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">The Centum Standard</h3>
          <p className="text-slate-500 font-medium">Uniform excellence across all our educational facilities.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: 'fa-wifi', label: 'Gigabit Campus' },
            { icon: 'fa-shield-halved', label: '24/7 Surveillance' },
            { icon: 'fa-coffee', label: 'Student Cafeteria' },
            { icon: 'fa-bus', label: 'Transport Hub' }
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-amber-600 group-hover:border-slate-950 transition-all mx-auto">
                <i className={`fas ${item.icon} text-xl`}></i>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Banner - Deep Navy & Mustard Gold */}
      <section className="bg-slate-950 rounded-[3rem] p-10 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 text-white relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12 pointer-events-none text-amber-500">
            <i className="fas fa-building text-[10rem]"></i>
         </div>
         <div className="relative z-10 space-y-4 text-center lg:text-left">
           <h3 className="text-3xl font-black tracking-tight">Visit Us Today</h3>
           <p className="text-slate-300 font-medium max-w-lg">Choosing the right environment is half the battle. Walk into any of our centers for a free demo session and academic counseling.</p>
         </div>
         <div className="relative z-10 flex gap-4 w-full lg:w-auto">
           <a 
            href="tel:7593038781"
            className="flex-1 lg:flex-none bg-amber-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-white transition-all text-center"
           >
             Contact Center Head
           </a>
         </div>
      </section>
    </div>
  );
};

export default Centers;
