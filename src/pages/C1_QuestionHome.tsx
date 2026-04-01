import { useNavigate } from 'react-router-dom';
import { Target, Flame, BookOpen, Brain, FileText, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { chapters, weeklyStats } from '@/data/mockData';

const C1QuestionHome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="題庫" showSearch onSearch={() => navigate('/search')} />
      <div className="px-4 pt-4 space-y-5">
        {/* Daily goal */}
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-primary" />
              <span className="text-sm font-semibold">今日目標</span>
            </div>
            <div className="flex items-center gap-1 text-warning">
              <Flame size={14} /><span className="text-xs font-medium">連續 {weeklyStats.streak} 天</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${(weeklyStats.completed / weeklyStats.target) * 100}%` }} />
            </div>
            <span className="text-xs text-muted-foreground">{weeklyStats.completed}/{weeklyStats.target} 題</span>
          </div>
        </div>

        {/* Quick modes */}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => navigate('/questions/weakness')} className="p-3 rounded-xl bg-card border border-border shadow-card flex items-center gap-2">
            <Brain size={18} className="text-accent" /><span className="text-sm font-medium">弱點練習</span>
          </button>
          <button onClick={() => navigate('/questions/mock-exam')} className="p-3 rounded-xl bg-card border border-border shadow-card flex items-center gap-2">
            <FileText size={18} className="text-accent" /><span className="text-sm font-medium">模擬測驗</span>
          </button>
        </div>

        {/* Recommended */}
        <div>
          <h2 className="text-sm font-semibold mb-2">推薦練習</h2>
          <button onClick={() => navigate('/questions/settings')} className="w-full p-4 rounded-xl bg-accent/5 border border-accent/10 text-left">
            <p className="text-sm font-medium">聲部進行 — 弱點加強</p>
            <p className="text-xs text-muted-foreground mt-1">根據你的批改結果，建議加強此章節</p>
            <span className="inline-block mt-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-lg">開始練習</span>
          </button>
        </div>

        {/* Chapters */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold">章節</h2>
            <button onClick={() => navigate('/questions/list')} className="text-xs text-primary">全部題目</button>
          </div>
          <div className="space-y-2">
            {chapters.map(c => (
              <button key={c.id} onClick={() => navigate('/questions/list')} className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card text-left">
                <span className="text-xl">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.questionCount} 題 · 完成 {c.progress}%</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <button onClick={() => navigate('/questions/settings')} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">開始練習</button>
          <button onClick={() => navigate('/questions/wrong-book')} className="flex-1 py-3 bg-card border border-border text-foreground rounded-xl text-sm font-medium shadow-card">錯題本</button>
        </div>
      </div>
    </div>
  );
};
export default C1QuestionHome;
