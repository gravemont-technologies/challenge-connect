import { useState } from "react";
import { motion } from "framer-motion";
import { Award, FileText, Clock, TrendingUp, CheckCircle, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

interface InternConversionProps {
  approvedCandidates: { studentId: string; score: number }[];
  onComplete: () => void;
  onBack: () => void;
}

const InternConversion = ({ approvedCandidates, onComplete, onBack }: InternConversionProps) => {
  const [threshold, setThreshold] = useState(80);
  const [showOffer, setShowOffer] = useState(false);
  const [feedback, setFeedback] = useState("");

  const eligibleCandidates = approvedCandidates.filter((c) => c.score >= threshold);
  const topCandidate = eligibleCandidates.sort((a, b) => b.score - a.score)[0];

  const generateOffer = () => {
    setShowOffer(true);
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
          <Briefcase className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Convert & Repeat</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Set conversion rules and generate internship offers
        </p>
      </div>

      {!showOffer ? (
        <>
          {/* Threshold setting */}
          <Card className="p-4 bg-card border-0 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="font-medium">KPI Achievement Threshold</Label>
                <Badge variant="outline" className="font-semibold">{threshold}%</Badge>
              </div>
              <Slider
                value={[threshold]}
                onValueChange={([v]) => setThreshold(v)}
                min={60}
                max={95}
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>60% (Lenient)</span>
                <span>80% (Standard)</span>
                <span>95% (Strict)</span>
              </div>
            </div>
          </Card>

          {/* Eligible candidates */}
          <Card className="p-4 bg-muted/30 border-0">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-medium">Eligible for Conversion</span>
            </div>
            {eligibleCandidates.length > 0 ? (
              <div className="space-y-2">
                {eligibleCandidates.map((candidate) => (
                  <div
                    key={candidate.studentId}
                    className="flex items-center justify-between p-2 bg-card rounded"
                  >
                    <span className="text-sm font-medium">{candidate.studentId}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-emerald-600 font-semibold">{candidate.score}%</span>
                      {candidate.studentId === topCandidate?.studentId && (
                        <Badge className="bg-primary text-xs">Top Performer</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-2">
                No candidates meet the {threshold}% threshold. Lower the threshold to see eligible candidates.
              </p>
            )}
          </Card>

          {/* Feedback field */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Optional Feedback (for all candidates)</Label>
            <Textarea
              id="feedback"
              placeholder="Great work on the analysis! Consider adding more visualizations next time..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          <Button
            onClick={generateOffer}
            disabled={eligibleCandidates.length === 0}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Internship Offer
          </Button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          {/* Offer letter preview */}
          <Card className="p-6 bg-card border-2 border-primary/20 shadow-lg">
            <div className="text-center mb-4">
              <Award className="w-10 h-10 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-lg">Internship Offer Letter</h4>
              <p className="text-xs text-muted-foreground">Auto-generated based on performance</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded">
                <p className="font-medium">To: Candidate {topCandidate?.studentId}</p>
                <p className="text-muted-foreground mt-1">
                  Congratulations! Based on your exceptional performance (Score: {topCandidate?.score}/100) 
                  in the Operations Optimization Challenge, we are pleased to extend an internship offer.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-primary/5 rounded text-center">
                  <p className="text-xs text-muted-foreground">Position</p>
                  <p className="font-medium">Operations Intern</p>
                </div>
                <div className="p-2 bg-primary/5 rounded text-center">
                  <p className="text-xs text-muted-foreground">Duration</p>
                  <p className="font-medium">3 Months</p>
                </div>
              </div>

              <Badge variant="outline" className="w-full justify-center py-2 border-emerald-500 text-emerald-600">
                <CheckCircle className="w-4 h-4 mr-2" /> Ready to Send
              </Badge>
            </div>
          </Card>

          {/* Summary metrics */}
          <Card className="p-4 bg-primary/5 border-0">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Challenge Summary
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">5-15</p>
                <p className="text-xs text-muted-foreground">mins invested</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-600">28%</p>
                <p className="text-xs text-muted-foreground">cost reduction</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">1</p>
                <p className="text-xs text-muted-foreground">intern hired</p>
              </div>
            </div>
          </Card>

          {/* Next steps */}
          <Card className="p-4 bg-card border-0 shadow-sm">
            <h4 className="font-medium text-foreground mb-3">Suggested Next Steps</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Post a follow-up challenge for inventory optimization
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Build a talent pool from high-scoring candidates
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Schedule onboarding for your new intern
              </li>
            </ul>
          </Card>
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        {showOffer && (
          <Button onClick={onComplete} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Complete Demo
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default InternConversion;
