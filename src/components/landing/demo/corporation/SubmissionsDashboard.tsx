import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Star, ThumbsUp, ThumbsDown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import ImpactScaler from "../shared/ImpactScaler";

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
  },
  {
    id: 2,
    studentId: "S-7293",
    score: 88,
    meetsKpi: true,
    breakdown: { accuracy: 90, efficiency: 85, creativity: 88, documentation: 89 },
    summary: "Machine learning model for route prediction with 21% cost reduction. Includes driver app integration specs.",
    flags: ["Meets KPI"],
  },
  {
    id: 3,
    studentId: "S-1056",
    score: 76,
    meetsKpi: false,
    breakdown: { accuracy: 80, efficiency: 70, creativity: 78, documentation: 76 },
    summary: "Basic route optimization with 15% improvement. Good foundation but missing real-time components.",
    flags: ["Below target", "Needs mentoring"],
  },
  {
    id: 4,
    studentId: "S-3847",
    score: 84,
    meetsKpi: true,
    breakdown: { accuracy: 86, efficiency: 82, creativity: 84, documentation: 84 },
    summary: "Hybrid approach combining historical data analysis with predictive routing. Achieves 20% cost reduction target.",
    flags: ["Meets KPI", "Innovative approach"],
  },
  {
    id: 5,
    studentId: "S-9124",
    score: 71,
    meetsKpi: false,
    breakdown: { accuracy: 72, efficiency: 68, creativity: 74, documentation: 70 },
    summary: "Traditional optimization methods with 12% improvement. Solid execution but below KPI threshold.",
    flags: ["Below target"],
  },
];

const SubmissionsDashboard = ({ onApprove, onBack }: SubmissionsDashboardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [decisions, setDecisions] = useState<Record<number, "approved" | "rejected">>({});
  const [showImpact, setShowImpact] = useState(false);

  const currentSubmission = mockSubmissions[currentIndex];
  const approvedCount = Object.values(decisions).filter((d) => d === "approved").length;

  const handleSwipe = (direction: "left" | "right") => {
    const newDecision = direction === "right" ? "approved" : "rejected";
    setDecisions((prev) => ({ ...prev, [currentSubmission.id]: newDecision }));
    
    if (currentIndex < mockSubmissions.length - 1) {
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 300);
    }
  };

  const handleRating = (value: number) => {
    setRatings((prev) => ({ ...prev, [currentSubmission.id]: value }));
  };

  const allReviewed = Object.keys(decisions).length === mockSubmissions.length;

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-500";
  };

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
          AI pre-scored submissions • Swipe or click to decide
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <span>Reviewed: {Object.keys(decisions).length}/{mockSubmissions.length}</span>
        <span className="text-primary">Approved: {approvedCount}</span>
      </div>
      <Progress value={(Object.keys(decisions).length / mockSubmissions.length) * 100} className="h-1.5" />

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

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleSwipe("left")}
                >
                  <ThumbsDown className="w-4 h-4 mr-2" /> Reject
                </Button>
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleSwipe("right")}
                >
                  <ThumbsUp className="w-4 h-4 mr-2" /> Approve
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
                {currentIndex + 1} of {mockSubmissions.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentIndex((prev) => Math.min(mockSubmissions.length - 1, prev + 1))}
                disabled={currentIndex === mockSubmissions.length - 1}
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
              {approvedCount} approved • {mockSubmissions.length - approvedCount} rejected
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
          onClick={() => onApprove(mockSubmissions.filter((s) => decisions[s.id] === "approved"))}
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
