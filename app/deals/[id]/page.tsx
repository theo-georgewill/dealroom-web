'use client';

import React, { useState } from 'react';
import { MOCK_DEALS } from '@/lib/data';
import { X, FileText, Users, CheckSquare, BarChart3, MessageSquare, ArrowRight } from 'lucide-react';
import { formatCurrency, formatDate, getTimeAgo } from '@/lib/utils';
import { DealActivity, ChecklistItem } from '@/lib/types';
import Link from 'next/link';

const TAB_OPTIONS = [
  { value: 'overview', label: 'Overview', icon: BarChart3 },
  { value: 'documents', label: 'Documents', icon: FileText },
  { value: 'stakeholders', label: 'Stakeholders', icon: Users },
  { value: 'checklist', label: 'Checklist', icon: CheckSquare },
  { value: 'escrow', label: 'Escrow', icon: BarChart3 },
  { value: 'activity', label: 'Activity', icon: MessageSquare },
];

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const deal = MOCK_DEALS.find(d => d.id === params.id);
  const [activeTab, setActiveTab] = useState('overview');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  if (!deal) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Deal not found</p>
      </div>
    );
  }

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
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/deals" className="text-primary hover:underline">
            Deals
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{deal.id}</span>
        </div>

        {/* Property Card */}
        <div className="bg-white border border-border rounded-lg overflow-hidden mb-6">
          <div className="grid grid-cols-3 gap-6 p-6">
            <img
              src={deal.property.images[0]}
              alt={deal.property.name}
              className="col-span-1 rounded-lg h-48 object-cover"
            />
            <div className="col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{deal.name}</h2>
                  <p className="text-muted-foreground mt-1">{deal.property.address}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[deal.status]}`}>
                  {deal.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Property Type</p>
                  <p className="font-semibold text-foreground">{deal.property.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Deal Value</p>
                  <p className="font-semibold text-foreground">{formatCurrency(deal.dealValue, 'NGN')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Closing Date</p>
                  <p className="font-semibold text-foreground">{formatDate(deal.closingDate)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Overall Progress</p>
                  <p className="text-sm font-semibold text-foreground">{deal.progress}%</p>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${deal.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white border border-border rounded-lg">
          {/* Tabs */}
          <div className="border-b border-border flex gap-8 px-6 overflow-x-auto">
            {TAB_OPTIONS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-1 py-4 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.value
                    ? 'text-primary border-b-primary'
                    : 'text-muted-foreground border-b-transparent hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab deal={deal} />}
            {activeTab === 'documents' && <DocumentsTab deal={deal} />}
            {activeTab === 'stakeholders' && <StakeholdersTab deal={deal} />}
            {activeTab === 'checklist' && <ChecklistTab deal={deal} />}
            {activeTab === 'escrow' && <EscrowTab deal={deal} />}
            {activeTab === 'activity' && <ActivityTab deal={deal} />}
          </div>
        </div>
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && (
        <div className="w-96 bg-white border-l border-border rounded-lg p-6 max-h-screen overflow-y-auto sticky top-6">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>

          <h3 className="text-lg font-bold text-foreground mb-6">Deal Details</h3>

          {/* Property Summary */}
          <div className="mb-6">
            <img
              src={deal.property.images[0]}
              alt={deal.property.name}
              className="w-full h-32 rounded-lg object-cover mb-3"
            />
            <h4 className="font-semibold text-foreground">{deal.name}</h4>
            <p className="text-sm text-muted-foreground">{deal.property.address}</p>
          </div>

          {/* Key Info */}
          <div className="space-y-4 mb-6 pb-6 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Deal Type</span>
              <span className="font-medium text-foreground">{deal.dealType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Deal Value</span>
              <span className="font-medium text-foreground">{formatCurrency(deal.dealValue, 'NGN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Currency</span>
              <span className="font-medium text-foreground">{deal.currency}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Buyer</span>
              <span className="font-medium text-foreground">{deal.parties.find(p => p.role === 'Buyer')?.name || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Seller</span>
              <span className="font-medium text-foreground">{deal.parties.find(p => p.role === 'Seller')?.name || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Closing Date</span>
              <span className="font-medium text-foreground">{formatDate(deal.closingDate)}</span>
            </div>
          </div>

          {/* Escrow Section */}
          <div className="mb-6 pb-6 border-b border-border">
            <h4 className="font-semibold text-foreground mb-3">Escrow Status</h4>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p className="text-sm font-semibold text-green-900">Funded</p>
              </div>
              <p className="text-xs text-green-700 mb-3">Balance: {formatCurrency(deal.escrow.amount, 'NGN')}</p>
              <p className="text-xs text-green-700">Provider: {deal.escrow.provider}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between px-4 py-2 bg-secondary hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-colors">
              <span>Upload Document</span>
              <ArrowRight size={16} />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-2 bg-secondary hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-colors">
              <span>Create Task</span>
              <ArrowRight size={16} />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-2 bg-secondary hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-colors">
              <span>Send Message</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-900 font-semibold mb-1">Secure & Protected</p>
            <p className="text-xs text-green-700">This deal room is protected with bank-grade security and escrow by Nomba.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Tab Components
function OverviewTab({ deal }: { deal: (typeof MOCK_DEALS)[0] }) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-foreground mb-2">Deal Progress</h4>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Overall</p>
          <p className="text-sm font-semibold text-foreground">{deal.progress}%</p>
        </div>
        <div className="w-full bg-secondary rounded-full h-3">
          <div className="bg-primary h-full rounded-full" style={{ width: `${deal.progress}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Deal Value</p>
          <p className="text-lg font-bold text-foreground">{formatCurrency(deal.dealValue, 'NGN')}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Earnest Money</p>
          <p className="text-lg font-bold text-foreground">{formatCurrency(deal.earnestMoney || 0, 'NGN')}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Closing Date</p>
          <p className="text-lg font-bold text-foreground">{formatDate(deal.closingDate)}</p>
        </div>
        <div className="bg-secondary rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Parties</p>
          <p className="text-lg font-bold text-foreground">{deal.parties.length}</p>
        </div>
      </div>

      {deal.description && (
        <div>
          <h4 className="font-semibold text-foreground mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{deal.description}</p>
        </div>
      )}
    </div>
  );
}

