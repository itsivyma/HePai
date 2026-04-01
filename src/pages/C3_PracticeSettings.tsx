import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { chapters } from '@/data/mockData';

const C3PracticeSettings = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);
  const [diff, setDiff] = useState('全部');
  const [timer, setTimer] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="練習設定" showBack />
      <div className="px-4 pt-4 space-y-5">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">題數</label>
          <div className="flex gap-2">
            {[5,10,15,20].map(n => (
              <button key={n} onClick={() => setCount(n)} className={`flex-1 py-2 rounded-xl text-sm font-medium ${count===n?'bg-primary text-primary-foreground':'bg-secondary text-muted-foreground'}`}>{n} 題</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">難度</label>
          <div className="flex gap-2">
            {['全部','易','中','難'].map(d => (
              <button key={d} onClick={() => setDiff(d)} className={`flex-1 py-2 rounded-xl text-sm font-medium ${diff===d?'bg-primary text-primary-foreground':'bg-secondary text-muted-foreground'}`}>{d}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">章節</label>
          <div className="flex flex-wrap gap-2">
            {chapters.slice(0,6).map(c => (
              <button key={c.id} className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">{c.name}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
          <span className="text-sm">計時模式</span>
          <button onClick={() => setTimer(!timer)} className={`w-11 h-6 rounded-full transition-all ${timer?'bg-primary':'bg-secondary'}`}>
            <div className={`w-5 h-5 bg-card rounded-full shadow-sm transition-transform ${timer?'translate-x-5':'translate-x-0.5'}`} />
          </button>
        </div>
        <button onClick={() => navigate('/questions/answer')} className="w-full h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">開始練習</button>
      </div>
    </div>
  );
};
export default C3PracticeSettings;
