import { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import { weeklyStats } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data30 = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, score: 55 + Math.round(Math.random() * 30 + (i * 0.5)) }));

const D3TrendAnalysis = () => {
  const [range, setRange] = useState<'7' | '30'>('7');
  const chartData = range === '7' ? weeklyStats.trendData.map((d, i) => ({ day: d.day, score: d.score })) : data30;

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="趨勢分析" showBack />
      <div className="px-4 pt-4 space-y-4">
        <div className="flex gap-2">
          {(['7', '30'] as const).map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-4 py-1.5 rounded-full text-xs font-medium ${range === r ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
              {r} 天
            </button>
          ))}
        </div>
        <div className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="text-sm font-semibold mb-3">正確率趨勢</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(215 12% 50%)" />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="hsl(215 12% 50%)" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="hsl(192 72% 42%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-xl bg-success/5 border border-success/10 text-center">
            <p className="text-sm font-semibold text-success">📈 進步</p>
            <p className="text-xs text-muted-foreground mt-1">聲部進行正確率提升 12%</p>
          </div>
          <div className="p-3 rounded-xl bg-warning/5 border border-warning/10 text-center">
            <p className="text-sm font-semibold text-warning">⚠️ 停滯</p>
            <p className="text-xs text-muted-foreground mt-1">解決規則正確率持平</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default D3TrendAnalysis;
