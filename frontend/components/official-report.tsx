"use client"

import { LedLogo } from "@/components/led-logo"
import { Invoice, User } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/mock-data"

interface OfficialReportProps {
    user: User
    invoices: Invoice[]
}

export function OfficialReport({ user, invoices }: OfficialReportProps) {
    const now = new Date()
    const currentTime = now.toLocaleTimeString("pt-BR")
    const currentDate = now.toLocaleDateString("pt-BR")

    const paidInvoices = invoices.filter(inv => inv.status === "paid")
    const totalPaid = paidInvoices.reduce((acc, inv) => acc + inv.amount, 0)

    return (
        <div className="bg-white text-black p-12 max-w-[800px] mx-auto shadow-lg print:shadow-none print:p-8 font-sans transition-all animate-in fade-in duration-700">
            {/* Header with Logo and Title */}
            <div className="flex justify-between items-start mb-10">
                <LedLogo className="h-24 w-auto" />
                <div className="text-right">
                    <h1 className="text-2xl font-bold tracking-tight text-[#1A1F36]">LED AUTOMACAO INDUSTRIAL</h1>
                    <p className="text-lg font-medium text-gray-600 mt-1">Declaração</p>
                    <p className="text-sm text-gray-500 mt-2">CNPJ: 08.942.709/0001-18</p>
                </div>
                <div className="text-right text-xs text-gray-400">
                    <p>{currentTime}</p>
                    <p>{currentDate}</p>
                </div>
            </div>

            {/* Main Text */}
            <div className="mb-10 text-sm leading-relaxed text-gray-700 text-justify">
                <p>
                    Declaramos, para os devidos fins, que o(a) Sr(a). <span className="font-bold uppercase">{user.name}</span>,
                    CPF <span className="font-bold">{user.cpf || "000.000.000-00"}</span>, responsável pelo aluno(a) abaixo,
                    efetuou o pagamento da(s) parcela(s) relacionada(s), referente(s) ao ano letivo de {now.getFullYear()}.
                </p>
            </div>

            {/* Student/Course Info Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-2 mb-8 text-[11px] border-t border-b border-gray-100 py-4 uppercase">
                <div className="flex justify-between border-b border-gray-50 pb-1">
                    <span className="text-gray-500">Aluno:</span>
                    <span className="font-bold">{user.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-1">
                    <span className="text-gray-500">Matrícula:</span>
                    <span className="font-bold">{user.cpf.slice(-6).toUpperCase()}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-1">
                    <span className="text-gray-500">Curso:</span>
                    <span className="font-bold">ELETROMECÂNICA</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-1">
                    <span className="text-gray-500">Turma:</span>
                    <span className="font-bold">FELM-161M</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-1">
                    <span className="text-gray-500">Desconto:</span>
                    <span className="font-bold">0,00</span>
                </div>
            </div>

            {/* Payments Table */}
            <table className="w-full text-[11px] mb-10 border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-gray-600 uppercase">
                        <th className="text-left py-2 px-3 border border-gray-100">Descrição</th>
                        <th className="text-center py-2 px-3 border border-gray-100">Vencimento</th>
                        <th className="text-center py-2 px-3 border border-gray-100">Pagamento</th>
                        <th className="text-right py-2 px-3 border border-gray-100">Valor Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {paidInvoices.length > 0 ? (
                        paidInvoices.map((inv, i) => (
                            <tr key={i} className="border-b border-gray-100">
                                <td className="py-2 px-3 border border-gray-100">{inv.description}</td>
                                <td className="text-center py-2 px-3 border border-gray-100">{formatDate(inv.dueDate)}</td>
                                <td className="text-center py-2 px-3 border border-gray-100">{formatDate(inv.dueDate)}</td>
                                <td className="text-right py-2 px-3 border border-gray-100 font-medium">{formatCurrency(inv.amount)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="py-4 text-center text-gray-400 italic">Nenhum pagamento registrado.</td>
                        </tr>
                    )}
                    <tr className="bg-gray-50/50">
                        <td colSpan={3} className="py-2 px-3 text-right font-bold uppercase border border-gray-100">Total Pago:</td>
                        <td className="py-2 px-3 text-right font-bold border border-gray-100">{formatCurrency(totalPaid)}</td>
                    </tr>
                </tbody>
            </table>

            {/* Location and Date */}
            <div className="text-center text-sm text-gray-700 mb-20">
                <p>São Luis, {now.getDate()} de {now.toLocaleString('pt-BR', { month: 'long' })} de {now.getFullYear()}</p>
            </div>

            {/* Signature Area */}
            <div className="flex flex-col items-center">
                <div className="w-80 border-t border-gray-400 mb-2"></div>
                <p className="text-sm font-medium text-gray-800">G R Dos Santos</p>
                <p className="text-[10px] text-gray-500 uppercase">08.942.709/0001-18</p>
            </div>

            {/* Print Helpers */}
            <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
        </div>
    )
}
