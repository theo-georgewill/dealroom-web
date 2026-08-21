'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function TopNavbar() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      setIsProfileOpen(false);

      await logout();

      router.replace('/auth/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : '';

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 py-2.5 lg:px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search deals, documents, people..."
              className="w-full pl-10 pr-12 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
              ⌘K
            </span>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          <Link
            href="/notifications"
            className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Bell size={20} className="text-foreground" />

            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Link>

          {/* User Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              disabled={isLoading || !user}
              className="flex items-center gap-2 hover:bg-secondary rounded-lg px-2 py-1 transition-colors disabled:cursor-not-allowed"
              aria-expanded={isProfileOpen}
              aria-haspopup="menu"
            >
              {isLoading || !user ? (
                <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold">
                    {initials}
                  </div>

                  <ChevronDown
                    size={16}
                    className="text-muted-foreground"
                  />
                </>
              )}
            </button>

            {/* Dropdown */}
            {isProfileOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.firstName} {user.lastName}
                  </p>

                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  My Profile
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  Settings
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors border-t border-border mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}