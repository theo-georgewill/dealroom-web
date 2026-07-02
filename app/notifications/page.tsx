'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_NOTIFICATIONS } from '@/lib/data';
import { Bell, CheckCheck, Filter } from 'lucide-react';
import { getTimeAgo } from '@/lib/utils';

const NOTIFICATION_CATEGORIES = [
  { value: 'all', label: 'All', count: 11 },
  { value: 'unread', label: 'Unread', count: 3 },
  { value: 'mentions', label: 'Mentions', count: 2 },
  { value: 'tasks', label: 'Tasks', count: 5 },
  { value: 'system', label: 'System', count: 1 },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'all') return MOCK_NOTIFICATIONS;
    if (activeTab === 'unread') return MOCK_NOTIFICATIONS.filter(n => !n.read);
    if (activeTab === 'tasks') return MOCK_NOTIFICATIONS.filter(n => n.type.includes('task'));
    return MOCK_NOTIFICATIONS;
  }, [activeTab]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, (typeof MOCK_NOTIFICATIONS)[0][]> = {};

    filteredNotifications.forEach((notif) => {
      const date = new Date(notif.timestamp);
      const now = new Date();
      let key = '';

      if (date.toDateString() === now.toDateString()) {
        key = 'Today';
      } else {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        if (date.toDateString() === yesterday.toDateString()) {
          key = 'Yesterday';
        } else {
          key = 'Earlier';
        }
      }

      if (!groups[key]) groups[key] = [];
      groups[key].push(notif);
    });

    return groups;
  }, [filteredNotifications]);

  const icons: Record<string, string> = {
    escrow_funded: '🏦',
    document_uploaded: '📄',
    task_completed: '✓',
    task_assigned: '📋',
    stakeholder_added: '👤',
    escrow_released: '💰',
    message: '💬',
    security_alert: '🔒',
    deal_created: '🤝',
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated on important activities across your deals.</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-2">
          <CheckCheck size={18} />
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto pb-4">
        {NOTIFICATION_CATEGORIES.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.value
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 text-xs bg-gray-200 text-gray-700 rounded-full px-2">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-8">
        {Object.entries(groupedByDate).map(([date, notifs]) => (
          <div key={date}>
            {/* Date Header */}
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">{date}</h3>

            {/* Notifications */}
            <div className="space-y-2">
              {notifs.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    notif.read
                      ? 'bg-white border-border hover:border-primary'
                      : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center">
                      {icons[notif.type] || '📢'}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-foreground">{notif.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{notif.description}</p>
                          {notif.relatedDeal && (
                            <p className="text-xs text-primary mt-2">Deal: {notif.relatedDeal.name}</p>
                          )}
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">{getTimeAgo(notif.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
