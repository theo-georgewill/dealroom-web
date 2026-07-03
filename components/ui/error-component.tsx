import { AlertCircle } from 'lucide-react';
import { Button } from './button';

interface ErrorComponentProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorComponent({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorComponentProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <AlertCircle size={48} className="mx-auto mb-4 text-destructive" />
        <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground mb-6">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
