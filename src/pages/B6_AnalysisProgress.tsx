import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

const steps = [
  { label: '辨識', desc: '解析譜面元素…' },
  { label: '調性 / 功能', desc: '分析調性與和聲功能…' },
  { label: '規則檢核', desc: '對照和聲規則…' },
  { label: '生成回饋', desc: '整理分析結果…' },
];

const B6AnalysisProgress = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => navigate('/grading/feedback'), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center px-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-8 w-full max-w-xs"
      >
        <div className="relative">
          <Loader2 size={48} className="text-primary animate-spin" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-display font-semibold mb-1">分析中</h2>
          <p className="text-sm text-muted-foreground">正在為你的作品進行和聲分析</p>
        </div>

        <div className="w-full space-y-3">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-all duration-500 ${
                i < currentStep ? 'bg-success text-success-foreground' :
                i === currentStep ? 'bg-primary text-primary-foreground animate-pulse-soft' :
                'bg-secondary text-muted-foreground'
              }`}>
                {i < currentStep ? '✓' : i + 1}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${i <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                {i === currentStep && <p className="text-xs text-muted-foreground">{s.desc}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={() => navigate(-1)} className="px-4 py-2 text-xs text-muted-foreground">取消</button>
          <button className="px-4 py-2 text-xs text-muted-foreground flex items-center gap-1">
            <AlertCircle size={12} /> 回報問題
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default B6AnalysisProgress;
