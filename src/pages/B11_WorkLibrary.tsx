import { useState } from 'react';
import { Search, AlertCircle, Filter, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { chapters } from '@/data/mockData';
import { getMergedRecentWorks } from '@/lib/grading-demo';

const chapterFilters = ['全部', ...chapters.slice(0, 6).map(c => c.name)];

const B11WorkLibrary = () => {
  const navigate = useNavigate();
  const [activeChapter, setActiveChapter] = useState('全部');
  const [showFilters, setShowFilters] = useState(false);
  const recentWorks = getMergedRecentWorks();

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="作品庫" showBack right={
        <button onClick={() => setShowFilters(!showFilters)} className="p-1.5">
          <Filter size={18} className={showFilters ? 'text-primary' : 'text-muted-foreground'} />
        </button>
      } />
      <div className="px-4 pt-3 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="搜尋作品…" className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {/* Chapter filter chips */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-4 px-4">
          {chapterFilters.map(f => (
            <button key={f} onClick={() => setActiveChapter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                activeChapter === f ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Extended filters */}
        {showFilters && (
          <div className="flex gap-1.5 flex-wrap">
            <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">有嚴重錯誤</button>
            <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">最近一週</button>
            <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">最近一月</button>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 px-1">
          <p className="text-xs text-muted-foreground">共 {recentWorks.length} 份作品</p>
        </div>

        {/* Work list */}
        <div className="space-y-2">
          {recentWorks.map(w => (
            <button key={w.id} onClick={() => navigate(`/grading/work/${w.id}`)}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-card border border-border shadow-card text-left active:scale-[0.98] transition-transform">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <Music size={20} className="text-muted-foreground" />
              </div>
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
