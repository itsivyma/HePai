import { MousePointer2, Move, Plus, Trash2, Tag, ZoomIn, ZoomOut, Undo2, Redo2, Info, X, Save } from 'lucide-react';
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
  const [showTutorial, setShowTutorial] = useState(true);
  const [zoom, setZoom] = useState(100);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="手動校正" showBack right={
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-muted-foreground active:text-foreground"><Undo2 size={18} /></button>
          <button className="p-1.5 text-muted-foreground active:text-foreground"><Redo2 size={18} /></button>
        </div>
      } />

      {/* First-time tutorial overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 bg-foreground/60 flex items-center justify-center px-6">
          <div className="w-full max-w-sm bg-card rounded-2xl border border-border shadow-elevated p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-display font-semibold">校正工具使用說明</h3>
              <button onClick={() => setShowTutorial(false)}><X size={18} className="text-muted-foreground" /></button>
            </div>
            <div className="space-y-3">
              {[
                { icon: MousePointer2, name: '選取', desc: '點選音符或記號進行編輯' },
                { icon: Move, name: '拖曳', desc: '拖動元素調整位置' },
                { icon: Plus, name: '小節線', desc: '在譜面上新增缺漏的小節線' },
                { icon: Trash2, name: '刪除', desc: '移除錯誤辨識的元素' },
                { icon: Tag, name: '聲部', desc: '標記或修正聲部（S/A/T/B）' },
              ].map(t => (
                <div key={t.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <t.icon size={14} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowTutorial(false)} className="w-full mt-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">
              開始校正
            </button>
          </div>
        </div>
      )}

      {/* Autosave hint */}
      {showHint && (
        <div className="mx-4 mt-2 p-3 rounded-xl bg-accent/8 border border-accent/15 flex items-start gap-2">
          <Info size={14} className="text-accent mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">校正內容會自動儲存為草稿，你可以隨時返回繼續編輯。</p>
          </div>
          <button onClick={() => setShowHint(false)} className="text-xs text-primary shrink-0">知道了</button>
        </div>
      )}

      {/* Score canvas */}
      <div className="flex-1 flex items-center justify-center px-4 py-3 overflow-hidden">
        <div className="w-full aspect-[3/4] bg-card rounded-2xl border border-border shadow-card relative overflow-hidden"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}>
          {/* Staff systems */}
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            {['S', 'A', 'T', 'B'].map(voice => (
              <div key={voice} className="mb-4 last:mb-0">
                <p className="text-[9px] text-accent/50 mb-0.5">{voice}</p>
                <div className="space-y-1">
                  {[0,1,2,3,4].map(i => <div key={i} className="h-[1px] bg-muted-foreground/15" />)}
                </div>
              </div>
            ))}
          </div>

          {/* Mock barlines */}
          {[0.2, 0.35, 0.5, 0.65, 0.8].map((pos, i) => (
            <div key={i} className="absolute top-[8%] bottom-[8%] w-[1px] bg-muted-foreground/20" style={{ left: `${pos * 100}%` }} />
          ))}

          {/* Highlighted missing barline area */}
          <div className="absolute top-[8%] bottom-[8%] w-8 bg-warning/5 border-l border-r border-dashed border-warning/30" style={{ left: '70%' }}>
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-1 py-0.5 bg-warning/15 text-warning text-[8px] rounded whitespace-nowrap">
              缺漏小節線
            </div>
          </div>

          {/* Center instruction */}
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <p className="text-[10px] text-muted-foreground/50">使用工具列操作譜面元素</p>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="flex items-center justify-center gap-4 py-2">
        <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center active:bg-primary/10 transition-colors">
          <ZoomOut size={16} />
        </button>
        <span className="text-xs text-muted-foreground w-10 text-center">{zoom}%</span>
        <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center active:bg-primary/10 transition-colors">
          <ZoomIn size={16} />
        </button>
      </div>

      {/* Toolbar */}
      <div className="px-4 pb-2">
        <div className="flex items-center justify-around py-2.5 rounded-2xl glass border border-border shadow-soft">
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
        <button onClick={() => navigate('/grading/analysis')} className="w-full h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft flex items-center justify-center gap-2">
          <Save size={16} /> 完成校正
        </button>
      </div>
    </div>
  );
};

export default B5ManualCorrect;
