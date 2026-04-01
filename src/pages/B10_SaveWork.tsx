import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { chapters } from '@/data/mockData';

const B10SaveWork = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [difficulty, setDifficulty] = useState('中');

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="儲存作品" showBack />
      <div className="px-4 pt-4 space-y-4">
        {!title && (
          <div className="p-3 rounded-xl bg-warning/8 border border-warning/15">
            <p className="text-xs text-warning">尚未輸入標題，建議為作品命名以便日後查找。</p>
          </div>
        )}

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">作品標題</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="例：和聲習題 Ch.5" className="w-full h-11 px-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">章節標記</label>
          <div className="flex flex-wrap gap-2">
            {chapters.slice(0, 6).map(c => (
              <button key={c.id} onClick={() => setSelectedChapter(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedChapter === c.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">難度</label>
          <div className="flex gap-2">
            {['易', '中', '難'].map(d => (
              <button key={d} onClick={() => setDifficulty(d)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium ${difficulty === d ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">備註</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="可選填" rows={3}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
        </div>

        <button onClick={() => navigate('/grading/library')} className="w-full h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft flex items-center justify-center gap-2">
          <Save size={16} /> 儲存作品
        </button>
      </div>
    </div>
  );
};

export default B10SaveWork;
