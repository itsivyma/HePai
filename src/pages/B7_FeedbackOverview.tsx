import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, AlertTriangle, Lightbulb, ChevronRight, BookmarkPlus } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { harmonyErrors } from '@/data/mockData';

type Severity = 'severe' | 'warning' | 'suggestion';
const severityConfig: Record<Severity, { color: string; bg: string; border: string; label: string }> = {
  severe: { color: 'text-destructive', bg: 'bg-destructive/8', border: 'border-destructive/20', label: '嚴重' },
  warning: { color: 'text-warning', bg: 'bg-warning/8', border: 'border-warning/20', label: '警告' },
  suggestion: { color: 'text-accent', bg: 'bg-accent/8', border: 'border-accent/20', label: '建議' },
};

const filterChips = ['全部', 'S', 'A', 'T', 'B', '聲部進行', '解決規則', '聲部配置', '只看嚴重'];

const B7FeedbackOverview = () => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>(['全部']);

  const toggleFilter = (f: string) => {
    if (f === '全部') return setActiveFilters(['全部']);
    const next = activeFilters.filter(x => x !== '全部');
    if (next.includes(f)) {
      const result = next.filter(x => x !== f);
      setActiveFilters(result.length === 0 ? ['全部'] : result);
    } else {
      setActiveFilters([...next, f]);
    }
  };

  const filtered = activeFilters.includes('全部')
    ? harmonyErrors
    : harmonyErrors.filter(e =>
        activeFilters.some(f =>
          e.voice.includes(f) || e.category === f || (f === '只看嚴重' && e.severity === 'severe')
        )
      );



  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="回饋總覽" showBack right={
        <button onClick={() => navigate('/grading/save')} className="text-xs text-primary font-medium">儲存</button>
      } />

      <div className="px-4 pt-3 space-y-4">
        {/* Score preview with error markers */}
        <div className="w-full aspect-[5/3] bg-card rounded-2xl border border-border shadow-card relative overflow-hidden p-3">
          <div className="h-full flex flex-col justify-center gap-3 px-4">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="h-[1px] bg-muted-foreground/15" />
            ))}
          </div>
          {/* Error markers */}
          {harmonyErrors.slice(0, 4).map((e, i) => {
            const s = severityConfig[e.severity as Severity];
            const positions = [
              { top: '20%', left: '25%' }, { top: '35%', left: '55%' },
              { top: '55%', left: '35%' }, { top: '70%', left: '70%' },
            ];
            return (
              <button
                key={e.id}
                onClick={() => navigate(`/grading/error/${e.id}`)}
                className={`absolute w-6 h-6 rounded-full ${s.bg} ${s.border} border flex items-center justify-center text-[10px] font-bold ${s.color} shadow-sm`}
                style={positions[i]}
              >
                {i + 1}
              </button>
            );
          })}
          <button onClick={() => navigate(`/grading/error/${harmonyErrors[4].id}`)}
            className="absolute w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-[10px] font-bold text-accent shadow-sm"
            style={{ top: '45%', left: '15%' }}
          >5</button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <p className="text-xl font-display font-bold text-destructive">{harmonyErrors.length}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">錯誤總數</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <p className="text-xl font-display font-bold text-foreground">聲部進行</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">主要弱點</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <p className="text-xl font-display font-bold text-primary">Ch.4</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">建議章節</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4">
          {filterChips.map(f => (
            <button
              key={f}
              onClick={() => toggleFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                activeFilters.includes(f)
                  ? 'glass bg-primary/10 text-primary border-primary/20'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Error list */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">錯誤清單</h3>
          {filtered.map(e => {
            const s = severityConfig[e.severity as Severity];
            return (
              <button
                key={e.id}
                onClick={() => navigate(`/grading/error/${e.id}`)}
                className="w-full flex items-start gap-3 p-3 rounded-xl bg-card border border-border shadow-card text-left"
              >
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                  {e.severity === 'severe' ? <AlertCircle size={14} className={s.color} /> :
                   e.severity === 'warning' ? <AlertTriangle size={14} className={s.color} /> :
                   <Lightbulb size={14} className={s.color} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{e.title}</p>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${s.bg} ${s.color}`}>{s.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">第 {e.measure} 小節 · {e.voice} · {e.category}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground mt-1 shrink-0" />
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button onClick={() => navigate('/grading/save')} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft flex items-center justify-center gap-2">
          <BookmarkPlus size={16} /> 加入作品庫
        </button>
      </div>
    </div>
  );
};

export default B7FeedbackOverview;
