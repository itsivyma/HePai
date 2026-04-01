import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';

const E2Preferences = () => {
  const [density, setDensity] = useState('標準');
  const [hintLevel, setHintLevel] = useState('中');
  const [notify, setNotify] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="偏好設定" showBack />
      <div className="px-4 pt-4 space-y-5">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">顯示密度</label>
          <div className="flex gap-2">
            {['緊湊', '標準', '寬鬆'].map(d => (
              <button key={d} onClick={() => setDensity(d)} className={`flex-1 py-2 rounded-xl text-sm font-medium ${density === d ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{d}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">提示程度</label>
          <div className="flex gap-2">
            {['簡略', '中', '詳細'].map(h => (
              <button key={h} onClick={() => setHintLevel(h)} className={`flex-1 py-2 rounded-xl text-sm font-medium ${hintLevel === h ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{h}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
          <span className="text-sm">推播通知</span>
          <button onClick={() => setNotify(!notify)} className={`w-11 h-6 rounded-full transition-all ${notify ? 'bg-primary' : 'bg-secondary'}`}>
            <div className={`w-5 h-5 bg-card rounded-full shadow-sm transition-transform ${notify ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default E2Preferences;
