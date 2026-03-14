import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const splineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.68/build/spline-viewer.js";
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const viewer = splineRef.current;
    if (!viewer) return;

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

    const injectKillCSS = (shadowRoot: ShadowRoot) => {
      if (!shadowRoot.querySelector('style[data-viewer-kill]')) {
        const style = document.createElement('style');
        style.setAttribute('data-viewer-kill', 'true');
        style.textContent = KILL_CSS;
        shadowRoot.appendChild(style);
      }
    };

    const observer = new MutationObserver(() => {
      if (viewer.shadowRoot) {
        injectKillCSS(viewer.shadowRoot);
      }
    });

    viewer.setAttribute('hint', 'false');
    viewer.setAttribute('cursor', 'false');
    viewer.setAttribute('touch-action', 'none');

    const startObserving = () => {
      if (viewer.shadowRoot) {
        injectKillCSS(viewer.shadowRoot);
        observer.observe(viewer.shadowRoot, { childList: true, subtree: true });
      }
    };

    startObserving();
    const poll = setInterval(() => {
      if (viewer.shadowRoot) {
        startObserving();
        clearInterval(poll);
      }
    }, 50);

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
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-primary-foreground leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t("hero.title1")}{" "}
            <span className="text-primary">{t("hero.titleHighlight")}</span>{" "}
            {t("hero.title2")}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-primary-foreground/60 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("hero.description")}
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
              {t("hero.viewCourses")}
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
              { label: t("hero.nr10"), desc: t("hero.safety") },
              { label: t("hero.electrical"), desc: t("hero.industrial") },
              { label: t("hero.technical"), desc: t("hero.twoYears") },
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
