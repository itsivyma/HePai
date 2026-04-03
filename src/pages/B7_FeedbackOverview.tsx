import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, AlertTriangle, Lightbulb, ChevronRight, BookmarkPlus, Filter, Music } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { harmonyErrors } from '@/data/mockData';

type Severity = 'severe' | 'warning' | 'suggestion';
const severityConfig: Record<Severity, { color: string; bg: string; border: string; label: string; icon: typeof AlertCircle }> = {
  severe: { color: 'text-destructive', bg: 'bg-destructive/8', border: 'border-destructive/20', label: '嚴重', icon: AlertCircle },
  warning: { color: 'text-warning', bg: 'bg-warning/8', border: 'border-warning/20', label: '警告', icon: AlertTriangle },
  suggestion: { color: 'text-accent', bg: 'bg-accent/8', border: 'border-accent/20', label: '建議', icon: Lightbulb },
};

const filterChips = ['全部', 'S', 'A', 'T', 'B', '聲部進行', '解決規則', '聲部配置', '旋律規則', '只看嚴重'];

const groupByMeasure = (errors: typeof harmonyErrors) => {
  const map = new Map<number, typeof harmonyErrors>();
  errors.forEach(e => {
    const arr = map.get(e.measure) || [];
    arr.push(e);
    map.set(e.measure, arr);
  });
  return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
};

const B7FeedbackOverview = () => {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<string[]>(['全部']);
  const [groupMode, setGroupMode] = useState<'measure' | 'type' | 'severity'>('measure');

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

  const grouped = groupByMeasure(filtered);

  const severeCount = harmonyErrors.filter(e => e.severity === 'severe').length;
  const warningCount = harmonyErrors.filter(e => e.severity === 'warning').length;
  const suggestionCount = harmonyErrors.filter(e => e.severity === 'suggestion').length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="回饋總覽" showBack right={
        <button onClick={() => navigate('/grading/save')} className="text-xs text-primary font-medium">儲存</button>
      } />

      <div className="px-4 pt-3 space-y-4">
        {/* Score preview with error markers */}
        <div className="w-full aspect-[5/3] bg-card rounded-2xl border border-border shadow-card relative overflow-hidden">
          {/* Staff systems */}
          <div className="absolute inset-x-4 top-[15%] bottom-[15%] flex flex-col justify-center gap-2">
            {[0,1].map(sys => (
              <div key={sys} className="space-y-[3px]">
                {[0,1,2,3,4].map(i => <div key={i} className="h-[1px] bg-muted-foreground/12" />)}
              </div>
            ))}
          </div>

          {/* Barlines */}
          {[0.15, 0.28, 0.42, 0.56, 0.7, 0.84].map((pos, i) => (
            <div key={i} className="absolute top-[15%] bottom-[15%] w-[1px] bg-muted-foreground/15" style={{ left: `${pos * 100}%` }} />
          ))}

          {/* Measure numbers */}
          {[0.08, 0.21, 0.35, 0.49, 0.63, 0.77].map((pos, i) => (
            <div key={i} className="absolute text-[8px] text-muted-foreground/30 font-medium" style={{ left: `${pos * 100}%`, top: '8%' }}>
              {i + 1}
            </div>
          ))}

          {/* Error markers */}
          {filtered.slice(0, 5).map((e, i) => {
            const s = severityConfig[e.severity as Severity];
            const positions = [
              { top: '25%', left: '22%' }, { top: '40%', left: '52%' },
              { top: '55%', left: '32%' }, { top: '68%', left: '68%' },
              { top: '35%', left: '12%' },
            ];
            return (
              <button
                key={e.id}
                onClick={() => navigate(`/grading/error/${e.id}`)}
                className={`absolute w-7 h-7 rounded-full ${s.bg} ${s.border} border-2 flex items-center justify-center text-[10px] font-bold ${s.color} shadow-sm active:scale-110 transition-transform`}
                style={positions[i]}
              >
                {i + 1}
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-2 right-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-destructive/60" />
              <span className="text-[8px] text-muted-foreground">嚴重</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-warning/60" />
              <span className="text-[8px] text-muted-foreground">警告</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="text-[8px] text-muted-foreground">建議</span>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <span className="text-xl font-display font-bold text-destructive">{severeCount}</span>
              <span className="text-lg text-muted-foreground/30">/</span>
              <span className="text-xs text-warning font-medium">{warningCount}</span>
              <span className="text-lg text-muted-foreground/30">/</span>
              <span className="text-xs text-accent font-medium">{suggestionCount}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">錯誤總覽</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <p className="text-sm font-display font-bold text-foreground">聲部進行</p>
            <p className="text-[10px] text-muted-foreground mt-1">主要弱點</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <p className="text-sm font-display font-bold text-primary">Ch.4</p>
            <p className="text-[10px] text-muted-foreground mt-1">建議複習</p>
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
                  ? 'glass bg-primary/10 text-primary border border-primary/20'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Group tabs */}
        <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
          {([['measure', '依小節'], ['type', '依類型'], ['severity', '依嚴重度']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setGroupMode(key)}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${groupMode === key ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Error list grouped */}
        <div className="space-y-4">
          {grouped.map(([measure, errors]) => (
            <div key={measure}>
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                <Music size={12} /> 第 {measure} 小節
              </h4>
              <div className="space-y-2">
                {errors.map(e => {
                  const s = severityConfig[e.severity as Severity];
                  const Icon = s.icon;
                  return (
                    <button
                      key={e.id}
                      onClick={() => navigate(`/grading/error/${e.id}`)}
                      className="w-full flex items-start gap-3 p-3 rounded-xl bg-card border border-border shadow-card text-left active:scale-[0.98] transition-transform"
                    >
                      <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={14} className={s.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{e.title}</p>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${s.bg} ${s.color}`}>{s.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">第 {e.beat} 拍 · {e.voice} · {e.category}</p>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground mt-1 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-2 pt-1">
          <button onClick={() => navigate('/grading/save')} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft flex items-center justify-center gap-2">
            <BookmarkPlus size={16} /> 加入作品庫
          </button>
          <button onClick={() => navigate('/grading/rewrite')} className="w-full py-3 bg-card border border-border text-foreground rounded-xl text-sm font-medium shadow-card flex items-center justify-center gap-2">
            查看改寫建議
          </button>
        </div>
      </div>
    </div>
  );
};

export default B7FeedbackOverview;
