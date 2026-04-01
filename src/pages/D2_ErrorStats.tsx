import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { errorStats } from '@/data/mockData';
import { useState } from 'react';

const D2ErrorStats = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="錯誤分類統計" showBack />
      <div className="px-4 pt-4 space-y-3">
        <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
          <p className="text-2xl font-display font-bold text-destructive">{errorStats.total}</p>
          <p className="text-xs text-muted-foreground">累計錯誤</p>
        </div>
        {errorStats.categories.map(c => (
          <div key={c.name} className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
            <button onClick={() => setExpanded(expanded === c.name ? null : c.name)} className="w-full flex items-center gap-3 p-3 text-left">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.count} 次 ({c.percentage}%)</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-destructive/60 rounded-full" style={{ width: `${c.percentage}%` }} />
                </div>
              </div>
              {expanded === c.name ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
            </button>
            {expanded === c.name && (
              <div className="px-3 pb-3 border-t border-border pt-2 space-y-2">
                <p className="text-xs text-muted-foreground">趨勢：{c.trend === 'down' ? '📉 改善中' : c.trend === 'up' ? '📈 需注意' : '➡️ 穩定'}</p>
                <button onClick={() => navigate('/questions/settings')} className="text-xs text-primary">建立弱點練習組 →</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default D2ErrorStats;
