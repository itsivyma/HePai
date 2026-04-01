import { Camera, Upload, Lightbulb, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recentWorks } from '@/data/mockData';
import PageHeader from '@/components/shared/PageHeader';

const B1GradingHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="批改" showSearch onSearch={() => navigate('/search')} />
      <div className="px-4 pt-4 space-y-5">
        {/* Primary CTA */}
        <button
          onClick={() => navigate('/grading/upload')}
          className="w-full py-5 bg-primary text-primary-foreground rounded-2xl flex flex-col items-center gap-2 shadow-soft active:scale-[0.98] transition-transform"
        >
          <Camera size={28} />
          <span className="text-base font-semibold">拍照批改</span>
          <span className="text-xs opacity-80">拍攝或選擇你的和聲作業</span>
        </button>

        <button
          onClick={() => navigate('/grading/upload')}
          className="w-full py-3.5 bg-card border border-border text-foreground rounded-2xl flex items-center justify-center gap-2 shadow-card active:scale-[0.98] transition-transform"
        >
          <Upload size={18} />
          <span className="text-sm font-medium">上傳檔案</span>
        </button>

        {/* Tips */}
        <div className="p-4 rounded-2xl bg-accent/8 border border-accent/15">
          <div className="flex items-start gap-3">
            <Lightbulb size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">拍攝小技巧</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• 確保光線均勻，避免陰影遮擋譜面</li>
                <li>• 將譜面平整放置，鏡頭正對拍攝</li>
                <li>• 確認所有小節完整入鏡</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent works */}
        {recentWorks.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold">最近作品</h2>
              <button onClick={() => navigate('/grading/library')} className="text-xs text-primary">查看全部</button>
            </div>
            <div className="space-y-2">
              {recentWorks.map(w => (
                <button key={w.id} onClick={() => navigate(`/grading/work/${w.id}`)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card text-left">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg">{w.thumbnail}</div>
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
        ) : (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-3">
              <Camera size={24} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">還沒有批改作品</p>
            <p className="text-xs text-muted-foreground mt-1">拍照或上傳你的第一份和聲作業吧</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default B1GradingHome;
