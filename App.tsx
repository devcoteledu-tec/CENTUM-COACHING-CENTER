
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroLogin from './components/HeroLogin';
import Footer from './components/Footer';
import Blogs from './components/Blogs';
import News from './components/News';
import Results from './components/Results';
import Carrier from './components/Carrier';
import Centers from './components/Centers';
import AboutUs from './components/AboutUs';
import Sidebar from './components/Sidebar';
import Announcements from './pages/Announcements';
import StudyMaterials from './pages/StudyMaterials';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-red-800 selection:text-white overflow-x-hidden">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex flex-1 max-w-[1600px] mx-auto w-full relative">
        {/* Left Sidebar Navigation - Hidden on Home Page and smaller screens */}
        {activeTab !== 'home' && (
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        
        <main className={`flex-1 min-w-0 bg-slate-50/30 ${activeTab !== 'home' ? 'lg:border-l border-slate-100' : ''}`}>
          <div className={`px-4 sm:px-8 lg:px-16 ${activeTab === 'home' ? 'pt-0 pb-6 sm:pb-10' : 'py-6 sm:py-10'}`}>
            {/* Application Routing */}
            <div className="min-h-[60vh] sm:min-h-[70vh]">
              {activeTab === 'home' ? (
                <HeroLogin onNavigate={setActiveTab} />
              ) : activeTab === 'about-us' ? (
                <AboutUs />
              ) : activeTab === 'blogs' ? (
                <Blogs />
              ) : activeTab === 'news' ? (
                <News />
              ) : activeTab === 'results' ? (
                <Results />
              ) : activeTab === 'carrier' ? (
                <Carrier />
              ) : activeTab === 'centers' ? (
                <Centers />
              ) : activeTab === 'announcements' ? (
                <Announcements />
              ) : activeTab === 'study-materials' ? (
                <StudyMaterials />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95">
                  <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-6">
                    <i className="fas fa-spinner fa-spin text-3xl text-red-800"></i>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Content Loading</h2>
                  <p className="text-slate-500 mt-2 font-medium px-4">Please wait while we prepare the portal...</p>
                </div>
              )}
            </div>
          </div>
          
          <Footer onNavigate={setActiveTab} />
        </main>
      </div>

      {/* Quick Action FABs - Responsive sizing */}
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[110] flex flex-col gap-3 sm:gap-4">
        <a 
          href="https://wa.me/917593038781" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-600 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-2xl flex items-center justify-center text-xl sm:text-2xl hover:scale-110 transition-transform hover:shadow-green-500/20 active:scale-95 cursor-pointer"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
        <a 
          href="tel:+917593038781" 
          className="bg-red-800 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-2xl flex items-center justify-center text-lg sm:text-xl hover:scale-110 transition-transform hover:shadow-red-500/20 active:scale-95 cursor-pointer"
        >
          <i className="fas fa-phone-alt"></i>
        </a>
      </div>
    </div>
  );
};

export default App;
