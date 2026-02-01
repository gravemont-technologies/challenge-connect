import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { MapPin, Clock, DollarSign, Zap, X, Heart, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Challenge {
  id: number;
  title: string;
  company: string;
  category: string;
  fitScore: number;
  valuesFit: number;
  duration: string;
  reward: string;
  skills: string[];
  values: string[];
  description: string;
}

interface ChallengeSwiperProps {
  userProfile: {
    skills: string[];
    major: string;
    values?: string[];
  };
  onMatch: (challenge: Challenge) => void;
  onBack: () => void;
}

const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: "Financial Projection Model",
    company: "Regional Investment Group",
    category: "Finance",
    fitScore: 94,
    valuesFit: 92,
    duration: "2 weeks",
    reward: "$2,200",
    skills: ["Excel", "Financial Modeling", "Scenario Analysis"],
    values: ["Excellence", "Innovation"],
    description: "Build a comprehensive Excel-based financial model with 3-year projections, sensitivity analysis, and investor-ready dashboards.",
  },
  {
    id: 2,
    title: "Sales Regression Analysis",
    company: "Consumer Goods Co.",
    category: "Statistics",
    fitScore: 89,
    valuesFit: 85,
    duration: "1 week",
    reward: "$1,400",
    skills: ["Excel", "Statistical Analysis", "Regression"],
    values: ["Personal Growth", "Excellence"],
    description: "Perform multivariate regression analysis on historical sales data to identify key growth drivers and seasonal patterns.",
  },
  {
    id: 3,
    title: "Dynamic Budget Template",
    company: "Hospitality Holdings",
    category: "Finance",
    fitScore: 91,
    valuesFit: 88,
    duration: "2 weeks",
    reward: "$1,800",
    skills: ["Excel", "Budgeting", "Variance Analysis"],
    values: ["Collaboration", "Integrity"],
    description: "Create an automated Excel budget template with real-time variance tracking and department-level drill-downs.",
  },
  {
    id: 4,
    title: "Route Optimization Model",
    company: "Logistics Network",
    category: "Operations",
    fitScore: 87,
    valuesFit: 90,
    duration: "2 weeks",
    reward: "$1,600",
    skills: ["Excel Solver", "Optimization", "Operations Research"],
    values: ["Social Impact", "Innovation"],
    description: "Develop an Excel Solver-based model to optimize delivery routes, minimizing fuel costs across 50+ distribution points.",
  },
  {
    id: 5,
    title: "Demand Forecasting Dashboard",
    company: "Retail Chain Group",
    category: "Analytics",
    fitScore: 92,
    valuesFit: 86,
    duration: "3 weeks",
    reward: "$2,500",
    skills: ["Excel", "Time Series", "Forecasting"],
    values: ["Excellence", "Personal Growth"],
    description: "Build a statistical forecasting model using Excel to predict inventory demand with confidence intervals.",
  },
  {
    id: 6,
    title: "Cost-Benefit Analysis Model",
    company: "Infrastructure Partners",
    category: "Finance",
    fitScore: 85,
    valuesFit: 94,
    duration: "2 weeks",
    reward: "$1,700",
    skills: ["Excel", "NPV/IRR", "Financial Analysis"],
    values: ["Social Impact", "Integrity"],
    description: "Create a detailed cost-benefit analysis model with NPV, IRR, and payback period calculations for capital projects.",
  },
  {
    id: 7,
    title: "Customer Cohort Analysis",
    company: "E-Commerce Ventures",
    category: "Statistics",
    fitScore: 88,
    valuesFit: 82,
    duration: "1 week",
    reward: "$1,200",
    skills: ["Excel", "Cohort Analysis", "Data Visualization"],
    values: ["Innovation", "Collaboration"],
    description: "Analyze customer retention patterns using cohort analysis and create visual dashboards for executive reporting.",
  },
  {
    id: 8,
    title: "Pricing Strategy Model",
    company: "Manufacturing Corp",
    category: "Finance",
    fitScore: 90,
    valuesFit: 87,
    duration: "2 weeks",
    reward: "$2,000",
    skills: ["Excel", "Pricing Models", "Elasticity Analysis"],
    values: ["Excellence", "Innovation"],
    description: "Develop a dynamic pricing model incorporating cost structures, competitor analysis, and demand elasticity curves.",
  },
];

