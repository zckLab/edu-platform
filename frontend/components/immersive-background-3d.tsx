"use client"
import React, { useEffect } from "react"

export function ImmersiveBackground3D() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const viewer = document.querySelector('spline-viewer');
      if (viewer) {
        // Manually dispatch the mouse event to the Spline viewer
        // This bypasses DOM layer blocking for the 3D motor
        viewer.dispatchEvent(new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
          bubbles: true
        }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="spline-bg-container">
      <spline-viewer
        url="https://prod.spline.design/J4vKYDPZ4midNFfV/scene.splinecode"
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
