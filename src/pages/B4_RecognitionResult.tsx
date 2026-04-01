import { AlertTriangle, CheckCircle, Edit3, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';

const B4RecognitionResult = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="辨識結果" showBack />
      <div className="px-4 pt-4 space-y-4">
        {/* Score preview with overlays */}
        <div className="w-full aspect-[3/2] bg-card rounded-2xl border border-border shadow-card p-4 relative overflow-hidden">
          <div className="space-y-4">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="h-[1px] bg-muted-foreground/20" />
            ))}
          </div>
          {/* Mock markers */}
          <div className="absolute top-6 left-8 px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded">𝄞 G大調</div>
          <div className="absolute top-6 right-8 px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded">4/4</div>
          <div className="absolute bottom-8 left-1/4 px-1.5 py-0.5 bg-accent/20 text-accent text-[10px] rounded">S</div>
          <div className="absolute bottom-12 left-1/4 px-1.5 py-0.5 bg-accent/20 text-accent text-[10px] rounded">A</div>
          <div className="absolute bottom-16 left-1/4 px-1.5 py-0.5 bg-accent/20 text-accent text-[10px] rounded">T</div>
          <div className="absolute bottom-20 left-1/4 px-1.5 py-0.5 bg-accent/20 text-accent text-[10px] rounded">B</div>
        </div>

        {/* Confidence */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-success/8 border border-success/15">
          <CheckCircle size={18} className="text-success shrink-0" />
          <div>
            <p className="text-sm font-medium">辨識信心度：92%</p>
            <p className="text-xs text-muted-foreground">已偵測 4 個聲部、8 小節、調號 G 大調</p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-warning/8 border border-warning/15">
          <AlertTriangle size={18} className="text-warning shrink-0" />
          <div>
            <p className="text-sm font-medium">注意</p>
            <p className="text-xs text-muted-foreground">第 6 小節小節線可能未正確辨識，建議進入校正確認</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={() => navigate('/grading/correct')} className="flex-1 h-11 bg-card border border-border text-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-card">
            <Edit3 size={16} /> 進入校正
          </button>
          <button onClick={() => navigate('/grading/analysis')} className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-soft">
            <Play size={16} /> 直接分析
          </button>
        </div>
      </div>
    </div>
  );
};

export default B4RecognitionResult;
