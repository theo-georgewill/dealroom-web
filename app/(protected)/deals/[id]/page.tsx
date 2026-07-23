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
import { PanelRightOpen } from "lucide-react";
import { DealDetailsDrawer } from "@/components/deals/drawer/DealDetailsDrawer";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/deals" className="text-primary hover:underline">
              Deals
            </Link>

            <span className="text-muted-foreground">/</span>

            <span className="font-medium text-foreground">
              {deal.id}
            </span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium hover:bg-secondary"
          >
            <PanelRightOpen className="h-4 w-4" />
            Deal Details
          </button>
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
            {activeTab === 'checklist' && <ChecklistTab deal={deal}  />}
            {activeTab === 'escrow' && <EscrowTab deal={deal} />}
            {activeTab === 'activity' && <ActivityTab deal={deal}/>}
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <DealDetailsDrawer
        deal={deal}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}









