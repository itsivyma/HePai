import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { mcqQuestions } from '@/data/mockData';

const C9MockExam = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);

  if (!started) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <PageHeader title="模擬測驗" showBack />
        <div className="px-4 pt-8 flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center"><Clock size={36} className="text-accent" /></div>
          <div><h2 className="text-lg font-display font-semibold">樂理選擇題模擬測驗</h2><p className="text-sm text-muted-foreground mt-2">共 20 題 · 限時 30 分鐘</p><p className="text-xs text-muted-foreground mt-1">模擬大學音樂系術科考試樂理科目</p></div>
          <button onClick={() => setStarted(true)} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">開始測驗</button>
        </div>
      </div>
    );
  }

  const q = mcqQuestions[current % mcqQuestions.length];
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-40 liquid-glass border-0 border-b border-border/50 px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{current + 1} / 20</span>
          <span className="text-xs font-medium text-accent flex items-center gap-1"><Clock size={12} /> 28:45</span>
          <button onClick={() => { navigate('/questions/history'); }} className="text-xs text-destructive">交卷</button>
        </div>
        <div className="h-1 bg-secondary rounded-full mt-2 overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${((current + 1) / 20) * 100}%` }} /></div>
      </div>
      <div className="px-4 pt-4 space-y-4">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <p className="text-base font-medium leading-relaxed">{q.stem}</p>
        </div>
        <div className="space-y-2">
          {q.options.map(o => (
            <button key={o.label} onClick={() => setCurrent(c => Math.min(c + 1, 19))} className="w-full p-3.5 rounded-xl bg-card border border-border text-left text-sm flex items-center gap-3 shadow-card active:scale-[0.98] transition-transform">
              <span className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-medium">{o.label}</span>{o.text}
            </button>
          ))}
        </div>
        {/* Question nav dots */}
        <div className="flex flex-wrap gap-1.5 justify-center pt-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-6 h-6 rounded text-[10px] font-medium ${i === current ? 'bg-primary text-primary-foreground' : i < current ? 'bg-success/20 text-success' : 'bg-secondary text-muted-foreground'}`}>{i + 1}</button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default C9MockExam;
