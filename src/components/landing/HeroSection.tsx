import { motion } from "framer-motion";
import BrandedText from "@/components/brand/BrandedText";

import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-medium text-primary/70 uppercase tracking-[0.2em] mb-6"
      >
        {t("app.tagline") || "Operational Excellence Platform"}
      </motion.p>
      
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-10 leading-[1.15] tracking-tight"
      >
        {t("hero.title")}
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12"
      >
        {t("hero.subtitle")}
      </motion.p>
    </section>
  );
};

export default HeroSection;