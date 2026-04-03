import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Search, Filter } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { mcqQuestions } from '@/data/mockData';

const yearFilters = ['全部', '114', '113', '112', '111'];
const topicFilters = ['全部', '音程', '和弦', '功能和聲', '終止式', '聲部進行', '調性', '轉調', '非和絃音'];
const difficultyFilters = ['全部', '易', '中', '難'];

const C2QuestionList = () => {
  const navigate = useNavigate();
  const [activeYear, setActiveYear] = useState('全部');
  const [activeTopic, setActiveTopic] = useState('全部');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="題目清單" showBack right={
        <button onClick={() => setShowFilters(!showFilters)} className="p-1.5">
          <Filter size={18} className={showFilters ? 'text-primary' : 'text-muted-foreground'} />
        </button>
      } />
      <div className="px-4 pt-3 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input placeholder="搜尋題目…" className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {/* Year filters */}
        <div>
          <p className="text-[10px] text-muted-foreground mb-1.5 font-medium">年度</p>
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {yearFilters.map(f => (
              <button key={f} onClick={() => setActiveYear(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${activeYear === f ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>{f === '全部' ? '全部年度' : `${f}學年`}</button>
            ))}
          </div>
        </div>

        {/* Topic filters */}
        <div>
          <p className="text-[10px] text-muted-foreground mb-1.5 font-medium">主題</p>
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {topicFilters.map(f => (
              <button key={f} onClick={() => setActiveTopic(f)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${activeTopic === f ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>{f}</button>
            ))}
          </div>
        </div>

        {/* Extended filters */}
        {showFilters && (
          <div className="flex gap-1.5 flex-wrap">
            {difficultyFilters.map(f => (
              <button key={f} className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">{f === '全部' ? '全部難度' : f}</button>
            ))}
            <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">已收藏</button>
            <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">已作答</button>
            <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground">未作答</button>
          </div>
        )}

        {/* Question list */}
        <div className="space-y-2">
          {mcqQuestions.map(q => (
            <button key={q.id} onClick={() => navigate('/questions/answer')} className="w-full p-3 rounded-xl bg-card border border-border shadow-card text-left active:scale-[0.98] transition-transform">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{q.year}學年 #{q.number}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${q.difficulty === '難' ? 'bg-destructive/8 text-destructive' : q.difficulty === '中' ? 'bg-warning/8 text-warning' : 'bg-success/8 text-success'}`}>{q.difficulty}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground">{q.source}</span>
                </div>
                <Star size={14} className={q.starred ? 'text-warning fill-warning' : 'text-muted-foreground'} />
              </div>
              <p className="text-sm font-medium">{q.stem}</p>
              <p className="text-xs text-muted-foreground mt-1">{q.topic}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default C2QuestionList;
