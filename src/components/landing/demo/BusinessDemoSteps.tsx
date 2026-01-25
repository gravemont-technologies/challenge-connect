import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Users, BarChart3, CheckCircle, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface StepProps {
  onNext: () => void;
  onPrev?: () => void;
}

// Step 1: Input Task
export const BusinessStep1 = ({ onNext }: StepProps) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [kpi, setKpi] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const handleAutoSuggest = () => {
    if (taskDescription.toLowerCase().includes("logistics")) {
      setSuggestion("Target 20% cost reduction?");
    } else if (taskDescription.toLowerCase().includes("marketing")) {
      setSuggestion("Target 15% engagement increase?");
    } else if (taskDescription.toLowerCase().includes("data")) {
      setSuggestion("Target 95% accuracy rate?");
    } else {
      setSuggestion("Define measurable outcomes for better matching");
    }
  };

  const applySuggestion = () => {
    if (suggestion) {
      setKpi(suggestion);
      setSuggestion(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Step 1: Define Your Challenge</h3>
        <p className="text-muted-foreground text-sm mt-1">Describe your business problem and success criteria</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="task">Task Description</Label>
          <Textarea
            id="task"
            placeholder="e.g., We need help optimizing our logistics route planning to reduce delivery times..."
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kpi">Key Performance Indicator (KPI)</Label>
          <div className="flex gap-2">
            <Input
              id="kpi"
              placeholder="e.g., Reduce costs by 20%"
              value={kpi}
              onChange={(e) => setKpi(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAutoSuggest}
              className="shrink-0"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Suggest
            </Button>
          </div>
        </div>

        {suggestion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="p-3 bg-accent/50 rounded-md border border-accent"
          >
            <p className="text-sm text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-foreground" />
              AI Suggestion: <span className="font-medium">{suggestion}</span>
              <Button size="sm" variant="ghost" onClick={applySuggestion} className="ml-auto">
                Apply
              </Button>
            </p>
          </motion.div>
        )}
      </div>

      <Button
        onClick={onNext}
        disabled={!taskDescription || !kpi}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Continue to Launch
      </Button>
    </motion.div>
  );
};

// Step 2: Approve & Launch
export const BusinessStep2 = ({ onNext, onPrev }: StepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Users className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Step 2: Approve & Launch</h3>
        <p className="text-muted-foreground text-sm mt-1">Review your anonymized challenge and matched students</p>
      </div>

      {/* Disguised Challenge Preview */}
      <Card className="p-4 bg-muted/50 border-0">
        <h4 className="font-medium text-foreground mb-2">Challenge Preview (Anonymized)</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p><strong>Title:</strong> Route Optimization Analysis</p>
          <p><strong>Category:</strong> Operations & Logistics</p>
          <p><strong>Difficulty:</strong> Intermediate</p>
          <p><strong>Time Estimate:</strong> 8-12 hours</p>
          <p><strong>Success Metric:</strong> Achieve 20% cost reduction target</p>
        </div>
        <Badge variant="outline" className="mt-3">Company Identity Hidden</Badge>
      </Card>

      {/* Simulated Matches */}
      <Card className="p-4 bg-card border-0 shadow-sm">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Matched Candidates
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total matches found:</span>
            <span className="font-medium">5 students</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Local talent prioritized:</span>
            <span className="font-medium text-primary">3 students</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average fit score:</span>
            <span className="font-medium">87%</span>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
          Launch Challenge
        </Button>
      </div>
    </motion.div>
  );
};

// Step 3: Monitor Progress
export const BusinessStep3 = ({ onNext, onPrev }: StepProps) => {
  const [progress, setProgress] = useState(0);
  const [submissions, setSubmissions] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 30) setSubmissions(1);
    if (progress >= 50) setSubmissions(2);
    if (progress >= 70) setSubmissions(3);
    if (progress >= 90) setSubmissions(4);
    if (progress >= 100) setSubmissions(5);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Step 3: Monitor Progress</h3>
        <p className="text-muted-foreground text-sm mt-1">Watch as students work on your challenge</p>
      </div>

      <Card className="p-6 bg-card border-0 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Challenge Progress</span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-semibold text-foreground">{submissions}</p>
              <p className="text-xs text-muted-foreground">Submissions</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-2xl font-semibold text-foreground">
                {Math.floor((10 - progress / 10))}d
              </p>
              <p className="text-xs text-muted-foreground">Time Left</p>
            </div>
          </div>
        </div>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        {progress < 100 
          ? "Simulating real-time progress updates..." 
          : "All submissions received!"}
      </p>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={progress < 100}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Review Submissions
        </Button>
      </div>
    </motion.div>
  );
};

// Step 4: Validate Outputs
export const BusinessStep4 = ({ onNext, onPrev }: StepProps) => {
  const [decisions, setDecisions] = useState<Record<number, "approved" | "rejected" | null>>({
    1: null, 2: null, 3: null
  });

  const submissions = [
    { id: 1, name: "Student A", score: 92, meets: true },
    { id: 2, name: "Student B", score: 88, meets: true },
    { id: 3, name: "Student C", score: 71, meets: false },
  ];

  const handleDecision = (id: number, decision: "approved" | "rejected") => {
    setDecisions((prev) => ({ ...prev, [id]: decision }));
  };

  const allDecided = Object.values(decisions).every((d) => d !== null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Step 4: Validate Outputs</h3>
        <p className="text-muted-foreground text-sm mt-1">Review AI-scored submissions and make decisions</p>
      </div>

      <div className="space-y-3">
        {submissions.map((sub) => (
          <Card key={sub.id} className="p-4 bg-card border-0 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-foreground">{sub.name}</span>
              <Badge variant={sub.meets ? "default" : "secondary"}>
                Score: {sub.score}/100
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {sub.meets 
                ? "✓ Meets KPI: Achieves 20% cost reduction target" 
                : "✗ Below KPI: Only achieves 12% reduction"}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={decisions[sub.id] === "approved" ? "default" : "outline"}
                onClick={() => handleDecision(sub.id, "approved")}
                className={decisions[sub.id] === "approved" ? "bg-primary" : ""}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant={decisions[sub.id] === "rejected" ? "destructive" : "outline"}
                onClick={() => handleDecision(sub.id, "rejected")}
              >
                Reject
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!allDecided}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Finalize
        </Button>
      </div>
    </motion.div>
  );
};

// Step 5: Convert & Repeat
export const BusinessStep5 = ({ onPrev }: StepProps & { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Award className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Step 5: Convert & Repeat</h3>
        <p className="text-muted-foreground text-sm mt-1">Hire top talent and scale your pipeline</p>
      </div>

      <Card className="p-6 bg-accent/20 border-0">
        <div className="text-center">
          <Award className="w-10 h-10 text-primary mx-auto mb-3" />
          <h4 className="font-semibold text-foreground mb-2">Internship Offered!</h4>
          <p className="text-sm text-muted-foreground">
            Student A (Score: 92/100) has been offered an internship position.
          </p>
        </div>
      </Card>

      <Card className="p-4 bg-card border-0 shadow-sm">
        <h4 className="font-medium text-foreground mb-3">Suggested Next Steps</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            Post a follow-up challenge for inventory optimization
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            Build a talent pool from approved candidates
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            Schedule onboarding for your new intern
          </li>
        </ul>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
      </div>
    </motion.div>
  );
};
