import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Qual a duração dos cursos?",
    answer: [
      "Os cursos profissionalizantes variam de 40 a 240 horas. Já os cursos técnicos têm duração de 2 anos com aulas teóricas e práticas."
    ],
  },
  {
    question: "Os cursos possuem certificado?",
    answer: [
      "Sim! Todos os cursos possuem certificado reconhecido. Os cursos técnicos possuem registro no MEC."
    ],
  },
  {
    question: "Existe aula prática?",
    answer: [
      "Sim! Nossos cursos combinam teoria e prática em laboratórios modernos e equipados, garantindo aprendizado real."
    ],
  },
  {
    question: "Qual a idade mínima?",
    answer: [
      "A idade mínima para os cursos profissionalizantes é de 18 anos. Para os cursos técnicos, é necessário ter concluído ou estar cursando o ensino médio."
    ],
  },
  {
    question: "Como faço para me matricular?",
    answer: [
      "Você pode se matricular presencialmente em nossa sede ou entrar em contato pelo WhatsApp para iniciar o processo de matrícula de forma rápida e simples.",
      "Documentos necessários (Cursos Técnicos):",
      "• 2 fotos 3x4 (recentes)",
      "• RG e CPF (cópias)",
      "• Certificado e histórico do Ensino Médio",
      "• Comprovante de residência atualizado"
    ],
  },
];

const FAQSection = () => {
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Perguntas Frequentes</h2>
          <p className="text-muted-foreground text-lg">Tire suas dúvidas sobre nossos cursos</p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="gradient-card shadow-card rounded-xl border px-6 data-[state=open]:shadow-card-hover transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 space-y-3 text-sm md:text-base">
                  {faq.answer.map((line, i) => {
                    const isHeader = line.endsWith(':');
                    const isListItem = line.startsWith('•');

                    if (isHeader) {
                      return (
                        <p key={i} className="font-semibold text-foreground pt-2">
                          {line}
                        </p>
                      );
                    }

                    if (isListItem) {
                      return (
                        <div key={i} className="flex items-start gap-2 pl-2">
                          <span className="text-primary font-bold mt-0.5">•</span>
                          <span className="text-muted-foreground/90">{line.replace('• ', '')}</span>
                        </div>
                      );
                    }

                    return (
                      <p key={i} className="leading-relaxed">
                        {line}
                      </p>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
