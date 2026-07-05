import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AppSidebar } from '@/components/layouts/app-sidebar';
import { TopNavbar } from '@/components/layouts/top-navbar';
import { AuthProvider } from '@/lib/context/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';
import '../globals.css';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Deal Room - Real Estate Transaction Management',
  description: 'Professional platform for managing real estate transactions securely',
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} light`}>
      <body className="font-sans antialiased bg-slate-50 text-foreground">
        <AuthProvider>
          <ProtectedRoute>
            <div className="flex h-screen overflow-hidden bg-slate-50">
              {/* Sidebar */}
              <AppSidebar />

              {/* Main Content */}
              <div className="flex-1 flex flex-col bg-slate-50">
                {/* Top Navbar */}
                <TopNavbar />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-slate-50">
                  <div className="p-3 md:p-4 lg:p-6">{children}</div>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
