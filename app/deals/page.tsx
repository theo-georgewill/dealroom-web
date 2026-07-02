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
  'Draft': 'bg-gray-100 text-gray-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Due Diligence': 'bg-yellow-100 text-yellow-700',
  'Document Review': 'bg-purple-100 text-purple-700',
  'On Hold': 'bg-orange-100 text-orange-700',
  'Closed': 'bg-green-100 text-green-700',
  'Cancelled': 'bg-red-100 text-red-700',
  'Terminated': 'bg-red-100 text-red-700',
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Deals</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your deals in one place.</p>
        </div>
        <Link
          href="/deals/create"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Create Deal
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Deals</p>
          <p className="text-2xl font-bold text-foreground">{metrics.total}</p>
          <p className="text-xs text-muted-foreground mt-2">All time</p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Active Deals</p>
          <p className="text-2xl font-bold text-blue-600">{metrics.active}</p>
          <p className="text-xs text-muted-foreground mt-2">In progress</p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Closing This Month</p>
          <p className="text-2xl font-bold text-orange-600">3</p>
          <p className="text-xs text-muted-foreground mt-2">Expected closings</p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Total Deal Value</p>
          <p className="text-xl font-bold text-foreground">₦1.24B</p>
          <p className="text-xs text-muted-foreground mt-2">All time</p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">My Deals</p>
          <p className="text-2xl font-bold text-foreground">{metrics.my}</p>
          <p className="text-xs text-muted-foreground mt-2">As owner</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto pb-4">
        {TAB_OPTIONS.map((tab) => (
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
          </button>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:bg-secondary transition-colors">
          <Filter size={18} />
          <span className="text-sm font-medium">Filters</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary">
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Deal Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Property</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Parties</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Value</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-foreground">Updated</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="border-b border-border hover:bg-secondary transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={deal.property.images[0]}
                        alt={deal.property.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-foreground text-sm">{deal.name}</p>
                        <p className="text-xs text-muted-foreground">{deal.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{deal.property.address}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {deal.dealType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {deal.parties.slice(0, 3).map((party) => (
                        <div
                          key={party.id}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white"
                          title={party.name}
                        >
                          {party.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      ))}
                      {deal.parties.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 text-xs font-bold flex items-center justify-center border-2 border-white">
                          +{deal.parties.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-foreground">{formatCurrency(deal.dealValue, 'NGN')}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${STATUS_COLORS[deal.status]}`}>
                        {deal.status}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">{deal.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(deal.lastUpdated)}</td>
                  <td className="px-6 py-4">
                    <Link href={`/deals/${deal.id}`} className="text-primary hover:text-primary/80">
                      <ChevronRight size={20} />
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
        <p className="text-sm text-muted-foreground">Showing 1 to {filteredDeals.length} of {MOCK_DEALS.length} deals</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-border rounded hover:bg-secondary transition-colors">&lt;</button>
          <button className="px-3 py-1 bg-primary text-white rounded">1</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-secondary transition-colors">2</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-secondary transition-colors">3</button>
          <button className="px-3 py-1 border border-border rounded hover:bg-secondary transition-colors">&gt;</button>
        </div>
      </div>
    </div>
  );
}
