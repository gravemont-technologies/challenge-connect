import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToDemo = () => {
    const el = document.getElementById("cta-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <BackgroundPaths>
      <section className="py-28 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-medium text-primary/70 uppercase tracking-[0.2em] mb-6"
        >
          {t("app.tagline")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8 leading-[1.15] tracking-tight"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <Button
            onClick={scrollToDemo}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 py-6 text-sm tracking-wide rounded-md shadow-elite hover:shadow-elegant transition-all"
          >
            {t("hero.cta")}
            <span className="ms-2">↓</span>
          </Button>
        </motion.div>
      </section>
    </BackgroundPaths>
  );
};

export default HeroSection;
