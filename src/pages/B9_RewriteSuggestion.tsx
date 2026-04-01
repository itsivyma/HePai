import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const B9RewriteSuggestion = () => {
  const [showRevised, setShowRevised] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="改寫建議" showBack />
      <div className="px-4 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">{showRevised ? '修正後' : '原始版本'}</h2>
          <button onClick={() => setShowRevised(!showRevised)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary">
            <ArrowLeftRight size={12} /> 切換對照
          </button>
        </div>

        <div className={`w-full aspect-[4/3] rounded-2xl border shadow-card flex items-center justify-center ${
          showRevised ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'
        }`}>
          <div className="text-center">
            <div className="space-y-3 w-48">
              {[0,1,2,3,4].map(i => (
                <div key={i} className={`h-[1px] ${showRevised ? 'bg-success/30' : 'bg-destructive/30'}`} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">{showRevised ? '修正後譜面預覽' : '原始譜面預覽'}</p>
            {showRevised && (
              <div className="mt-2 px-2 py-1 bg-success/10 rounded text-[10px] text-success inline-block">
                平行五度已修正 → 改為反向進行
              </div>
            )}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="text-sm font-semibold mb-2">修改說明</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            將高音部第 3 小節第 2 拍的 E 改為 G#，使原本的平行五度進行（D→E 對 A→B）變為五度→三度的正確進行。
            同時調整中音部的 C 向上移至 D，保持和弦完整性。
          </p>
        </div>
      </div>
    </div>
  );
};

export default B9RewriteSuggestion;
