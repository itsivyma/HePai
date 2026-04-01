import { useNavigate } from 'react-router-dom';
import { Share2, RefreshCw, AlertCircle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { recentWorks, harmonyErrors } from '@/data/mockData';

const B12WorkDetail = () => {
  const navigate = useNavigate();
  const work = recentWorks[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="作品詳情" showBack right={
        <button className="p-1.5 text-muted-foreground"><Share2 size={18} /></button>
      } />
      <div className="px-4 pt-4 space-y-4">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <h2 className="text-base font-semibold">{work.title}</h2>
          <p className="text-xs text-muted-foreground mt-1">{work.date} · {work.chapter}</p>
        </div>

        <div className="w-full aspect-[5/3] bg-card rounded-2xl border border-border shadow-card flex items-center justify-center">
          <p className="text-xs text-muted-foreground">譜面預覽</p>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/10">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-destructive" />
            <span className="text-sm font-medium">{work.errorCount} 個錯誤</span>
          </div>
          <button onClick={() => navigate('/grading/feedback')} className="text-xs text-primary font-medium">查看回饋</button>
        </div>

        <div className="space-y-2">
          {harmonyErrors.slice(0, 3).map(e => (
            <button key={e.id} onClick={() => navigate(`/grading/error/${e.id}`)} className="w-full p-3 rounded-xl bg-card border border-border shadow-card text-left">
              <p className="text-sm font-medium">{e.title}</p>
              <p className="text-xs text-muted-foreground">第 {e.measure} 小節 · {e.category}</p>
            </button>
          ))}
        </div>

        <button onClick={() => navigate('/grading/analysis')} className="w-full py-3 bg-card border border-border text-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-card">
          <RefreshCw size={16} /> 重新分析
        </button>
      </div>
    </div>
  );
};

export default B12WorkDetail;
