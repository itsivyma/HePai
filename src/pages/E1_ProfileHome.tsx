import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Settings, Shield, Download, HelpCircle, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const SegmentedControl = ({ options, value, onChange }: { options: { label: string; value: string }[]; value: string; onChange: (v: string) => void }) => (
  <div className="flex gap-1 p-1 rounded-xl bg-secondary/60 backdrop-blur-sm border border-border/50">
    {options.map(opt => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all duration-200 ${
          value === opt.value
            ? 'bg-card shadow-card text-foreground border border-border/40'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

const E1ProfileHome = () => {
  const navigate = useNavigate();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const appearance = theme ?? resolvedTheme ?? 'system';
  const [language, setLanguage] = useState('zh');

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
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-display font-bold text-primary">馬</div>
          <div>
            <p className="text-base font-semibold">馬筱詩</p>
            <p className="text-xs text-muted-foreground">學生 · music_student@example.com</p>
          </div>
        </div>

        {/* Sync status */}
        <div className="p-3 rounded-xl bg-success/5 border border-success/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success" />
          <p className="text-xs text-muted-foreground">資料已同步 · 最後更新 5 分鐘前</p>
        </div>

        {/* Display & Language card */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card space-y-4">
          <p className="text-sm font-semibold">顯示與語言</p>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">外觀模式</label>
            <SegmentedControl
              options={[
                { label: '淺色模式', value: 'light' },
                { label: '深色模式', value: 'dark' },
                { label: '跟隨系統', value: 'system' },
              ]}
              value={appearance}
              onChange={setTheme}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">語言</label>
            <SegmentedControl
              options={[
                { label: '中文', value: 'zh' },
                { label: 'English', value: 'en' },
              ]}
              value={language}
              onChange={setLanguage}
            />
          </div>
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
