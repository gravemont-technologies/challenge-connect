import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, GraduationCap, Info, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import CorporationFlow from "./corporation/CorporationFlow";
import StudentFlow from "./student/StudentFlow";
import BrandedText from "@/components/brand/BrandedText";

type DemoRole = "corporation" | "student" | null;

interface EnhancedDemoProps {
  onClose: () => void;
}

const EnhancedDemo = ({ onClose }: EnhancedDemoProps) => {
  const [role, setRole] = useState<DemoRole>(null);
  const [completed, setCompleted] = useState(false);

  const handleReset = () => {
    setRole(null);
    setCompleted(false);
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10 text-center max-w-lg mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>
        <h3 className="text-2xl font-semibold text-foreground mb-3">Demo Complete!</h3>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          You've experienced how <BrandedText /> connects corporations with student talent through 
          precision-matched challenges. Ready to get started for real?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Card
            onClick={handleReset}
            className="p-4 cursor-pointer hover:shadow-elite transition-all bg-card border border-border/50 rounded-md"
          >
            <span className="text-sm font-medium">Try Another Role</span>
          </Card>
          <Card
            onClick={onClose}
            className="p-4 cursor-pointer hover:shadow-elite transition-all bg-primary text-primary-foreground border-0 rounded-md"
          >
            <span className="text-sm font-medium">Sign Up Now</span>
          </Card>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-8">
      {/* Simulation disclaimer */}
      <TooltipProvider>
        <div className="flex justify-center mb-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground cursor-help border border-border/30">
                <Info className="w-4 h-4" />
                <span className="tracking-wide">Interactive Demo</span>
                <Badge variant="secondary" className="text-xs font-normal">Simulation</Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>This simulates the real app with rule-based interactions. Sign up to use live features with actual data and real impact.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      <AnimatePresence mode="wait">
        {!role ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Welcome to <BrandedText className="text-2xl" />
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Experience the platform that connects operational excellence with emerging talent
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Card
                onClick={() => setRole("corporation")}
                className="p-8 cursor-pointer hover:shadow-elegant transition-all hover:scale-[1.02] bg-card border border-border/30 rounded-md w-full sm:w-72 text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/12 transition-colors">
                  <Building2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">I'm a Corporation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Launch mini hackathons from your KPIs, review AI-scored deliverables, and convert top talent
                </p>
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs font-normal">KPI → Hackathon</Badge>
                  <Badge variant="outline" className="text-xs font-normal">20-40% savings</Badge>
                </div>
              </Card>

              <Card
                onClick={() => setRole("student")}
                className="p-8 cursor-pointer hover:shadow-elegant transition-all hover:scale-[1.02] bg-card border border-border/30 rounded-md w-full sm:w-72 text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/8 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/12 transition-colors">
                  <GraduationCap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">I'm a Student</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Match with challenges, build your portfolio, and earn internship opportunities
                </p>
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs font-normal">Skill-based matching</Badge>
                  <Badge variant="outline" className="text-xs font-normal">Earn badges</Badge>
                </div>
              </Card>
            </div>
          </motion.div>
        ) : role === "corporation" ? (
          <motion.div
            key="corporation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CorporationFlow onReset={handleReset} onComplete={handleComplete} />
          </motion.div>
        ) : (
          <motion.div
            key="student"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StudentFlow onReset={handleReset} onComplete={handleComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedDemo;