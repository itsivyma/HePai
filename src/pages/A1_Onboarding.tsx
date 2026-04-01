import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ScanSearch, AlertTriangle, BookOpen } from 'lucide-react';

const steps = [
  { icon: Camera, title: '拍攝或上傳譜面', desc: '用相機拍攝你的和聲作業，或從相簿、檔案中選擇已有的譜面影像。' },
  { icon: ScanSearch, title: '系統辨識與分析', desc: '智慧辨識譜面音符，自動進行和聲規則檢核，找出潛在錯誤。' },
  { icon: AlertTriangle, title: '標示錯誤並解釋原因', desc: '在譜面上清楚標記每個錯誤位置，並提供規則條文與修正建議。' },
  { icon: BookOpen, title: '題庫與報告持續學習', desc: '錯誤連動題庫練習，學習報告追蹤進步，持續精進和聲能力。' },
];

const A1Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [current, setCurrent] = useState(0);
  const isLast = current === steps.length - 1;

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
              {(() => { const Icon = steps[current].icon; return <Icon size={40} className="text-primary" />; })()}
            </div>
            <h2 className="text-xl font-display font-semibold text-foreground">{steps[current].title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{steps[current].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-6 pb-12 px-8">
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-primary' : 'w-1.5 bg-border'}`} />
          ))}
        </div>
        <div className="flex items-center justify-between w-full">
          <button onClick={onComplete} className="text-sm text-muted-foreground px-4 py-2">跳過</button>
          <button
            onClick={() => isLast ? onComplete() : setCurrent(c => c + 1)}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft"
          >
            {isLast ? '開始使用' : '下一步'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default A1Onboarding;
