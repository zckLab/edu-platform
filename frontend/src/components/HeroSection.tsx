import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/559885268000";



const HeroSection = () => {
  const splineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Dynamically load the spline-viewer script to ensure it works correctly in the React lifecycle
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.68/build/spline-viewer.js";
    document.body.appendChild(script);

    return () => {
      // Optional cleanup if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const viewer = splineRef.current;
    if (!viewer) return;

    // The CSS that will be injected INTO the shadow root to permanently hide UI
    const KILL_CSS = `
      #logo, [part="logo"], .spline-watermark,
      #hint, [part="hint"],
      div[style*="cursor"], div[style*="pointer"],
      svg, img:not([src*="blob"]) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        pointer-events: none !important;
        position: absolute !important;
        clip: rect(0,0,0,0) !important;
      }
    `;

    // Inject CSS into shadowRoot — do NOT remove elements (Spline re-creates them)
    const injectKillCSS = (shadowRoot: ShadowRoot) => {
      if (!shadowRoot.querySelector('style[data-led-kill]')) {
        const style = document.createElement('style');
        style.setAttribute('data-led-kill', 'true');
        style.textContent = KILL_CSS;
        shadowRoot.appendChild(style);
      }
    };

    // Watch for shadowRoot availability and any DOM changes inside it
    const observer = new MutationObserver(() => {
      if (viewer.shadowRoot) {
        injectKillCSS(viewer.shadowRoot);
      }
    });

    // Force attributes
    viewer.setAttribute('hint', 'false');
    viewer.setAttribute('cursor', 'false');
    viewer.setAttribute('touch-action', 'none');

    // Start observing
    const startObserving = () => {
      if (viewer.shadowRoot) {
        injectKillCSS(viewer.shadowRoot);
        observer.observe(viewer.shadowRoot, { childList: true, subtree: true });
      }
    };

    // Try immediately and keep polling until shadowRoot is available
    startObserving();
    const poll = setInterval(() => {
      if (viewer.shadowRoot) {
        startObserving();
        clearInterval(poll);
      }
    }, 50);

    // Force wake-up for Spline WebGL engine
    window.dispatchEvent(new Event('resize'));
    viewer.removeAttribute('loading');

    return () => {
      clearInterval(poll);
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: "radial-gradient(circle, #1a1a1a 0%, #0d0d0d 100%)" }}
    >
      {/* Forced Spline Background - No delays */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none min-h-[100vh]"
      >
        {/* @ts-ignore */}
        <spline-viewer 
          ref={splineRef}
          url="https://prod.spline.design/MGQudzz4R8QG6eSw/scene.splinecode" 
          loading="eager" 
          events-target="global"
          hint="false"
          cursor="false"
          touch-action="none"
          power-preference="low-power"
          orbit-events="none"
          style={{ pointerEvents: 'none' }}
        ></spline-viewer>
      </div>

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary-foreground/80 mb-8"
            >
              Matrículas abertas — Vagas limitadas
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary-foreground leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Sua carreira na{" "}
            <span className="text-primary">indústria</span>{" "}
            começa aqui
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Cursos técnicos e profissionalizantes voltados ao mercado industrial.
            Aulas práticas, certificação reconhecida e alta empregabilidade.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="gradient-cta text-primary-foreground shadow-primary-glow text-lg px-8 py-6 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              onClick={() => document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver cursos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 text-primary-foreground bg-primary-foreground/5 hover:bg-primary-foreground/10 text-lg px-8 py-6 rounded-xl font-semibold"
              asChild
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </motion.div>

          {/* Static Info Cards */}
          <motion.div
            className="mt-16 flex flex-wrap gap-4 justify-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {[
              { label: "NR-10", desc: "Segurança" },
              { label: "Elétrica", desc: "Industrial" },
              { label: "Técnico", desc: "2 anos" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 text-center min-w-[140px] flex-1 sm:flex-none"
              >
                <p className="text-primary font-bold text-base mb-1">{item.label}</p>
                <p className="text-primary-foreground/50 text-sm whitespace-nowrap">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator with click and hover effect - Isolated from group to avoid glitches */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer p-2 flex items-center justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            const nextSection = document.querySelector('section:nth-of-type(2)');
            if (nextSection) {
              const targetPosition = nextSection.getBoundingClientRect().top + window.scrollY;
              const startPosition = window.scrollY;
              const distance = targetPosition - startPosition;
              const duration = 1200;
              let start: number | null = null;

              const step = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const t = Math.min(progress / duration, 1);
                const ease = 1 - Math.pow(1 - t, 3);
                
                window.scrollTo(0, startPosition + distance * ease);
                if (progress < duration) {
                  window.requestAnimationFrame(step);
                }
              };
              window.requestAnimationFrame(step);
            }
          }}
          whileHover={{ scale: 1.2 }}
        >
          <ChevronDown className="h-8 w-8 text-primary-foreground/40 hover:text-primary transition-colors" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
