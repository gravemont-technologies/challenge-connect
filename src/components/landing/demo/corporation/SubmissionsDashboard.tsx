import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, CheckCircle, XCircle, Star, ThumbsUp, ThumbsDown, 
  Award, AlertTriangle, FileText, RefreshCw, Flag 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ImpactScaler from "../shared/ImpactScaler";
import ValidationFlowVisual from "../shared/ValidationFlowVisual";

interface Submission {
  id: number;
  studentId: string;
  score: number;
  meetsKpi: boolean;
  breakdown: {
    accuracy: number;
    efficiency: number;
    creativity: number;
    documentation: number;
  };
  summary: string;
  flags: string[];
  aiFlags: {
    plagiarismRisk: boolean;
    formatCompliant: boolean;
    dataVerified: boolean;
  };
}

interface SubmissionsDashboardProps {
  onApprove: (submissions: Submission[]) => void;
  onBack: () => void;
}

const mockSubmissions: Submission[] = [
  {
    id: 1,
    studentId: "S-4821",
    score: 92,
    meetsKpi: true,
    breakdown: { accuracy: 95, efficiency: 88, creativity: 90, documentation: 94 },
    summary: "Proposed route optimization using dynamic clustering reduces delivery time by 23%. Implementation includes real-time adjustments.",
    flags: ["Exceeds expectations", "Local talent"],
    aiFlags: { plagiarismRisk: false, formatCompliant: true, dataVerified: true },
  },
  {
    id: 2,
    studentId: "S-7293",
    score: 88,
    meetsKpi: true,
    breakdown: { accuracy: 90, efficiency: 85, creativity: 88, documentation: 89 },
    summary: "Machine learning model for route prediction with 21% cost reduction. Includes driver app integration specs.",
    flags: ["Meets KPI"],
    aiFlags: { plagiarismRisk: false, formatCompliant: true, dataVerified: true },
  },
  {
    id: 3,
    studentId: "S-1056",
    score: 76,
    meetsKpi: false,
    breakdown: { accuracy: 80, efficiency: 70, creativity: 78, documentation: 76 },
    summary: "Basic route optimization with 15% improvement. Good foundation but missing real-time components.",
    flags: ["Below target", "Needs mentoring"],
    aiFlags: { plagiarismRisk: false, formatCompliant: true, dataVerified: false },
  },
  {
    id: 4,
    studentId: "S-3847",
    score: 84,
    meetsKpi: true,
    breakdown: { accuracy: 86, efficiency: 82, creativity: 84, documentation: 84 },
    summary: "Hybrid approach combining historical data analysis with predictive routing. Achieves 20% cost reduction target.",
    flags: ["Meets KPI", "Innovative approach"],
    aiFlags: { plagiarismRisk: false, formatCompliant: true, dataVerified: true },
  },
  {
    id: 5,
    studentId: "S-9124",
    score: 48,
    meetsKpi: false,
    breakdown: { accuracy: 52, efficiency: 48, creativity: 44, documentation: 48 },
    summary: "Incomplete submission with basic analysis. Missing key deliverables.",
    flags: ["Auto-rejected", "Below threshold"],
    aiFlags: { plagiarismRisk: true, formatCompliant: false, dataVerified: false },
  },
];

