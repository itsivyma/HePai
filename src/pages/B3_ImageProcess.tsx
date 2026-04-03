import { useState } from 'react';
import { RotateCw, Maximize, Sun, RefreshCw, Camera, AlertTriangle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';

type ProcessState = 'ready' | 'processing' | 'warning';

const B3ImageProcess = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<ProcessState>('ready');
  const [contrast, setContrast] = useState(50);

  const handleNext = () => {
    setState('processing');
    setTimeout(() => navigate('/grading/recognition'), 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="影像處理" showBack right={
        <button onClick={() => navigate('/grading/upload')} className="text-xs text-primary font-medium flex items-center gap-1">
          <Camera size={14} /> 重拍
        </button>
      } />

      {/* Score preview */}
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <div className="relative w-full aspect-[3/4] bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          {state === 'processing' && (
            <div className="absolute inset-0 bg-background/60 z-20 flex flex-col items-center justify-center gap-3">
              <Loader2 size={32} className="text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">正在處理影像…</p>
            </div>
          )}

          {/* Mock staff lines */}
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <div className="space-y-1 mb-8">
              <p className="text-[10px] text-muted-foreground/40 mb-1">S</p>
              {[0,1,2,3,4].map(i => <div key={`s${i}`} className="h-[1px] bg-muted-foreground/15" />)}
            </div>
            <div className="space-y-1 mb-8">
              <p className="text-[10px] text-muted-foreground/40 mb-1">A</p>
              {[0,1,2,3,4].map(i => <div key={`a${i}`} className="h-[1px] bg-muted-foreground/15" />)}
            </div>
            <div className="space-y-1 mb-8">
              <p className="text-[10px] text-muted-foreground/40 mb-1">T</p>
              {[0,1,2,3,4].map(i => <div key={`t${i}`} className="h-[1px] bg-muted-foreground/15" />)}
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-muted-foreground/40 mb-1">B</p>
              {[0,1,2,3,4].map(i => <div key={`b${i}`} className="h-[1px] bg-muted-foreground/15" />)}
            </div>
          </div>

          {/* Crop handles */}
          {['top-2 left-2 border-t-2 border-l-2 rounded-tl',
            'top-2 right-2 border-t-2 border-r-2 rounded-tr',
            'bottom-2 left-2 border-b-2 border-l-2 rounded-bl',
            'bottom-2 right-2 border-b-2 border-r-2 rounded-br'
          ].map((cls, i) => (
            <div key={i} className={`absolute w-6 h-6 border-primary ${cls}`} />
          ))}
        </div>
      </div>

      {/* Warning banner */}
      {state === 'warning' && (
        <div className="mx-4 mb-2 p-3 rounded-xl bg-warning/8 border border-warning/15 flex items-center gap-2">
          <AlertTriangle size={14} className="text-warning shrink-0" />
          <p className="text-xs text-muted-foreground">影像略模糊，建議重新拍攝以獲得更好的辨識效果</p>
        </div>
      )}

      {/* Tools */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-around py-3 rounded-2xl bg-card border border-border shadow-card">
          <button className="flex flex-col items-center gap-1 text-muted-foreground active:text-primary transition-colors">
            <RotateCw size={18} /><span className="text-[10px]">旋轉</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground active:text-primary transition-colors">
            <Maximize size={18} /><span className="text-[10px]">校正</span>
          </button>
          <button onClick={() => setState('warning')} className="flex flex-col items-center gap-1 text-muted-foreground active:text-primary transition-colors">
            <Sun size={18} /><span className="text-[10px]">對比</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground active:text-primary transition-colors">
            <RefreshCw size={18} /><span className="text-[10px]">重設</span>
          </button>
        </div>
      </div>

      {/* Contrast slider (shown contextually) */}
      {state === 'warning' && (
        <div className="px-6 pb-2">
          <div className="flex items-center gap-3">
            <Sun size={14} className="text-muted-foreground shrink-0" />
            <input type="range" min={0} max={100} value={contrast} onChange={e => setContrast(Number(e.target.value))}
              className="flex-1 h-1 bg-secondary rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary" />
            <span className="text-xs text-muted-foreground w-8 text-right">{contrast}%</span>
          </div>
        </div>
      )}

      <div className="px-4 pb-6 safe-bottom flex gap-3">
        <button onClick={() => navigate('/grading/upload')} className="flex-1 h-11 bg-card border border-border text-foreground rounded-xl text-sm font-medium shadow-card">
          重新拍攝
        </button>
        <button onClick={handleNext} disabled={state === 'processing'} className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft disabled:opacity-50">
          下一步
        </button>
      </div>
    </div>
  );
};

export default B3ImageProcess;
