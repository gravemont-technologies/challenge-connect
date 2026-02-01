import { useCountry, Country } from "@/context/CountryContext";
import { motion } from "framer-motion";

const CountrySelector = () => {
  const { country, setCountry } = useCountry();

  const countries: { id: Country; label: string; flag: string }[] = [
    { id: "oman", label: "Oman", flag: "🇴🇲" },
    { id: "uae", label: "UAE", flag: "🇦🇪" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-full border border-border/30">
      {countries.map((c) => (
        <button
          key={c.id}
          onClick={() => setCountry(c.id)}
          className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            country === c.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {country === c.id && (
            <motion.div
              layoutId="country-bg"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <span>{c.flag}</span>
            <span className="hidden sm:inline">{c.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default CountrySelector;
