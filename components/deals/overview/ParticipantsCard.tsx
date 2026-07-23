'use client';

import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { Deal } from '@/lib/services';

export function DealParticipantsCard({
  deal,
}: {
  deal: Deal;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Deal Participants
        </h3>

        <Link
          href="#"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="space-y-5">
        {deal.participants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  participant.user.avatar ??
                  "/images/avatar-placeholder.png"
                }
                alt={participant.user.firstName}
                className="h-10 w-10 rounded-full object-cover"
              />

              <div>
                <p className="font-medium text-foreground">
                  {participant.user.firstName}{" "}
                  {participant.user.lastName}
                </p>

                <p className="text-sm capitalize text-muted-foreground">
                  {participant.role.toLowerCase()}
                </p>
              </div>
            </div>

            <span
              className="
                rounded-full
                bg-green-100
                px-3
                py-1
                text-xs
                font-medium
                text-green-700
              "
            >
              {participant.status}
            </span>
          </div>
        ))}
      </div>

      <button
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          border
          py-2.5
          text-sm
          font-medium
          transition-colors
          hover:bg-secondary
        "
      >
        <UserPlus className="h-4 w-4" />

        Invite People
      </button>
    </div>
  );
}