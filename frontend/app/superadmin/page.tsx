"use client"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { DashboardHeader } from "@/components/dashboard-header"
import { ImmersiveBackground3D } from "@/components/immersive-background-3d" // New import
import { BarChart3, Settings, DollarSign, Shield, Clock, Globe, Zap, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
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

    const [isLogsOpen, setIsLogsOpen] = useState(true)

    const [feeValue, setFeeValue] = useState("25,00")

    const formatCurrency = (val: string) => {
        // Standardize: remove current thousands separators (dots), change decimal comma to dot
        const normalized = val.replace(/\./g, "").replace(",", ".")
        const numeric = parseFloat(normalized)

        if (isNaN(numeric)) return "0,00"

        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numeric)
    }

    const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value

        // Detect dot usage while typing (excluding existing ones)
        // If a dot is used and it's not the only character or something similar
        // we warn the user as requested previously.
        if (val.slice(-1) === ".") {
            toast.warning("Formato inválido", {
                description: "Utilize vírgula (,) para centavos.",
                duration: 2000,
            })
            val = val.slice(0, -1) + ","
        }

        setFeeValue(val)
    }

    const handleFeeBlur = () => {
        setFeeValue(formatCurrency(feeValue))
    }

    const logs = [
        { time: "Há 2 min", event: "Pagamento Aprovado", student: "João Silva", amount: "R$ 300,00", ip: "189.22.1.42", ua: "Chrome/Windows" },
        { time: "Há 15 min", event: "Novo Aluno Criado", student: "Maria Oliveira", amount: "-", ip: "177.45.10.11", ua: "Safari/iOS" },
        { time: "Há 1h", event: "Fatura Vencida (Multa Aplicada)", student: "Carlos Souza", amount: "R$ 500,00", ip: "201.3.44.9", ua: "Firefox/Linux" },
    ]

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
        <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden relative flex flex-col">
            <Script
                src="https://unpkg.com/@splinetool/viewer@1.0.91/build/spline-viewer.js"
                type="module"
            />

            {/* 1. Immersive Layer: Background Sphere */}
            <ImmersiveBackground3D />

            {/* Global CSS Injection for HUD v3.1 */}
            <style jsx global>{`
                html, body {
                    margin: 0;
                    padding: 0;
                    background-color: #0D0D0D;
                    overflow: hidden;
                }
                #audit-log-container {
                    z-index: 100;
                    pointer-events: auto !important;
                }
                .spline-bg-container {
                    pointer-events: auto !important;
                }
            `}</style>

            {/* 2. HUD Header (Top) */}
            <div className="fixed top-0 left-0 w-full z-[1000] border-b border-white/5 backdrop-blur-md bg-black/10 pointer-events-none">
                <div className="pointer-events-auto">
                    <DashboardHeader userName="SuperAdmin" />
                </div>
            </div>

            <main className="flex-1 w-full relative z-10 flex flex-col pointer-events-none">
                {/* 3. Central Metric (Top-Left HUD) */}
                <div className="px-12 pt-32 p-8 pointer-events-none">
                    <div className="animate-in fade-in slide-in-from-left duration-700 pointer-events-auto inline-block">
                        <h1 className="text-5xl font-black text-white tracking-tight flex items-center gap-4 drop-shadow-[0_0_20px_rgba(99,91,255,0.4)]">
                            <BarChart3 className="size-12 text-[#635BFF]" />
                            PAINEL SUPERADMIN
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-xs font-black text-zinc-500 tracking-[0.3em] uppercase">
                                Monitoramento de Fluxo
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Configuration Gear (Top-Right HUD) */}
                <div className="fixed top-24 right-8 z-[1000] pointer-events-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-14 rounded-full bg-transparent hover:bg-white/5 border-none shadow-none transition-all group">
                                <Settings className="size-8 text-white/50 group-hover:text-[#635BFF] group-hover:rotate-90 transition-all duration-500" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white/10 border-white/10 text-white z-[1000] backdrop-blur-[40px] shadow-2xl">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-3 text-white text-2xl font-black tracking-tighter">
                                    <Settings className="size-7 text-[#635BFF]" />
                                    Parâmetros do sistema
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400 font-bold">
                                    Calibração de valores.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-8">
                                <div className="grid gap-3">
                                    <Label htmlFor="base-price" className="flex items-center gap-2 text-zinc-300 font-black text-xs uppercase tracking-widest">
                                        <DollarSign className="size-4 text-[#635BFF]" />
                                        Valor por aluno (R$)
                                    </Label>
                                    <Input
                                        id="base-price"
                                        value={feeValue}
                                        onChange={handleFeeChange}
                                        onBlur={handleFeeBlur}
                                        className="bg-white/5 border-white/10 text-white h-12 font-mono text-lg transition-all focus:border-[#635BFF]/50"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="sessions" className="flex items-center gap-2 text-zinc-300 font-black text-xs uppercase tracking-widest">
                                        <Shield className="size-4 text-[#635BFF]" />
                                        Sessões máximas (por usuário)
                                    </Label>
                                    <Input id="sessions" defaultValue="2" type="number" className="bg-white/5 border-white/10 text-white h-12 font-mono text-lg" />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                                    <div className="space-y-1">
                                        <Label className="text-red-400 flex items-center gap-2 font-black text-xs uppercase tracking-tighter">
                                            <Zap className="size-4" />
                                            Manutenção
                                        </Label>
                                        <p className="text-[10px] text-red-500/80 font-bold">Ativar durante manutenções na API/backend</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-[#635BFF] hover:bg-[#5851DB] w-full h-14 font-black uppercase tracking-[0.2em]">Confirmar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* 5. HUD Audit Log Widget (Floating Bottom-Left) */}
                <div
                    id="infrastructure-flow-widget"
                    className={`fixed bottom-8 left-8 w-[450px] overflow-hidden bg-black/60 backdrop-blur-[12px] border border-white/10 rounded-[24px] shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-300 ease-in-out z-[100] pointer-events-auto ${isLogsOpen ? 'max-h-[50vh]' : 'max-h-[84px]'
                        }`}
                >
                    <div
                        className="p-6 flex items-center justify-between cursor-pointer group"
                        onClick={() => setIsLogsOpen(!isLogsOpen)}
                    >
                        <div className="flex items-center gap-3">
                            <Clock className={`size-4 text-[#635BFF] transition-transform duration-300 ${isLogsOpen ? 'rotate-0' : 'rotate-180'}`} />
                            <h2 className="text-sm font-black text-zinc-300 tracking-[0.2em] uppercase">
                                Logs em Tempo Real
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-500 text-[8px] font-black uppercase tracking-widest animate-pulse">
                                Online
                            </div>
                            <Button variant="ghost" size="icon" className="size-8 rounded-full bg-white/5 border border-white/5 group-hover:bg-[#635BFF]/20 transition-all">
                                {isLogsOpen ? <ChevronDown className="size-4 text-white" /> : <ChevronUp className="size-4 text-white" />}
                            </Button>
                        </div>
                    </div>

                    <div className={`transition-all duration-300 ease-in-out ${isLogsOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <div className="px-6 pb-6 space-y-3 overflow-y-auto max-h-[35vh] scrollbar-hide">
                            {logs.map((log, i) => (
                                <div key={i} className="group/item p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#635BFF]/30 transition-all duration-300 flex items-start justify-between gap-4 pointer-events-auto">
                                    <div className="flex flex-col gap-1.5 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black text-white truncate">{log.event}</span>
                                            <span className="shrink-0 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">
                                                {log.ip}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
                                            <span className="text-zinc-300 truncate">{log.student}</span>
                                            <span className="flex items-center gap-1 opacity-50">
                                                <Clock className="size-3" />
                                                {log.time}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-xs font-black text-white font-mono">{log.amount !== "-" ? log.amount : "---"}</div>
                                        <div className="text-[7px] text-zinc-600 font-black uppercase tracking-widest">VAL</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-white/5 sticky bottom-0 bg-black/20 backdrop-blur-md">
                            <Button variant="ghost" className="w-full text-zinc-500 hover:text-[#635BFF] hover:bg-transparent text-[10px] font-black uppercase tracking-widest gap-2 h-8 pointer-events-auto">
                                <Globe className="size-3" />
                                Baixar histórico de logs de 90 dias
                            </Button>
                        </div>
                    </div>
                </div>
                {/* 6. Spline Watermark Cover (Absolute Solid Wall) */}
                <div className="fixed bottom-[18px] right-[5px] z-[1000] w-[160px] h-[40px] bg-black border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,1)] flex items-center justify-center pointer-events-auto cursor-default select-none">
                    <p className="text-[10px] font-black text-zinc-400 tracking-[0.2em] uppercase">
                        Super Admin
                    </p>
                </div>
            </main>
        </div>
    )
}
