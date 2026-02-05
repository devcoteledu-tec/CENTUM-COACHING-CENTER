
import React, { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ28SELqMf_xjvFnRvohJuQIuf0cEKM6K9lmA&s";
  const loginUrl = "https://img.freepik.com/free-vector/login-template_1017-6719.jpg";

  const institutionalLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about-us', label: 'About Us' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'news', label: 'News' },
    { id: 'results', label: 'Results' },
    { id: 'carrier', label: 'Careers' },
  ];

  const academicDropdown = {
    label: 'Programs',
    items: [
      { label: 'JEE (Main & Adv)', link: '/programs/jee' },
      { label: 'NEET (UG) Medical', link: '/programs/neet' },
      { label: 'Foundation (8-10)', link: '/programs/foundation' },
      { label: 'Residential Batches', link: '/programs/residential' },
      { label: 'Crash Courses', link: '/programs/crash-course' }
    ]
  };

  const admissionDropdown = {
    label: 'Admission',
    items: [
      { label: 'Scholarship Test (CST)', link: '/admission/scholarship' },
      { label: 'Online Registration', link: 'https://krishnadev-devco.github.io/form-test/' },
      { label: 'Fee Structure', link: '/admission/fees' },
      { label: 'Application Process', link: '/admission/process' }
    ]
  };

  const managementDropdown = {
    label: 'Management',
    items: [
      { label: 'Faculty Portal', link: '#' },
      { label: 'Attendance CMS', link: '#' },
      { label: 'Admin Dashboard', link: '#' },
      { label: 'Reports', link: '#' }
    ]
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="w-full z-[100] bg-white sticky top-0 shadow-sm border-b border-slate-100">
      {/* 1. News Ticker */}
      <div className="ticker-wrapper relative z-[110] border-b border-white/10 hidden md:block">
        <div className="ticker-text text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="mx-12"><i className="fas fa-fire-flame-curved mr-2"></i> Admissions Open for  2025-26 Academic Year</span>
          <span className="mx-12"><i className="fas fa-trophy mr-2"></i> Centum Scholarship Test (CST) Registration Now Active</span>
          <span className="mx-12"><i className="fas fa-bullhorn mr-2"></i> Congratulations to our 2025 Top Rankers </span>
        </div>
      </div>

      {/* 2. Top Secondary Bar */}
      <div className="bg-slate-50 border-b border-slate-100 py-2.5 px-6 lg:px-12 hidden md:block">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <i className="fas fa-phone-alt text-red-800"></i>
              +91 7593038781
            </span>
            <span className="flex items-center gap-2">
              <i className="fas fa-envelope text-red-800"></i>
              info@centumeducation.in
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <i className="fas fa-clock text-red-800"></i>
              Mon - Sun: 9:00 AM - 7:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Header Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3.5 sm:py-5">
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-4 group cursor-pointer shrink-0" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-slate-100 overflow-hidden p-1 transition-transform group-hover:scale-105">
            <img src={logoUrl} alt="Centum Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tighter leading-none uppercase shrink-0">
            CENTUM <span className="text-red-800">CPY</span>
          </h1>
        </div>

        {/* Navigation Items */}
        <div className="hidden xl:flex items-center flex-1 justify-center px-4 xl:px-8">
          <div className="flex items-center space-x-0.5 xl:space-x-1">
            {institutionalLinks.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)} 
                className={`px-3 xl:px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all whitespace-nowrap ${
                  activeTab === item.id 
                    ? 'text-red-800 bg-red-50 shadow-sm' 
                    : 'text-slate-600 hover:text-red-800 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="h-6 w-px bg-slate-200 mx-2 xl:mx-4"></div>

            {[academicDropdown, admissionDropdown, managementDropdown].map((dropdown) => (
              <div 
                key={dropdown.label}
                className="relative group h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(dropdown.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`px-3 xl:px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDropdown === dropdown.label ? 'text-red-800 bg-red-50' : 'text-slate-600 hover:text-red-800'
                }`}>
                  {dropdown.label}
                  <i className={`fas fa-chevron-down text-[7px] transition-transform duration-300 ${activeDropdown === dropdown.label ? 'rotate-180' : ''}`}></i>
                </button>

                <div className={`absolute top-full left-0 w-60 bg-white shadow-2xl rounded-2xl border border-slate-100 py-4 z-[150] transition-all duration-300 transform origin-top ${
                  activeDropdown === dropdown.label ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'
                }`}>
                  {dropdown.items.map((opt, i) => (
                    <a 
                      key={i} 
                      href={opt.link} 
                      className="block px-7 py-3 text-[10px] font-bold text-slate-600 hover:bg-red-50 hover:text-red-800 border-l-4 border-transparent hover:border-red-800 transition-all"
                    >
                      {opt.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a 
            href={loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block bg-red-800 text-white px-6 xl:px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-900/10 hover:bg-slate-900 transition-all active:scale-95 whitespace-nowrap"
          >
            Login Portal
          </a>
          <button onClick={toggleMobileMenu} className="xl:hidden text-slate-900 p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl sm:text-2xl`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-[150] bg-white animate-in slide-in-from-right duration-300 flex flex-col overflow-y-auto">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-100 p-1">
                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="font-black text-slate-900 tracking-tighter uppercase leading-none text-sm">CENTUM <span className="text-red-800">CPY</span></h2>
            </div>
            <button onClick={toggleMobileMenu} className="p-3 text-slate-400 hover:text-red-800 transition-colors">
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
          
          <div className="flex-1 p-6 space-y-10 pb-20">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-4">Main Navigation</p>
              {institutionalLinks.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} 
                  className={`w-full text-left py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                    activeTab === item.id ? 'bg-red-800 text-white shadow-xl' : 'text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {[academicDropdown, admissionDropdown, managementDropdown].map((group) => (
              <div key={group.label} className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 px-4">{group.label}</p>
                <div className="grid grid-cols-1 gap-1 pl-4">
                  {group.items.map((opt, i) => (
                    <a key={i} href={opt.link} className="text-[13px] font-bold text-slate-600 py-3.5 px-4 rounded-xl hover:bg-red-50 hover:text-red-800 transition-colors">
                      {opt.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 border-t border-slate-100 fixed bottom-0 w-full bg-white">
            <a 
              href={loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-red-800 text-white py-5 text-center rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl"
            >
              Student Portal Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
