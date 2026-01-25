import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, GraduationCap, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  BusinessStep1,
  BusinessStep2,
  BusinessStep3,
  BusinessStep4,
  BusinessStep5,
} from "./demo/BusinessDemoSteps";
import {
  StudentStep1,
  StudentStep2,
  StudentStep3,
  StudentStep4,
  StudentStep5,
} from "./demo/StudentDemoSteps";

type DemoType = "business" | "student" | null;

interface DemoProps {
  onClose: () => void;
}

const InteractiveDemo = ({ onClose }: DemoProps) => {
  const [demoType, setDemoType] = useState<DemoType>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setDemoType(null);
    setCurrentStep(0);
  };

  const renderBusinessStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessStep1 onNext={handleNext} />;
      case 1:
        return <BusinessStep2 onNext={handleNext} onPrev={handlePrev} />;
      case 2:
        return <BusinessStep3 onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <BusinessStep4 onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <BusinessStep5 onNext={handleNext} onPrev={handlePrev} onClose={onClose} />;
      default:
        return null;
    }
  };

  const renderStudentStep = () => {
    switch (currentStep) {
      case 0:
        return <StudentStep1 onNext={handleNext} />;
      case 1:
        return <StudentStep2 onNext={handleNext} onPrev={handlePrev} />;
      case 2:
        return <StudentStep3 onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <StudentStep4 onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <StudentStep5 onNext={handleNext} onPrev={handlePrev} onClose={onClose} />;
      default:
        return null;
    }
  };

  const stepLabels =
    demoType === "business"
      ? ["Define Task", "Launch", "Monitor", "Validate", "Convert"]
      : ["Profile", "Match", "Submit", "Feedback", "Portfolio"];

  return (
    <div className="py-8">
      {/* Simulation Tooltip */}
      <TooltipProvider>
        <div className="flex justify-center mb-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground cursor-help">
                <Info className="w-4 h-4" />
                <span>Interactive Demo</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>This simulates the real app – sign up to use live features with actual data.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      <AnimatePresence mode="wait">
        {!demoType ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Card
              onClick={() => setDemoType("business")}
              className="p-8 cursor-pointer hover:shadow-md transition-shadow bg-card border-0 shadow-sm w-full sm:w-64 text-center group"
            >
              <Building2 className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-foreground">As a Business</h3>
              <p className="text-sm text-muted-foreground mt-2">See how companies find talent</p>
            </Card>

            <Card
              onClick={() => setDemoType("student")}
              className="p-8 cursor-pointer hover:shadow-md transition-shadow bg-card border-0 shadow-sm w-full sm:w-64 text-center group"
            >
              <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-foreground">As a Student</h3>
              <p className="text-sm text-muted-foreground mt-2">See how students grow careers</p>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="steps"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl mx-auto"
          >
            {/* Step indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {stepLabels.map((label, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center flex-1 ${
                      index <= currentStep ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        index < currentStep
                          ? "bg-primary text-primary-foreground"
                          : index === currentStep
                          ? "bg-primary/20 text-primary border-2 border-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-xs mt-1 hidden sm:block">{label}</span>
                  </div>
                ))}
              </div>
              {/* Progress line */}
              <div className="flex items-center gap-1 px-4">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              {demoType === "business" ? renderBusinessStep() : renderStudentStep()}
            </AnimatePresence>

            {/* Reset button */}
            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={handleReset}
                className="text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Change Role
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveDemo;