function DocumentsTab({ deal }: { deal: (typeof MOCK_DEALS)[0] }) {
  return (
    <div className="space-y-4">
      {deal.documents.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No documents yet</p>
      ) : (
        deal.documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground text-sm">{doc.name}</p>
                <p className="text-xs text-muted-foreground">Uploaded {getTimeAgo(doc.uploadedDate)}</p>
              </div>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{doc.status}</span>
          </div>
        ))
      )}
    </div>
  );
}

function StakeholdersTab({ deal }: { deal: (typeof MOCK_DEALS)[0] }) {
  return (
    <div className="space-y-4">
      {deal.parties.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No stakeholders</p>
      ) : (
        deal.parties.map((party) => (
          <div key={party.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground text-sm">{party.name}</p>
              <p className="text-xs text-muted-foreground">{party.role}</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{party.status}</span>
          </div>
        ))
      )}
    </div>
  );
}

function ChecklistTab({ deal }: { deal: (typeof MOCK_DEALS)[0] }) {
  return (
    <div className="space-y-6">
      {deal.checklists.map((checklist) => (
        <div key={checklist.id}>
          <h4 className="font-semibold text-foreground mb-3">{checklist.section}</h4>
          <div className="space-y-2">
            {checklist.items.map((item: ChecklistItem) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <input type="checkbox" checked={item.completed} readOnly className="w-4 h-4" />
                <div className="flex-1">
                  <p className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {item.title}
                  </p>
                </div>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EscrowTab({ deal }: { deal: (typeof MOCK_DEALS)[0] }) {
  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-900 mb-3">Escrow Balance</h4>
        <p className="text-2xl font-bold text-green-700">{formatCurrency(deal.escrow.amount, 'NGN')}</p>
        <p className="text-sm text-green-700 mt-2">Provider: {deal.escrow.provider}</p>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Release Conditions</h4>
        <div className="space-y-2">
          {deal.escrow.releaseConditions.map((cond) => (
            <div key={cond.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
              <input type="checkbox" checked={cond.completed} readOnly className="w-4 h-4" />
              <p className={`text-sm ${cond.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {cond.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Recent Transactions</h4>
        <div className="space-y-2">
          {deal.escrow.recentTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg text-sm">
              <div>
                <p className="font-medium text-foreground">{txn.type}</p>
                <p className="text-xs text-muted-foreground">{txn.description}</p>
              </div>
              <p className="font-semibold text-foreground">{formatCurrency(txn.amount, 'NGN')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityTab({ deal }: { deal: (typeof MOCK_DEALS)[0] }) {
  return (
    <div className="space-y-4">
      {deal.activities.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No activity yet</p>
      ) : (
        deal.activities.map((activity: DealActivity) => (
          <div key={activity.id} className="flex gap-4 p-4 bg-secondary rounded-lg">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {activity.actor.name} {activity.description.split(' ').slice(1).join(' ')}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(activity.timestamp)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
