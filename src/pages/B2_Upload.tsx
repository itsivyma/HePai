import { useEffect, useState } from 'react';
import { Camera, FileUp, Grid3X3, HelpCircle, Image, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '@/components/shared/PageHeader';
import { cn } from '@/lib/utils';
import { DEMO_CAPTURE_IMAGE } from '@/lib/grading-demo';

type CapturePhase = 'searching' | 'aligning' | 'locked';

const phaseConfig: Record<CapturePhase, { title: string; desc: string; progress: number }> = {
  searching: {
    title: '偵測譜面中',
    desc: '先讓兩組五線譜完整進入框內，系統正在辨識雙譜表邊界。',
    progress: 38,
  },
  aligning: {
    title: '校正對齊',
    desc: '上、下方譜表已抓到，正在微調位置讓五線譜貼齊參考線。',
    progress: 77,
  },
  locked: {
    title: '對齊完成',
    desc: '譜面已鎖定在可辨識範圍，接下來會直接進入分析處理。',
    progress: 100,
  },
};

const paperMotionClass: Record<CapturePhase, string> = {
  searching: 'translate-y-4 -translate-x-1 rotate-[1.15deg] scale-[1.045]',
  aligning: 'translate-y-[3px] translate-x-0 rotate-[0.22deg] scale-[1.015]',
  locked: 'translate-y-0 translate-x-0 rotate-0 scale-100',
};

const B2Upload = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<CapturePhase>('searching');
  const [showTips, setShowTips] = useState(false);
  const [showPdfPages, setShowPdfPages] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase('aligning'), 1100),
      window.setTimeout(() => setPhase('locked'), 2800),
      window.setTimeout(() => setFlash(true), 3650),
      window.setTimeout(() => navigate('/grading/process'), 4250),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [navigate]);

  const currentPhase = phaseConfig[phase];

  return (
    <div className="min-h-screen bg-[#060b12] text-white overflow-hidden">
      <img
        src={DEMO_CAPTURE_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.12] blur-[3px] scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,16,0.4),rgba(4,8,16,0.84))]" />
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-white transition-opacity duration-300',
          flash ? 'opacity-90' : 'opacity-0'
        )}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="absolute top-0 left-0 right-0 z-20">
          <PageHeader
            title=""
            showBack
            right={
              <div className="flex items-center gap-3">
                <button className="p-1.5 text-white/70" aria-label="閃光燈">
                  <Zap size={18} />
                </button>
                <button className="p-1.5 text-white/70" aria-label="格線">
                  <Grid3X3 size={18} />
                </button>
                <button onClick={() => setShowTips(true)} className="p-1.5 text-white/70" aria-label="拍攝說明">
                  <HelpCircle size={18} />
                </button>
              </div>
            }
          />
        </div>

        <div className="px-4 pt-16">
          <div className="mx-auto flex max-w-sm items-center justify-between rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 backdrop-blur-md">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/66">Score Capture</span>
            <span className="text-[11px] text-white/66">{currentPhase.progress}%</span>
          </div>
        </div>

        <div className="flex-1 px-4 py-5">
          <div className="mx-auto flex h-full max-w-sm flex-col">
            <div className="px-1">
              <h2 className="text-[1.05rem] font-semibold tracking-[0.01em]">{currentPhase.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-white/58">{currentPhase.desc}</p>
            </div>

            <div className="mt-5 flex-1">
              <div className="relative mx-auto h-full max-h-[31rem] min-h-[30rem] w-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-black/30 shadow-[0_24px_72px_rgba(0,0,0,0.42)]">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/24 to-transparent z-20" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/38 to-transparent z-20" />

                <div className="absolute left-[8%] right-[8%] top-[12%] bottom-[21%] rounded-[1.9rem] border border-white/10 bg-black/14 z-10" />
                <div className="absolute left-[11%] right-[11%] top-[15%] bottom-[24%] rounded-[1.7rem] overflow-hidden z-10">
                  <div className="absolute inset-0 border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(4,8,16,0.24)_100%)] z-10" />

                  <div
                    className={cn(
                      'absolute left-[5%] right-[5%] top-[11%] bottom-[14%] transition-all ease-out',
                      paperMotionClass[phase]
                    )}
                    style={{ transitionDuration: '1500ms' }}
                  >
                    <div className="absolute inset-0 rounded-[1.8rem] bg-[#f7f7f1] shadow-[0_18px_44px_rgba(0,0,0,0.28)]" />
                    <img
                      src={DEMO_CAPTURE_IMAGE}
                      alt="四部和聲拍攝預覽"
                      className="absolute inset-[4.25%] h-[91.5%] w-[91.5%] rounded-[1.15rem] object-contain bg-white"
                    />
                  </div>

                  <div className="absolute inset-x-[12%] top-[24%] z-20 space-y-[9px] opacity-92">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <div key={`upper-${line}`} className="h-[1px] bg-cyan-100/72" />
                    ))}
                  </div>
                  <div className="absolute inset-x-[12%] top-[54.5%] z-20 space-y-[9px] opacity-92">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <div key={`lower-${line}`} className="h-[1px] bg-cyan-100/72" />
                    ))}
                  </div>

                  <div className="absolute inset-x-[10%] top-[19%] h-[18%] rounded-[1.15rem] border border-white/12 z-20" />
                  <div className="absolute inset-x-[10%] top-[49.5%] h-[18%] rounded-[1.15rem] border border-white/12 z-20" />

                  {[
                    'top-0 left-0 border-t-[2.5px] border-l-[2.5px] rounded-tl-xl',
                    'top-0 right-0 border-t-[2.5px] border-r-[2.5px] rounded-tr-xl',
                    'bottom-0 left-0 border-b-[2.5px] border-l-[2.5px] rounded-bl-xl',
                    'bottom-0 right-0 border-b-[2.5px] border-r-[2.5px] rounded-br-xl',
                  ].map((cls, index) => (
                    <div
                      key={index}
                      className={cn(
                        'absolute h-8 w-8 z-20',
                        cls,
                        phase === 'locked' ? 'border-emerald-300/92' : 'border-cyan-100/80'
                      )}
                    />
                  ))}

                  <div
                    className={cn(
                      'absolute inset-x-[9%] h-[2px] z-20 rounded-full transition-all ease-out',
                      phase === 'searching' && 'top-[33.5%] bg-white/66 opacity-36',
                      phase === 'aligning' && 'top-[62.5%] bg-cyan-200/92 opacity-90 shadow-[0_0_14px_rgba(103,232,249,0.72)]',
                      phase === 'locked' && 'top-[47%] bg-emerald-200 opacity-0'
                    )}
                    style={{ transitionDuration: '1700ms' }}
                  />
                </div>

                <div className="absolute inset-x-6 bottom-8 z-30 rounded-[1.4rem] border border-white/10 bg-black/42 px-4 py-3 backdrop-blur-md">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">將樂譜五線譜貼齊參考線</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/56">
                        {phase === 'searching' && '先把上方譜表放進框內，再讓頁面邊緣保持水平。'}
                        {phase === 'aligning' && '系統正在對齊下方譜表與紙面邊界，保持手機穩定即可。'}
                        {phase === 'locked' && '已完成雙譜表定位，正在切換到辨識流程。'}
                      </p>
                    </div>
                    <div className="pt-0.5">
                      <div
                        className={cn(
                          'h-3 w-3 rounded-full transition-all duration-400',
                          phase === 'locked'
                            ? 'bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.86)]'
                            : 'bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.76)]'
                        )}
                      />
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-700',
                        phase === 'locked' ? 'bg-emerald-300' : 'bg-cyan-300'
                      )}
                      style={{ width: `${currentPhase.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/44">Alignment Status</p>
                  <p className="mt-1 text-sm font-medium text-white/88">
                    {phase === 'searching' ? '建立譜面區域' : phase === 'aligning' ? '對齊兩組五線譜' : '鎖定成功'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/44">Stability</p>
                  <p className="mt-1 text-sm font-semibold text-cyan-200">{currentPhase.progress}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 liquid-glass-strong safe-bottom px-6 py-5">
          <div className="flex items-center justify-around">
            <button
              onClick={() => navigate('/grading/process')}
              className="flex flex-col items-center gap-1.5 opacity-85"
              aria-label="從相簿選擇樂譜"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/12">
                <Image size={18} className="text-white" />
              </div>
              <span className="text-[10px] text-white/58">相簿</span>
            </button>

            <div className="relative flex items-center justify-center">
              <button
                onClick={() => navigate('/grading/process')}
                className="relative h-16 w-16 rounded-full border-4 border-cyan-200 bg-white shadow-[0_12px_30px_rgba(34,211,238,0.24)]"
                aria-label="模擬拍攝樂譜"
              />
              <span className="absolute -bottom-7 text-[10px] text-white/46">Auto</span>
            </div>

            <button
              onClick={() => setShowPdfPages(true)}
              className="flex flex-col items-center gap-1.5 opacity-85"
              aria-label="上傳檔案或 PDF"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/12">
                <FileUp size={18} className="text-white" />
              </div>
              <span className="text-[10px] text-white/58">檔案</span>
            </button>
          </div>
        </div>
      </div>

      {showPdfPages && (
        <div className="fixed inset-0 z-50 bg-background/96 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-base font-display font-semibold text-foreground">選擇頁面</h2>
            <button onClick={() => setShowPdfPages(false)}>
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>
          <p className="px-4 text-xs text-muted-foreground mb-3">已偵測到 PDF 共 3 頁，請選擇要分析的頁面</p>
          <div className="px-4 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => {
                  setShowPdfPages(false);
                  navigate('/grading/process');
                }}
                className="aspect-[3/4] rounded-xl bg-card border border-border shadow-card flex flex-col items-center justify-center gap-2 text-foreground"
              >
                <div className="w-12 h-16 rounded-lg border border-border bg-muted/70" />
                <span className="text-xs text-muted-foreground">第 {page} 頁</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showTips && (
        <div className="fixed inset-0 z-50 bg-background/96 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-base font-display font-semibold">拍攝小技巧</h2>
            <button onClick={() => setShowTips(false)}>
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>
          <div className="px-6 py-4 space-y-4">
            {[
              '讓兩組五線譜完整落在參考框內，不要只拍到上半部。',
              '保持鏡頭與紙面平行，系統較容易鎖定小節線與譜號。',
              '避免右上方強光，否則譜面會被洗白、音頭邊緣消失。',
              '如果是手寫作業，音符尾桿與和弦標記要留出清楚筆畫。',
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-primary/70 shrink-0" />
                <p className="text-sm text-foreground leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
          <div className="px-6 mt-auto pb-8">
            <button
              onClick={() => setShowTips(false)}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft"
            >
              返回拍攝
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default B2Upload;
