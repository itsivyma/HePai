import { useState } from 'react';
import { Target, Flame, Bell } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const D5GoalsReminders = () => {
  const [dailyGoal, setDailyGoal] = useState(10);
  const [reminder, setReminder] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="目標與提醒" showBack />
      <div className="px-4 pt-4 space-y-5">
        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
          <Flame size={24} className="text-warning mx-auto mb-2" />
          <p className="text-2xl font-display font-bold">5 天</p>
          <p className="text-xs text-muted-foreground">連續學習紀錄</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3"><Target size={16} className="text-primary" /><span className="text-sm font-semibold">每日題數目標</span></div>
          <div className="flex gap-2">
            {[5, 10, 15, 20].map(n => (
              <button key={n} onClick={() => setDailyGoal(n)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${dailyGoal === n ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{n} 題</button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border shadow-card">
          <div className="flex items-center gap-3"><Bell size={18} className="text-primary" /><div><p className="text-sm font-medium">學習提醒</p><p className="text-xs text-muted-foreground">每日 20:00 提醒練習</p></div></div>
          <button onClick={() => setReminder(!reminder)} className={`w-11 h-6 rounded-full transition-all ${reminder ? 'bg-primary' : 'bg-secondary'}`}>
            <div className={`w-5 h-5 bg-card rounded-full shadow-sm transition-transform ${reminder ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center">持續每天練習，養成穩定的學習節奏 💪</p>
      </div>
    </div>
  );
};
export default D5GoalsReminders;
