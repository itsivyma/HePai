import { useState } from 'react';
import { Camera, Image, FileUp, Zap, Grid3X3, HelpCircle, X, Music, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';

type UploadState = 'camera' | 'denied' | 'file-select';

const B2Upload = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<UploadState>('camera');
  const [showTips, setShowTips] = useState(false);
  const [showPdfPages, setShowPdfPages] = useState(false);

  if (state === 'denied') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <PageHeader title="拍攝手寫譜" showBack />
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/8 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert size={28} className="text-destructive" />
            </div>
            <h2 className="text-base font-display font-semibold mb-2">需要相機權限</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              請在系統設定中允許 HePai 存取相機，以拍攝你的手寫四部合聲樂譜。
            </p>
            <button onClick={() => setState('camera')} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">
              前往設定
            </button>
            <button onClick={() => navigate(-1)} className="block mx-auto mt-3 text-sm text-muted-foreground">返回</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-foreground flex flex-col">
      {/* Camera preview */}
      <div className="relative flex-1 flex items-center justify-center">
        <div className="absolute top-0 left-0 right-0 z-10">
          <PageHeader title="" showBack right={
            <div className="flex items-center gap-3">
              <button className="p-1.5 text-primary-foreground/70"><Zap size={18} /></button>
              <button className="p-1.5 text-primary-foreground/70"><Grid3X3 size={18} /></button>
              <button onClick={() => setShowTips(true)} className="p-1.5 text-primary-foreground/70"><HelpCircle size={18} /></button>
            </div>
          } />
        </div>

        <div className="text-center">
          {/* Score capture frame */}
          <div className="w-72 h-[22rem] border-2 border-dashed border-primary-foreground/30 rounded-2xl flex flex-col items-center justify-center mx-auto relative">
            {/* Corner guides */}
            {['top-0 left-0 border-t-2 border-l-2 rounded-tl-lg',
              'top-0 right-0 border-t-2 border-r-2 rounded-tr-lg',
              'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-lg',
              'bottom-0 right-0 border-b-2 border-r-2 rounded-br-lg'
            ].map((cls, i) => (
              <div key={i} className={`absolute w-6 h-6 border-primary-foreground/50 ${cls}`} />
            ))}

            {/* Staff lines hint */}
            <div className="w-48 space-y-2 mb-4 opacity-20">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="h-[1px] bg-primary-foreground" />
              ))}
            </div>
            <Music size={32} className="text-primary-foreground/30 mb-3" />
            <p className="text-sm text-primary-foreground/50 font-medium">將手寫樂譜對準此區域</p>
            <p className="text-xs text-primary-foreground/30 mt-1">確保四部合聲譜面完整入鏡</p>
            <div className="mt-3 space-y-0.5">
              <p className="text-[10px] text-primary-foreground/20">支援手寫四部和聲作業</p>
              <p className="text-[10px] text-primary-foreground/20">PDF · JPG · PNG</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips overlay */}
      {showTips && (
        <div className="fixed inset-0 z-50 bg-background/95 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-base font-display font-semibold">拍攝小技巧</h2>
            <button onClick={() => setShowTips(false)}><X size={20} className="text-muted-foreground" /></button>
          </div>
          <div className="px-6 py-4 space-y-4">
            {[
              { emoji: '📏', text: '將整張樂譜完整入鏡' },
              { emoji: '☀️', text: '避免陰影遮住音符與和弦標記' },
              { emoji: '📄', text: '保持紙張平整' },
              { emoji: '📷', text: '鏡頭正對譜面' },
              { emoji: '✍️', text: '字跡與小節線需清楚可辨識' },
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg">{tip.emoji}</span>
                <p className="text-sm text-foreground">{tip.text}</p>
              </div>
            ))}
          </div>
          <div className="px-6 mt-auto pb-8">
            <button onClick={() => setShowTips(false)} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">知道了</button>
          </div>
        </div>
      )}

      {/* PDF page selector overlay */}
      {showPdfPages && (
        <div className="fixed inset-0 z-50 bg-background/95 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-base font-display font-semibold">選擇頁面</h2>
            <button onClick={() => setShowPdfPages(false)}><X size={20} className="text-muted-foreground" /></button>
          </div>
          <p className="px-4 text-xs text-muted-foreground mb-3">已偵測到 PDF 共 3 頁，請選擇要分析的頁面</p>
          <div className="px-4 grid grid-cols-3 gap-3">
            {[1, 2, 3].map(p => (
              <button key={p} onClick={() => { setShowPdfPages(false); navigate('/grading/process'); }}
                className="aspect-[3/4] rounded-xl bg-card border border-border shadow-card flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-16 bg-secondary rounded flex items-center justify-center">
                  <Music size={16} className="text-muted-foreground" />
                </div>
                <span className="text-xs text-muted-foreground">第 {p} 頁</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="liquid-glass-strong safe-bottom px-6 py-5">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/grading/process')} className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
              <Image size={18} className="text-foreground" />
            </div>
            <span className="text-[10px] text-muted-foreground">從相簿選擇</span>
          </button>

          <button onClick={() => navigate('/grading/process')} className="w-16 h-16 rounded-full bg-primary-foreground border-4 border-primary shadow-elevated active:scale-95 transition-transform" />

          <button onClick={() => setShowPdfPages(true)} className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center">
              <FileUp size={18} className="text-foreground" />
            </div>
            <span className="text-[10px] text-muted-foreground">上傳檔案</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default B2Upload;
