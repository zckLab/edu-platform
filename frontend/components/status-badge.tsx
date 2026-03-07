import { cn } from "@/lib/utils"
import { InvoiceStatus } from "@/lib/types"

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  paid: {
    label: "Pago",
    className: "bg-status-paid text-status-paid-foreground",
  },
  pending: {
    label: "Pendente",
    className: "bg-status-pending text-status-pending-foreground",
  },
  overdue: {
    label: "Atrasado",
    className: "bg-status-overdue text-status-overdue-foreground",
  },
}

interface StatusBadgeProps {
  status: InvoiceStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}
