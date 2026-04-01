import { useNavigate } from 'react-router-dom';
import { Settings, Shield, Download, HelpCircle, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const E1ProfileHome = () => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: Settings, label: '偏好設定', path: '/profile/preferences' },
    { icon: Shield, label: '權限管理', path: '/profile/permissions' },
    { icon: Settings, label: '帳號與安全', path: '/profile/account' },
    { icon: HelpCircle, label: '說明與客服', path: '/profile/help' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="我的" />
      <div className="px-4 pt-4 space-y-5">
        {/* Profile card */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-display font-bold text-primary">陳</div>
          <div>
            <p className="text-base font-semibold">陳小明</p>
            <p className="text-xs text-muted-foreground">學生 · music_student@example.com</p>
          </div>
        </div>

        {/* Sync status */}
        <div className="p-3 rounded-xl bg-success/5 border border-success/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success" />
          <p className="text-xs text-muted-foreground">資料已同步 · 最後更新 5 分鐘前</p>
        </div>

        {/* Export */}
        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card">
          <Download size={18} className="text-primary" />
          <span className="text-sm font-medium flex-1 text-left">匯出作品資料</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>

        {/* Menu */}
        <div className="space-y-1">
          {menuItems.map(item => (
            <button key={item.path} onClick={() => navigate(item.path)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors text-left">
              <item.icon size={18} className="text-muted-foreground" />
              <span className="text-sm flex-1">{item.label}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default E1ProfileHome;
