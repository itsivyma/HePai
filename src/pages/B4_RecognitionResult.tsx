import { AlertTriangle, CheckCircle, Edit3, Play, Camera, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';

const recognitionItems = [
  { label: '譜號', value: '高音譜號 + 低音譜號', ok: true },
  { label: '調號', value: 'G 大調（1♯）', ok: true },
  { label: '拍號', value: '4/4', ok: true },
  { label: '小節數', value: '8 小節', ok: true },
  { label: '聲部', value: 'S · A · T · B（四部）', ok: true },
  { label: '小節線', value: '第 6 小節可能缺漏', ok: false },
];

const B4RecognitionResult = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="辨識結果" showBack />
      <div className="px-4 pt-4 space-y-4">
        {/* Score preview with overlays */}
        <div className="w-full aspect-[3/2] bg-card rounded-2xl border border-border shadow-card p-4 relative overflow-hidden">
          {/* Staff lines */}
          <div className="absolute inset-x-6 top-1/4 space-y-1">
            {[0,1,2,3,4].map(i => <div key={i} className="h-[1px] bg-muted-foreground/15" />)}
          </div>
          <div className="absolute inset-x-6 bottom-1/4 space-y-1">
            {[0,1,2,3,4].map(i => <div key={i} className="h-[1px] bg-muted-foreground/15" />)}
          </div>

          {/* Overlay markers */}
          <div className="absolute top-5 left-6 px-1.5 py-0.5 bg-primary/15 text-primary text-[10px] rounded font-medium">𝄞 G大調</div>
          <div className="absolute top-5 right-6 px-1.5 py-0.5 bg-primary/15 text-primary text-[10px] rounded font-medium">4/4</div>

          <div className="absolute top-[38%] left-6 space-y-1">
            {['S', 'A'].map(v => (
              <div key={v} className="px-1 py-0.5 bg-accent/15 text-accent text-[9px] rounded font-medium">{v}</div>
            ))}
          </div>
          <div className="absolute bottom-[22%] left-6 space-y-1">
            {['T', 'B'].map(v => (
              <div key={v} className="px-1 py-0.5 bg-accent/15 text-accent text-[9px] rounded font-medium">{v}</div>
            ))}
          </div>

          {/* Barline markers */}
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((pos, i) => (
            <div key={i} className="absolute top-[20%] bottom-[15%] w-[1px] bg-muted-foreground/20" style={{ left: `${pos * 100}%` }} />
          ))}

          {/* Missing barline marker */}
          <div className="absolute top-[20%] bottom-[15%] w-[2px] bg-warning/40 border border-dashed border-warning/30" style={{ left: '72%' }} />
          <div className="absolute px-1 py-0.5 bg-warning/15 text-warning text-[8px] rounded" style={{ left: '68%', top: '12%' }}>?</div>
        </div>

        {/* Confidence */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-success/8 border border-success/15">
          <CheckCircle size={18} className="text-success shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">辨識信心度：92%</p>
            <p className="text-xs text-muted-foreground">大部分譜面元素已成功辨識</p>
          </div>
        </div>

        {/* Recognition detail list */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="text-xs font-semibold text-muted-foreground mb-3">辨識摘要</h3>
          <div className="space-y-2.5">
            {recognitionItems.map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.ok
                    ? <CheckCircle size={13} className="text-success" />
                    : <AlertTriangle size={13} className="text-warning" />
                  }
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
                <span className={`text-xs font-medium ${item.ok ? 'text-foreground' : 'text-warning'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-warning/8 border border-warning/15">
          <AlertTriangle size={16} className="text-warning mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium">建議進入校正</p>
            <p className="text-xs text-muted-foreground mt-0.5">第 6 小節小節線可能未正確辨識，校正後可提高分析準確度</p>
          </div>
        </div>

        {/* Hint */}
        <div className="flex items-start gap-2 px-1">
          <Info size={12} className="text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">系統已辨識你的手寫譜面，你可以直接進行分析，或先校正辨識結果以確保準確度。</p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <div className="flex gap-3">
            <button onClick={() => navigate('/grading/correct')} className="flex-1 h-11 bg-card border border-border text-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-card">
              <Edit3 size={16} /> 進入校正
            </button>
            <button onClick={() => navigate('/grading/analysis')} className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-soft">
              <Play size={16} /> 直接分析
            </button>
          </div>
          <button onClick={() => navigate('/grading/upload')} className="w-full py-2.5 text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            <Camera size={14} /> 重新拍攝 / 重新上傳
          </button>
        </div>
      </div>
    </div>
  );
};

export default B4RecognitionResult;
