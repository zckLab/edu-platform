"use client"
import React from "react"
import Script from "next/script"

export function HanaBackground() {
    return (
        <div className="bg-viewport">
            <Script
                src="https://unpkg.com/@splinetool/viewer@1.12.67/build/spline-viewer.js"
                type="module"
            />
            <spline-viewer url="https://prod.spline.design/KX7dPR7jjSMeZblW/scene.splinecode" />

            <style jsx global>{`
        .bg-viewport {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          pointer-events: auto; /* Permite interação com as partículas no fundo */
        }

        spline-viewer {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
        </div>
    )
}
