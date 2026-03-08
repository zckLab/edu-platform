"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { LedLogo } from "@/components/led-logo"
import { useCPFMask } from "@/hooks/use-cpf-mask"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const cpf = useCPFMask()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!cpf.isValid) {
      setError("Por favor, insira um CPF válido.")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    setIsLoading(true)

    // Simula chamada à API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Armazena o CPF na sessionStorage para simular autenticação
      const userCPF = cpf.rawValue
      let role = "student"
      let isAdmin = false
      let targetPath = "/dashboard"

      // Test CPFs for different roles
      if (userCPF === "00000000001") {
        role = "superadmin"
        targetPath = "/superadmin"
      } else if (userCPF === "00000000002") {
        isAdmin = true
        targetPath = "/admin"
      }

      sessionStorage.setItem("led-auth", JSON.stringify({
        cpf: userCPF,
        name: role === "superadmin" ? "SaaS Owner" : isAdmin ? "Administrador" : "Maria Silva",
        token: "mock-jwt-token",
        role: role,
        isAdmin: isAdmin
      }))

      router.push(targetPath)
    } catch {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full bg-transparent shadow-none border-0 p-0">
      <CardHeader className="flex flex-col items-center text-center px-0 pb-8">
        <LedLogo className="w-[220px] h-auto mb-10 mx-auto" />
        <div className="space-y-1 w-full flex flex-col items-center">
          <CardTitle className="text-2xl font-bold tracking-tight text-white text-center">Acesse sua conta</CardTitle>
          <CardDescription className="text-zinc-400 text-center">
            Digite seu CPF e senha para acessar o portal
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="cpf" className="text-sm font-medium text-zinc-300">
              CPF
            </label>
            <Input
              id="cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={cpf.value}
              onChange={cpf.onChange}
              className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:ring-primary/50 transition-all text-base"
              aria-describedby={error ? "auth-error" : undefined}
              aria-invalid={error ? true : undefined}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-zinc-300">
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:ring-primary/50 transition-all text-base pr-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p id="auth-error" className="text-sm text-red-400 font-medium">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="h-12 text-base font-semibold mt-4 bg-[#00A859] hover:bg-[#008f4c] text-white shadow-lg shadow-[#00A859]/20 hover:shadow-[#00A859]/30 transition-all active:scale-[0.98] border-0"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="size-5" />
                Acessando...
              </>
            ) : (
              "Acessar Portal"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
