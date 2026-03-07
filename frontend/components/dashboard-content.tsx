"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DashboardHeader } from "@/components/dashboard-header"
import { LedLogo } from "@/components/led-logo"
import { InvoicesTable } from "@/components/invoices-table"
import { InvoicesTableSkeleton } from "@/components/invoices-table-skeleton"
import { mockInvoices } from "@/lib/mock-data"
import { Invoice, User } from "@/lib/types"
import { FileText, AlertCircle, Bell, X } from "lucide-react"
import { differenceInDays, differenceInHours, differenceInMinutes, startOfMonth, addDays, setDate } from "date-fns"
import { OfficialReport } from "@/components/official-report"

export function DashboardContent() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showPaidInvoices, setShowPaidInvoices] = useState(true)
  const [isReporting, setIsReporting] = useState(false)

  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [hasReadNotification, setHasReadNotification] = useState(false)
  const [countdown, setCountdown] = useState("")

  useEffect(() => {
    // Verifica autenticação
    const authData = sessionStorage.getItem("led-auth")
    if (!authData) {
      router.push("/")
      return
    }

    const userData = JSON.parse(authData) as User
    setUser(userData)

    // Check notification status from sessionStorage
    const readStatus = sessionStorage.getItem("led-notification-read")
    setHasReadNotification(readStatus === "true")

    // Listener for header bell clicks
    const handleNotificationRead = () => setHasReadNotification(true)
    window.addEventListener("notification-read", handleNotificationRead)

    // Simula carregamento de dados da API
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Regra v2.1: R$ 300 base, R$ 500 após dia 10 do mês de vencimento
      const now = new Date()
      const currentDay = now.getDate()

      const updatedInvoices = mockInvoices.map(inv => {
        const dueDate = new Date(inv.dueDate)
        const isNotPaid = inv.status !== "paid"

        // Se após o dia 10 DO MÊS ATUAL e a fatura for de um mês já passado ou do mês atual
        // Para o mock, vamos simplificar: se hoje > dia 10, qualquer pendente vira R$ 500
        if (isNotPaid && currentDay > 10) {
          return { ...inv, amount: 500, status: "overdue" as const }
        }
        return { ...inv, amount: 300 }
      })

      setInvoices(updatedInvoices)
      setIsLoading(false)
    }

    loadData()

    // Countdown logic for the 10th day
    const updateCountdown = () => {
      const now = new Date()
      const deadline = setDate(new Date(), 10)
      deadline.setHours(23, 59, 59, 999)

      if (now > deadline) {
        setCountdown("Prazo encerrado")
        return
      }

      const days = differenceInDays(deadline, now)
      const hours = differenceInHours(deadline, now) % 24
      const minutes = differenceInMinutes(deadline, now) % 60

      setCountdown(`${days}d ${hours}h ${minutes}m`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 60000)

    return () => {
      window.removeEventListener("notification-read", handleNotificationRead)
      clearInterval(interval)
    }
  }, [router])

  const handlePrintReport = () => {
    setIsReporting(true)
    // Pequeno delay para garantir que o componente renderizou antes de imprimir
    setTimeout(() => {
      window.print()
      // Resetar o estado após um tempo para não ficar na tela de visualização
      setTimeout(() => setIsReporting(false), 500)
    }, 100)
  }

  const { filteredInvoices, upcomingAlerts } = useMemo(() => {
    const now = new Date()
    const upcoming = invoices.filter(inv =>
      inv.status !== "paid" &&
      differenceInDays(new Date(inv.dueDate), now) <= 7 &&
      differenceInDays(new Date(inv.dueDate), now) >= 0
    )

    const filtered = showPaidInvoices
      ? invoices
      : invoices.filter((inv) => inv.status !== "paid")

    return { filteredInvoices: filtered, upcomingAlerts: upcoming }
  }, [invoices, showPaidInvoices])

  const handleCloseNotification = () => {
    setIsNotificationOpen(false)
    setHasReadNotification(true)
    sessionStorage.setItem("led-notification-read", "true")
    // Note: This won't sync back to header unless we use a global store or shared key listener
    window.dispatchEvent(new Event("notification-read"))
  }

  if (!user) {
    return null
  }

  if (isReporting) {
    return (
      <div id="print-area" className="fixed inset-0 z-[100] bg-white overflow-auto">
        <div className="print:hidden sticky top-0 bg-white border-b p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-2">
            <LedLogo className="h-6 w-auto" />
            <p className="font-bold text-gray-800">Visualização da Declaração</p>
          </div>
          <Button onClick={() => setIsReporting(false)} variant="outline" className="gap-2">
            <X className="size-4" /> Fechar
          </Button>
        </div>
        <OfficialReport user={user} invoices={invoices} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F9FC] dark:bg-background">
      <DashboardHeader userName={user.name} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Custom Notification Modal/Alert */}
        {!hasReadNotification && upcomingAlerts.length > 0 && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-5 flex items-start justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg">
                  <AlertCircle className="size-6 text-amber-600 dark:text-amber-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-amber-900 dark:text-amber-400">
                    Notificação de Pagamento
                  </h3>
                  <p className="text-sm text-amber-800/80 dark:text-amber-500 mt-1 leading-relaxed">
                    Olá! Identificamos que você possui <strong>{upcomingAlerts.length} fatura(s)</strong> pendente(s) com vencimento próximo.
                    Realize o pagamento até o dia 10 para garantir o valor de <strong>R$ 300,00</strong>.
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-400 bg-amber-200/50 dark:bg-amber-900/30 w-fit px-2 py-1 rounded">
                    <span className="animate-pulse">●</span>
                    PRAZO PARA R$ 300: {countdown}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseNotification}
                className="text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/40"
              >
                Dispensar
              </Button>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1F36] dark:text-foreground tracking-tight">
              Olá, {user.name}
            </h1>
            <p className="text-[#4F566B] dark:text-muted-foreground mt-2 text-lg">
              Gerencie suas mensalidades e histórico financeiro do LED.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handlePrintReport}
              className="bg-white dark:bg-card border-[#E3E8EE] dark:border-border text-[#4F566B] dark:text-foreground hover:bg-[#F7FAFC] shadow-sm transform transition-all active:scale-95 gap-2"
            >
              <FileText className="size-4" />
              Relatório IR 2026
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <Checkbox
                  checked={showPaidInvoices}
                  onCheckedChange={(checked) => setShowPaidInvoices(checked === true)}
                  className="border-[#E3E8EE] data-[state=checked]:bg-[#635BFF] data-[state=checked]:border-[#635BFF]"
                />
              </div>
              <span className="text-sm font-medium text-[#4F566B] dark:text-muted-foreground group-hover:text-[#1A1F36] transition-colors">
                Exibir faturas pagas
              </span>
            </label>
          </div>
        </div>

        {/* Invoices Table Card */}
        <Card className="shadow-[0_2px_5px_rgba(60,66,87,0.08),0_1px_1px_rgba(0,0,0,0.12)] border-0 overflow-hidden bg-white dark:bg-card">
          <CardHeader className="border-b border-[#F7FAFC] dark:border-border/50 bg-white dark:bg-card/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <Bell className="size-4 text-[#635BFF]" />
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-[#4F566B] dark:text-muted-foreground">
                Faturas
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <InvoicesTableSkeleton />
            ) : (
              <InvoicesTable invoices={filteredInvoices} />
            )}
          </CardContent>
        </Card>

        {/* Context Footer */}
        <p className="mt-8 text-center text-xs text-[#A3ACB9] dark:text-muted-foreground/50">
          Problemas com algum pagamento? Entre em contato com a secretaria da LED.
        </p>
      </main>
    </div>
  )
}
