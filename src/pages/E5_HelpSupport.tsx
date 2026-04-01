import { HelpCircle, MessageSquare, Bug, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const faqs = [
  { q: '如何拍出清晰的譜面？', a: '確保光線充足、譜面平放、鏡頭正對拍攝。' },
  { q: '分析結果不準確怎麼辦？', a: '可使用手動校正功能調整辨識結果，或重新拍攝更清晰的照片。' },
  { q: '如何查看學習進度？', a: '前往「報告」頁面，即可看到正確率、趨勢與弱點分析。' },
];

const E5HelpSupport = () => (
  <div className="min-h-screen bg-background pb-24">
    <PageHeader title="說明與客服" showBack />
    <div className="px-4 pt-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">常見問題</h3>
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <details key={i} className="rounded-xl bg-card border border-border shadow-card overflow-hidden group">
              <summary className="flex items-center gap-3 p-3 cursor-pointer">
                <HelpCircle size={16} className="text-primary shrink-0" />
                <span className="text-sm font-medium flex-1">{f.q}</span>
                <ChevronRight size={14} className="text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <p className="px-3 pb-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card">
          <MessageSquare size={18} className="text-primary" />
          <span className="text-sm font-medium flex-1 text-left">聯繫客服</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card">
          <Bug size={18} className="text-muted-foreground" />
          <span className="text-sm font-medium flex-1 text-left">回報問題</span>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  </div>
);
export default E5HelpSupport;
