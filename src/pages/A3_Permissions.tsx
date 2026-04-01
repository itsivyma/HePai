import { Camera, Image, FolderOpen, Check } from 'lucide-react';
import { useState } from 'react';

const permissions = [
  { icon: Camera, name: '相機', desc: '拍攝和聲作業與譜面', key: 'camera' },
  { icon: Image, name: '相簿', desc: '從相簿選取已有的譜面圖片', key: 'photos' },
  { icon: FolderOpen, name: '檔案', desc: '上傳 PDF 或影像檔案', key: 'files' },
];

const A3Permissions = ({ onComplete }: { onComplete: () => void }) => {
  const [granted, setGranted] = useState<Record<string, boolean>>({});
  const allGranted = permissions.every(p => granted[p.key]);

  return (
    <div className="fixed inset-0 flex flex-col bg-background px-6 pt-16 pb-8">
      <h1 className="text-xl font-display font-semibold text-center mb-2">權限設定</h1>
      <p className="text-sm text-muted-foreground text-center mb-8">HePai 需要以下權限來提供完整功能</p>

      <div className="flex flex-col gap-3 flex-1">
        {permissions.map(p => {
          const isGranted = granted[p.key];
          return (
            <div key={p.key} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-card">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <p.icon size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.desc}</div>
              </div>
              <button
                onClick={() => setGranted(g => ({ ...g, [p.key]: true }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isGranted ? 'bg-success/10 text-success' : 'bg-primary text-primary-foreground'
                }`}
              >
                {isGranted ? <Check size={14} /> : '允許'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button onClick={onComplete} className="w-full h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium shadow-soft">
          {allGranted ? '完成設定' : '稍後再說'}
        </button>
        {!allGranted && (
          <p className="text-xs text-muted-foreground text-center">未授權的功能將在使用時再次提示</p>
        )}
      </div>
    </div>
  );
};

export default A3Permissions;
