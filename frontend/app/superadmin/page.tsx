"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { BarChart3, Users, DollarSign, Activity, Settings, ExternalLink } from "lucide-react"

export default function SuperAdminPage() {
    const router = useRouter()
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [stats, setStats] = useState({
        totalStudents: 40,
        activeIntegrations: 1,
        monthlyBilling: 1000.00,
        serverStatus: "Online"
    })

    useEffect(() => {
        const authData = sessionStorage.getItem("led-auth")
        if (!authData) {
            router.push("/")
            return
        }

        const user = JSON.parse(authData)
        // Role check for SuperAdmin (v2.1)
        if (user.role !== "superadmin") {
            router.push("/dashboard")
            return
        }

        setIsSuperAdmin(true)
    }, [router])

    if (!isSuperAdmin) return null

    return (
        <div className="min-h-screen bg-[#F6F9FC] dark:bg-background">
            <DashboardHeader userName="SaaS Owner" />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1A1F36] dark:text-foreground tracking-tight flex items-center gap-3">
                            <BarChart3 className="size-8 text-[#635BFF]" />
                            SuperAdmin: Monitor de SaaS
                        </h1>
                        <p className="text-[#4F566B] dark:text-muted-foreground mt-2 text-lg">
                            Visão geral do sistema LED v2.1 (SaaS Owner Control).
                        </p>
                    </div>
                    <Button className="bg-[#635BFF] hover:bg-[#5851DB] gap-2">
                        <Settings className="size-4" />
                        Configurações Globais
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Card className="border-0 shadow-sm bg-white dark:bg-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[#4F566B]">Total de Alunos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <Users className="size-5 text-[#635BFF]" />
                                {stats.totalStudents}
                            </div>
                            <p className="text-xs text-green-600 mt-1 font-medium">+15% vs mês anterior</p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-white dark:bg-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[#4F566B]">Faturamento SaaS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <DollarSign className="size-5 text-[#635BFF]" />
                                R$ {stats.monthlyBilling.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                            <p className="text-xs text-[#4F566B] mt-1">Ref: R$ 25,00 / aluno</p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-white dark:bg-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[#4F566B]">Integrações Ativas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <ExternalLink className="size-5 text-[#635BFF]" />
                                {stats.activeIntegrations}
                            </div>
                            <p className="text-xs text-green-600 mt-1 font-medium">MP Webhook OK</p>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-white dark:bg-card">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-[#4F566B]">Status Cloud</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold flex items-center gap-2">
                                <Activity className="size-5 text-green-600" />
                                {stats.serverStatus}
                            </div>
                            <p className="text-xs text-[#4F566B] mt-1">Latência: 45ms</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-0 shadow-sm bg-white dark:bg-card overflow-hidden">
                    <CardHeader className="border-b border-border/50 px-6 py-4">
                        <CardTitle className="text-lg font-bold">Logs de Auditoria Sênior (Audit Log)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/50">
                            {[
                                { time: "Há 2 min", event: "Pagamento Aprovado", student: "João Silva", amount: "R$ 300,00" },
                                { time: "Há 15 min", event: "Novo Aluno Criado", student: "Maria Oliveira", amount: "-" },
                                { time: "Há 1h", event: "Fatura Vencida (Multa Aplicada)", student: "Carlos Souza", amount: "R$ 500,00" },
                            ].map((log, i) => (
                                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#F7FAFC] transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-[#1A1F36]">{log.event}</span>
                                        <span className="text-xs text-[#4F566B]">{log.student} • {log.time}</span>
                                    </div>
                                    <div className="font-mono text-xs font-bold text-[#635BFF]">
                                        {log.amount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
