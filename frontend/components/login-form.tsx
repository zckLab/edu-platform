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
    <Card className="w-full max-w-md shadow-[0_7px_14px_0_rgba(60,66,87,0.1)] border-0">
      <CardHeader className="items-center text-center gap-4">
        <LedLogo className="h-28 w-auto" />
        <div className="space-y-1">
          <CardTitle className="text-xl">Acesse sua conta</CardTitle>
          <CardDescription>
            Digite seu CPF e senha para acessar o portal
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="cpf" className="text-sm font-medium text-foreground">
              CPF
            </label>
            <Input
              id="cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={cpf.value}
              onChange={cpf.onChange}
              className="h-11 text-base"
              aria-describedby={error ? "auth-error" : undefined}
              aria-invalid={error ? true : undefined}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 text-base pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
            <p id="auth-error" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="h-11 text-base font-medium mt-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="size-5" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
