import { Deal } from "@/lib/services";

export function StakeholdersTab({ deal }: { deal: Deal }) {
  return (
    <div className="space-y-4">
      {deal.participants.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">No stakeholders</p>
      ) : (
        deal.participants.map((participant) => (
          <div key={participant.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div>
              <p className="font-medium text-foreground text-sm">{`${participant.user.firstName} ${participant.user.lastName}`}</p>
              <p className="text-xs text-muted-foreground">{participant.role}</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{participant.status}</span>
          </div>
        ))
      )}
    </div>
  );
}