import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskInputStep, { TaskData } from "./TaskInputStep";
import SubmissionsDashboard from "./SubmissionsDashboard";
import InternConversion from "./InternConversion";
import NetworkVisualization from "../shared/NetworkVisualization";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface CorporationFlowProps {
  onReset: () => void;
  onComplete: () => void;
}

type FlowStep = "input" | "launching" | "dashboard" | "conversion";

const CorporationFlow = ({ onReset, onComplete }: CorporationFlowProps) => {
  const [step, setStep] = useState<FlowStep>("input");
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [approvedCandidates, setApprovedCandidates] = useState<{ studentId: string; score: number }[]>([]);

  const generateReport = () => {
    if (!taskData) return;
    
    const reportName = prompt("Enter report name:", `${taskData.title}_Session_Report`);
    if (!reportName) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(22);
    doc.setTextColor(90, 39, 39); // Deep Maroon
    doc.text("Tahqeeq: Operational Excellence Report", pageWidth / 2, 20, { align: "center" });

    // Project Overview
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("Project Overview", 14, 40);
    
    doc.setFontSize(11);
    const overviewData = [
      ["Title", taskData.title],
      ["Company", "Your Corporation"],
      ["Category", taskData.category],
      ["Budget", taskData.budget],
      ["Complexity", taskData.complexity],
      ["Timeline", taskData.timeline],
      ["Date", new Date().toLocaleDateString()]
    ];

    (doc as any).autoTable({
      startY: 45,
      head: [["Field", "Value"]],
      body: overviewData,
      theme: "striped",
      headStyles: { fillColor: [90, 39, 39] }
    });

    // Detailed Description
    const finalY = (doc as any).lastAutoTable.finalY || 45;
    doc.setFontSize(14);
    doc.text("Detailed Requirements", 14, finalY + 15);
    doc.setFontSize(10);
    const splitDescription = doc.splitTextToSize(taskData.description, pageWidth - 28);
    doc.text(splitDescription, 14, finalY + 22);

    // Participating Students
    if (approvedCandidates.length > 0) {
      doc.setFontSize(14);
      doc.text("Selected Talent Insights", 14, finalY + 45);
      
      const studentData = approvedCandidates.map((c, i) => [
        `Student #${i + 1}`,
        c.studentId,
        `${c.score}%`,
        "Verified GCC Talent"
      ]);

      (doc as any).autoTable({
        startY: finalY + 50,
        head: [["Rank", "ID/Name", "Fit Score", "Status"]],
        body: studentData,
        theme: "grid",
        headStyles: { fillColor: [90, 39, 39] }
      });
    }

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Tahqeeq PaaS - GCC Student Operational Excellence Platform", pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });

    doc.save(`${reportName}.pdf`);
  };

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
            className="space-y-6"
          >
            <InternConversion
              approvedCandidates={approvedCandidates}
              onComplete={onComplete}
              onBack={() => setStep("dashboard")}
            />
            
            <div className="pt-4 border-t">
              <Button 
                onClick={generateReport}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <FileText className="w-4 h-4" />
                Get Full Session Report (PDF)
              </Button>
            </div>
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
