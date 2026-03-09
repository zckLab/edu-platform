import { LoginForm } from "@/components/login-form"
import { OptimizedSpline } from "@/components/optimized-spline"
import Script from "next/script"
import React from "react"


export default function LoginPage() {
  return (
    <main className="h-screen w-full flex overflow-hidden bg-[#0D0D0D]">
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.12.67/build/spline-viewer.js"
        type="module"
        strategy="afterInteractive"
      />

      <OptimizedSpline />

      {/* Lado Direito (30% - Painel de Login) */}
      <div className="w-full md:flex-[3] h-full flex items-center justify-center p-8 bg-[#0D0D0D] border-l border-white/5 z-10 relative shadow-[-20px_0_50px_rgba(0,0,0,0.5)] login-side">
        <div className="w-full max-w-sm animate-in fade-in slide-in-from-right-8 duration-1000" style={{ willChange: 'transform, opacity' }}>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

