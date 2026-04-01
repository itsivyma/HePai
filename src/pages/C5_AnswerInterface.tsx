import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { mcqQuestions } from '@/data/mockData';

const C5AnswerInterface = () => {
  const navigate = useNavigate();
  const q = mcqQuestions[0];
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="作答" showBack />
      <div className="px-4 pt-4 space-y-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-1/10" />
          </div>
          <span className="text-xs text-muted-foreground shrink-0">1 / 10</span>
        </div>

        {/* Source info */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md text-[10px] bg-secondary text-muted-foreground">{q.year}年</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] bg-secondary text-muted-foreground">#{q.number}</span>
          <span className="px-2 py-0.5 rounded-md text-[10px] bg-secondary text-muted-foreground">{q.topic}</span>
          <span className={`px-2 py-0.5 rounded-md text-[10px] ${q.difficulty==='難'?'bg-destructive/8 text-destructive':q.difficulty==='中'?'bg-warning/8 text-warning':'bg-success/8 text-success'}`}>{q.difficulty}</span>
        </div>

        {/* Question */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <p className="text-base font-medium leading-relaxed">{q.stem}</p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {q.options.map(o => (
            <button
              key={o.label}
              onClick={() => setSelected(o.label)}
              className={`w-full p-4 rounded-xl border text-left text-sm flex items-center gap-3 transition-all active:scale-[0.98] ${
                selected === o.label
                  ? 'bg-primary/5 border-primary/30 shadow-soft'
                  : 'bg-card border-border shadow-card'
              }`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 ${
                selected === o.label ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
              }`}>{o.label}</span>
              <span className="leading-relaxed">{o.text}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-card border border-border text-sm flex items-center gap-1.5 text-muted-foreground shadow-card">
            <Lightbulb size={14} /> 提示
          </button>
          <button
            onClick={() => selected && navigate('/questions/feedback')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium shadow-soft ${
              selected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}
          >
            提交答案
          </button>
        </div>
      </div>
    </div>
  );
};
export default C5AnswerInterface;
