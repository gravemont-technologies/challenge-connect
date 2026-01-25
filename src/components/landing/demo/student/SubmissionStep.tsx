import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Code, CheckCircle, AlertCircle, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SubmissionStepProps {
  challenge: {
    title: string;
  };
  onSubmit: (submission: { content: string; score: number }) => void;
  onBack: () => void;
}

const SubmissionStep = ({ challenge, onSubmit, onBack }: SubmissionStepProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preScore, setPreScore] = useState<{
    score: number;
    feedback: string[];
    warnings: string[];
  } | null>(null);

  const handlePreScore = () => {
    setIsSubmitting(true);
    
    // Simulate AI pre-scoring
    setTimeout(() => {
      const wordCount = content.split(/\s+/).filter(Boolean).length;
      const hasNumbers = /\d/.test(content);
      const hasTechnicalTerms = /algorithm|optimization|analysis|data|model|forecast/i.test(content);
      
      let score = 50;
      const feedback: string[] = [];
      const warnings: string[] = [];

      if (wordCount > 50) {
        score += 15;
        feedback.push("Good detail level");
      } else {
        warnings.push("Consider adding more detail");
      }

      if (hasNumbers) {
        score += 10;
        feedback.push("Includes quantitative data");
      }

      if (hasTechnicalTerms) {
        score += 15;
        feedback.push("Uses appropriate technical terminology");
      } else {
        warnings.push("Add technical methodology details");
      }

      if (content.toLowerCase().includes("20%") || content.toLowerCase().includes("cost reduction")) {
        score += 10;
        feedback.push("Addresses KPI directly");
      }

      // Add some randomness for realism
      score = Math.min(100, Math.max(40, score + Math.floor(Math.random() * 10)));

      setPreScore({ score, feedback, warnings });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleFinalSubmit = () => {
    if (preScore) {
      onSubmit({ content, score: preScore.score });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
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
          <FileText className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Submit Your Work</h3>
        <p className="text-muted-foreground text-sm mt-1">
          {challenge.title}
        </p>
      </div>

      {/* Team collaboration preview */}
      <Card className="p-3 bg-muted/30 border-0">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Team Channel</span>
          <Badge variant="outline" className="text-xs">3 members</Badge>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <div className="shrink-0 px-2 py-1 bg-card rounded text-xs">
            <span className="text-muted-foreground">@teammate1:</span> Great progress on the data prep!
          </div>
          <div className="shrink-0 px-2 py-1 bg-card rounded text-xs">
            <span className="text-muted-foreground">@teammate2:</span> I'll handle the visualization
          </div>
        </div>
      </Card>

      {/* Submission form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="submission">Your Submission</Label>
          <Textarea
            id="submission"
            placeholder="Describe your approach, methodology, and findings. Include key metrics and how you achieved the KPI targets..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setPreScore(null); // Reset score when editing
            }}
            className="min-h-[150px]"
          />
          <p className="text-xs text-muted-foreground text-right">
            {content.split(/\s+/).filter(Boolean).length} words
          </p>
        </div>

        {/* File upload simulation */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <Upload className="w-3 h-3 mr-1" /> Attach Files
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            <Code className="w-3 h-3 mr-1" /> Add Code
          </Button>
        </div>
      </div>

      {/* Pre-score button */}
      {!preScore && (
        <Button
          onClick={handlePreScore}
          disabled={content.length < 20 || isSubmitting}
          variant="outline"
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" /> AI Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" /> Get AI Pre-Score
            </>
          )}
        </Button>
      )}

      {/* Pre-score results */}
      {preScore && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-card border-0 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">AI Pre-Score</span>
              <div className={`text-2xl font-bold ${getScoreColor(preScore.score)}`}>
                {preScore.score}/100
              </div>
            </div>

            <Progress 
              value={preScore.score} 
              className="h-2 mb-4"
            />

            {preScore.feedback.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-emerald-600 mb-1">Strengths:</p>
                <ul className="space-y-1">
                  {preScore.feedback.map((item, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {preScore.warnings.length > 0 && (
              <div>
                <p className="text-xs font-medium text-amber-600 mb-1">Suggestions:</p>
                <ul className="space-y-1">
                  {preScore.warnings.map((item, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleFinalSubmit}
          disabled={!preScore}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit Final
        </Button>
      </div>
    </motion.div>
  );
};

export default SubmissionStep;
