'use client';

import { X, ArrowRight } from 'lucide-react';
import { Deal } from '@/lib/services';
import { formatCurrency, formatDate } from '@/lib/utils';

interface DealDetailsDrawerProps {
  deal: Deal;
  open: boolean;
  onClose: () => void;
}

export function DealDetailsDrawer({
  deal,
  open,
  onClose,
}: DealDetailsDrawerProps) {
  const buyer = deal.participants.find(
    (p) => p.role === 'BUYER'
  )?.user;

  const seller = deal.participants.find(
    (p) => p.role === 'SELLER'
  )?.user;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed
          top-0
          right-0
          z-50
          h-screen
          w-[420px]
          overflow-y-auto
          border-l
          border-border
          bg-white
          p-6
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 transition-colors hover:bg-secondary"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <h2 className="mb-6 text-xl font-bold">
          Deal Details
        </h2>

        {/* Property */}

        <div className="mb-6">
          <img
            src={
              deal.property.images[0]?.key ??
              '/images/property-placeholder.jpg'
            }
            alt={deal.property.name}
            className="mb-3 h-32 w-full rounded-lg object-cover"
          />

          <h3 className="font-semibold">
            {deal.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {deal.property.address}
          </p>
        </div>

        {/* Details */}

        <div className="mb-6 space-y-4 border-b pb-6">
          <InfoRow
            label="Deal Type"
            value={deal.terms.dealType}
          />

          <InfoRow
            label="Deal Value"
            value={formatCurrency(
              deal.terms.dealValue,
              'NGN'
            )}
          />

          <InfoRow
            label="Currency"
            value={deal.terms.currency}
          />

          <InfoRow
            label="Buyer"
            value={
              buyer
                ? `${buyer.firstName} ${buyer.lastName}`
                : 'N/A'
            }
          />

          <InfoRow
            label="Seller"
            value={
              seller
                ? `${seller.firstName} ${seller.lastName}`
                : 'N/A'
            }
          />

          <InfoRow
            label="Closing Date"
            value={formatDate(
              deal.terms.closingDate
            )}
          />
        </div>

        {/* Escrow */}

        <div className="mb-6 border-b pb-6">
          <h3 className="mb-3 font-semibold">
            Escrow Status
          </h3>

          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <p className="font-semibold text-green-900">
              Funded
            </p>

            <p className="mt-2 text-sm text-green-700">
              Balance:{' '}
              {formatCurrency(
                deal.escrow.amount,
                'NGN'
              )}
            </p>

            <p className="text-sm text-green-700">
              Provider: Nomba
            </p>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="space-y-2">
          {[
            'Upload Document',
            'Create Task',
            'Send Message',
          ].map((action) => (
            <button
              key={action}
              className="flex w-full items-center justify-between rounded-lg bg-secondary px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              {action}

              <ArrowRight className="h-4 w-4" />
            </button>
          ))}
        </div>

        {/* Security */}

        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
          <h4 className="font-semibold text-green-900">
            Secure & Protected
          </h4>

          <p className="mt-1 text-sm text-green-700">
            This deal room is protected with bank-grade
            security and escrow by Nomba.
          </p>
        </div>
      </aside>
    </>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span className="font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}