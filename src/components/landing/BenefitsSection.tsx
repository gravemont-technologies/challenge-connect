import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, Users, FileCheck, TrendingDown,
  Briefcase, FolderOpen, Award,
  UserCheck, Brain, Megaphone, ShieldCheck,
  Network, Lightbulb, ArrowUpRight, Handshake,
  Building, Repeat, Zap, Globe,
  Rocket, FileText, Star, Crown,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type TimeHorizon = "immediate" | "medium" | "long";

interface BenefitItem {
  key: string;
  icon: React.ElementType;
}

const benefitsData: Record<TimeHorizon, { corp: BenefitItem[]; student: BenefitItem[] }> = {
  immediate: {
    corp: [
      { key: "benefits.imm.corp.cost", icon: DollarSign },
      { key: "benefits.imm.corp.onboarding", icon: Users },
      { key: "benefits.imm.corp.qatarization", icon: FileCheck },
      { key: "benefits.imm.corp.overload", icon: TrendingDown },
    ],
    student: [
      { key: "benefits.imm.stu.experience", icon: Briefcase },
      { key: "benefits.imm.stu.portfolio", icon: FolderOpen },
      { key: "benefits.imm.stu.badges", icon: Award },
    ],
  },
  medium: {
    corp: [
      { key: "benefits.med.corp.conversion", icon: UserCheck },
      { key: "benefits.med.corp.ai", icon: Brain },
      { key: "benefits.med.corp.pr", icon: Megaphone },
      { key: "benefits.med.corp.churn", icon: ShieldCheck },
    ],
    student: [
      { key: "benefits.med.stu.network", icon: Network },
      { key: "benefits.med.stu.softskills", icon: Lightbulb },
      { key: "benefits.med.stu.levelups", icon: ArrowUpRight },
      { key: "benefits.med.stu.internships", icon: Handshake },
    ],
  },
  long: {
    corp: [
      { key: "benefits.long.corp.knowledge", icon: Building },
      { key: "benefits.long.corp.pipeline", icon: Repeat },
      { key: "benefits.long.corp.innovation", icon: Zap },
      { key: "benefits.long.corp.vision", icon: Globe },
    ],
    student: [
      { key: "benefits.long.stu.career", icon: Rocket },
      { key: "benefits.long.stu.resume", icon: FileText },
      { key: "benefits.long.stu.confidence", icon: Star },
      { key: "benefits.long.stu.advantage", icon: Crown },
    ],
  },
};

const tabs: { key: TimeHorizon; label: string }[] = [
  { key: "immediate", label: "benefits.tab.immediate" },
  { key: "medium", label: "benefits.tab.medium" },
  { key: "long", label: "benefits.tab.long" },
];

const BenefitBadge = ({
  item,
  isExpanded,
  onToggle,
}: {
  item: BenefitItem;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const { t } = useLanguage();
  const Icon = item.icon;

  return (
    <motion.button
      layout
      onClick={onToggle}
      className={`w-full text-start rounded-md border transition-all duration-200 ${
        isExpanded
          ? "bg-primary/5 border-primary/20 shadow-elite"
          : "bg-card border-border/30 hover:border-primary/15 hover:bg-muted/50"
      } p-3`}
    >
      <motion.div layout="position" className="flex items-center gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${
          isExpanded ? "bg-primary/10" : "bg-muted/80"
        } transition-colors`}>
          <Icon className={`w-4 h-4 ${isExpanded ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <span className={`text-sm font-medium flex-1 ${isExpanded ? "text-foreground" : "text-foreground/80"}`}>
          {t(item.key)}
        </span>
        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${isExpanded ? "text-primary" : "text-primary/40"}`} />
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-muted-foreground leading-relaxed mt-2 ps-11"
          >
            {t(`${item.key}.detail`)}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const BenefitsSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TimeHorizon>("immediate");
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const currentData = benefitsData[activeTab];

  const handleToggle = (key: string) => {
    setExpandedKey(expandedKey === key ? null : key);
  };

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-10 tracking-tight"
      >
        {t("benefits.heading")}
      </motion.h2>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex justify-center gap-2 mb-10"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setExpandedKey(null); }}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {t(tab.label)}
          </button>
        ))}
      </motion.div>

      {/* Badge Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Corps Column */}
          <div>
            <h3 className="text-xs font-semibold text-primary/70 uppercase tracking-[0.15em] mb-4">
              {t("benefits.side.corp")}
            </h3>
            <div className="space-y-2">
              {currentData.corp.map((item) => (
                <BenefitBadge
                  key={item.key}
                  item={item}
                  isExpanded={expandedKey === item.key}
                  onToggle={() => handleToggle(item.key)}
                />
              ))}
            </div>
          </div>

          {/* Student Column */}
          <div>
            <h3 className="text-xs font-semibold text-primary/70 uppercase tracking-[0.15em] mb-4">
              {t("benefits.side.student")}
            </h3>
            <div className="space-y-2">
              {currentData.student.map((item) => (
                <BenefitBadge
                  key={item.key}
                  item={item}
                  isExpanded={expandedKey === item.key}
                  onToggle={() => handleToggle(item.key)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default BenefitsSection;
