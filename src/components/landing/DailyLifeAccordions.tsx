import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

const corpKeys = [
  "daily.corp.1", "daily.corp.2", "daily.corp.3",
  "daily.corp.4", "daily.corp.5", "daily.corp.6",
];

const stuKeys = [
  "daily.stu.1", "daily.stu.2", "daily.stu.3",
  "daily.stu.4", "daily.stu.5", "daily.stu.6",
];

const DailyLifeAccordions = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-12 tracking-tight"
      >
        {t("daily.heading")}
      </motion.h2>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="corporation"
              className="bg-card rounded-md border border-border/30 px-6 data-[state=open]:shadow-elite transition-shadow"
            >
              <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline py-5 tracking-tight">
                {t("daily.corp.title")}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <ul className="space-y-3">
                  {corpKeys.map((key, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                      <span className="leading-relaxed">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="student"
              className="bg-card rounded-md border border-border/30 px-6 data-[state=open]:shadow-elite transition-shadow"
            >
              <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline py-5 tracking-tight">
                {t("daily.stu.title")}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <ul className="space-y-3">
                  {stuKeys.map((key, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                      <span className="leading-relaxed">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyLifeAccordions;
