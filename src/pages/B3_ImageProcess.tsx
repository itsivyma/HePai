import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Binary, Camera, Cpu, ScanSearch, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import PageHeader from '@/components/shared/PageHeader';
import { DEMO_CAPTURE_IMAGE } from '@/lib/grading-demo';

const stages = [
  {
    icon: ScanSearch,
    label: '校正譜面透視',
    desc: '重建紙面邊界、拉直雙譜表、修正手持拍攝的傾斜與變形。',
  },
  {
    icon: Cpu,
    label: 'AI 辨識音符與聲部',
    desc: '解析譜號、拍號、音高位置與四個聲部的垂直配置關係。',
  },
  {
    icon: Binary,
    label: '比對和聲規則',
    desc: '檢查平行五度、平行八度與 over 8 等聲部進行錯誤。',
  },
];

const B3ImageProcess = () => {
  const navigate = useNavigate();
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setActiveStage(1), 900),
      window.setTimeout(() => setActiveStage(2), 1900),
      window.setTimeout(() => navigate('/grading/recognition'), 3300),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader
        title="AI 辨識處理"
        showBack
        right={
          <button onClick={() => navigate('/grading/upload')} className="text-xs text-primary font-medium flex items-center gap-1">
            <Camera size={14} /> 重拍
          </button>
        }
      />

      <div className="flex-1 px-4 pt-4 pb-6 space-y-4">
        <div className="rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(34,211,238,0.10),rgba(255,255,255,0.96)_34%,rgba(255,255,255,1))] p-4 shadow-elevated overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs tracking-[0.24em] uppercase text-primary/72">Capture To Analysis</p>
              <h2 className="text-lg font-display font-semibold mt-1">影像處理與譜面辨識</h2>
            </div>
            <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {Math.round(((activeStage + 1) / stages.length) * 100)}%
            </div>
          </div>

          <div className="relative aspect-[5/3] rounded-[1.5rem] overflow-hidden border border-border/60 bg-card">
            <img src={DEMO_CAPTURE_IMAGE} alt="待辨識的四部和聲譜面" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,20,0.02),rgba(6,12,20,0.18))]" />
            <motion.div
              animate={{ y: ['6%', '84%', '6%'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-4 h-[3px] rounded-full bg-cyan-300/90 shadow-[0_0_20px_rgba(34,211,238,0.7)]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.12),transparent)] bg-[length:180px_100%] animate-[scan-grid_3.6s_linear_infinite]" />

            <div className="absolute left-4 right-4 bottom-4 rounded-2xl bg-background/78 border border-white/50 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles size={15} />
                <span className="text-sm font-medium">{stages[activeStage].label}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                {stages[activeStage].desc}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isComplete = index < activeStage;
            const isActive = index === activeStage;

            return (
              <div
                key={stage.label}
                className={`rounded-2xl border p-4 transition-all ${
                  isActive
                    ? 'border-primary/30 bg-primary/5 shadow-soft'
                    : isComplete
                      ? 'border-emerald-200 bg-emerald-50/80'
                      : 'border-border bg-card'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl ${
                      isActive ? 'bg-primary text-primary-foreground' : isComplete ? 'bg-emerald-500 text-white' : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium">{stage.label}</p>
                      <span className="text-[11px] text-muted-foreground">
                        {isComplete ? '完成' : isActive ? '進行中' : '待處理'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-card px-4 py-3 shadow-card">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">預計輸出</p>
              <p className="text-sm font-medium mt-1">4 個重點錯誤框選 + 可點選詳細說明</p>
            </div>
            <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Sparkles size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default B3ImageProcess;
