import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const FAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    { question: t("faq.items.q1"), answer: t("faq.items.a1") },
    { question: t("faq.items.q2"), answer: t("faq.items.a2") },
    { question: t("faq.items.q3"), answer: t("faq.items.a3") },
    { question: t("faq.items.q4"), answer: t("faq.items.a4") },
    { question: t("faq.items.q5"), answer: t("faq.items.a5") },
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t("faq.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("faq.subtitle")}</p>
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
                <AccordionContent className="text-muted-foreground pb-5 text-sm md:text-base">
                  <p className="leading-relaxed">{faq.answer}</p>
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
