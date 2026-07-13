'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { dealsService, Deal } from '@/lib/services/deals.service';
import { X, FileText, Users, CheckSquare, BarChart3, MessageSquare, ArrowRight } from 'lucide-react';
import { formatCurrency, formatDate, getTimeAgo } from '@/lib/utils';
import { getDealProgress } from '@/components/deals/utils';
import { DealActivity, ChecklistItem } from '@/lib/types';
import { useParams } from 'next/navigation';
import { OverviewTab } from '@/components/deals/tabs/OverviewTab'
import { DocumentsTab } from '@/components/deals/tabs/DocumentsTab';
import { StakeholdersTab } from '@/components/deals/tabs/StakeholdersTab';
import { ChecklistTab } from '@/components/deals/tabs/ChecklistTab';
import { EscrowTab } from '@/components/deals/tabs/EscrowTab';
import { ActivityTab } from '@/components/deals/tabs/ActivityTab';


const TAB_OPTIONS = [
  { value: 'overview', label: 'Overview', icon: BarChart3 },
  { value: 'documents', label: 'Documents', icon: FileText },
  { value: 'stakeholders', label: 'Stakeholders', icon: Users },
  { value: 'checklist', label: 'Checklist', icon: CheckSquare },
  { value: 'escrow', label: 'Escrow', icon: BarChart3 },
  { value: 'activity', label: 'Activity', icon: MessageSquare },
];


export default function DealDetailPage() {
  const params = useParams<{ id: string }>();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('overview');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  useEffect(() => {
    async function loadDeal() {
      try {
        setLoading(true);
        const response = await dealsService.getDeal(params.id);
        setDeal(response);
      } finally {
        setLoading(false);
      }
    }

    loadDeal();
  }, [params.id]);


  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        Loading...
      </div>
    );
  }

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
              src={deal.property.images[0]?.key ? deal.property.images[0].key : '/images/property-placeholder.jpg'}
              alt={deal.property.name}
              className="col-span-1 rounded-lg h-48 object-cover"
            />
            <div className="col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{deal.title}</h2>
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
                  <p className="font-semibold text-foreground">{formatCurrency(deal.terms.dealValue, 'NGN')}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Closing Date</p>
                  <p className="font-semibold text-foreground">{formatDate(deal.terms.closingDate)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">Overall Progress</p>
                  <p className="text-sm font-semibold text-foreground">{getDealProgress(deal.status)}%</p>
                </div>
                <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${getDealProgress(deal.status)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg">
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
          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab deal={deal} />}
            {activeTab === 'documents' && <DocumentsTab />}
            {activeTab === 'stakeholders' && <StakeholdersTab deal={deal} />}
            {activeTab === 'checklist' && <ChecklistTab  />}
            {activeTab === 'escrow' && <EscrowTab deal={deal} />}
            {activeTab === 'activity' && <ActivityTab />}
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
              src={
                deal.property.images[0]?.key ??
                '/images/property-placeholder.jpg'
              }
              alt={deal.property.name}
              className="w-full h-32 rounded-lg object-cover mb-3"
            />
            <h4 className="font-semibold text-foreground">{deal.title}</h4>
            <p className="text-sm text-muted-foreground">{deal.property.address}</p>
          </div>

          {/* Key Info */}
          <div className="space-y-4 mb-6 pb-6 border-b border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Deal Type</span>
              <span className="font-medium text-foreground">{deal.terms.dealType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Deal Value</span>
              <span className="font-medium text-foreground">{formatCurrency(deal.terms.dealValue, 'NGN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Currency</span>
              <span className="font-medium text-foreground">{deal.terms.currency}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Buyer</span>
              <span className="font-medium text-foreground">{deal.participants.find(p => p.role === 'BUYER')?.user.firstName+" "+deal.participants.find(p => p.role === 'SELLER')?.user.lastName || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Seller</span>
              <span className="font-medium text-foreground">{deal.participants.find(p => p.role === 'SELLER')?.user.firstName+" "+deal.participants.find(p => p.role === 'SELLER')?.user.lastName   || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Closing Date</span>
              <span className="font-medium text-foreground">{formatDate(deal.terms.closingDate)}</span>
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
              <p className="text-xs text-green-700">Provider: Nomba</p>
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









