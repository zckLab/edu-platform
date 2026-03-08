import { LoginForm } from "@/components/login-form"
import Script from "next/script"
import React from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

export default function LoginPage() {
  const SplineViewer = 'spline-viewer' as any

  return (
    <main className="h-screen w-full flex overflow-hidden bg-[#0D0D0D]">
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.12.67/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />

      {/* Lado Esquerdo (70% - Cena 3D Full Height) */}
      <div className="hidden md:flex flex-[7] relative h-full items-center justify-center bg-[#0D0D0D] spline-side overflow-hidden">
        <SplineViewer
          url="https://prod.spline.design/HlQppNESmgOMAq-k/scene.splinecode"
          events-target="global"
          loading-library="lazy"
          className="w-full h-full"
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        />

        {/* Branding Wall para cobertura TOTAL e bloqueio de cliques */}
        <div className="absolute bottom-2 right-2 w-[160px] h-[48px] bg-black rounded-lg flex items-center justify-center z-50 pointer-events-auto cursor-default shadow-2xl border border-white/5">
          <span className="text-[11px] text-zinc-400 font-sans tracking-widest uppercase">
            © LED 2026
          </span>
        </div>
      </div>

      {/* Lado Direito (30% - Painel de Login) */}
      <div className="w-full md:flex-[3] h-full flex items-center justify-center p-8 bg-[#0D0D0D] border-l border-white/5 z-10 relative shadow-[-20px_0_50px_rgba(0,0,0,0.5)] login-side">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-right-8 duration-1000">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

