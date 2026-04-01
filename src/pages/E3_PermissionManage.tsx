import { Camera, Image, FolderOpen, CheckCircle, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

const permissions = [
  { icon: Camera, name: '相機', granted: true },
  { icon: Image, name: '相簿', granted: true },
  { icon: FolderOpen, name: '檔案', granted: false },
];

const E3PermissionManage = () => (
  <div className="min-h-screen bg-background pb-24">
    <PageHeader title="權限管理" showBack />
    <div className="px-4 pt-4 space-y-3">
      {permissions.map(p => (
        <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border shadow-card">
          <p.icon size={18} className="text-muted-foreground" />
          <span className="text-sm flex-1">{p.name}</span>
          {p.granted ? (
            <span className="flex items-center gap-1 text-xs text-success"><CheckCircle size={12} /> 已授權</span>
          ) : (
            <span className="text-xs text-muted-foreground">未授權</span>
          )}
        </div>
      ))}
      <button className="w-full flex items-center justify-center gap-2 py-3 text-sm text-primary font-medium">
        <ExternalLink size={14} /> 前往系統設定
      </button>
    </div>
  </div>
);
export default E3PermissionManage;
