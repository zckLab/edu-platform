"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { BarChart3, Users, DollarSign, Activity, Settings, ExternalLink, Shield, Globe, Clock, Zap } from "lucide-react"
import { Switch } from "@/components/ui/switch"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-[#635BFF] hover:bg-[#5851DB] gap-2">
                                <Settings className="size-4" />
                                Configurações Globais
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <Settings className="size-5 text-primary" />
                                    Parâmetros do SaaS (Core)
                                </DialogTitle>
                                <DialogDescription>
                                    Ajuste os controles globais de escalabilidade e segurança.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-5 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="base-price" className="flex items-center gap-2">
                                        <DollarSign className="size-3.5 text-muted-foreground" />
                                        Taxa de Serviço por Transação (R$)
                                    </Label>
                                    <Input id="base-price" defaultValue="25,00" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sessions" className="flex items-center gap-2">
                                        <Shield className="size-3.5 text-muted-foreground" />
                                        Limite de Sessões Simultâneas
                                    </Label>
                                    <Input id="sessions" defaultValue="2" type="number" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="retention" className="flex items-center gap-2">
                                        <Clock className="size-3.5 text-muted-foreground" />
                                        Retenção de Logs de Auditoria (Dias)
                                    </Label>
                                    <Input id="retention" defaultValue="90" type="number" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="webhook" className="flex items-center gap-2">
                                        <Globe className="size-3.5 text-muted-foreground" />
                                        Endpoint Webhook (Produção)
                                    </Label>
                                    <Input id="webhook" defaultValue="https://api.led.com/v1/webhook" />
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded-lg bg-red-50/50 dark:bg-red-950/10 border-red-100 dark:border-red-900/30">
                                    <div className="space-y-0.5">
                                        <Label className="text-red-900 dark:text-red-400 flex items-center gap-2">
                                            <Zap className="size-3.5" />
                                            Manutenção de Emergência
                                        </Label>
                                        <p className="text-[10px] text-red-700 dark:text-red-500">Bloqueia acesso externo imediatamente.</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-[#635BFF] w-full">Salvar Parâmetros Críticos</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
                                { time: "Há 2 min", event: "Pagamento Aprovado", student: "João Silva", amount: "R$ 300,00", ip: "189.22.1.42", ua: "Chrome/Windows" },
                                { time: "Há 15 min", event: "Novo Aluno Criado", student: "Maria Oliveira", amount: "-", ip: "177.45.10.11", ua: "Safari/iOS" },
                                { time: "Há 1h", event: "Fatura Vencida (Multa Aplicada)", student: "Carlos Souza", amount: "R$ 500,00", ip: "201.3.44.9", ua: "Firefox/Linux" },
                            ].map((log, i) => (
                                <div key={i} className="px-6 py-5 flex items-center justify-between hover:bg-muted/30 dark:hover:bg-accent/50 transition-colors border-b border-border/40 last:border-0">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-3">
                                            <span className="text-base font-bold text-[#1A1F36] dark:text-foreground">{log.event}</span>
                                            <span className="text-[11px] bg-primary/90 text-white px-2 py-0.5 rounded shadow-sm font-mono font-bold tracking-wider">
                                                IP: {log.ip}
                                            </span>
                                        </div>
                                        <span className="text-sm text-[#4F566B] dark:text-muted-foreground flex items-center gap-2">
                                            <span className="font-semibold">{log.student}</span>
                                            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                                            <span>{log.time}</span>
                                            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                                            <span className="opacity-70 italic text-xs">{log.ua}</span>
                                        </span>
                                    </div>
                                    <div className="font-mono text-sm font-black text-primary">
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
