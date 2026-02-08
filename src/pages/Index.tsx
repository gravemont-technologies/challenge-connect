import TahqeeqLogo from "@/components/brand/TahqeeqLogo";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import DailyLifeAccordions from "@/components/landing/DailyLifeAccordions";
import { SettingsBar } from "@/components/landing/SettingsBar";
import CTASection from "@/components/landing/CTASection";
import BrandedText from "@/components/brand/BrandedText";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-background">
      <SettingsBar />
      
      {/* Header - Elite & Minimal */}
      <header className="py-5 px-6 md:px-12 lg:px-24 border-b border-border/50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <TahqeeqLogo size="md" />
          <span className="text-sm text-muted-foreground hidden sm:inline tracking-wide">
            {t("app.tagline")}
          </span>
        </div>
      </header>

      <HeroSection />
      <BenefitsSection />
      <DailyLifeAccordions />
      <CTASection />

      {/* Footer - Refined */}
      <footer className="py-10 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} <BrandedText className="text-sm" />. {t("footer.rights")}
        </div>
      </footer>
    </main>
  );
};

export default Index;
