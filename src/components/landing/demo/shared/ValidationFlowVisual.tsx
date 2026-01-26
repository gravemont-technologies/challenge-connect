import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, CheckCircle, ArrowRight, Filter, Shield, MessageSquare, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ValidationFlowVisualProps {
  isAnimating?: boolean;
  onComplete?: () => void;
}

const ValidationFlowVisual = ({ isAnimating = true, onComplete }: ValidationFlowVisualProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: "ai-filter",
      icon: Filter,
      label: "AI Pre-Score",
      sublabel: "~80% automated",
      description: "Filters 70-80% junk, scores 0-100",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      id: "business-gate",
      icon: Shield,
      label: "Business Gate",
      sublabel: "5-10 min review",
      description: "Human approval with rubric checkboxes",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "feedback-loop",
      icon: MessageSquare,
      label: "Feedback Loop",
      sublabel: "~20% human touch",
      description: "Badges, notes, intern fast-track",
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  useEffect(() => {
    if (!isAnimating) return;

    const stepDuration = 2000;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, stepDuration * 3 / 50);

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => onComplete?.(), 500);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [isAnimating, onComplete, steps.length]);

  return (
    <Card className="p-6 bg-card border-0 shadow-sm">
      <div className="text-center mb-6">
        <h4 className="font-semibold text-foreground mb-1">Hybrid Validation Flow</h4>
        <p className="text-xs text-muted-foreground">80% AI-driven • 20% human oversight</p>
      </div>

      {/* Flow diagram */}
      <div className="flex items-center justify-between gap-2 mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: index <= activeStep ? 1 : 0.8,
                opacity: index <= activeStep ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  index <= activeStep ? step.bgColor : "bg-muted"
                }`}
              >
                <step.icon
                  className={`w-5 h-5 transition-colors ${
                    index <= activeStep ? step.color : "text-muted-foreground"
                  }`}
                />
              </div>
              <span className="text-xs font-medium mt-2 text-center">{step.label}</span>
              <span className="text-[10px] text-muted-foreground">{step.sublabel}</span>
            </motion.div>
            
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index < activeStep ? 1 : 0.3 }}
                className="mx-1"
              >
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <Progress value={progress} className="h-1.5 mb-4" />

      {/* Active step details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-muted/50 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full ${steps[activeStep].bgColor}`}>
              {React.createElement(steps[activeStep].icon, {
                className: `w-4 h-4 ${steps[activeStep].color}`,
              })}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{steps[activeStep].label}</p>
              <p className="text-xs text-muted-foreground">{steps[activeStep].description}</p>
              
              {activeStep === 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-[10px]">Completeness check</Badge>
                  <Badge variant="secondary" className="text-[10px]">Format validation</Badge>
                  <Badge variant="secondary" className="text-[10px]">Plagiarism scan</Badge>
                </div>
              )}
              
              {activeStep === 1 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-[10px]">Rubric checkboxes</Badge>
                  <Badge variant="secondary" className="text-[10px]">One-click approve</Badge>
                  <Badge variant="secondary" className="text-[10px]">Request revision</Badge>
                </div>
              )}
              
              {activeStep === 2 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-[10px]">Badge unlock</Badge>
                  <Badge variant="secondary" className="text-[10px]">Private notes</Badge>
                  <Badge variant="secondary" className="text-[10px]">Intern fast-track</Badge>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Metrics summary */}
      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        <div className="bg-muted/30 rounded p-2">
          <p className="text-lg font-bold text-primary">70-80%</p>
          <p className="text-[10px] text-muted-foreground">Auto-filtered</p>
        </div>
        <div className="bg-muted/30 rounded p-2">
          <p className="text-lg font-bold text-primary">5-10 min</p>
          <p className="text-[10px] text-muted-foreground">Review time</p>
        </div>
        <div className="bg-muted/30 rounded p-2">
          <p className="text-lg font-bold text-primary">1-3</p>
          <p className="text-[10px] text-muted-foreground">Top submissions</p>
        </div>
      </div>
    </Card>
  );
};

export default ValidationFlowVisual;
