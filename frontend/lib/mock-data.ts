import { Invoice } from "./types"

export const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    description: "Mensalidade - Janeiro 2026",
    dueDate: "2026-01-10",
    amount: 300.00,
    status: "paid",
  },
  {
    id: "INV-002",
    description: "Mensalidade - Fevereiro 2026",
    dueDate: "2026-02-10",
    amount: 300.00,
    status: "paid",
  },
  {
    id: "INV-003",
    description: "Mensalidade - Março 2026",
    dueDate: "2026-03-10",
    amount: 300.00,
    status: "pending",
    paymentUrl: "https://checkout.stripe.com/example-march",
  },
  {
    id: "INV-005",
    description: "Mensalidade - Abril 2026",
    dueDate: "2026-04-10", // Set to 10 for logic testing
    amount: 300.00,
    status: "pending",
    paymentUrl: "https://checkout.stripe.com/example-april",
  },
]

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00")
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}