const SubmissionsDashboard = ({ onApprove, onBack }: SubmissionsDashboardProps) => {
  const [showValidationFlow, setShowValidationFlow] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [decisions, setDecisions] = useState<Record<number, "approved" | "rejected" | "revision">>({});
  const [rubricChecks, setRubricChecks] = useState<Record<number, { accurate: boolean; deployable: boolean; meetsThreshold: boolean }>>({});
  const [showImpact, setShowImpact] = useState(false);

  // Filter out auto-rejected submissions (score < 50)
  const viableSubmissions = mockSubmissions.filter(s => s.score >= 50);
  const autoRejectedCount = mockSubmissions.length - viableSubmissions.length;
  
  const currentSubmission = viableSubmissions[currentIndex];
  const approvedCount = Object.values(decisions).filter((d) => d === "approved").length;

  const handleDecision = (decision: "approved" | "rejected" | "revision") => {
    setDecisions((prev) => ({ ...prev, [currentSubmission.id]: decision }));
    
    if (currentIndex < viableSubmissions.length - 1) {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 300);
    }
  };

  const handleRating = (value: number) => {
    setRatings((prev) => ({ ...prev, [currentSubmission.id]: value }));
  };

  const handleRubricCheck = (field: "accurate" | "deployable" | "meetsThreshold") => {
    setRubricChecks((prev) => ({
      ...prev,
      [currentSubmission.id]: {
        ...prev[currentSubmission.id],
        [field]: !prev[currentSubmission.id]?.[field],
      },
    }));
  };

  const allReviewed = Object.keys(decisions).length === viableSubmissions.length;

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-500";
  };

  if (showValidationFlow) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center mb-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Award className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">Processing Submissions</h3>
          <p className="text-muted-foreground text-sm mt-1">
            AI pre-scoring in progress...
          </p>
        </div>

        <ValidationFlowVisual 
          isAnimating={true} 
          onComplete={() => setShowValidationFlow(false)} 
        />

        {/* Auto-rejection notice */}
        <Card className="p-3 bg-muted/30 border-0">
          <div className="flex items-center gap-2 text-sm">
            <Flag className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              <span className="font-medium text-foreground">{autoRejectedCount}</span> submission(s) auto-filtered (below 50% threshold)
            </span>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <Award className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Review Submissions</h3>
        <p className="text-muted-foreground text-sm mt-1">
          {viableSubmissions.length} viable submissions • {autoRejectedCount} auto-filtered • ~5-10 min total
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>Reviewed: {Object.keys(decisions).length}/{viableSubmissions.length}</span>
        <span className="text-primary">Approved: {approvedCount}</span>
      </div>
      <Progress value={(Object.keys(decisions).length / viableSubmissions.length) * 100} className="h-1.5" />

      {!allReviewed ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSubmission.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-5 bg-card border-0 shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-medium text-foreground">Candidate {currentSubmission.studentId}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentSubmission.flags.map((flag) => (
                      <Badge
                        key={flag}
                        variant={flag.includes("Below") ? "destructive" : flag.includes("Exceeds") ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {flag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold ${getScoreColor(currentSubmission.score)}`}>
                    {currentSubmission.score}
                  </p>
                  <p className="text-xs text-muted-foreground">AI Score</p>
                </div>
              </div>

              {/* AI Flags - Plagiarism, Format, Data Verification */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge 
                  variant={currentSubmission.aiFlags.plagiarismRisk ? "destructive" : "outline"}
                  className="text-xs"
                >
                  {currentSubmission.aiFlags.plagiarismRisk ? (
                    <><AlertTriangle className="w-3 h-3 mr-1" /> Plagiarism Risk</>
                  ) : (
                    <><CheckCircle className="w-3 h-3 mr-1" /> Original</>
                  )}
                </Badge>
                <Badge 
                  variant={currentSubmission.aiFlags.formatCompliant ? "outline" : "secondary"}
                  className="text-xs"
                >
                  {currentSubmission.aiFlags.formatCompliant ? (
                    <><FileText className="w-3 h-3 mr-1" /> Format OK</>
                  ) : (
                    <><AlertTriangle className="w-3 h-3 mr-1" /> Format Issues</>
                  )}
                </Badge>
                <Badge 
                  variant={currentSubmission.aiFlags.dataVerified ? "outline" : "secondary"}
                  className="text-xs"
                >
                  {currentSubmission.aiFlags.dataVerified ? "Data Verified" : "Data Unverified"}
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {Object.entries(currentSubmission.breakdown).map(([key, value]) => (
                  <div key={key} className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-sm font-medium">{value}%</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{key}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-4">{currentSubmission.summary}</p>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">KPI Status:</span>
                {currentSubmission.meetsKpi ? (
                  <Badge variant="outline" className="border-emerald-500 text-emerald-600">
                    <CheckCircle className="w-3 h-3 mr-1" /> Meets Target
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-red-400 text-red-500">
                    <XCircle className="w-3 h-3 mr-1" /> Below Target
                  </Badge>
                )}
              </div>

              {/* Rubric Checkboxes */}
              <div className="bg-muted/30 rounded-lg p-3 mb-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">Quick Rubric Check</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`accurate-${currentSubmission.id}`}
                      checked={rubricChecks[currentSubmission.id]?.accurate || false}
                      onCheckedChange={() => handleRubricCheck("accurate")}
                    />
                    <Label htmlFor={`accurate-${currentSubmission.id}`} className="text-xs cursor-pointer">
                      Accurate?
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`deployable-${currentSubmission.id}`}
                      checked={rubricChecks[currentSubmission.id]?.deployable || false}
                      onCheckedChange={() => handleRubricCheck("deployable")}
                    />
                    <Label htmlFor={`deployable-${currentSubmission.id}`} className="text-xs cursor-pointer">
                      Deployable?
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`threshold-${currentSubmission.id}`}
                      checked={rubricChecks[currentSubmission.id]?.meetsThreshold || false}
                      onCheckedChange={() => handleRubricCheck("meetsThreshold")}
                    />
                    <Label htmlFor={`threshold-${currentSubmission.id}`} className="text-xs cursor-pointer">
                      Meets Threshold?
                    </Label>
                  </div>
                </div>
              </div>

              {/* Rating slider */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Your Rating</label>
                  <span className="text-sm text-primary font-semibold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {ratings[currentSubmission.id] || 5}/10
                  </span>
                </div>
                <Slider
                  value={[ratings[currentSubmission.id] || 5]}
                  onValueChange={([v]) => handleRating(v)}
                  min={1}
                  max={10}
                  step={1}
                />
              </div>

              {/* Action buttons - 3 options */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600 text-xs"
                  onClick={() => handleDecision("rejected")}
                >
                  <ThumbsDown className="w-4 h-4 mr-1" /> Reject
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-amber-200 hover:bg-amber-50 hover:text-amber-600 text-xs"
                  onClick={() => handleDecision("revision")}
                >
                  <RefreshCw className="w-4 h-4 mr-1" /> Revision
                </Button>
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-xs"
                  onClick={() => handleDecision("approved")}
                >
                  <ThumbsUp className="w-4 h-4 mr-1" /> Approve
                </Button>
              </div>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {viableSubmissions.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentIndex((prev) => Math.min(viableSubmissions.length - 1, prev + 1))}
                disabled={currentIndex === viableSubmissions.length - 1}
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <Card className="p-4 bg-primary/5 border-0">
            <p className="text-center font-medium text-foreground mb-2">
              All submissions reviewed!
            </p>
            <p className="text-center text-sm text-muted-foreground">
              {approvedCount} approved • {Object.values(decisions).filter(d => d === "revision").length} revision requested • {Object.values(decisions).filter(d => d === "rejected").length} rejected
            </p>
            <p className="text-center text-xs text-muted-foreground mt-1">
              Total time: ~{Math.max(5, viableSubmissions.length * 2)} minutes
            </p>
          </Card>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowImpact(!showImpact)}
          >
            {showImpact ? "Hide" : "Show"} Projected Impact
          </Button>

          {showImpact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <ImpactScaler
                baseMetrics={{
                  costReduction: 28,
                  timesSaved: 8,
                  studentsEngaged: approvedCount,
                }}
              />
            </motion.div>
          )}
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={() => onApprove(viableSubmissions.filter((s) => decisions[s.id] === "approved"))}
          disabled={approvedCount === 0}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Continue ({approvedCount} approved)
        </Button>
      </div>
    </motion.div>
  );
};

export default SubmissionsDashboard;
