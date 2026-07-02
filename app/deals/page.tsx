'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_DEALS } from '@/lib/data';
import Link from 'next/link';
import { Plus, Search, Filter, ChevronRight } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { DealStatus } from '@/lib/types';

const TAB_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All Deals' },
  { value: 'my', label: 'My Deals' },
  { value: 'shared', label: 'Shared With Me' },
  { value: 'archived', label: 'Archived' },
];

const STATUS_COLORS: Record<DealStatus, string> = {
  'Draft': 'bg-slate-50 text-slate-700',
  'In Progress': 'bg-blue-50 text-blue-700',
  'Due Diligence': 'bg-amber-50 text-amber-700',
  'Document Review': 'bg-purple-50 text-purple-700',
  'On Hold': 'bg-orange-50 text-orange-700',
  'Closed': 'bg-green-50 text-green-700',
  'Cancelled': 'bg-red-50 text-red-700',
  'Terminated': 'bg-red-50 text-red-700',
};

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter deals based on tab
  const filteredDeals = useMemo(() => {
    let deals = MOCK_DEALS;

    if (activeTab === 'archived') {
      deals = deals.filter(d => ['Closed', 'Cancelled', 'Terminated'].includes(d.status));
    } else if (activeTab === 'my') {
      deals = deals.filter(d => d.owner.id === 'user-1');
    } else if (activeTab === 'shared') {
      deals = deals.filter(d => d.owner.id !== 'user-1');
    } else {
      deals = deals.filter(d => !['Closed', 'Cancelled', 'Terminated'].includes(d.status));
    }

    // Search filter
    if (searchQuery) {
      deals = deals.filter(
        d =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.property.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return deals;
  }, [activeTab, searchQuery]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const activeDeals = MOCK_DEALS.filter(d => ['In Progress', 'Due Diligence'].includes(d.status));
    const archivedDeals = MOCK_DEALS.filter(d => ['Closed', 'Cancelled', 'Terminated'].includes(d.status));
    const sharedDeals = MOCK_DEALS.filter(d => d.owner.id !== 'user-1');
    const myDeals = MOCK_DEALS.filter(d => d.owner.id === 'user-1');

    return {
      total: MOCK_DEALS.length,
      active: activeDeals.length,
      archived: archivedDeals.length,
      shared: sharedDeals.length,
      my: myDeals.length,
      totalValue: MOCK_DEALS.reduce((sum, d) => sum + d.dealValue, 0),
    };
  }, []);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Deals</h1>
          <p className="text-slate-600 text-sm mt-0.5">Manage and track all your real estate transactions.</p>
        </div>
        <Link
          href="/deals/create/property"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm"
        >
          <Plus size={18} />
          Create Deal
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <p className="text-xs text-slate-600 font-medium mb-1">Total Deals</p>
          <p className="text-xl font-bold text-foreground">{metrics.total}</p>
          <p className="text-xs text-slate-500 mt-1">All time</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <p className="text-xs text-slate-600 font-medium mb-1">Active</p>
          <p className="text-xl font-bold text-blue-600">{metrics.active}</p>
          <p className="text-xs text-slate-500 mt-1">In progress</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <p className="text-xs text-slate-600 font-medium mb-1">Closing</p>
          <p className="text-xl font-bold text-orange-600">3</p>
          <p className="text-xs text-slate-500 mt-1">This month</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <p className="text-xs text-slate-600 font-medium mb-1">Total Value</p>
          <p className="text-lg font-bold text-foreground">₦1.24B</p>
          <p className="text-xs text-slate-500 mt-1">All time</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <p className="text-xs text-slate-600 font-medium mb-1">My Deals</p>
          <p className="text-xl font-bold text-foreground">{metrics.my}</p>
          <p className="text-xs text-slate-500 mt-1">As owner</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto pb-3">
        {TAB_OPTIONS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.value
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-600 hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search deals, properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">
          <Filter size={18} />
          <span className="font-medium">Filters</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Deal Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Property</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Parties</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Value</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700">Updated</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal, idx) => (
                <tr key={deal.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-white'}`}>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={deal.property.images[0]}
                        alt={deal.property.name}
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">{deal.name}</p>
                        <p className="text-xs text-slate-500">{deal.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-foreground">{deal.property.address}</td>
                  <td className="px-6 py-3">
                    <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {deal.dealType}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex -space-x-2">
                      {deal.parties.slice(0, 3).map((party) => (
                        <div
                          key={party.id}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white"
                          title={party.name}
                        >
                          {party.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {deal.parties.length > 3 && (
                        <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-700 text-xs font-bold flex items-center justify-center border-2 border-white">
                          +{deal.parties.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-3 font-semibold text-foreground text-sm">{formatCurrency(deal.dealValue, 'NGN')}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[deal.status]}`}>
                        {deal.status}
                      </span>
                      <span className="text-xs text-slate-500 ml-1">{deal.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-slate-600">{formatDate(deal.lastUpdated)}</td>
                  <td className="px-6 py-3">
                    <Link href={`/deals/${deal.id}`} className="text-primary hover:text-primary/80 transition-colors">
                      <ChevronRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDeals.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No deals found. Create one to get started!</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-600">Showing 1 to {filteredDeals.length} of {MOCK_DEALS.length} deals</p>
        <div className="flex gap-1">
          <button className="px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">&lt;</button>
          <button className="px-2.5 py-1.5 bg-primary text-white rounded-lg text-sm font-medium">1</button>
          <button className="px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">2</button>
          <button className="px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">3</button>
          <button className="px-2.5 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm">&gt;</button>
        </div>
      </div>
    </div>
  );
}
