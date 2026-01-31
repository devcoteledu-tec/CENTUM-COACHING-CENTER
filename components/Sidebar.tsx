
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const loginUrl = "https://img.freepik.com/free-vector/login-template_1017-6719.jpg";
  const navItems = [
    { id: 'about-us', label: 'About Us', icon: 'fa-university' },
    { id: 'centers', label: 'Our Centers', icon: 'fa-map-location-dot' },
    { id: 'blogs', label: 'Academic Blogs', icon: 'fa-book-open' },
    { id: 'study-materials', label: 'Study Materials', icon: 'fa-book-bookmark' },
    { id: 'news', label: 'News & Updates', icon: 'fa-newspaper' },
    { id: 'announcements', label: 'Announcements', icon: 'fa-bullhorn' },
    { id: 'results', label: 'Results & Hall of Fame', icon: 'fa-trophy' },
    { id: 'carrier', label: 'Careers', icon: 'fa-briefcase' },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col h-[calc(100vh-112px)] sticky top-28 z-40 overflow-y-auto scrollbar-hide">
      <div className="p-6 space-y-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Navigation</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all group ${
              activeTab === item.id 
                ? 'bg-red-50 text-red-800 shadow-sm border border-red-100' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === item.id ? 'bg-red-800 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
            }`}>
              <i className={`fas ${item.icon} text-xs`}></i>
            </div>
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="mt-auto p-6 border-t border-slate-50">
        <div className="bg-slate-900 p-6 rounded-[2rem] text-white relative overflow-hidden group cursor-pointer">
          <div className="relative z-10">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Student Portal</h4>
            <p className="text-[11px] font-medium text-slate-400 leading-relaxed mb-4">Access your study material and mock tests.</p>
            <a 
              href={loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-slate-900 py-3 text-center rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-800 hover:text-white transition-all"
            >
              Login Now
            </a>
          </div>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-red-800/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
