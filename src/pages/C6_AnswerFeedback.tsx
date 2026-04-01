import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, BookOpen, RotateCw } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { mcqQuestions } from '@/data/mockData';

const C6AnswerFeedback = () => {
  const navigate = useNavigate();
  const q = mcqQuestions[0];
  const isCorrect = false; // demo: wrong answer

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="作答回饋" showBack />
      <div className="px-4 pt-4 space-y-4">
        {/* Result */}
        <div className={`p-4 rounded-2xl border text-center ${isCorrect ? 'bg-success/5 border-success/15' : 'bg-destructive/5 border-destructive/15'}`}>
          {isCorrect ? <CheckCircle size={32} className="text-success mx-auto mb-2" /> : <XCircle size={32} className="text-destructive mx-auto mb-2" />}
          <h2 className="text-lg font-display font-semibold">{isCorrect ? '答對了！' : '答錯了'}</h2>
          <p className="text-sm text-muted-foreground mt-1">正確答案：{q.answer}. {q.options.find(o => o.label === q.answer)?.text}</p>
        </div>

        {/* Explanation */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="text-sm font-semibold mb-2">詳細解析</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{q.explanation}</p>
        </div>

        {/* Rule ref */}
        <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
          <p className="text-xs text-muted-foreground">參考規則：{q.ruleRef}</p>
        </div>

        {/* Options breakdown */}
        <div className="space-y-1.5">
          {q.options.map(o => (
            <div key={o.label} className={`p-3 rounded-xl border text-sm flex items-center gap-3 ${
              o.label === q.answer ? 'bg-success/5 border-success/15' : 'bg-card border-border'
            }`}>
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium shrink-0 ${
                o.label === q.answer ? 'bg-success text-success-foreground' : 'bg-secondary text-muted-foreground'
              }`}>{o.label}</span>
              <span>{o.text}</span>
              {o.label === q.answer && <CheckCircle size={14} className="text-success ml-auto" />}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="space-y-2">
          <button onClick={() => navigate('/questions/answer')} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft flex items-center justify-center gap-2">
            <RotateCw size={16} /> 同類再來一題
          </button>
          <button onClick={() => navigate(`/grading/error/${q.id}`)} className="w-full py-3 bg-card border border-border text-foreground rounded-xl text-sm font-medium shadow-card flex items-center justify-center gap-2">
            <BookOpen size={16} /> 查看規則詳情
          </button>
          <button className="w-full py-2.5 text-sm text-primary font-medium">加入錯題本</button>
        </div>
      </div>
    </div>
  );
};
export default C6AnswerFeedback;
