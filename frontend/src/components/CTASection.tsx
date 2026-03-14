import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const CTASection = () => {
  const { t } = useTranslation();
  const splineRef = useRef<HTMLElement>(null);

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
    <section className="py-24 relative overflow-hidden" style={{ background: "transparent" }}>
      {/* Spline Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* @ts-ignore */}
        <spline-viewer 
          ref={splineRef}
          url="https://prod.spline.design/3bltOGugiBkvBAya/scene.splinecode" 
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

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-primary-foreground/60 mb-10 max-w-xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="gradient-cta text-primary-foreground shadow-primary-glow text-lg px-10 py-7 rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-105"
              onClick={() => document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("cta.button")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
