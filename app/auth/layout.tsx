import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Authentication - DealRoom',
  description: 'Sign in to your DealRoom account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[55%_45%]">
      {/* Hero */}
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/auth-hero.png"
          alt="DealRoom"
          fill
          priority
          sizes="10vw"
          className="object-cover object-top"
        />
      </div>

      {/* Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}