"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { Users, Shield, FileUp, Key, UserPlus, UserMinus, Clock, AlertTriangle, DollarSign } from "lucide-react"
import { HanaBackground } from "@/components/hana-background"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminPage() {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)
    const [students, setStudents] = useState([
        { id: 1, name: "João Silva", enrollment: "2024001", cpf: "123.456.789-00", timeInCourse: "6 meses" },
        { id: 2, name: "Maria Oliveira", enrollment: "2024002", cpf: "234.567.890-11", timeInCourse: "4 meses" },
        { id: 3, name: "Carlos Souza", enrollment: "2024003", cpf: "345.678.901-22", timeInCourse: "1 ano" },
        { id: 4, name: "Ana Costa", enrollment: "2024004", cpf: "456.789.012-33", timeInCourse: "2 meses" },
    ])

    const [delinquents] = useState([
        { id: 1, name: "Roberto Ramos", status: "Multado(a)", amount: "R$ 500,00", time: "12 dias" },
        { id: 2, name: "Juliana Mendes", status: "Multado(a)", amount: "R$ 500,00", time: "5 dias" },
        { id: 3, name: "Fernando Lima", status: "Multado(a)", amount: "R$ 500,00", time: "2 dias" },
        { id: 4, name: "Letícia Alves", status: "Multado(a)", amount: "R$ 500,00", time: "15 dias" },
    ])

    const [isSyncing, setIsSyncing] = useState(false)
    const [syncProgress, setSyncProgress] = useState(0)
    const [syncComplete, setSyncComplete] = useState(false)

    const handleSync = () => {
        setIsSyncing(true)
        setSyncProgress(0)
        setSyncComplete(false)

        const interval = setInterval(() => {
            setSyncProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                        setIsSyncing(false)
                        setSyncComplete(true)
                        setTimeout(() => setSyncComplete(false), 1500)
                    }, 500)
                    return 100
                }
                return prev + 5
            })
        }, 100)
    }

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

        // Force reflow for Hana Viewer
        const handleLoad = () => {
            window.dispatchEvent(new Event('resize'))
        }
        window.addEventListener('load', handleLoad)
        // Also trigger immediately just in case
        handleLoad()

        return () => window.removeEventListener('load', handleLoad)
    }, [router])

    if (!isAdmin) return null

    return (
        <div className="min-h-screen bg-transparent text-white relative overflow-x-hidden">
            <HanaBackground />
            <DashboardHeader userName="Administrador" />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                <style jsx global>{`
                    body, html {
                        margin: 0;
                        padding: 0;
                        background: transparent !important;
                    }
                    .admin-card {
                        background: rgba(13, 13, 13, 0.5) !important;
                        backdrop-filter: blur(25px);
                        border: 1px solid rgba(139, 92, 246, 0.4) !important;
                        box-shadow: 0 0 30px rgba(139, 92, 246, 0.1);
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        transition: all 0.3s ease;
                    }
                    .admin-card:hover {
                        box-shadow: 0 0 50px rgba(139, 92, 246, 0.2);
                        border-color: rgba(139, 92, 246, 0.8) !important;
                    }
                    .sync-card {
                        background: rgba(13, 13, 13, 0.5) !important;
                        backdrop-filter: blur(25px);
                        border: 1px solid rgba(59, 130, 246, 0.4) !important;
                        box-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        transition: all 0.3s ease;
                        position: relative;
                    }
                    .sync-card::before {
                        content: '';
                        position: absolute;
                        inset: -1px;
                        border-radius: inherit;
                        padding: 1px;
                        background: linear-gradient(to right bottom, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.5));
                        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                        -webkit-mask-composite: xor;
                        mask-composite: exclude;
                        pointer-events: none;
                    }
                    .sync-card:hover {
                        box-shadow: 0 0 50px rgba(59, 130, 246, 0.2);
                        border-color: rgba(59, 130, 246, 0.8) !important;
                    }
                    .btn-neon-purple {
                        background: rgba(13, 13, 13, 0.8);
                        border: 1px solid rgba(139, 92, 246, 0.5);
                        color: white;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        position: relative;
                        overflow: hidden;
                    }
                    .btn-neon-purple:hover:not(:disabled) {
                        background: rgba(20, 20, 20, 0.9);
                        border-color: rgba(139, 92, 246, 1);
                        box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
                        transform: translateY(-2px);
                    }
                    .btn-neon-purple:active:not(:disabled) {
                        transform: scale(0.95);
                    }
                    .progress-bar {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        height: 100%;
                        background: linear-gradient(to right, rgba(139, 92, 246, 0.4), rgba(59, 130, 246, 0.4));
                        transition: width 0.1s linear;
                        pointer-events: none;
                        box-shadow: 0 0 15px rgba(139, 92, 246, 0.3);
                    }
                    @keyframes counter-feedback {
                        0% { transform: scale(1); text-shadow: 0 0 0px transparent; }
                        50% { transform: scale(1.1); text-shadow: 0 0 20px rgba(139, 92, 246, 0.8); }
                        100% { transform: scale(1); text-shadow: 0 0 0px transparent; }
                    }
                    .animate-counter-feedback {
                        animation: counter-feedback 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                    }
                    @keyframes pulse-once {
                        0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
                        100% { box-shadow: 0 0 0 20px rgba(139, 92, 246, 0); }
                    }
                    .animate-pulse-once:active {
                        animation: pulse-once 0.6s ease-out;
                    }
                    @keyframes icon-pulse {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.2); opacity: 0.7; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    .pulsing-icon {
                        animation: icon-pulse 2s infinite ease-in-out;
                    }
                `}</style>

                <div className="mb-12 relative z-10">
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <Shield className="size-10 text-[#635BFF]" />
                        Painel Administrativo
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-xs">LED</span>
                        <div className="h-px w-12 bg-zinc-800"></div>
                        <p className="text-zinc-500/60 font-medium text-sm">Gestão de alunos e administração</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 items-stretch">
                    <Card className="admin-card border-0 shadow-2xl overflow-hidden group">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                Gestão de Alunos
                            </CardTitle>
                            <Users className="size-4 text-[#635BFF] transition-transform group-hover:scale-110" />
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                            <div className="space-y-1">
                                <div className={`text-4xl font-black text-white tracking-tight transition-all duration-500 ${syncComplete ? 'animate-counter-feedback' : ''}`}>
                                    128 Alunos
                                </div>
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-2">
                                    <span className={`size-2 rounded-full transition-colors duration-300 shadow-[0_0_10px_rgba(34,197,94,0.3)] ${isSyncing ? 'bg-amber-500 shadow-amber-500/50 animate-pulse' : 'bg-green-500'}`}></span>
                                    {isSyncing ? 'Sincronizando dados...' : '+5 novos esta semana'}
                                </p>
                            </div>

                            <div className="mt-auto pt-10">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button className="w-full bg-[#635BFF] hover:bg-[#5851DB] text-white font-black uppercase tracking-[0.2em] h-14 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#635BFF]/20">
                                            Gerenciar
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="sm:max-w-xl bg-zinc-900/60 border-white/5 text-white backdrop-blur-2xl shadow-2xl">
                                        <SheetHeader>
                                            <SheetTitle className="text-2xl font-black flex items-center gap-3 text-white tracking-tight">
                                                <Users className="size-7 text-[#635BFF]" />
                                                ALUNOS ATIVOS
                                            </SheetTitle>
                                            <SheetDescription className="text-zinc-400 font-bold uppercase text-[10px] tracking-wide mt-1">
                                                Gestão completa de matrículas e acessos vigentes.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="mt-8 flex justify-center">
                                            <Button size="sm" className="bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/5 gap-2 h-10 font-black uppercase tracking-widest px-8 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-xl text-[10px]">
                                                <UserPlus className="size-4" />
                                                Adicionar Aluno
                                            </Button>
                                        </div>
                                        <div className="mt-8 border rounded-2xl border-white/5 overflow-hidden bg-white/[0.02]">
                                            <Table>
                                                <TableHeader className="bg-white/5">
                                                    <TableRow className="border-white/5 hover:bg-transparent">
                                                        <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-widest px-6">Aluno</TableHead>
                                                        <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Documentação</TableHead>
                                                        <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Tempo</TableHead>
                                                        <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-widest text-right px-6">Ação</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {students.map((student) => (
                                                        <TableRow key={student.id} className="border-white/5 hover:bg-white/5 transition-colors">
                                                            <TableCell className="px-6 font-bold text-sm">{student.name}</TableCell>
                                                            <TableCell className="space-y-1">
                                                                <p className="font-mono text-zinc-400 text-[10px] leading-none">MAT: {student.enrollment}</p>
                                                                <p className="text-zinc-500 text-[10px] leading-none font-bold">CPF: {student.cpf}</p>
                                                            </TableCell>
                                                            <TableCell className="text-zinc-400 text-xs font-bold">
                                                                <div className="flex items-center gap-1.5">
                                                                    <Clock className="size-3 opacity-50" />
                                                                    {student.timeInCourse}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-right px-6">
                                                                <Button variant="ghost" size="icon" className="size-8 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all">
                                                                    <UserMinus className="size-4" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="sync-card border-0 shadow-2xl overflow-hidden group">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                                Sincronização CSV
                            </CardTitle>
                            <FileUp className="size-5 text-[#8b5cf6] pulsing-icon" />
                        </CardHeader>
                        <CardContent className="flex flex-col flex-1">
                            <div className="space-y-1">
                                <div className="text-4xl font-black text-white tracking-tight">Importar Dados</div>
                                <p className="text-xs text-zinc-500/60 font-bold uppercase tracking-tight leading-relaxed">
                                    Atualize faturas e alunos via planilha oficial
                                </p>
                            </div>

                            <div className="mt-auto pt-10">
                                <Button
                                    onClick={handleSync}
                                    disabled={isSyncing}
                                    className="w-full btn-neon-purple border-0 h-14 font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-purple-500/5"
                                >
                                    {isSyncing && (
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${syncProgress}%` }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isSyncing ? 'Sincronizando...' : syncComplete ? 'Concluído! ✨' : 'Atualizar'}
                                    </span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12 flex justify-center relative z-10">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="text-zinc-500 hover:text-amber-500 hover:bg-amber-500/5 transition-all gap-2 font-black uppercase tracking-[0.2em] text-[10px] py-6 px-10 border border-transparent hover:border-amber-500/20 rounded-2xl group">
                                <AlertTriangle className="size-4 group-hover:animate-bounce" />
                                Ver Inadimplentes (12)
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xl bg-zinc-900/60 border-white/5 text-white backdrop-blur-2xl shadow-2xl">
                            <SheetHeader>
                                <SheetTitle className="text-2xl font-black flex items-center gap-3 text-white tracking-tight">
                                    <AlertTriangle className="size-7 text-amber-500" />
                                    ALUNOS INADIMPLENTES
                                </SheetTitle>
                                <SheetDescription className="text-zinc-400 font-bold uppercase text-[10px] tracking-wide mt-1">
                                    Monitoramento de faturas vencidas e multas aplicadas.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="mt-10 space-y-4">
                                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-4">
                                    <div className="size-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                        <DollarSign className="size-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-white uppercase tracking-tight">Valor</p>
                                        <p className="text-xl font-bold text-amber-500">R$ 500,00</p>
                                    </div>
                                </div>
                                <div className="mt-8 border rounded-2xl border-white/5 overflow-hidden bg-white/[0.02]">
                                    <Table>
                                        <TableHeader className="bg-white/5">
                                            <TableRow className="border-white/5 hover:bg-transparent">
                                                <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-widest px-6">Aluno</TableHead>
                                                <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-widest">Atraso</TableHead>
                                                <TableHead className="text-zinc-500 font-black uppercase text-[10px] tracking-widest text-right px-6">Valor Total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {delinquents.map((item) => (
                                                <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                                    <TableCell className="px-6">
                                                        <div>
                                                            <p className="font-bold text-sm text-white">{item.name}</p>
                                                            <p className="text-[10px] font-black text-amber-500/80 uppercase tracking-tight mt-0.5">{item.status}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-zinc-400 text-xs font-bold">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="size-3 opacity-50" />
                                                            {item.time}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right px-6">
                                                        <p className="font-mono text-sm font-black text-white">{item.amount}</p>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Spline Watermark Overlay Badge (Absolute Black & Refined Size) */}
                <div className="fixed bottom-5 right-2 z-[999]">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="bg-[#000000] hover:bg-[#141414] text-zinc-500/80 font-black tracking-[0.2em] uppercase text-[10px] h-11 w-40 rounded-2xl border border-white/5 shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer">
                                Admin
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[450px] sm:max-w-none bg-[#0D0D0D]/40 border-white/5 text-white backdrop-blur-[15px] shadow-2xl overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle className="text-3xl font-black flex items-center gap-3 text-white tracking-tight">
                                    <Shield className="size-8 text-[#635BFF]" />
                                    Informações
                                </SheetTitle>
                                <SheetDescription className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
                                    LED 2026
                                </SheetDescription>
                            </SheetHeader>

                            <div className="mt-10 space-y-8 text-zinc-300 leading-relaxed">
                                <p className="text-[15px] font-medium text-zinc-200 text-center px-12 leading-relaxed">
                                    O Painel Administrativo é a central de comando onde toda a mágica acontece nos bastidores da LED. Imagine que ele é o "cérebro" da escola, projetado para que a equipe de gestão não precise lidar com códigos complexos ou processos manuais demorados.
                                </p>

                                <div className="space-y-6">
                                    <h3 className="text-[#635BFF] font-black uppercase tracking-widest text-[10px] text-center">O que ele faz por você?</h3>

                                    <div className="grid gap-4">
                                        <div className="p-6 rounded-2xl bg-[#141414]/70 border border-white/5 backdrop-blur-[12px] hover:bg-[#141414]/90 transition-all group">
                                            <p className="font-bold text-white flex items-center gap-2 mb-2 text-sm">
                                                <Users className="size-4 text-[#635BFF]" />
                                                Gestão de Alunos Num Clique
                                            </p>
                                            <p className="text-[13px] text-zinc-200 font-medium leading-relaxed">Você visualiza instantaneamente quantos alunos estão ativos e quem entrou recentemente.</p>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-[#141414]/70 border border-white/5 backdrop-blur-[12px] hover:bg-[#141414]/90 transition-all group">
                                            <p className="font-bold text-white flex items-center gap-2 mb-2 text-sm">
                                                <FileUp className="size-4 text-[#8b5cf6]" />
                                                Sincronização Inteligente
                                            </p>
                                            <p className="text-[13px] text-zinc-200 font-medium leading-relaxed">Em vez de atualizar centenas de cadastros um por um, você apenas aperta o botao "Atualizar" e o sistema organiza tudo sozinho, atualizando faturas e dados em segundos.</p>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-[#141414]/70 border border-white/5 backdrop-blur-[12px] hover:bg-[#141414]/90 transition-all group">
                                            <p className="font-bold text-white flex items-center gap-2 mb-2 text-sm">
                                                <Key className="size-4 text-amber-500" />
                                                Controle de Acessos
                                            </p>
                                            <p className="text-[13px] text-zinc-200 font-medium leading-relaxed">Gestão completa do número de alunos, suas credenciais e o tempo de curso.</p>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-[#141414]/70 border border-white/5 backdrop-blur-[12px] hover:bg-[#141414]/90 transition-all group">
                                            <p className="font-bold text-white flex items-center gap-2 mb-2 text-sm">
                                                <Shield className="size-4 text-green-500" />
                                                Design de Nova Geração
                                            </p>
                                            <p className="text-[13px] text-zinc-200 font-medium leading-relaxed">O visual moderno e dinâmico não é apenas bonito; ele foi criado para que as informações mais importantes "saltem" aos olhos, evitando erros humanos.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/5">
                                    <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-6 flex items-center justify-center gap-2">
                                        <Clock className="size-4 text-zinc-500" />
                                        Entre em Contato
                                    </h3>
                                    <p className="text-[13px] text-zinc-200 mb-8 italic text-center px-6">
                                        Se você tem dúvidas sobre a operação, precisa de suporte técnico ou quer saber mais sobre como essa tecnologia escala o atendimento da LED, fale diretamente comigo:
                                    </p>

                                    <div className="p-6 rounded-3xl bg-[#635BFF]/5 border border-[#635BFF]/10 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Responsável</span>
                                            <span className="text-white font-bold">Otoniel Henrique</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">E-mail</span>
                                            <span className="text-[#635BFF] font-black text-sm">contactzklirt@gmail.com</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">LinkedIn</span>
                                            <a
                                                href="https://www.linkedin.com/in/otoniel-henrique-cavalcante-ribeiro-de-oliveira-65b4813aa/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#635BFF] font-black text-sm hover:underline"
                                            >
                                                Ver Perfil
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </main>
        </div>
    )
}
