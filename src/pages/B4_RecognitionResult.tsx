import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '@/components/shared/PageHeader';
import {
  buildRecognitionCards,
  DEMO_CAPTURE_IMAGE,
  DEMO_RECOGNITION_ISSUES,
  saveDemoRecentWork,
  type RecognitionIssue,
} from '@/lib/grading-demo';
import { cn } from '@/lib/utils';

const SCORE_WIDTH = 2048;
const SCORE_HEIGHT = 840;

const issueColors: Record<string, { stroke: string; fill: string }> = {
  'parallel-fifth-1': { stroke: '#dc2626', fill: 'rgba(220,38,38,0.14)' },
  'parallel-fifth-2': { stroke: '#ea580c', fill: 'rgba(234,88,12,0.14)' },
  'parallel-octave': { stroke: '#2563eb', fill: 'rgba(37,99,235,0.14)' },
  'over-8': { stroke: '#7c3aed', fill: 'rgba(124,58,237,0.14)' },
};

const defaultIssueColor = { stroke: '#0f172a', fill: 'rgba(15,23,42,0.10)' };

const B4RecognitionResult = () => {
  const navigate = useNavigate();
  const [selectedIssueId, setSelectedIssueId] = useState(DEMO_RECOGNITION_ISSUES[0].id);

  useEffect(() => {
    saveDemoRecentWork();
  }, []);

  const orderedIssues = buildRecognitionCards(DEMO_RECOGNITION_ISSUES, selectedIssueId);
  const selectedIssue = orderedIssues[0];
  const severeCount = DEMO_RECOGNITION_ISSUES.filter((issue) => issue.severity === 'severe').length;

  const renderIssueSummary = (issue: RecognitionIssue) => (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={cn('rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]', issue.accent)}>
              {issue.shortLabel}
            </span>
            <span className="text-[11px] text-muted-foreground">{issue.measureLabel}</span>
          </div>
          <h3 className="mt-3 text-lg font-display font-semibold">{issue.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{issue.voices}</p>
        </div>
        <button
          type="button"
          onClick={() => setSelectedIssueId(issue.id)}
          className="rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground"
        >
          定位
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        <section className="rounded-2xl bg-background px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">錯誤摘要</p>
          <p className="mt-2 text-sm font-medium leading-relaxed">{issue.summary}</p>
        </section>
        <section className="rounded-2xl bg-background px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">為什麼會被抓到</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{issue.why}</p>
        </section>
        <section className="rounded-2xl bg-background px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">下一步怎麼改</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{issue.fix}</p>
        </section>
      </div>

      <div className="mt-3 rounded-2xl border border-dashed border-border bg-background px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">快速檢查點</p>
        <p className="mt-2 text-sm leading-relaxed">{issue.checkpoint}</p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="辨識結果" showBack />
      <div className="px-4 pt-4 space-y-4">
        <section className="rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(34,211,238,0.06),rgba(255,255,255,1)_34%)] p-4 shadow-elevated">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary/62">Recognition Review</p>
              <h2 className="mt-1 text-lg font-display font-semibold">已完成譜面辨識與錯誤定位</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                先看譜面中的當前錯誤，再從下方切換到其他問題。畫面一次只強調一個錯誤，避免多框重疊干擾判讀。
              </p>
            </div>
            <div className="rounded-2xl border border-primary/12 bg-primary/8 px-3 py-2 text-right">
              <p className="text-[11px] text-primary/70">辨識信心度</p>
              <p className="mt-1 text-lg font-semibold text-primary">96%</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-2xl bg-card px-3 py-3 shadow-card">
              <p className="text-[11px] text-muted-foreground">已框選錯誤</p>
              <p className="mt-1 text-lg font-semibold">{DEMO_RECOGNITION_ISSUES.length}</p>
            </div>
            <div className="rounded-2xl bg-card px-3 py-3 shadow-card">
              <p className="text-[11px] text-muted-foreground">嚴重違規</p>
              <p className="mt-1 text-lg font-semibold text-destructive">{severeCount}</p>
            </div>
            <div className="rounded-2xl bg-card px-3 py-3 shadow-card">
              <p className="text-[11px] text-muted-foreground">目前焦點</p>
              <p className="mt-1 text-sm font-semibold">{selectedIssue.title}</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-border bg-card p-3 shadow-card">
          <div className="relative aspect-[2048/840] overflow-hidden rounded-[1.5rem] border border-border/60 bg-muted/30">
            <svg
              viewBox={`0 0 ${SCORE_WIDTH} ${SCORE_HEIGHT}`}
              className="absolute inset-0 h-full w-full"
              aria-labelledby="recognition-score-title"
            >
              <title id="recognition-score-title">已辨識的四部和聲樂譜與錯誤框選</title>
              <image href={DEMO_CAPTURE_IMAGE} x="0" y="0" width={SCORE_WIDTH} height={SCORE_HEIGHT} preserveAspectRatio="none" />
              <rect x="0" y="0" width={SCORE_WIDTH} height={SCORE_HEIGHT} fill="url(#scoreShade)" />
              <defs>
                <linearGradient id="scoreShade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(7,12,20,0.01)" />
                  <stop offset="100%" stopColor="rgba(7,12,20,0.10)" />
                </linearGradient>
              </defs>

              {DEMO_RECOGNITION_ISSUES.map((issue, index) => {
                const isActive = issue.id === selectedIssueId;
                const color = issueColors[issue.id] ?? defaultIssueColor;
                const centerX = issue.box.x + issue.box.width / 2;
                const markerY = issue.box.y - 18;

                return (
                  <g
                    key={issue.id}
                    role="button"
                    tabIndex={0}
                    aria-label={issue.title}
                    onClick={() => setSelectedIssueId(issue.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedIssueId(issue.id);
                      }
                    }}
                    className="cursor-pointer"
                  >
                    {isActive ? (
                      <>
                        <rect
                          x={issue.box.x}
                          y={issue.box.y}
                          width={issue.box.width}
                          height={issue.box.height}
                          rx="18"
                          fill={color.fill}
                          stroke={color.stroke}
                          strokeWidth="5"
                        />
                        <rect
                          x={issue.box.x - 2}
                          y={issue.box.y - 2}
                          width={issue.box.width + 4}
                          height={issue.box.height + 4}
                          rx="20"
                          fill="none"
                          stroke="rgba(255,255,255,0.86)"
                          strokeWidth="2"
                        />
                        <g transform={`translate(${issue.box.x + 8}, ${issue.box.y - 40})`}>
                          <rect
                            width={Math.max(118, issue.title.length * 16)}
                            height="28"
                            rx="14"
                            fill="rgba(255,255,255,0.96)"
                            stroke={color.stroke}
                            strokeWidth="1.5"
                          />
                          <text x="12" y="19" fontSize="14" fontWeight="700" fill={color.stroke}>
                            {issue.title}
                          </text>
                        </g>
                      </>
                    ) : (
                      <>
                        <line x1={centerX} y1={markerY + 14} x2={centerX} y2={issue.box.y} stroke={color.stroke} strokeWidth="2" opacity="0.68" />
                        <circle cx={centerX} cy={markerY} r="16" fill="rgba(255,255,255,0.95)" stroke={color.stroke} strokeWidth="2" />
                        <text x={centerX} y={markerY + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill={color.stroke}>
                          {index + 1}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/45 bg-background/82 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">目前選取</p>
                  <p className="mt-1 text-sm font-medium">{selectedIssue.title}</p>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{selectedIssue.voices}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-border bg-card p-3 shadow-card">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {DEMO_RECOGNITION_ISSUES.map((issue, index) => {
              const isActive = issue.id === selectedIssueId;

              return (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => setSelectedIssueId(issue.id)}
                  className={cn(
                    'min-w-[13.5rem] rounded-[1.25rem] border px-4 py-3 text-left transition-all',
                    isActive ? 'border-primary/30 bg-primary/5 shadow-soft' : 'border-border bg-background'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]', issue.accent)}>
                          {index + 1}
                        </span>
                        <p className="text-sm font-medium">{issue.title}</p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{issue.measureLabel}</p>
                    </div>
                    <div className={cn('mt-0.5 h-2.5 w-2.5 rounded-full', isActive ? 'bg-primary' : 'bg-muted-foreground/25')} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section data-testid="selected-issue-panel" className="rounded-[2rem] border border-border bg-card p-4 shadow-card">
          <div className="border-b border-border/70 pb-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-primary/68">Issue Detail</p>
          </div>
          <div className="pt-3">{renderIssueSummary(selectedIssue)}</div>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-amber-900">建議修正順序</p>
              <p className="mt-1 text-xs leading-relaxed text-amber-800/80">
                先處理三個嚴重的平行問題，再回頭收斂 over 8 的聲部間距。這樣重寫時比較不會一改 spacing 就又引發新的平行。
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-medium text-emerald-900">已加入最近批改</p>
              <p className="mt-1 text-xs leading-relaxed text-emerald-800/80">
                這份示範拍攝會出現在「批改」首頁與作品庫，方便你之後回來重看辨識結果。
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/grading/work/demo-score-capture')}
            className="h-11 rounded-xl border border-border bg-card text-sm font-medium shadow-card"
          >
            前往作品詳情
          </button>
          <button
            onClick={() => navigate('/grading/analysis')}
            className="h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-soft"
          >
            繼續完整分析
          </button>
        </div>
      </div>
    </div>
  );
};

export default B4RecognitionResult;
