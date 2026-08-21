'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  FileText,
  CheckSquare,
  FolderOpen,
  Users,
  LayoutTemplate,
  BarChart3,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const NAVIGATION_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Deals', href: '/deals', icon: FileText },
  { label: 'Tasks', href: '/tasks', icon: CheckSquare, badge: 6 },
  { label: 'Documents', href: '/documents', icon: FolderOpen },
  { label: 'Parties', href: '/parties', icon: Users },
  { label: 'Templates', href: '/templates', icon: LayoutTemplate },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Notifications', href: '/notifications', icon: Bell, badge: 3 },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Help & Support', href: '/help', icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, isLoading, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      setIsOpen(false);

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
    <>
      {/* Mobile Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-gray-100 rounded-lg"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-white border-r border-border flex flex-col transition-all duration-300 z-30 md:z-0',
          'md:static md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-40 overflow-hidden">
              <img
                src="/logo.png"
                alt="DealRoom"
                className="h-full scale-[3] origin-left"
              />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
                    active
                      ? 'bg-blue-50 text-primary'
                      : 'text-foreground hover:bg-slate-100'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="font-medium text-sm">
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <span className="bg-primary text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}