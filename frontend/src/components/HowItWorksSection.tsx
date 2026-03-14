import { motion } from "framer-motion";
import { ClipboardCheck, BookOpen, Award, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: ClipboardCheck, title: t("howItWorks.steps.enrollment"), description: t("howItWorks.steps.enrollmentDesc") },
    { icon: BookOpen, title: t("howItWorks.steps.classes"), description: t("howItWorks.steps.classesDesc") },
    { icon: Award, title: t("howItWorks.steps.certification"), description: t("howItWorks.steps.certificationDesc") },
    { icon: Briefcase, title: t("howItWorks.steps.career"), description: t("howItWorks.steps.careerDesc") },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("howItWorks.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-cta shadow-primary-glow flex items-center justify-center mx-auto mb-5">
                <step.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">{t("howItWorks.step")} {i + 1}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
