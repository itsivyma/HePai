import { Search, AlertCircle, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { recentWorks } from '@/data/mockData';

const B11WorkLibrary = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="作品庫" showBack right={
        <button className="p-1.5 text-muted-foreground"><Filter size={18} /></button>
      } />
      <div className="px-4 pt-3 space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="搜尋作品…" className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <div className="space-y-2">
          {recentWorks.map(w => (
            <button key={w.id} onClick={() => navigate(`/grading/work/${w.id}`)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card text-left">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-xl">{w.thumbnail}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{w.title}</p>
                <p className="text-xs text-muted-foreground">{w.date} · {w.chapter}</p>
              </div>
              <div className="flex items-center gap-1 text-destructive">
                <AlertCircle size={12} />
                <span className="text-xs font-medium">{w.errorCount}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default B11WorkLibrary;
