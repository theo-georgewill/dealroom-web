import React from 'react';
import { MOCK_DEALS, MOCK_NOTIFICATIONS, getDashboardMetrics } from '@/lib/data';
import Link from 'next/link';
import { ArrowUpRight, Activity, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Dashboard - Deal Room',
  description: 'View your real estate transaction metrics and activity',
};

function MetricCard({
  icon: Icon,
  label,
  value,
  subtext,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {subtext && <p className="text-xs text-muted-foreground mt-2">{subtext}</p>}
      </div>
      <div className="p-2 bg-primary/10 rounded-lg text-primary">{Icon}</div>
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        <div className="bg-white border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer">
          {content}
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white border border-border rounded-lg p-4">
      {content}
    </div>
  );
}

function RecentActivityCard({
  deal,
}: {
  deal: (typeof MOCK_DEALS)[0];
}) {
  const statusColors: Record<string, string> = {
    'In Progress': 'bg-blue-100 text-blue-700',
    'Due Diligence': 'bg-yellow-100 text-yellow-700',
    'Document Review': 'bg-purple-100 text-purple-700',
    'On Hold': 'bg-gray-100 text-gray-700',
    Closed: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
    Terminated: 'bg-red-100 text-red-700',
  };

  return (
    <Link href={`/deals/${deal.id}`}>
      <div className="flex items-center justify-between p-4 bg-white border border-border rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={deal.property.images[0]}
              alt={deal.property.name}
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <p className="font-medium text-foreground text-sm">{deal.name}</p>
              <p className="text-xs text-muted-foreground">{deal.property.address}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-foreground text-sm">{formatCurrency(deal.dealValue, 'NGN')}</p>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${statusColors[deal.status] || 'bg-gray-100 text-gray-700'}`}>
            {deal.progress}% complete
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  const metrics = getDashboardMetrics();
  const activeDeal = MOCK_DEALS[0];
  const upcomingDeals = MOCK_DEALS.filter(d => ['In Progress', 'Due Diligence'].includes(d.status)).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s your transaction overview.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<DollarSign size={24} />}
          label="Total Deal Value"
          value={formatCurrency(metrics.totalDealValue, 'NGN')}
          subtext="All time"
          href="/deals"
        />
        <MetricCard
          icon={<TrendingUp size={24} />}
          label="Total Deals"
          value={metrics.totalDeals}
          subtext="All time"
          href="/deals"
        />
        <MetricCard
          icon={<Activity size={24} />}
          label="Active Deals"
          value={metrics.activeDeals}
          subtext="In progress"
          href="/deals?status=In+Progress"
        />
        <MetricCard
          icon={<ArrowUpRight size={24} />}
          label="Closing This Month"
          value={metrics.closingThisMonth}
          subtext="Expected closings"
          href="/deals"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Featured Deal */}
          {activeDeal && (
            <div className="bg-white border border-border rounded-lg overflow-hidden hover:border-primary transition-all">
              <Link href={`/deals/${activeDeal.id}`}>
                <div className="grid grid-cols-3 gap-4 p-6">
                  <img
                    src={activeDeal.property.images[0]}
                    alt={activeDeal.name}
                    className="col-span-1 rounded-lg h-40 object-cover"
                  />
                  <div className="col-span-2">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{activeDeal.name}</h3>
                        <p className="text-sm text-muted-foreground">{activeDeal.property.address}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {activeDeal.progress}% Complete
                      </span>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deal Value</span>
                        <span className="font-semibold text-foreground">{formatCurrency(activeDeal.dealValue, 'NGN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Closing Date</span>
                        <span className="font-semibold text-foreground">{formatDate(activeDeal.closingDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Parties Involved</span>
                        <span className="font-semibold text-foreground">{activeDeal.parties.length} parties</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${activeDeal.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Recent Deals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Active Deals</h2>
              <Link href="/deals" className="text-primary text-sm font-medium hover:underline">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingDeals.map((deal) => (
                <RecentActivityCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Escrow Overview */}
          {activeDeal && (
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-4">Escrow Overview</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Balance</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(activeDeal.escrow.amount, 'NGN')}</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Provider</p>
                  <p className="font-semibold text-foreground">{activeDeal.escrow.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Funded
                  </span>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
                  View Escrow Details
                </button>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white border border-border rounded-lg p-6">
            <h3 className="font-bold text-foreground mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Documents</p>
                <p className="text-2xl font-bold text-foreground">{activeDeal?.documents.length || 0}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Tasks Assigned</p>
                <p className="text-2xl font-bold text-foreground">
                  {activeDeal?.checklists.reduce((sum, c) => sum + c.items.length, 0) || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Participants</p>
                <p className="text-2xl font-bold text-foreground">{activeDeal?.parties.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="text-green-600 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-900">Secure & Protected</p>
                <p className="text-xs text-green-700 mt-1">This deal room is protected with bank-grade security and escrow by Nomba.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
