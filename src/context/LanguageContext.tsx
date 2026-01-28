import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "app.name": "Tahqeeq",
    "app.tagline": "Operational Excellence Platform",
    "settings.language": "Language",
    "settings.theme": "Theme",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "hero.title": "Discover Tahqeeq: Unlock Efficient Ops with Local Talent",
    "hero.subtitle": "Turn routine operational tasks into targeted challenges for GCC university students. Save 20-40% on costs and time while building a local talent pipeline.",
    "role.student": "Student",
    "role.business": "Business",
    "cta.getStarted": "Get Started",
    "cta.learnMore": "Learn More"
  },
  ar: {
    "app.name": "تحقيق",
    "app.tagline": "منصة التميز التشغيلي",
    "settings.language": "اللغة",
    "settings.theme": "المظهر",
    "settings.light": "فاتح",
    "settings.dark": "داكن",
    "hero.title": "اكتشف تحقيق: أطلق العنان للكفاءة التشغيلية مع المواهب المحلية",
    "hero.subtitle": "حول المهام التشغيلية الروتينية إلى تحديات محددة لطلاب الجامعات في دول مجلس التعاون الخليجي. وفر ٢٠-٤٠٪ من التكلفة والوقت مع بناء قاعدة مواهب محلية.",
    "role.student": "طالب",
    "role.business": "شركة",
    "cta.getStarted": "ابدأ الآن",
    "cta.learnMore": "تعرف على المزيد"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (undefined === context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
