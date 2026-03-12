import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  description: string;
  featured?: boolean;
  badge?: string;
}

const CourseCard = ({ title, description, featured, badge }: CourseCardProps) => (
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
      asChild
    >
      <a href="https://wa.me/559885268000" target="_blank" rel="noopener noreferrer">
        Saiba mais <ArrowRight className="ml-1 h-4 w-4" />
      </a>
    </Button>
  </motion.div>
);

const profissionalizantes = [
  { title: "NR-10", description: "Segurança em instalações e serviços em eletricidade. Curso obrigatório para profissionais da área elétrica." },
  { title: "NR-10 Complementar", description: "Complementação para trabalhos no SEP — Sistema Elétrico de Potência." },
  { title: "NR-35", description: "Trabalho em altura com segurança. Capacitação obrigatória conforme norma regulamentadora." },
  { title: "Frentista + NR-20", description: "Formação completa para frentistas com capacitação em segurança com inflamáveis e combustíveis." },
  { title: "Refrigeração", description: "Instalação e manutenção de sistemas de refrigeração e ar condicionado." },
];

const eletricidade = [
  { title: "Eletricidade Básica e Predial", description: "Fundamentos de eletricidade e instalações elétricas prediais residenciais e comerciais." },
  { title: "Eletricidade Industrial + CLP", description: "Comandos elétricos industriais e programação de Controladores Lógicos Programáveis." },
  { title: "Eletricidade Alta e Baixa Tensão", description: "Instalações e manutenção em sistemas de alta e baixa tensão." },
];

const tecnicos = [
  { title: "Técnico em Eletromecânica", description: "Formação completa em sistemas elétricos e mecânicos industriais. Manutenção e automação.", badge: "2 anos" },
  { title: "Técnico em Eletrotécnica", description: "Projetos, instalação e manutenção de sistemas elétricos de potência e controle.", badge: "2 anos" },
  { title: "Técnico em Automação Industrial", description: "Sistemas automatizados, robótica, CLP e instrumentação industrial.", badge: "2 anos" },
];

const CoursesSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Cursos Profissionalizantes</h2>
          <p className="text-muted-foreground mb-10 text-lg">Capacitação rápida para o mercado de trabalho</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profissionalizantes.map((c) => (
              <CourseCard key={c.title} {...c} />
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Cursos de Eletricidade</h2>
          <p className="text-muted-foreground mb-10 text-lg">Torne-se um profissional completo em eletricidade</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eletricidade.map((c) => (
              <CourseCard key={c.title} {...c} />
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Cursos Técnicos</h2>
            <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold">
              Duração: 2 anos
            </span>
          </div>
          <p className="text-muted-foreground mb-10 text-lg">Formação técnica completa com certificação reconhecida</p>
          <div className="grid md:grid-cols-3 gap-6">
            {tecnicos.map((c) => (
              <CourseCard key={c.title} {...c} featured />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