const ChallengeSwiper = ({ userProfile, onMatch, onBack }: ChallengeSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [passedChallenges, setPassedChallenges] = useState<number[]>([]);
  const [matchedChallenge, setMatchedChallenge] = useState<Challenge | null>(null);

  const currentChallenge = mockChallenges[currentIndex];
  const remainingChallenges = mockChallenges.filter((c) => !passedChallenges.includes(c.id));

  const handleSwipe = (swipeDirection: "left" | "right") => {
    setDirection(swipeDirection);
    
    if (swipeDirection === "right") {
      // Match!
      setTimeout(() => {
        setMatchedChallenge(currentChallenge);
      }, 300);
    } else {
      // Pass
      setPassedChallenges((prev) => [...prev, currentChallenge.id]);
    }

    setTimeout(() => {
      if (currentIndex < mockChallenges.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
      setDirection(null);
    }, 300);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    }
  };

  const getFitScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 bg-emerald-50";
    if (score >= 70) return "text-amber-600 bg-amber-50";
    return "text-muted-foreground bg-muted";
  };

  if (matchedChallenge) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6"
      >
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3"
          >
            <Heart className="w-8 h-8 text-primary fill-current" />
          </motion.div>
          <h3 className="text-xl font-semibold text-foreground">It's a Match!</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Skills & values aligned with this challenge
          </p>
        </div>

        <Card className="p-5 bg-card border-2 border-primary/20 shadow-md">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">{matchedChallenge.title}</h4>
              <p className="text-sm text-muted-foreground">{matchedChallenge.company}</p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <Badge className={`${getFitScoreColor(matchedChallenge.fitScore)} border-0`}>
                <Zap className="w-3 h-3 mr-1" /> {matchedChallenge.fitScore}% Skills
              </Badge>
              <Badge className={`${getFitScoreColor(matchedChallenge.valuesFit)} border-0 text-xs`}>
                {matchedChallenge.valuesFit}% Values
              </Badge>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{matchedChallenge.description}</p>

          <div className="space-y-3 mb-4">
            <div className="flex flex-wrap gap-2">
              {matchedChallenge.skills.map((skill) => {
                const isMatch = userProfile.skills.some(
                  (s) => s.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(s.toLowerCase())
                );
                return (
                  <Badge key={skill} variant={isMatch ? "default" : "outline"} className="text-xs">
                    {isMatch && <Sparkles className="w-2.5 h-2.5 mr-1" />}
                    {skill}
                  </Badge>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedChallenge.values.map((value) => {
                const isMatch = userProfile.values?.some(
                  (v) => v.toLowerCase() === value.toLowerCase()
                );
                return (
                  <Badge key={value} variant="outline" className={`text-xs ${isMatch ? "border-primary text-primary" : ""}`}>
                    {isMatch && <Heart className="w-2.5 h-2.5 mr-1" />}
                    {value}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{matchedChallenge.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>{matchedChallenge.reward}</span>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button
            onClick={() => onMatch(matchedChallenge)}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            View Briefing
          </Button>
        </div>
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
        <h3 className="text-xl font-semibold text-foreground">Find Your Challenge</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Swipe right to match, left to pass
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{currentIndex + 1}/{mockChallenges.length}</span>
        <Progress value={((currentIndex + 1) / mockChallenges.length) * 100} className="flex-1 h-1.5" />
      </div>

      {/* Card stack */}
      <div className="relative h-80">
        <AnimatePresence>
          {currentChallenge && (
            <motion.div
              key={currentChallenge.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
                rotate: direction === "left" ? -15 : direction === "right" ? 15 : 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Card className="h-full p-5 bg-card border-0 shadow-lg flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary">{currentChallenge.category}</Badge>
                  <div className="flex flex-col gap-1 items-end">
                    <Badge className={`${getFitScoreColor(currentChallenge.fitScore)} border-0`}>
                      <Zap className="w-3 h-3 mr-1" /> {currentChallenge.fitScore}% Skills
                    </Badge>
                    <Badge className={`${getFitScoreColor(currentChallenge.valuesFit)} border-0 text-xs`}>
                      {currentChallenge.valuesFit}% Values
                    </Badge>
                  </div>
                </div>

                <h4 className="font-semibold text-lg text-foreground mb-1">{currentChallenge.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{currentChallenge.company}</p>

                <p className="text-sm text-muted-foreground flex-1">{currentChallenge.description}</p>

                <div className="space-y-2 my-3">
                  <div className="flex flex-wrap gap-1.5">
                    {currentChallenge.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentChallenge.values.map((value) => (
                      <Badge key={value} variant="outline" className="text-xs border-primary/30 text-primary">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-3 border-t">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{currentChallenge.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium text-primary">
                    <DollarSign className="w-4 h-4" />
                    <span>{currentChallenge.reward}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-6">
        <Button
          variant="outline"
          size="lg"
          className="w-14 h-14 rounded-full border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
          onClick={() => handleSwipe("left")}
        >
          <X className="w-6 h-6" />
        </Button>
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90"
          onClick={() => handleSwipe("right")}
        >
          <Heart className="w-6 h-6" />
        </Button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Drag card or use buttons to decide
      </p>

      <Button variant="ghost" onClick={onBack} className="w-full">
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Profile
      </Button>
    </motion.div>
  );
};

export default ChallengeSwiper;
