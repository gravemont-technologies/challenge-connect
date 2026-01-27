import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Moon, 
  Sun, 
  ChevronDown, 
  Info,
  Languages
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const countries = [
  { id: "QA", name: "Qatar", flag: "🇶🇦", color: "0 65% 22%" }, // Deep Maroon
  { id: "SA", name: "Saudi Arabia", flag: "🇸🇦", color: "142 70% 29%" }, // Green
  { id: "AE", name: "UAE", flag: "🇦🇪", color: "0 100% 25%" }, // Red
  { id: "OM", name: "Oman", flag: "🇴🇲", color: "0 84% 35%" }, // Red/Green
  { id: "BH", name: "Bahrain", flag: "🇧🇭", color: "0 86% 47%" }, // Red
];

export function SettingsBar() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [country, setCountry] = useState(countries[0]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", country.color);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [country, lang]);

  return (
    <div className="flex items-center gap-2 p-2 bg-muted/30 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLang(l => l === "en" ? "ar" : "en")}
            className="h-8 gap-2"
          >
            <Languages className="w-4 h-4" />
            <span className="text-xs font-medium">{lang === "en" ? "English" : "العربية"}</span>
          </Button>

          {/* Country Selection */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-2">
                <span className="text-lg leading-none">{country.flag}</span>
                <span className="text-xs font-medium hidden sm:inline">{country.name}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {countries.map((c) => (
                <DropdownMenuItem key={c.id} onClick={() => setCountry(c)} className="gap-2">
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}
