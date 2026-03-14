import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface CourseCardProps {
  title: string;
  description: string;
  featured?: boolean;
  badge?: string;
  learnMore: string;
}

const CourseCard = ({ title, description, featured, badge, learnMore }: CourseCardProps) => (
  <motion.div
    className={`relative p-6 rounded-2xl border transition-all duration-300 ${
      featured
        ? "gradient-cta border-transparent text-primary-foreground shadow-primary-glow"
        : "gradient-card border-border shadow-card hover:shadow-card-hover"
    }`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
  >
    {badge && (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
        featured ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
      }`}>
        {badge}
      </span>
    )}
    <h3 className={`text-xl font-bold mb-2 ${featured ? "" : "text-foreground"}`}>{title}</h3>
    <p className={`text-sm mb-6 ${featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{description}</p>
    <Button
      variant={featured ? "secondary" : "default"}
      size="sm"
      className={`rounded-lg font-semibold ${featured ? "text-foreground" : ""}`}
      onClick={() => document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" })}
    >
      {learnMore} <ArrowRight className="ml-1 h-4 w-4" />
    </Button>
  </motion.div>
);

const CoursesSection = () => {
  const { t } = useTranslation();

  const profissionalizantes = [
    { title: t("courses.prof.nr10"), description: t("courses.prof.nr10Desc") },
    { title: t("courses.prof.nr10Comp"), description: t("courses.prof.nr10CompDesc") },
    { title: t("courses.prof.nr35"), description: t("courses.prof.nr35Desc") },
    { title: t("courses.prof.frentista"), description: t("courses.prof.frentistaDesc") },
    { title: t("courses.prof.refrigeracao"), description: t("courses.prof.refrigeracaoDesc") },
  ];

  const eletricidade = [
    { title: t("courses.elec.basica"), description: t("courses.elec.basicaDesc") },
    { title: t("courses.elec.industrial"), description: t("courses.elec.industrialDesc") },
    { title: t("courses.elec.altaBaixa"), description: t("courses.elec.altaBaixaDesc") },
  ];

  const tecnicos = [
    { title: t("courses.tech.eletromec"), description: t("courses.tech.eletromecDesc"), badge: t("courses.tech.badge") },
    { title: t("courses.tech.eletrotec"), description: t("courses.tech.eletrotecDesc"), badge: t("courses.tech.badge") },
    { title: t("courses.tech.automacao"), description: t("courses.tech.automacaoDesc"), badge: t("courses.tech.badge") },
  ];

  return (
    <section id="cursos" className="py-24 bg-secondary/50">
      <div className="container">
        {/* Profissionalizantes */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t("courses.professionalTitle")}</h2>
          <p className="text-muted-foreground mb-10 text-lg">{t("courses.professionalSubtitle")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profissionalizantes.map((c) => (
              <CourseCard key={c.title} {...c} learnMore={t("courses.learnMore")} />
            ))}
          </div>
        </motion.div>

        {/* Eletricidade */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t("courses.electricityTitle")}</h2>
          <p className="text-muted-foreground mb-10 text-lg">{t("courses.electricitySubtitle")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eletricidade.map((c) => (
              <CourseCard key={c.title} {...c} learnMore={t("courses.learnMore")} />
            ))}
          </div>
        </motion.div>

        {/* Técnicos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("courses.technicalTitle")}</h2>
            <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">
              {t("courses.technicalDuration")}
            </span>
          </div>
          <p className="text-muted-foreground mb-10 text-lg">{t("courses.technicalSubtitle")}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {tecnicos.map((c) => (
              <CourseCard key={c.title} {...c} featured learnMore={t("courses.learnMore")} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
