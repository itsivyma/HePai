import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
  onSearch?: () => void;
  right?: React.ReactNode;
}

const PageHeader = ({ title, showBack = false, showSearch, onSearch, right }: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between h-12 px-4">
        <div className="flex items-center gap-2 min-w-0">
          {showBack && (
            <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-foreground">
              <ChevronLeft size={22} />
            </button>
          )}
          <h1 className="text-base font-semibold truncate">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <button onClick={onSearch} className="p-1.5 text-muted-foreground">
              <Search size={20} />
            </button>
          )}
          {right}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
