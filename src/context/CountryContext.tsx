import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Country {
  id: string;
  name: string;
  flag: string;
  color: string;
  currency: string;
  currencySymbol: string;
}

const countries: Country[] = [
  { id: "QA", name: "Qatar", flag: "🇶🇦", color: "0 65% 22%", currency: "QAR", currencySymbol: "ر.ق" },
  { id: "SA", name: "Saudi Arabia", flag: "🇸🇦", color: "142 70% 29%", currency: "SAR", currencySymbol: "ر.س" },
  { id: "AE", name: "UAE", flag: "🇦🇪", color: "220 70% 25%", currency: "AED", currencySymbol: "د.إ" },
  { id: "OM", name: "Oman", flag: "🇴🇲", color: "25 90% 45%", currency: "OMR", currencySymbol: "ر.ع" },
  { id: "BH", name: "Bahrain", flag: "🇧🇭", color: "0 86% 47%", currency: "BHD", currencySymbol: "د.ب" },
];

interface CountryContextType {
  country: Country;
  setCountryById: (id: string) => void;
  countries: Country[];
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country>(countries[0]);

  const setCountryById = (id: string) => {
    const found = countries.find(c => c.id === id);
    if (found) setCountry(found);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", country.color);
  }, [country]);

  return (
    <CountryContext.Provider value={{ country, setCountryById, countries }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
}
