import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/context/auth-context';

export const metadata: Metadata = {
  title: 'Authentication - Deal Room',
  description: 'Sign in to your Deal Room account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}