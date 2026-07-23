'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Activity, TrendingUp, DollarSign } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Deal, dealsService } from '@/lib/services/deals.service';
import { useQuery } from '@tanstack/react-query';


export function formatCompactCurrency(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000_000) {
    return `₦${(value / 1_000_000_000_000).toFixed(1)}T`;
  }
  if (abs >= 1_000_000_000) {
    return `₦${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (abs >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    return `₦${(value / 1_000).toFixed(1)}K`;
  }
  return `₦${value.toLocaleString()}`;
}

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
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{label}</p>
        <p className="text-xl lg:text-2xl font-bold leading-tight break-all">{value}</p>
        {subtext && <p className="text-xs text-slate-500 mt-2">{subtext}</p>}
      </div>
      <div className="p-2 bg-blue-50 rounded-lg text-primary flex-shrink-0">{Icon}</div>
    </div>
  );

  const baseClass = "bg-white border border-slate-200 rounded-2xl p-5 transition-all";

  if (href) {
    return (
      <Link href={href}>
        <div className={`${baseClass} hover:shadow-sm hover:border-slate-300 cursor-pointer`}>
          {content}
        </div>
      </Link>
    );
  }

  return (
    <div className={baseClass}>
      {content}
    </div>
  );
}

function RecentActivityCard({
  deal,
}: {
  deal: Deal
}) {
  const statusColors: Record<string, string> = {
    'In Progress': 'bg-blue-50 text-blue-700',
    'Due Diligence': 'bg-amber-50 text-amber-700',
    'Document Review': 'bg-purple-50 text-purple-700',
    'On Hold': 'bg-slate-50 text-slate-700',
    Closed: 'bg-green-50 text-green-700',
    Cancelled: 'bg-red-50 text-red-700',
    Terminated: 'bg-red-50 text-red-700',
  };

  return (
    <Link href={`/deals/${deal.id}`}>
      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-all cursor-pointer group">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={deal.property.images[0]?.key}
              alt={deal.property.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium text-foreground text-sm">{deal.property.name}</p>
              <p className="text-xs text-slate-500">{deal.property.address}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-foreground text-sm">{formatCurrency(deal.terms.dealValue, 'NGN')}</p>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${statusColors[deal.status] || 'bg-slate-50 text-slate-700'}`}>
            {deal.progress}% complete
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
    
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['deals'],
    queryFn: () => dealsService.listDeals({ limit: 100 }),
  });

  const deals = response?.data ?? [];
  const meta = response?.meta;

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (error) {
    return <div>Failed to load dashboard.</div>;
  }

  const activeDeals = deals.filter((deal) =>
    [
      'PENDING_PARTICIPANTS',
      'PENDING_FUNDING',
      'FUNDED',
      'DUE_DILIGENCE',
      'RELEASE_REQUESTED',
      'DISPUTED',
    ].includes(deal.status)
  );

  const activeDeal = activeDeals[0] ?? null;

  const metrics = {
    totalDealValue: deals.reduce(
      (sum, deal) => sum + Number(deal.terms.dealValue),
      0
    ),
    totalDeals: deals.length,
    activeDeals: activeDeals.length,
    closingThisMonth: deals.filter((deal) => {
      const closing = new Date(deal.terms.closingDate);
      const now = new Date();

      return (
        closing.getMonth() === now.getMonth() &&
        closing.getFullYear() === now.getFullYear()
      );
    }).length,
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-slate-600 text-sm mt-1">Welcome back! Here&apos;s your transaction overview.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={<DollarSign size={24} />}
          label="Total Deal Value"
          value={formatCompactCurrency(metrics.totalDealValue)}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Featured Deal */}
          {activeDeal && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-sm transition-all">
              <Link href={`/deals/${activeDeal.id}`}>
                <div className="grid grid-cols-3 gap-4 p-5">
                  <img
                    src={activeDeal.property.images[0]?.key}
                    alt={activeDeal.property.name}
                    className="col-span-1 rounded-xl h-32 object-cover"
                  />
                  <div className="col-span-2">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{activeDeal.property.name}</h3>
                        <p className="text-xs text-slate-500">{activeDeal.property.address}</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap">
                        {activeDeal.progress}%
                      </span>
                    </div>
                    <div className="space-y-2 text-xs mb-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Deal Value</span>
                        <span className="font-semibold text-foreground">{formatCurrency(activeDeal.terms.dealValue, 'NGN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Closing</span>
                        <span className="font-semibold text-foreground">{formatDate(activeDeal.terms.closingDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Parties</span>
                        <span className="font-semibold text-foreground">{activeDeal.participants.length}</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
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
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-foreground">Active Deals</h2>
              <Link href="/deals" className="text-primary text-xs font-semibold hover:underline">
                View all →
              </Link>
            </div>
            <div className="space-y-2">
              {activeDeals.map((deal) => (
                <RecentActivityCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Escrow Overview */}
          {activeDeal && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-foreground mb-3">Escrow Overview</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-600 mb-1 font-medium">Balance</p>
                  <p className="text-xl font-bold text-primary">{formatCurrency(activeDeal.escrow.amount, 'NGN')}</p>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-600 mb-1.5 font-medium">Provider</p>
                  <p className="text-sm font-semibold text-foreground">Nomba</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 mb-1.5 font-medium">Status</p>
                  <span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                    Funded
                  </span>
                </div>
                <button className="w-full mt-2 px-3 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-xs">
                  View Details
                </button>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-foreground mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-600 mb-1 font-medium">Documents</p>
                <p className="text-xl font-bold text-foreground">0</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1 font-medium">Tasks</p>
                <p className="text-xl font-bold text-foreground">
                  0
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1 font-medium">Participants</p>
                <p className="text-xl font-bold text-foreground">{activeDeal?.participants.length || 0}</p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex gap-2">
              <div className="text-green-600 flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-green-900">Secure & Protected</p>
                <p className="text-xs text-green-700 mt-0.5">Bank-grade security with Nomba escrow.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
