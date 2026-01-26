import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Code, CheckCircle, AlertCircle, Sparkles, Users, AlertTriangle, Copy } from "lucide-react";
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
    flags: {
      plagiarismRisk: boolean;
      formatCompliant: boolean;
      issueCount: number;
    };
  } | null>(null);

  const handlePreScore = () => {
    setIsSubmitting(true);
    
    // Simulate AI pre-scoring with detailed analysis
    setTimeout(() => {
      const wordCount = content.split(/\s+/).filter(Boolean).length;
      const hasNumbers = /\d/.test(content);
      const hasTechnicalTerms = /algorithm|optimization|analysis|data|model|forecast|efficiency|reduce|improve/i.test(content);
      const hasPercentages = /%|\d+\s*percent/i.test(content);
      
      let score = 50;
      const feedback: string[] = [];
      const warnings: string[] = [];
      let issueCount = 0;

      // Detailed scoring logic
      if (wordCount > 100) {
        score += 20;
        feedback.push("Comprehensive detail level");
      } else if (wordCount > 50) {
        score += 10;
        feedback.push("Good detail level");
      } else {
        warnings.push("Consider adding more detail (min 50 words recommended)");
        issueCount++;
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
        issueCount++;
      }

      if (hasPercentages) {
        score += 10;
        feedback.push("Addresses KPI metrics directly");
      }

      if (content.toLowerCase().includes("20%") || content.toLowerCase().includes("cost reduction")) {
        score += 5;
        feedback.push("Matches target KPI threshold");
      }

      // Check for potential issues
      const plagiarismRisk = content.includes("Lorem ipsum") || content.split(" ").length < 10;
      const formatCompliant = wordCount >= 30 && hasTechnicalTerms;

      // Cap and add randomness
      score = Math.min(100, Math.max(40, score + Math.floor(Math.random() * 10) - 5));

      // Auto-reject threshold check
      if (score < 50) {
        warnings.unshift("⚠️ Below auto-filter threshold (50%). Submission may be auto-rejected.");
      }

      setPreScore({ 
        score, 
        feedback, 
        warnings,
        flags: {
          plagiarismRisk,
          formatCompliant,
          issueCount,
        }
      });
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
    if (score >= 50) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Needs Work";
    return "Below Threshold";
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

      {/* Submission guidelines */}
      <Card className="p-3 bg-blue-50 dark:bg-blue-950/20 border-0">
        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium mb-1">Submission Tips:</p>
        <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-0.5">
          <li>• Include specific metrics and percentages</li>
          <li>• Describe your methodology clearly</li>
          <li>• Reference the KPI targets in your approach</li>
        </ul>
      </Card>

      {/* Submission form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="submission">Your Submission</Label>
          <Textarea
            id="submission"
            placeholder="Describe your approach, methodology, and findings. Include key metrics and how you achieved the KPI targets...

Example: 'Using dynamic clustering analysis on the delivery route data, I identified optimization opportunities that could reduce transit time by approximately 23%. The methodology involved...'"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setPreScore(null); // Reset score when editing
            }}
            className="min-h-[150px]"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className={content.split(/\s+/).filter(Boolean).length < 30 ? "text-amber-600" : ""}>
              {content.split(/\s+/).filter(Boolean).length} words (min 30 recommended)
            </span>
            <span>Auto-filter threshold: 50/100</span>
          </div>
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
              <div>
                <span className="font-medium">AI Pre-Score</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {getScoreLabel(preScore.score)}
                </Badge>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(preScore.score)}`}>
                {preScore.score}/100
              </div>
            </div>

            <Progress 
              value={preScore.score} 
              className="h-2 mb-4"
            />

            {/* AI Flags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge 
                variant={preScore.flags.plagiarismRisk ? "destructive" : "outline"}
                className="text-xs"
              >
                {preScore.flags.plagiarismRisk ? (
                  <><AlertTriangle className="w-3 h-3 mr-1" /> Originality Check</>
                ) : (
                  <><CheckCircle className="w-3 h-3 mr-1" /> Original</>
                )}
              </Badge>
              <Badge 
                variant={preScore.flags.formatCompliant ? "outline" : "secondary"}
                className="text-xs"
              >
                {preScore.flags.formatCompliant ? "Format OK" : "Format Issues"}
              </Badge>
              {preScore.flags.issueCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {preScore.flags.issueCount} issue(s) flagged
                </Badge>
              )}
            </div>

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

            {/* Edit and retry option */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPreScore(null)}
              className="w-full mt-3 text-xs"
            >
              Edit & Re-score
            </Button>
          </Card>
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleFinalSubmit}
          disabled={!preScore || preScore.score < 50}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {preScore && preScore.score < 50 ? "Score Too Low" : "Submit Final"}
        </Button>
      </div>
    </motion.div>
  );
};

export default SubmissionStep;
