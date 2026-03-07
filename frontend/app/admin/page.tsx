"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { Users, Shield, FileUp, Key } from "lucide-react"

export default function AdminPage() {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const authData = sessionStorage.getItem("led-auth")
        if (!authData) {
            router.push("/")
            return
        }

        // In v2.0, check is_admin claim from JWT or user object
        const user = JSON.parse(authData)
        if (!user.isAdmin) {
            router.push("/dashboard")
            return
        }

        setIsAdmin(true)
    }, [router])

    if (!isAdmin) return null

    return (
        <div className="min-h-screen bg-[#F6F9FC] dark:bg-background">
            <DashboardHeader userName="Administrador" />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-[#1A1F36] dark:text-foreground tracking-tight flex items-center gap-3">
                        <Shield className="size-8 text-[#635BFF]" />
                        Painel Administrativo
                    </h1>
                    <p className="text-[#4F566B] dark:text-muted-foreground mt-2 text-lg">
                        Gestão de alunos, faturas e controle de acesso v2.0.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="bg-white dark:bg-card border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                            Ver Inadimplentes (12)
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white dark:bg-card border-[#E3E8EE] dark:border-border">
                            Resets Pendentes (2)
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white dark:bg-card border-[#E3E8EE] dark:border-border">
                            Alunos Ativos (116)
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm bg-white dark:bg-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Gestão de Alunos</CardTitle>
                            <Users className="size-4 text-[#635BFF]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">128 Alunos</div>
                            <p className="text-xs text-muted-foreground mt-1">+4 novos este mês</p>
                            <Button className="w-full mt-4 bg-[#635BFF] hover:bg-[#5851DB]">Gerenciar</Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm bg-white dark:bg-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Sincronização CSV</CardTitle>
                            <FileUp className="size-4 text-[#635BFF]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Importar Dados</div>
                            <p className="text-xs text-muted-foreground mt-1">Atualize faturas e alunos via planilha</p>
                            <Button variant="outline" className="w-full mt-4 border-[#E3E8EE] dark:border-border">Subir Arquivo</Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm bg-white dark:bg-card">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Senhas e Acessos</CardTitle>
                            <Key className="size-4 text-[#635BFF]" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Resets Pendentes</div>
                            <p className="text-xs text-muted-foreground mt-1">2 solicitações de recuperação</p>
                            <Button variant="outline" className="w-full mt-4 border-[#E3E8EE] dark:border-border">Ver Pedidos</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
