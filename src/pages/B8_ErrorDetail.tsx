import { useParams, useNavigate } from 'react-router-dom';
import { Bookmark, BookOpen, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { harmonyErrors } from '@/data/mockData';
import { useState } from 'react';

const B8ErrorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const error = harmonyErrors.find(e => e.id === id) || harmonyErrors[0];
  const [bookmarked, setBookmarked] = useState(false);

  const severityConfig = {
    severe: { label: '嚴重', color: 'text-destructive', bg: 'bg-destructive/8' },
    warning: { label: '警告', color: 'text-warning', bg: 'bg-warning/8' },
    suggestion: { label: '建議', color: 'text-accent', bg: 'bg-accent/8' },
  };
  const s = severityConfig[error.severity];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="錯誤詳情" showBack right={
        <button onClick={() => setBookmarked(!bookmarked)} className={bookmarked ? 'text-primary' : 'text-muted-foreground'}>
          <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      } />

      <div className="px-4 pt-4 space-y-4">
        {/* Header */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${s.bg} ${s.color}`}>{s.label}</span>
            <span className="text-xs text-muted-foreground">{error.rule}</span>
          </div>
          <h2 className="text-lg font-display font-semibold">{error.title}</h2>
          <p className="text-xs text-muted-foreground mt-1">第 {error.measure} 小節 · 第 {error.beat} 拍 · {error.voice} 聲部 · {error.category}</p>
        </div>

        {/* Rule text */}
        <div className="p-4 rounded-2xl bg-secondary/50 border border-border">
          <h3 className="text-xs font-semibold text-muted-foreground mb-2">📜 規則條文</h3>
          <p className="text-sm leading-relaxed">{error.ruleText}</p>
        </div>

        {/* Why wrong */}
        <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/10">
          <h3 className="text-xs font-semibold text-destructive mb-2">❌ 為什麼錯</h3>
          <p className="text-sm leading-relaxed text-foreground">{error.why}</p>
        </div>

        {/* How to fix */}
        <div className="p-4 rounded-2xl bg-success/5 border border-success/10">
          <h3 className="text-xs font-semibold text-success mb-2">✅ 如何修正</h3>
          <p className="text-sm leading-relaxed text-foreground">{error.howToFix}</p>
        </div>

        {/* Examples */}
        <div className="grid grid-cols-1 gap-3">
          <div className="p-3 rounded-xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={14} className="text-success" />
              <h4 className="text-xs font-medium text-success">正確範例</h4>
            </div>
            <p className="text-sm font-mono bg-success/5 px-3 py-2 rounded-lg">{error.goodExample}</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <XCircle size={14} className="text-destructive" />
              <h4 className="text-xs font-medium text-destructive">錯誤範例</h4>
            </div>
            <p className="text-sm font-mono bg-destructive/5 px-3 py-2 rounded-lg">{error.badExample}</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-2">
          <button onClick={() => navigate('/grading/rewrite')} className="w-full py-3 bg-card border border-border text-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-card">
            <ArrowRight size={16} /> 查看改寫建議
          </button>
          <button onClick={() => navigate('/questions/list')} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-soft">
            <BookOpen size={16} /> 練習相關題目
          </button>
          <button className="w-full py-2.5 text-sm text-primary font-medium">
            加入錯題本
          </button>
        </div>
      </div>
    </div>
  );
};

export default B8ErrorDetail;
