import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const themeOptions = [
  { value: 'light', label: '淺色', icon: Sun },
  { value: 'dark', label: '深色', icon: Moon },
  { value: 'system', label: '系統', icon: Monitor },
] as const;

const E2Preferences = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = theme ?? resolvedTheme;
  const [hintLevel, setHintLevel] = useState('中');
  const [notify, setNotify] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="偏好設定" showBack />
      <div className="px-4 pt-4 space-y-5">
        {/* Theme selector */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">外觀模式</label>
          <div className="flex gap-2">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentTheme === value
                    ? 'liquid-glass-subtle bg-primary/10 text-primary border-primary/20'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Hint level */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">提示程度</label>
          <div className="flex gap-2">
            {['簡略', '中', '詳細'].map(h => (
              <button
                key={h}
                onClick={() => setHintLevel(h)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                  hintLevel === h
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Push notifications */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
          <span className="text-sm">推播通知</span>
          <button
            onClick={() => setNotify(!notify)}
            className={`w-11 h-6 rounded-full transition-all ${notify ? 'bg-primary' : 'bg-secondary'}`}
          >
            <div className={`w-5 h-5 bg-card rounded-full shadow-sm transition-transform ${notify ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default E2Preferences;
