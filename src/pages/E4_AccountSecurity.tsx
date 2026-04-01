import { Mail, Lock, LogOut, Shield } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const E4AccountSecurity = () => (
  <div className="min-h-screen bg-background pb-24">
    <PageHeader title="帳號與安全" showBack />
    <div className="px-4 pt-4 space-y-3">
      <div className="p-3 rounded-xl bg-card border border-border shadow-card flex items-center gap-3">
        <Mail size={18} className="text-muted-foreground" />
        <div className="flex-1"><p className="text-sm font-medium">電子郵件</p><p className="text-xs text-muted-foreground">music_student@example.com</p></div>
      </div>
      <div className="p-3 rounded-xl bg-card border border-border shadow-card flex items-center gap-3">
        <Lock size={18} className="text-muted-foreground" />
        <div className="flex-1"><p className="text-sm font-medium">密碼</p><p className="text-xs text-muted-foreground">上次更新：2026/03/15</p></div>
        <button className="text-xs text-primary">修改</button>
      </div>
      <div className="p-3 rounded-xl bg-card border border-border shadow-card flex items-center gap-3">
        <Shield size={18} className="text-muted-foreground" />
        <div className="flex-1"><p className="text-sm font-medium">帳號安全</p><p className="text-xs text-success">安全狀態良好</p></div>
      </div>
      <button className="w-full mt-8 py-3 rounded-xl border border-destructive/20 text-destructive text-sm font-medium flex items-center justify-center gap-2">
        <LogOut size={16} /> 登出
      </button>
    </div>
  </div>
);
export default E4AccountSecurity;
