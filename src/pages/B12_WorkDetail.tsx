import { useNavigate, useParams } from 'react-router-dom';
import { Share2, RefreshCw, AlertCircle, ChevronRight, Edit3, Music, AlertTriangle, Lightbulb } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { harmonyErrors } from '@/data/mockData';
import {
  DEMO_CAPTURE_IMAGE,
  DEMO_RECOGNITION_ISSUES,
  DEMO_WORK_ID,
  getMergedRecentWorks,
} from '@/lib/grading-demo';

type Severity = 'severe' | 'warning' | 'suggestion';
const severityConfig: Record<Severity, { color: string; bg: string; icon: typeof AlertCircle }> = {
  severe: { color: 'text-destructive', bg: 'bg-destructive/8', icon: AlertCircle },
  warning: { color: 'text-warning', bg: 'bg-warning/8', icon: AlertTriangle },
  suggestion: { color: 'text-accent', bg: 'bg-accent/8', icon: Lightbulb },
};

const B12WorkDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const works = getMergedRecentWorks();
  const work = works.find((item) => item.id === id) ?? works[0];
  const issueList = work.id === DEMO_WORK_ID ? DEMO_RECOGNITION_ISSUES : harmonyErrors.slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="作品詳情" showBack right={
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-muted-foreground"><Edit3 size={18} /></button>
          <button className="p-1.5 text-muted-foreground"><Share2 size={18} /></button>
        </div>
      } />
      <div className="px-4 pt-4 space-y-4">
        {/* Work info */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/8 flex items-center justify-center">
              <Music size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold">{work.title}</h2>
              <p className="text-xs text-muted-foreground mt-0.5">{work.date} · {work.chapter} · G 大調 · 8 小節</p>
            </div>
          </div>
        </div>

        {/* Score preview */}
        <div className="w-full aspect-[5/3] bg-card rounded-2xl border border-border shadow-card relative overflow-hidden">
          {work.id === DEMO_WORK_ID ? (
            <>
              <img src={DEMO_CAPTURE_IMAGE} alt="批改作品預覽" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/24 via-transparent to-background/8" />
            </>
          ) : (
            <>
              <div className="absolute inset-x-4 top-1/4 bottom-1/4 flex flex-col justify-center gap-2">
                {[0,1].map(sys => (
                  <div key={sys} className="space-y-[3px]">
                    {[0,1,2,3,4].map(i => <div key={i} className="h-[1px] bg-muted-foreground/12" />)}
                  </div>
                ))}
              </div>
              {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((pos, i) => (
                <div key={i} className="absolute top-[20%] bottom-[20%] w-[1px] bg-muted-foreground/15" style={{ left: `${pos * 100}%` }} />
              ))}
            </>
          )}
        </div>

        {/* Analysis summary */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-destructive/5 border border-destructive/10">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-destructive" />
            <span className="text-sm font-medium">{work.errorCount} 個錯誤</span>
          </div>
          <button onClick={() => navigate('/grading/feedback')} className="text-xs text-primary font-medium flex items-center gap-1">
            查看回饋 <ChevronRight size={14} />
          </button>
        </div>

        {/* Error list */}
        <div>
          <h3 className="text-sm font-semibold mb-2">錯誤紀錄</h3>
          <div className="space-y-2">
            {issueList.map(e => {
              const s = severityConfig[e.severity as Severity];
              const Icon = s.icon;
              return (
                <button
                  key={e.id}
                  onClick={() =>
                    navigate(work.id === DEMO_WORK_ID ? `/grading/error/${e.id}?source=demo` : `/grading/error/${e.id}`)
                  }
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card text-left active:scale-[0.98] transition-transform">
                  <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={14} className={s.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {'measure' in e ? `第 ${e.measure} 小節 · ${e.category}` : `${e.measureLabel} · ${e.voices}`}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button onClick={() => navigate('/grading/analysis')}
            className="w-full py-3 bg-card border border-border text-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-card">
            <RefreshCw size={16} /> 重新分析
          </button>
          <button className="w-full py-3 bg-card border border-border text-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-card">
            <Share2 size={16} /> 分享作品
          </button>
        </div>
      </div>
    </div>
  );
};

export default B12WorkDetail;
