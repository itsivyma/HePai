import { Camera, Image, FileUp, Zap, Grid3X3, Crop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';

const B2Upload = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-foreground flex flex-col">
      {/* Mock camera preview */}
      <div className="relative flex-1 flex items-center justify-center">
        <div className="absolute top-0 left-0 right-0 z-10">
          <PageHeader title="" showBack right={
            <div className="flex items-center gap-3">
              <button className="p-1.5 text-primary-foreground/70"><Zap size={18} /></button>
              <button className="p-1.5 text-primary-foreground/70"><Grid3X3 size={18} /></button>
              <button className="p-1.5 text-primary-foreground/70"><Crop size={18} /></button>
            </div>
          } />
        </div>
        
        <div className="text-center">
          <div className="w-64 h-80 border-2 border-dashed border-primary-foreground/30 rounded-2xl flex items-center justify-center mx-auto">
            <div className="text-center px-4">
              <Camera size={40} className="text-primary-foreground/40 mx-auto mb-3" />
              <p className="text-sm text-primary-foreground/50">將手寫樂譜對準此區域</p>
              <p className="text-xs text-primary-foreground/30 mt-1">確保四部合聲譜面完整入鏡</p>
              <div className="mt-3 space-y-0.5">
                <p className="text-[10px] text-primary-foreground/25">支援手寫四部和聲作業</p>
                <p className="text-[10px] text-primary-foreground/25">PDF · JPG · PNG</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-strong safe-bottom px-6 py-5">
        <div className="flex items-center justify-around">
          <button onClick={() => navigate('/grading/process')} className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Image size={18} className="text-foreground" />
            </div>
            <span className="text-[10px] text-muted-foreground">相簿</span>
          </button>
          
          <button onClick={() => navigate('/grading/process')} className="w-16 h-16 rounded-full bg-primary-foreground border-4 border-primary shadow-elevated active:scale-95 transition-transform" />
          
          <button onClick={() => navigate('/grading/process')} className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <FileUp size={18} className="text-foreground" />
            </div>
            <span className="text-[10px] text-muted-foreground">檔案</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default B2Upload;
