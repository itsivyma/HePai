import { MousePointer2, Move, Plus, Trash2, Tag, ZoomIn, ZoomOut, Undo2, Redo2, Info } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';

const tools = [
  { icon: MousePointer2, label: '選取' },
  { icon: Move, label: '拖曳' },
  { icon: Plus, label: '小節線' },
  { icon: Trash2, label: '刪除' },
  { icon: Tag, label: '聲部' },
];

const B5ManualCorrect = () => {
  const [activeTool, setActiveTool] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="手動校正" showBack right={
        <div className="flex gap-2">
          <button className="p-1.5 text-muted-foreground"><Undo2 size={18} /></button>
          <button className="p-1.5 text-muted-foreground"><Redo2 size={18} /></button>
        </div>
      } />

      {showHint && (
        <div className="mx-4 mt-2 p-3 rounded-xl bg-accent/8 border border-accent/15 flex items-start gap-2">
          <Info size={14} className="text-accent mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">首次使用提示：選取工具可點選音符，拖曳工具可調整位置。完成後按下方「完成」按鈕。</p>
          </div>
          <button onClick={() => setShowHint(false)} className="text-xs text-primary">知道了</button>
        </div>
      )}

      {/* Score canvas */}
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <div className="w-full aspect-[4/3] bg-card rounded-2xl border border-border shadow-card flex items-center justify-center">
          <div className="text-center">
            <div className="space-y-3 w-48">
              {[0,1,2,3,4].map(i => (
                <div key={i} className="h-[1px] bg-muted-foreground/25" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">點選工具列操作譜面元素</p>
          </div>
        </div>
      </div>

      {/* Zoom */}
      <div className="flex items-center justify-center gap-4 py-2">
        <button className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center"><ZoomOut size={16} /></button>
        <span className="text-xs text-muted-foreground">100%</span>
        <button className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center"><ZoomIn size={16} /></button>
      </div>

      {/* Toolbar */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-around py-2 rounded-2xl glass border border-border shadow-soft">
          {tools.map((t, i) => (
            <button key={i} onClick={() => setActiveTool(i)} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTool === i ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
            }`}>
              <t.icon size={16} />
              <span className="text-[9px]">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-6 safe-bottom">
        <button onClick={() => navigate('/grading/analysis')} className="w-full h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">完成</button>
      </div>
    </div>
  );
};

export default B5ManualCorrect;
