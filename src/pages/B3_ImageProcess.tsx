import { RotateCw, Maximize, Sun, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';

const B3ImageProcess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="影像處理" showBack />
      
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <div className="relative w-full aspect-[4/3] bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          {/* Mock score preview */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[90%] h-[80%] border-2 border-dashed border-primary/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="space-y-3 w-full px-8">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="text-xs text-muted-foreground/50">{i === 0 ? '𝄞' : ''}</div>
                      <div className="flex-1 h-[1px] bg-muted-foreground/20" />
                    </div>
                  ))}
                  <div className="flex-1 h-[1px] bg-muted-foreground/20" />
                </div>
                <p className="text-xs text-muted-foreground mt-4">譜面預覽區域</p>
              </div>
            </div>
          </div>
          {/* Crop handles */}
          {['top-left','top-right','bottom-left','bottom-right'].map(pos => (
            <div key={pos} className={`absolute w-5 h-5 border-2 border-primary rounded-sm ${
              pos.includes('top') ? 'top-3' : 'bottom-3'
            } ${pos.includes('left') ? 'left-3' : 'right-3'} ${
              pos.includes('top') && pos.includes('left') ? 'border-r-0 border-b-0' :
              pos.includes('top') && pos.includes('right') ? 'border-l-0 border-b-0' :
              pos.includes('bottom') && pos.includes('left') ? 'border-r-0 border-t-0' :
              'border-l-0 border-t-0'
            }`} />
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-around py-3 rounded-2xl bg-card border border-border">
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <RotateCw size={18} /><span className="text-[10px]">旋轉</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <Maximize size={18} /><span className="text-[10px]">校正</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <Sun size={18} /><span className="text-[10px]">對比</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <RefreshCw size={18} /><span className="text-[10px]">重設</span>
          </button>
        </div>
      </div>

      <div className="px-4 pb-6 safe-bottom">
        <button onClick={() => navigate('/grading/recognition')} className="w-full h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">
          下一步
        </button>
      </div>
    </div>
  );
};

export default B3ImageProcess;
