import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Star, TrendingUp, CheckCircle, Users, MessageSquare, FileText, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import GamificationPanel from "./GamificationPanel";

interface FeedbackStepProps {
  submission: {
    score: number;
  };
  onContinue: () => void;
  onBack: () => void;
}

const badges = [
  { id: "kpi", name: "KPI Crusher", description: "Exceeded target metrics", icon: TrendingUp, unlocked: false },
  { id: "efficient", name: "Efficient Optimizer", description: "Delivered ahead of schedule", icon: CheckCircle, unlocked: false },
  { id: "team", name: "Team Champion", description: "Great collaboration skills", icon: Users, unlocked: false },
  { id: "innovator", name: "Innovator", description: "Novel approach to problem", icon: Star, unlocked: false },
];

const FeedbackStep = ({ submission, onContinue, onBack }: FeedbackStepProps) => {
  const [showBadges, setShowBadges] = useState(false);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [humanFeedback, setHumanFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Determine which badges to unlock based on score
    const newUnlocked: string[] = [];
    
    if (submission.score >= 85) {
      newUnlocked.push("kpi");
    }
    if (submission.score >= 75) {
      newUnlocked.push("efficient");
    }
    if (submission.score >= 60) {
      newUnlocked.push("team");
    }
    if (submission.score >= 90) {
      newUnlocked.push("innovator");
    }

    // Animate badges appearing
    let delay = 500;
    newUnlocked.forEach((badgeId) => {
      setTimeout(() => {
        setUnlockedBadges((prev) => [...prev, badgeId]);
      }, delay);
      delay += 300;
    });

    // Show human feedback after a delay
    setTimeout(() => {
      setHumanFeedback(
        submission.score >= 80
          ? "Excellent work! Your approach to route optimization shows strong analytical thinking. Consider exploring dynamic pricing models in your next challenge."
          : "Good effort on this challenge. To improve, focus on quantifying your results more precisely and connecting them directly to the stated KPIs."
      );
    }, 2000);

    setTimeout(() => setShowBadges(true), 400);
  }, [submission.score]);

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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"
        >
          <Award className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className="text-xl font-semibold text-foreground">Feedback & Rewards</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Your submission has been evaluated
        </p>
      </div>

      {/* Score display */}
      <Card className="p-5 bg-card border-0 shadow-md text-center">
        <p className="text-sm text-muted-foreground mb-1">AI Score</p>
        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
          className={`text-5xl font-bold ${getScoreColor(submission.score)}`}
        >
          {submission.score}
        </motion.p>
        <p className="text-sm text-muted-foreground mt-1">out of 100</p>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-sm">
            {submission.score >= 80 ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600 font-medium">Meets KPI Target!</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="text-amber-600 font-medium">Good progress, keep improving!</span>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Badges */}
      {showBadges && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="p-4 bg-card border-0 shadow-sm">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" /> Badges Earned
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {badges.map((badge) => {
                const isUnlocked = unlockedBadges.includes(badge.id);
                return (
                  <motion.div
                    key={badge.id}
                    initial={isUnlocked ? { scale: 0 } : false}
                    animate={isUnlocked ? { scale: 1 } : {}}
                    transition={{ type: "spring" }}
                    className={`p-3 rounded-lg border ${
                      isUnlocked
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted/30 border-transparent opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <badge.icon
                        className={`w-5 h-5 ${
                          isUnlocked ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          isUnlocked ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {badge.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    {isUnlocked && (
                      <Badge variant="outline" className="mt-2 text-[10px] border-primary/30 text-primary">
                        Unlocked!
                      </Badge>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Human feedback - showing hybrid 80/20 split */}
      {humanFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-muted/30 border-0">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Hybrid Feedback</span>
            </div>
            
            {/* 80% AI feedback */}
            <div className="mb-3 p-3 bg-card rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Bot className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">AI Analysis (80%)</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {submission.score >= 80 
                  ? "Strong quantitative analysis with clear KPI alignment. Methodology is sound and results are verifiable."
                  : "Good foundation but could benefit from more specific metrics. Consider strengthening the data verification."
                }
              </p>
            </div>
            
            {/* 20% Human feedback */}
            <div className="p-3 bg-card rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <User className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium text-primary">Business Reviewer (20%)</span>
              </div>
              <p className="text-xs text-muted-foreground italic">"{humanFeedback}"</p>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Gamification panel */}
      <GamificationPanel initialPoints={submission.score * 2} />

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onContinue}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          View Portfolio
        </Button>
      </div>
    </motion.div>
  );
};

export default FeedbackStep;
