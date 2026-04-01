import { useNavigate } from 'react-router-dom';
import { Star, Search } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { mcqQuestions } from '@/data/mockData';

const filters = ['全部', '音程', '和弦', '功能和聲', '終止式', '聲部進行'];
const C2QuestionList = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="題目清單" showBack />
      <div className="px-4 pt-3 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="搜尋題目…" className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {filters.map((f,i) => (
            <button key={f} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${i===0?'bg-primary/10 text-primary glass':'bg-secondary text-muted-foreground'}`}>{f}</button>
          ))}
        </div>
        <div className="space-y-2">
          {mcqQuestions.map(q => (
            <button key={q.id} onClick={() => navigate('/questions/answer')} className="w-full p-3 rounded-xl bg-card border border-border shadow-card text-left">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{q.year}年 #{q.number}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${q.difficulty==='難'?'bg-destructive/8 text-destructive':q.difficulty==='中'?'bg-warning/8 text-warning':'bg-success/8 text-success'}`}>{q.difficulty}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground">{q.source}</span>
                </div>
                <Star size={14} className={q.starred?'text-warning fill-warning':'text-muted-foreground'} />
              </div>
              <p className="text-sm font-medium">{q.stem}</p>
              <p className="text-xs text-muted-foreground mt-1">{q.topic}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default C2QuestionList;
