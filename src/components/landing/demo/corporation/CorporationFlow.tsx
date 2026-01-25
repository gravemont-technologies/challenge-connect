import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskInputStep, { TaskData } from "./TaskInputStep";
import SubmissionsDashboard from "./SubmissionsDashboard";
import InternConversion from "./InternConversion";
import NetworkVisualization from "../shared/NetworkVisualization";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CorporationFlowProps {
  onReset: () => void;
  onComplete: () => void;
}

type FlowStep = "input" | "launching" | "dashboard" | "conversion";

const CorporationFlow = ({ onReset, onComplete }: CorporationFlowProps) => {
  const [step, setStep] = useState<FlowStep>("input");
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [approvedCandidates, setApprovedCandidates] = useState<{ studentId: string; score: number }[]>([]);

  const stepLabels = ["Define Task", "Launch", "Review", "Convert"];
  const currentStepIndex = step === "input" ? 0 : step === "launching" ? 1 : step === "dashboard" ? 2 : 3;

  const handleTaskSubmit = (task: TaskData) => {
    setTaskData(task);
    setStep("launching");
  };

  const handleLaunchComplete = () => {
    setStep("dashboard");
  };

  const handleApprove = (submissions: { id: number; studentId: string; score: number }[]) => {
    setApprovedCandidates(submissions.map((s) => ({ studentId: s.studentId, score: s.score })));
    setStep("conversion");
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {stepLabels.map((label, index) => (
            <div
              key={index}
              className={`flex flex-col items-center flex-1 ${
                index <= currentStepIndex ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  index < currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : index === currentStepIndex
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
        <div className="flex items-center gap-1 px-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < currentStepIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {step === "input" && (
          <motion.div key="input" exit={{ opacity: 0, x: -20 }}>
            <TaskInputStep onSubmit={handleTaskSubmit} />
          </motion.div>
        )}

        {step === "launching" && (
          <motion.div
            key="launching"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-foreground">Launching Challenge</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Matching students to your task...
              </p>
            </div>
            
            <NetworkVisualization isAnimating={true} onComplete={handleLaunchComplete} />
            
            <p className="text-center text-sm text-muted-foreground">
              Finding optimal matches based on skills and availability
            </p>
          </motion.div>
        )}

        {step === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <SubmissionsDashboard
              onApprove={handleApprove}
              onBack={() => setStep("input")}
            />
          </motion.div>
        )}

        {step === "conversion" && (
          <motion.div
            key="conversion"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <InternConversion
              approvedCandidates={approvedCandidates}
              onComplete={onComplete}
              onBack={() => setStep("dashboard")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset button */}
      <div className="mt-6 text-center">
        <Button variant="ghost" onClick={onReset} className="text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change Role
        </Button>
      </div>
    </div>
  );
};

export default CorporationFlow;
