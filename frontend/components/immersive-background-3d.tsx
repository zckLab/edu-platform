"use client"
import React, { useEffect, useRef } from "react"

export function ImmersiveBackground3D() {
  const rafIdRef = useRef<number | null>(null)
  const pendingEventRef = useRef<MouseEvent | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Store latest event, only dispatch on next animation frame
      pendingEventRef.current = e

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(() => {
          const evt = pendingEventRef.current
          if (evt) {
            const viewer = document.querySelector('spline-viewer')
            if (viewer) {
              viewer.dispatchEvent(new MouseEvent('mousemove', {
                clientX: evt.clientX,
                clientY: evt.clientY,
                screenX: evt.screenX,
                screenY: evt.screenY,
                bubbles: true
              }))
            }
          }
          pendingEventRef.current = null
          rafIdRef.current = null
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [])

  return (
    <div className="spline-bg-container">
      <spline-viewer
        url="https://prod.spline.design/J4vKYDPZ4midNFfV/scene.splinecode"
        loading="lazy"
        device-pixel-ratio="1"
      />

      <style jsx global>{`
        .spline-bg-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1;
          pointer-events: auto !important;
          background: transparent !important;
        }
        spline-viewer {
          width: 100% !important;
          height: 100% !important;
          pointer-events: auto !important;
          background: transparent !important;
        }
      `}</style>
    </div>
  )
}
