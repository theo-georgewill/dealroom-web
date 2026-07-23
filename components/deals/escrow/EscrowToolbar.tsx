import {
  AddFundsButton,
  ViewAgreementButton,
} from "@/components/deals/escrow";

export function EscrowToolbar() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Escrow Management
        </h2>

        <p className="mt-2 text-muted-foreground">
          Secure escrow holds funds and releases according to agreed
          conditions.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ViewAgreementButton />

        <AddFundsButton />
      </div>
    </div>
  );
}