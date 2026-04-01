import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const A0Splash = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => { setShow(false); setTimeout(onComplete, 500); }, 2200);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shadow-elevated">
              <span className="text-3xl font-display font-bold text-primary-foreground">合</span>
            </div>
            <h1 className="text-2xl font-display font-semibold text-foreground tracking-tight">HePai</h1>
            <p className="text-sm text-muted-foreground">你的和聲學習助手</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default A0Splash;
