import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const A2Login = ({ onComplete }: { onComplete: () => void }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col bg-background px-8 pt-20 pb-8">
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-soft">
          <span className="text-xl font-display font-bold text-primary-foreground">合</span>
        </div>
        <h1 className="text-xl font-display font-semibold">{isRegister ? '建立帳號' : '歡迎回來'}</h1>
        <p className="text-sm text-muted-foreground">{isRegister ? '註冊以開始使用 HePai' : '登入你的 HePai 帳號'}</p>
      </div>

      <div className="flex flex-col gap-4">
        {isRegister && (
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">姓名</label>
            <input className="w-full h-11 px-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="你的名字" />
          </div>
        )}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">電子郵件</label>
          <input type="email" className="w-full h-11 px-4 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="your@email.com" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">密碼</label>
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} className="w-full h-11 px-4 pr-10 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="••••••••" />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button onClick={onComplete} className="w-full h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft mt-2">
          {isRegister ? '註冊' : '登入'}
        </button>
      </div>

      <div className="mt-6 text-center">
        <button onClick={() => setIsRegister(!isRegister)} className="text-sm text-primary">
          {isRegister ? '已有帳號？登入' : '還沒有帳號？註冊'}
        </button>
      </div>
    </div>
  );
};

export default A2Login;
