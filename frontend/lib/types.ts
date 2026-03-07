export type InvoiceStatus = "paid" | "pending" | "overdue"

export interface Invoice {
  id: string
  description: string
  dueDate: string
  amount: number
  status: InvoiceStatus
  paymentUrl?: string
}

export interface User {
  cpf: string
  name: string
  token: string
}
