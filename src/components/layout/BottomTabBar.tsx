import { useLocation, useNavigate } from 'react-router-dom';
import { FileCheck, BookOpen, BarChart3, User } from 'lucide-react';

const tabs = [
  { path: '/grading', label: '批改', icon: FileCheck },
  { path: '/questions', label: '題庫', icon: BookOpen },
  { path: '/reports', label: '報告', icon: BarChart3 },
  { path: '/profile', label: '我的', icon: User },
];

const BottomTabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = tabs.find(t => location.pathname.startsWith(t.path))?.path || '/grading';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-strong safe-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16">
        {tabs.map(tab => {
          const active = currentTab === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all duration-200 ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <tab.icon size={22} strokeWidth={active ? 2.2 : 1.6} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomTabBar;
