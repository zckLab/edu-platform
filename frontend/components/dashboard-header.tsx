import { useRouter, usePathname } from "next/navigation"
import { LedLogo } from "@/components/led-logo"
import { Button } from "@/components/ui/button"
import { LogOut, Bell, Shield, BarChart3, ShieldCheck, LayoutDashboard } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface DashboardHeaderProps {
  userName: string
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [role, setRole] = useState<string | null>(null)
  const [hasNotification, setHasNotification] = useState(false)

  useEffect(() => {
    const authData = sessionStorage.getItem("led-auth")
    if (authData) {
      const user = JSON.parse(authData)
      setRole(user.role || (user.isAdmin ? "admin" : "student"))

      // Check if there are unread notifications
      const readStatus = sessionStorage.getItem("led-notification-read")
      if (readStatus !== "true") {
        setHasNotification(true)
      }
    }
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem("led-auth")
    sessionStorage.removeItem("led-notification-read")
    router.push("/")
  }

  const toggleNotification = () => {
    setHasNotification(false)
    sessionStorage.setItem("led-notification-read", "true")
    // Trigger a custom event or state update if we had a global notification system
    window.dispatchEvent(new Event("notification-read"))
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard">
              <LedLogo className="h-16 w-auto cursor-pointer" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {role === "superadmin" && (
                <Link
                  href="/superadmin"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#00A859] bg-[#00A859]/10 rounded-md"
                >
                  <ShieldCheck className="size-4" />
                  Dono
                </Link>
              )}
              {role === "admin" && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#635BFF] bg-[#635BFF]/10 rounded-md"
                >
                  <LayoutDashboard className="size-4" />
                  ADM Painel
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-full relative"
                    onClick={toggleNotification}
                  >
                    <Bell className="size-5 text-muted-foreground" />
                    {hasNotification && (
                      <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-card" />
                    )}
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold text-sm">Notificações</h3>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-primary">
                    Marcar todas como lidas
                  </Button>
                </div>
                <div className="max-h-[300px] overflow-auto">
                  <div className="p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className="mt-1 bg-amber-100 dark:bg-amber-900/50 p-1 rounded-full shrink-0 h-fit">
                        <AlertCircle className="size-4 text-amber-600 dark:text-amber-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-tight">Vencimento Próximo</p>
                        <p className="text-xs text-muted-foreground">Sua fatura de Março vence em 3 dias. Pague agora para evitar multas.</p>
                        <p className="text-[10px] text-muted-foreground/60">Há 2 horas</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex gap-3">
                      <div className="mt-1 bg-green-100 dark:bg-green-900/50 p-1 rounded-full shrink-0 h-fit">
                        <CheckCircle2 className="size-4 text-green-600 dark:text-green-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-tight">Pagamento Confirmado</p>
                        <p className="text-xs text-muted-foreground">O pagamento da sua fatura de Fevereiro foi processado com sucesso.</p>
                        <p className="text-[10px] text-muted-foreground/60">Há 2 dias</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-center">
                  <Button variant="ghost" size="sm" className="w-full text-xs font-normal">
                    Ver todas as notificações
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {!(pathname === "/admin" || pathname === "/superadmin") && <ThemeToggle />}

            <div className="h-4 w-px bg-border mx-1 hidden sm:block" />

            <span className="text-sm font-medium hidden sm:block">
              {userName}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
