import { useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, Target, ChevronRight, BarChart3, Calendar, AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { weeklyStats, recentWorks, practiceRecords, errorStats } from '@/data/mockData';

const D1ReportHome = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="報告" showSearch onSearch={() => navigate('/search')} />
      <div className="px-4 pt-4 space-y-5">
        {/* Dashboard cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <TrendingUp size={16} className="text-primary mx-auto mb-1" />
            <p className="text-xl font-display font-bold">{weeklyStats.accuracy}%</p>
            <p className="text-[10px] text-muted-foreground">正確率</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <Clock size={16} className="text-accent mx-auto mb-1" />
            <p className="text-xl font-display font-bold">{weeklyStats.avgTime}</p>
            <p className="text-[10px] text-muted-foreground">平均耗時</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <Target size={16} className="text-success mx-auto mb-1" />
            <p className="text-xl font-display font-bold">{weeklyStats.completed}</p>
            <p className="text-[10px] text-muted-foreground">完成題數</p>
          </div>
        </div>

        {/* Mini trend */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">本週趨勢</h3>
            <button onClick={() => navigate('/reports/trends')} className="text-xs text-primary">詳細</button>
          </div>
          <div className="flex items-end gap-2 h-20">
            {weeklyStats.trendData.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-primary/15 rounded-t" style={{ height: `${d.score * 0.8}%` }}>
                  <div className="w-full bg-primary rounded-t" style={{ height: `${d.score}%` }} />
                </div>
                <span className="text-[9px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak points */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">弱點分布</h3>
            <button onClick={() => navigate('/reports/errors')} className="text-xs text-primary">詳細</button>
          </div>
          {errorStats.categories.slice(0, 3).map(c => (
            <div key={c.name} className="flex items-center gap-3 py-2">
              <span className="text-sm w-20 shrink-0">{c.name}</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-destructive/60 rounded-full" style={{ width: `${c.percentage}%` }} />
              </div>
              <span className="text-xs text-muted-foreground w-10 text-right">{c.percentage}%</span>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="space-y-2">
          {[
            { icon: BarChart3, label: '錯誤分類統計', path: '/reports/errors' },
            { icon: TrendingUp, label: '趨勢分析', path: '/reports/trends' },
            { icon: Calendar, label: '週報', path: '/reports/weekly' },
            { icon: Target, label: '目標與提醒', path: '/reports/goals' },
          ].map(item => (
            <button key={item.path} onClick={() => navigate(item.path)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card text-left">
              <item.icon size={18} className="text-primary" />
              <span className="text-sm font-medium flex-1">{item.label}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default D1ReportHome;
