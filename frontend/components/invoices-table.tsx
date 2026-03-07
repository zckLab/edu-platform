"use client"

import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import { Invoice } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/mock-data"
import { ExternalLink, FileDown } from "lucide-react"

interface InvoicesTableProps {
  invoices: Invoice[]
}

export function InvoicesTable({ invoices }: InvoicesTableProps) {
  const handlePayment = (paymentUrl: string) => {
    window.open(paymentUrl, "_blank", "noopener,noreferrer")
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Nenhuma fatura encontrada.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="py-4 text-muted-foreground font-medium">Descrição</TableHead>
          <TableHead className="py-4 text-muted-foreground font-medium">Vencimento</TableHead>
          <TableHead className="py-4 text-muted-foreground font-medium text-right">Valor</TableHead>
          <TableHead className="py-4 text-muted-foreground font-medium">Status</TableHead>
          <TableHead className="py-4 text-muted-foreground font-medium text-right">Ação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id} className="border-b border-border last:border-0">
            <TableCell className="py-4 font-medium text-foreground">
              {invoice.description}
            </TableCell>
            <TableCell className="py-4 text-muted-foreground">
              {formatDate(invoice.dueDate)}
            </TableCell>
            <TableCell className="py-4 text-right font-medium text-foreground">
              {formatCurrency(invoice.amount)}
            </TableCell>
            <TableCell className="py-4">
              <StatusBadge status={invoice.status} />
            </TableCell>
            <TableCell className="py-4 text-right">
              {invoice.status === "paid" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alert("Baixando recibo...")}
                  className="gap-1.5 border-border hover:bg-muted"
                >
                  <FileDown className="size-3.5" />
                  Recibo
                </Button>
              ) : invoice.paymentUrl ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handlePayment(invoice.paymentUrl!)}
                  className="gap-1.5"
                >
                  Pagar
                  <ExternalLink className="size-3.5" />
                </Button>
              ) : (
                <span className="text-sm text-muted-foreground">-</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
