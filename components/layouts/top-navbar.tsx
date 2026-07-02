'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { MOCK_USERS } from '@/lib/data';

export function TopNavbar() {
  const currentUser = MOCK_USERS.theodore;
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 py-2.5 lg:px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search deals, documents, people..."
              className="w-full pl-10 pr-12 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">⌘K</span>
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
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 hover:bg-secondary rounded-lg px-2 py-1 transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full"
              />
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>

            {/* Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-2">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  Settings
                </Link>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors border-t border-border mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
