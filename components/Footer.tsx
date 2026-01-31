
import React from 'react';

interface FooterProps {
  onNavigate?: (tab: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ28SELqMf_xjvFnRvohJuQIuf0cEKM6K9lmA&s";

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 sm:py-20 px-6 sm:px-16 mt-12 sm:mt-20 rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t-[8px] sm:border-t-[12px] border-red-800 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 mb-16">
          {/* Institution Info */}
          <div className="space-y-6 sm:space-y-8 text-center sm:text-left flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-xl overflow-hidden p-1 border-2 border-white/10 shrink-0">
                <img src={logoUrl} alt="Centum Logo" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-black text-white tracking-tighter leading-none uppercase">CENTUM</h2>
                <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] block mt-1">EDUCATION</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed font-medium opacity-80 max-w-xs">
              Leading the path to academic excellence with specialized JEE, NEET, and Foundation programs.
            </p>
            {/* Social Media */}
            <div className="space-y-4 w-full">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 text-center sm:text-left">Connect with us</p>
              <div className="flex justify-center sm:justify-start gap-3">
                {['fa-facebook-f', 'fa-twitter', 'fa-instagram', 'fa-youtube', 'fa-linkedin-in'].map((icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white transition-all hover:bg-red-800 hover:-translate-y-1 active:scale-90">
                    <i className={`fab ${icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-red-800 inline-block">Quick Links</h4>
            <ul className="space-y-4 text-xs sm:text-sm font-bold">
              <li><button onClick={() => onNavigate?.('home')} className="hover:text-red-500 transition-colors">Admissions 2025</button></li>
              <li><button onClick={() => onNavigate?.('notifications')} className="hover:text-red-500 transition-colors">Scholarship Test</button></li>
              <li><button onClick={() => onNavigate?.('results')} className="hover:text-red-500 transition-colors">Success Stories</button></li>
              <li><button onClick={() => onNavigate?.('centers')} className="hover:text-red-500 transition-colors">Branch Locations</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-red-800 inline-block">Resources</h4>
            <ul className="space-y-4 text-xs sm:text-sm font-bold">
              <li><button onClick={() => onNavigate?.('study-materials')} className="hover:text-red-500 transition-colors">Study Materials</button></li>
              <li><button onClick={() => onNavigate?.('notifications')} className="hover:text-red-500 transition-colors">Exam Notifications</button></li>
              <li><button onClick={() => onNavigate?.('results')} className="hover:text-red-500 transition-colors">Results Portal</button></li>
              <li><button onClick={() => onNavigate?.('blogs')} className="hover:text-red-500 transition-colors">Academic Blog</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-red-800 inline-block">Contact Info</h4>
            <div className="space-y-6 text-xs sm:text-sm font-bold">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <i className="fas fa-map-marker-alt text-red-500 mt-1 shrink-0"></i>
                <span className="opacity-80">Cherpulassery, Palakkad, Kerala</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
                <i className="fas fa-phone-alt text-red-500 mt-1 shrink-0"></i>
                <span className="opacity-80">+91 98765 43210</span>
              </div>
              <div className="pt-4 sm:pt-6">
                <div className="bg-red-900/10 rounded-2xl p-6 border border-red-800/20 shadow-xl">
                  <p className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-2">Admission Helpline</p>
                  <p className="text-white text-xl sm:text-2xl font-black tracking-tighter">1800-456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] opacity-50 text-center">
          <p>© 2025 Centum Education Cherpulassery. All Rights Reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <button onClick={() => onNavigate?.('carrier')} className="hover:text-white transition-colors">Career</button>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Feedback</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
