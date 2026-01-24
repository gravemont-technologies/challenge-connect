import HeroSection from "@/components/landing/HeroSection";
import DailyLifeAccordions from "@/components/landing/DailyLifeAccordions";
import CTASection from "@/components/landing/CTASection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-6 md:px-12 lg:px-24 border-b border-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-primary tracking-tight">
            Tahqeeq
          </h1>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            AI-Powered Talent Matching
          </span>
        </div>
      </header>

      <HeroSection />
      <DailyLifeAccordions />
      <CTASection />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tahqeeq. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Index;
