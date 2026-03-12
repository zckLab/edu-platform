import { motion } from "framer-motion";
import { Zap, Wrench, Cpu, Sun } from "lucide-react";

const careers = [
  { icon: Zap, title: "Eletricista Industrial", description: "Alta demanda em fábricas, indústrias e grandes empresas." },
  { icon: Wrench, title: "Técnico em Manutenção", description: "Manutenção preventiva e corretiva de equipamentos industriais." },
  { icon: Cpu, title: "Automação Industrial", description: "Programação de CLPs, robótica e sistemas automatizados." },
  { icon: Sun, title: "Área de Energia", description: "Energia solar, eólica e sistemas de potência elétrica." },
];

const CareerSection = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Mercado de Trabalho</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Áreas com alta demanda e excelentes salários esperam por você
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {careers.map((career, i) => (
            <motion.div
              key={career.title}
              className="p-6 rounded-2xl gradient-card shadow-card hover:shadow-card-hover transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <career.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">{career.title}</h3>
              <p className="text-sm text-muted-foreground">{career.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;
