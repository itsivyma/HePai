import PageHeader from '@/components/shared/PageHeader';
import { practiceRecords } from '@/data/mockData';

const C10PracticeHistory = () => (
  <div className="min-h-screen bg-background pb-24">
    <PageHeader title="練習紀錄" showBack />
    <div className="px-4 pt-4 space-y-2">
      {practiceRecords.map(r => (
        <div key={r.id} className="p-3 rounded-xl bg-card border border-border shadow-card">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">{r.chapter}</span>
            <span className="text-xs text-muted-foreground">{r.date}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>正確率 <strong className="text-foreground">{r.score}%</strong></span>
            <span>{r.total} 題</span>
            <span>{r.time}</span>
            <span className="px-1.5 py-0.5 rounded bg-secondary">{r.source}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default C10PracticeHistory;
