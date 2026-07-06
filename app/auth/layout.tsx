import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AuthProvider } from '@/lib/context/auth-context';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} light`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-white border-r border-border">
              {/* Top Section */}
              <div>
                {/* Logo */}
                <div className="flex items-center gap-3 mb-16">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                    <span className="text-lg font-bold text-primary-foreground">DR</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">Deal Room</span>
                </div>

                {/* Main Headline */}
                <div className="mb-12">
                  <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">
                    Manage real estate deals with confidence
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Securely manage buyers, sellers, documents, escrow and transactions from one place.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="space-y-4">
                  {/* Feature 1 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.338 5.59a.75.75 0 1 0-1.5.118l.5 4.993a2 2 0 0 0 1.986 1.99h1.272a.75.75 0 0 0 .75-.75V8.5a.75.75 0 0 0-.75-.75h-.269l-.26-2.603a2 2 0 0 0-1.977-1.707zm5.362 13.362a.75.75 0 0 0 .75-1.591l-3.75-3.75a.75.75 0 1 0-1.061 1.061l3.75 3.75a.75.75 0 0 0 1.061 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">Secure & Protected</p>
                      <p className="text-sm text-muted-foreground">Bank-grade escrow powered by Nomba.</p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM9 11a6 6 0 11-12 0 6 6 0 0112 0zm-1.5-8.5a1 1 0 10-2 0 1 1 0 002 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">Collaborate Easily</p>
                      <p className="text-sm text-muted-foreground">Invite buyers, sellers, lawyers and agents.</p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">Track Everything</p>
                      <p className="text-sm text-muted-foreground">Monitor transactions in real time.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Image */}
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1494145904049-0dca59b4d756?w=500&h=300&fit=crop"
                  alt="Modern real estate"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <p className="text-xs text-muted-foreground mt-4">© 2024 Deal Room Solutions Ltd. All rights reserved.</p>
              </div>
            </div>

            {/* Right Panel - Auth Form */}
            <div className="flex flex-col justify-center p-6 lg:p-12 bg-background">
              <div className="w-full max-w-sm mx-auto">
                {children}
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
