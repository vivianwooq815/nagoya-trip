
import React from 'react';

interface LayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const NavItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({
  icon, label, active, onClick
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center space-y-1 transition-all active:scale-95 flex-1 py-2 ${
      active ? 'text-k-green font-bold scale-110' : 'text-gray-400'
    }`}
  >
    <i className={`fa-solid ${icon} text-lg`}></i>
    <span className="text-[10px]">{label}</span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="min-h-screen flex flex-col pb-24 paper-texture">
      <header className="px-6 py-8 flex justify-between items-center bg-white/50 backdrop-blur-md sticky top-0 z-50 rounded-b-2xl shadow-sm border-b border-k-green-light">
        <div>
          <h1 className="text-2xl font-bold text-k-green tracking-tight">名古屋Travel</h1>
          <p className="text-xs text-k-brown/70 flex items-center gap-1">
            <i className="fa-solid fa-plane-arrival"></i> 2/25 - 3/3 (7日)
          </p>
        </div>
        <div className="flex -space-x-2">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-white" alt="avatar" />
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sasha" className="w-8 h-8 rounded-full border-2 border-white shadow-sm bg-white" alt="avatar" />
        </div>
      </header>

      <main className="flex-grow px-4 mt-6 max-w-lg mx-auto w-full">
        {children}
      </main>

      <nav className="fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-soft h-16 flex items-center px-4 z-50 border border-k-green-light">
        <NavItem icon="fa-calendar-days" label="行程" active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
        <NavItem icon="fa-ticket" label="預訂" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
        <NavItem icon="fa-coins" label="記帳" active={activeTab === 'expense'} onClick={() => setActiveTab('expense')} />
        <NavItem icon="fa-camera-retro" label="日誌" active={activeTab === 'journal'} onClick={() => setActiveTab('journal')} />
        <NavItem icon="fa-clipboard-list" label="管理" active={activeTab === 'planning'} onClick={() => setActiveTab('planning')} />
      </nav>
    </div>
  );
};
