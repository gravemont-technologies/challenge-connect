import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Award, Star, TrendingUp, CheckCircle, FileText, ExternalLink, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PortfolioStepProps {
  completedChallenges: { title: string; score: number }[];
  onComplete: () => void;
  onBack: () => void;
}

const PortfolioStep = ({ completedChallenges, onComplete, onBack }: PortfolioStepProps) => {
  const [showOffer, setShowOffer] = useState(false);
  const avgScore = completedChallenges.reduce((acc, c) => acc + c.score, 0) / completedChallenges.length;
  const meetsThreshold = avgScore >= 80;

  useEffect(() => {
    if (meetsThreshold) {
      setTimeout(() => setShowOffer(true), 1500);
    }
  }, [meetsThreshold]);

  const skills = [
    { name: "Data Analysis", level: 85 },
    { name: "Problem Solving", level: 90 },
    { name: "Technical Writing", level: 75 },
    { name: "Collaboration", level: 88 },
  ];

  const badges = [
    { name: "KPI Crusher", count: 2 },
    { name: "Efficient Optimizer", count: 1 },
    { name: "Team Champion", count: 3 },
  ];

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
        <h3 className="text-xl font-semibold text-foreground">Your ePortfolio</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Track your growth and unlock opportunities
        </p>
      </div>

      {/* Portfolio preview */}
      <Card className="p-4 bg-gradient-to-br from-card to-muted/30 border-0 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            S
          </div>
          <div>
            <p className="font-semibold text-foreground">Student Demo</p>
            <p className="text-sm text-muted-foreground">Operations & Analytics Track</p>
          </div>
          <Badge variant="outline" className="ml-auto">Level 5</Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-card rounded-lg">
            <p className="text-lg font-bold text-primary">{completedChallenges.length}</p>
            <p className="text-xs text-muted-foreground">Challenges</p>
          </div>
          <div className="text-center p-2 bg-card rounded-lg">
            <p className="text-lg font-bold text-emerald-600">{Math.round(avgScore)}%</p>
            <p className="text-xs text-muted-foreground">Avg Score</p>
          </div>
          <div className="text-center p-2 bg-card rounded-lg">
            <p className="text-lg font-bold text-amber-600">6</p>
            <p className="text-xs text-muted-foreground">Badges</p>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Skills Progress
          </h4>
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{skill.name}</span>
                <span className="font-medium">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-1.5" />
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <Badge key={badge.name} variant="secondary" className="text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              {badge.name} × {badge.count}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Completed challenges */}
      <Card className="p-4 bg-card border-0 shadow-sm">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" /> Completed Work
        </h4>
        <div className="space-y-2">
          {completedChallenges.map((challenge, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
              <span className="text-sm">{challenge.title}</span>
              <div className="flex items-center gap-2">
                <Badge variant={challenge.score >= 80 ? "default" : "secondary"} className="text-xs">
                  {challenge.score}%
                </Badge>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Intern offer */}
      {showOffer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200 shadow-lg">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3"
              >
                <Sparkles className="w-7 h-7 text-emerald-600" />
              </motion.div>
              <h4 className="font-semibold text-lg text-emerald-800 mb-1">Internship Offer Received!</h4>
              <p className="text-sm text-emerald-600 mb-3">
                Based on your exceptional performance ({Math.round(avgScore)}% avg)
              </p>
              <div className="p-3 bg-white/60 rounded-lg text-sm text-emerald-700">
                <p className="font-medium">Operations Analyst Intern</p>
                <p className="text-xs text-emerald-600">Leading Logistics Co. • 3 months</p>
              </div>
              <div className="flex gap-2 mt-4 justify-center">
                <Badge className="bg-emerald-600">
                  <CheckCircle className="w-3 h-3 mr-1" /> Threshold Met
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Progress ladder */}
      <Card className="p-4 bg-muted/30 border-0">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" /> Your Journey
        </h4>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-primary/20" />
          {["Profile Created", "First Match", "Submission Scored", "Badges Earned", "Portfolio Built"].map((step, i) => (
            <div key={step} className="flex items-center gap-3 mb-3 relative">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                i <= 4 ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {i <= 4 ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs">{i + 1}</span>}
              </div>
              <span className={`text-sm ${i <= 4 ? "text-foreground" : "text-muted-foreground"}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={onComplete}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Complete Demo
        </Button>
      </div>
    </motion.div>
  );
};

export default PortfolioStep;
