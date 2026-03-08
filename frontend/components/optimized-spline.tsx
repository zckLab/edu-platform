"use client"

import React from "react"

export function OptimizedSpline() {
    const SplineViewer = 'spline-viewer' as any

    return (
        <div className="hidden md:flex flex-[7] relative h-full items-center justify-center bg-[#0D0D0D] spline-side overflow-hidden">
            <SplineViewer
                url="https://prod.spline.design/HlQppNESmgOMAq-k/scene.splinecode"
                events-target="global"
                loading-library="lazy"
                className="w-full h-full"
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            />

            {/* Overlay para cobrir "Built with Spline" com mesma estética */}
            <div className="absolute bottom-2 right-2 w-[160px] h-[48px] bg-black rounded-lg flex items-center justify-center z-50 pointer-events-auto cursor-default shadow-2xl border border-white/5">
                <span className="text-[11px] text-zinc-400 font-sans tracking-widest uppercase">
                    © LED 2026
                </span>
            </div>
        </div>
    )
}
