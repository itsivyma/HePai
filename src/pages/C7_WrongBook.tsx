import { useNavigate } from 'react-router-dom';
import { RotateCw, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { wrongQuestions } from '@/data/mockData';

const reasonColors: Record<string, string> = { '我不會': 'bg-destructive/8 text-destructive', '粗心': 'bg-warning/8 text-warning', '觀念混淆': 'bg-accent/8 text-accent' };
const filters = ['全部', '我不會', '粗心', '觀念混淆'];

const C7WrongBook = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="錯題本" showBack />
      <div className="px-4 pt-3 space-y-3">
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {filters.map((f,i) => (
            <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${i===0?'bg-primary/10 text-primary liquid-glass':'bg-secondary text-muted-foreground'}`}>{f}</button>
          ))}
        </div>
        <div className="space-y-2">
          {wrongQuestions.map((q, i) => (
            <div key={i} className="p-3 rounded-xl bg-card border border-border shadow-card">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${reasonColors[q.reason] || 'bg-secondary text-muted-foreground'}`}>{q.reason}</span>
                  <span className="text-xs text-muted-foreground">{q.wrongDate}</span>
                </div>
                {q.mastered && <CheckCircle size={14} className="text-success" />}
              </div>
              <p className="text-sm font-medium">{q.stem}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => navigate('/questions/answer')} className="text-xs text-primary flex items-center gap-1"><RotateCw size={12} /> 重新作答</button>
                {!q.mastered && <button className="text-xs text-success">標記已掌握</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default C7WrongBook;
