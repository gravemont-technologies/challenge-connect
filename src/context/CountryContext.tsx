import { createContext, useContext, useState, ReactNode } from "react";

export type Country = "oman" | "uae";

interface CountryContextType {
  country: Country;
  setCountry: (country: Country) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [country, setCountry] = useState<Country>("oman");

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      <div className={country === "oman" ? "theme-oman" : "theme-uae"}>
        {children}
      </div>
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider");
  }
  return context;
};
