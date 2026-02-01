import TahqeeqLogo from "@/components/brand/TahqeeqLogo";
import HeroSection from "@/components/landing/HeroSection";
import DailyLifeAccordions from "@/components/landing/DailyLifeAccordions";
import { SettingsBar } from "@/components/landing/SettingsBar";
import CTASection from "@/components/landing/CTASection";
import BrandedText from "@/components/brand/BrandedText";
import CountrySelector from "@/components/landing/CountrySelector";

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
          <div className="flex items-center gap-4">
            <CountrySelector />
            <span className="text-sm text-muted-foreground hidden md:inline tracking-wide">
              {t("app.tagline") || "Operational Excellence Platform"}
            </span>
          </div>
        </div>
      </header>

      <HeroSection />
      <DailyLifeAccordions />
      <CTASection />

      {/* Footer - Refined */}
      <footer className="py-10 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} <BrandedText className="text-sm" />. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Index;