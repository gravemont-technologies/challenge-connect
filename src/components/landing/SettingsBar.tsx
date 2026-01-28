import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Moon, 
  Sun, 
  ChevronDown, 
  Info,
  Languages,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";

const countries = [
  { id: "QA", name: "Qatar", flag: "🇶🇦", color: "0 65% 22%" }, // Deep Maroon
  { id: "SA", name: "Saudi Arabia", flag: "🇸🇦", color: "142 70% 29%" }, // Green
  { id: "AE", name: "UAE", flag: "🇦🇪", color: "0 100% 25%" }, // Red
  { id: "OM", name: "Oman", flag: "🇴🇲", color: "142 70% 29%" }, // Red/Green
  { id: "BH", name: "Bahrain", flag: "🇧🇭", color: "0 86% 47%" }, // Red
];

export function SettingsBar() {
  const { language, setLanguage, t } = useLanguage();
  const [country, setCountry] = useState(countries[0]);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", country.color);
  }, [country]);

  return (
    <div className="flex items-center gap-2 p-2 bg-muted/30 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          {/* Settings Icon Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover-elevate">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={language === "ar" ? "end" : "start"} className="w-56">
              <DropdownMenuLabel>{t("settings.language")}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setLanguage("en")} className="flex justify-between">
                <span>English</span>
                {language === "en" && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ar")} className="flex justify-between">
                <span>العربية</span>
                {language === "ar" && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>{t("settings.theme")}</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setTheme("light")} className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  <span>{t("settings.light")}</span>
                </div>
                {theme === "light" && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  <span>{t("settings.dark")}</span>
                </div>
                {theme === "dark" && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="h-8 gap-2 px-2"
          >
            <Languages className="w-4 h-4" />
            <span className="text-xs font-medium">{language === "en" ? "AR" : "EN"}</span>
          </Button>
          
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
    </div>
  );
}
