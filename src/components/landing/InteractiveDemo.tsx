import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, GraduationCap, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type DemoType = "business" | "student" | null;

const businessSteps = [
  {
    title: "Post Your Challenge",
    description: "Describe your business problem, set KPIs, and define success criteria. Our AI helps structure it for maximum clarity.",
  },
  {
    title: "AI Finds Your Matches",
    description: "Our algorithm scans student profiles, skills, and past performance to surface the top 5–10 candidates for your challenge.",
  },
  {
    title: "Review Anonymized Work",
    description: "Submissions arrive anonymized. Evaluate purely on merit—no bias, no names, just quality work.",
  },
  {
    title: "Score & Provide Feedback",
    description: "Rate submissions, leave actionable feedback. Top performers emerge based on objective criteria.",
  },
  {
    title: "Extend Offers",
    description: "Impressed? Offer internships or full-time roles directly to proven talent. Skip the traditional hiring funnel.",
  },
];

const studentSteps = [
  {
    title: "Build Your Profile",
    description: "Highlight your skills, coursework, and interests. The more complete, the better your matches.",
  },
  {
    title: "Discover Challenges",
    description: "Browse curated challenges matched to your expertise. See fit scores and estimated time commitments.",
  },
  {
    title: "Submit Your Solution",
    description: "Work on real problems, submit your approach. Your work speaks for itself—no interviews, no resumes.",
  },
  {
    title: "Get Expert Feedback",
    description: "Receive detailed feedback from industry professionals. Learn, iterate, improve.",
  },
  {
    title: "Earn & Advance",
    description: "Accumulate points, unlock badges, climb the leaderboard. Top performers get internship offers.",
  },
];

interface DemoProps {
  onClose: () => void;
}

const InteractiveDemo = ({ onClose }: DemoProps) => {
  const [demoType, setDemoType] = useState<DemoType>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = demoType === "business" ? businessSteps : studentSteps;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  return (
    <div className="py-8">
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
            className="max-w-2xl mx-auto"
          >
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "w-8 bg-primary"
                      : index < currentStep
                      ? "w-2 bg-primary/60"
                      : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.25 }}
                className="bg-card rounded-lg shadow-sm p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <span className="text-primary font-semibold text-lg">{currentStep + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {steps[currentStep].title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                variant="ghost"
                onClick={handleReset}
                className="text-muted-foreground"
              >
                Change Role
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={onClose}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Got It
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveDemo;
