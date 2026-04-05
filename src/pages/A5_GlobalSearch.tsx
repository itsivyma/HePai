import { useState } from 'react';
import { Search, Clock } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { useNavigate } from 'react-router-dom';

const tabs = ['作品', '題目', '規則'];
const recentSearches = ['平行五度', '終止式', '導音解決', '屬七和弦'];

const A5GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="搜尋" showBack />
      <div className="px-4 pt-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="搜尋作品、題目、規則…"
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            autoFocus
          />
        </div>

        <div className="flex gap-2 mt-3">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === i ? 'liquid-glass bg-primary/10 text-primary border-primary/20' : 'bg-secondary text-muted-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {!query && (
          <div className="mt-6">
            <h3 className="text-xs font-medium text-muted-foreground mb-3">最近搜尋</h3>
            {recentSearches.map(s => (
              <button key={s} onClick={() => setQuery(s)} className="flex items-center gap-3 w-full py-2.5 text-left">
                <Clock size={14} className="text-muted-foreground" />
                <span className="text-sm">{s}</span>
              </button>
            ))}
          </div>
        )}

        {query && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground">搜尋結果（模擬）</p>
            {['平行五度進行規則', '平行五度練習題組', '作品中的平行五度標記'].map((r, i) => (
              <div key={i} className="p-3 rounded-xl bg-card border border-border">
                <p className="text-sm font-medium">{r}</p>
                <p className="text-xs text-muted-foreground mt-0.5">相關{tabs[activeTab]}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default A5GlobalSearch;
