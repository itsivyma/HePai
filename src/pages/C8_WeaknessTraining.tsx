import { useNavigate } from 'react-router-dom';
import { Brain, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { errorStats } from '@/data/mockData';

const C8WeaknessTraining = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="弱點練習" showBack />
      <div className="px-4 pt-4 space-y-4">
        <div className="p-4 rounded-2xl bg-accent/5 border border-accent/10 flex items-start gap-3">
          <Brain size={20} className="text-accent mt-0.5" />
          <div><p className="text-sm font-medium">根據你的學習數據</p><p className="text-xs text-muted-foreground mt-1">系統已分析你的弱點分布，推薦以下練習組合</p></div>
        </div>
        <div className="space-y-2">
          {errorStats.categories.slice(0, 4).map(c => (
            <button key={c.name} onClick={() => navigate('/questions/settings')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card text-left">
              <div className="w-10 h-10 rounded-lg bg-destructive/8 flex items-center justify-center"><span className="text-sm font-bold text-destructive">{c.percentage}%</span></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.count} 次錯誤 · 推薦 10 題</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
        <button onClick={() => navigate('/questions/settings')} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">開始綜合弱點練習</button>
      </div>
    </div>
  );
};
export default C8WeaknessTraining;
