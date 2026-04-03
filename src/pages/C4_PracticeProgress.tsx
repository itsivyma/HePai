import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const C4PracticeProgress = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="練習進行" showBack />
      <div className="px-4 pt-4 space-y-4">
        {/* Top info bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] bg-primary/8 text-primary font-medium">113學年</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] bg-secondary text-muted-foreground">每日練習</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={12} />
            <span className="text-xs">04:32</span>
          </div>
        </div>

        {/* Progress */}
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full w-3/5 transition-all" />
        </div>
        <p className="text-xs text-muted-foreground text-center">第 6 / 10 題</p>

        {/* Question card */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-muted-foreground">112學年 #8</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground">和弦</span>
          </div>
          <p className="text-sm font-medium leading-relaxed">大三和弦的組成音程結構為何？</p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {['大三度 + 大三度', '大三度 + 小三度', '小三度 + 大三度', '小三度 + 小三度'].map((o, i) => (
            <button key={i} onClick={() => navigate('/questions/feedback')} className="w-full p-3.5 rounded-xl bg-card border border-border text-left text-sm flex items-center gap-3 shadow-card active:scale-[0.98] transition-transform">
              <span className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-medium">{String.fromCharCode(65 + i)}</span>
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default C4PracticeProgress;
