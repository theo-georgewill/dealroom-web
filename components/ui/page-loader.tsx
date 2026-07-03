import { LoadingSpinner } from './loading-spinner';

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="text-center">
        <LoadingSpinner size={48} className="mx-auto mb-4 text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
