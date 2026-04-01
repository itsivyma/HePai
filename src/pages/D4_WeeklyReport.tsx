import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';

const D4WeeklyReport = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="週報" showBack />
      <div className="px-4 pt-4 space-y-4">
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <h2 className="text-base font-display font-semibold mb-1">第 13 週學習報告</h2>
          <p className="text-xs text-muted-foreground">2026/03/24 — 2026/03/30</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <p className="text-xl font-display font-bold">48</p><p className="text-[10px] text-muted-foreground">完成題數</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <p className="text-xl font-display font-bold">73%</p><p className="text-[10px] text-muted-foreground">平均正確率</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <p className="text-xl font-display font-bold">3</p><p className="text-[10px] text-muted-foreground">批改作品</p>
          </div>
          <div className="p-3 rounded-xl bg-card border border-border shadow-card text-center">
            <p className="text-xl font-display font-bold">5</p><p className="text-[10px] text-muted-foreground">連續天數</p>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="text-sm font-semibold mb-2">錯誤分布</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between"><span>聲部進行</span><span>37%</span></div>
            <div className="flex justify-between"><span>解決規則</span><span>25%</span></div>
            <div className="flex justify-between"><span>聲部配置</span><span>17%</span></div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-accent/5 border border-accent/10">
          <h3 className="text-sm font-semibold mb-2">下週建議</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 加強「聲部進行」章節，每日 5 題</li>
            <li>• 複習「導音解決」相關規則</li>
            <li>• 目標：正確率提升至 78%</li>
          </ul>
        </div>
        <button onClick={() => navigate('/questions/settings')} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">開始建議練習</button>
      </div>
    </div>
  );
};
export default D4WeeklyReport;
