'use client';

import Link from 'next/link';
import {
  CheckCircle2,
  FileText,
  UserPlus,
  Wallet,
} from 'lucide-react';

const activities = [
  {
    id: 1,
    icon: FileText,
    color: 'bg-purple-100 text-purple-600',
    title: 'Tunde Lawal uploaded document Title Certificate.pdf',
    time: '2 hours ago',
    category: 'Documents',
  },
  {
    id: 2,
    icon: CheckCircle2,
    color: 'bg-green-100 text-green-600',
    title: 'Inspection report was marked as completed by Chika Obi',
    time: 'Yesterday at 4:32 PM',
    category: 'Checklist',
  },
  {
    id: 3,
    icon: Wallet,
    color: 'bg-amber-100 text-amber-600',
    title: 'David Okafor funded the escrow account',
    time: '7 May 2024 at 11:15 AM',
    category: 'Escrow',
  },
  {
    id: 4,
    icon: UserPlus,
    color: 'bg-blue-100 text-blue-600',
    title: 'Emeka Nwosu was added to the deal',
    time: '3 May 2024 at 9:40 AM',
    category: 'Stakeholders',
  },
];

export function RecentActivityCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Recent Activity
        </h3>

        <Link
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all activity
        </Link>
      </div>

      <div className="divide-y">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-center justify-between py-5 first:pt-0 last:pb-0"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${activity.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-medium text-foreground">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-secondary px-3 py-1 text-sm text-muted-foreground">
                {activity.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}