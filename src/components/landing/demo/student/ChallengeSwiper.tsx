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
  company: string; // Anonymized
  category: string;
  fitScore: number;
  duration: string;
  reward: string;
  skills: string[];
  description: string;
}

interface ChallengeSwiperProps {
  userProfile: {
    skills: string[];
    major: string;
  };
  onMatch: (challenge: Challenge) => void;
  onBack: () => void;
}

const mockChallenges: Challenge[] = [
  {
    id: 1,
    title: "DCF Valuation Model",
    company: "Regional Investment Group",
    category: "Financial Modeling",
    fitScore: 94,
    duration: "2 weeks",
    reward: "$2,400",
    skills: ["Excel", "DCF Analysis", "WACC", "Sensitivity Tables"],
    description: "Build a full discounted cash flow model in Excel with WACC inputs, 5-year projections, terminal value, and a two-way sensitivity table for key assumptions.",
  },
  {
    id: 2,
    title: "Sales Regression Analysis",
    company: "Consumer Goods Co.",
    category: "Statistics",
    fitScore: 89,
    duration: "1 week",
    reward: "$1,400",
    skills: ["Excel Data Analysis ToolPak", "Regression", "Hypothesis Testing"],
    description: "Run multivariate regression using Excel's ToolPak on 3 years of sales data to quantify pricing elasticity and seasonal effects with R² reporting.",
  },
  {
    id: 3,
    title: "Budget vs Actual Dashboard",
    company: "Hospitality Holdings",
    category: "Financial Modeling",
    fitScore: 91,
    duration: "2 weeks",
    reward: "$1,800",
    skills: ["Excel PivotTables", "Variance Analysis", "Conditional Formatting"],
    description: "Create an automated Excel dashboard comparing budgeted vs actual spend by department with drill-down variance analysis and traffic-light indicators.",
  },
  {
    id: 4,
    title: "Fleet Route Optimization",
    company: "Logistics Network",
    category: "Operations Research",
    fitScore: 87,
    duration: "2 weeks",
    reward: "$1,600",
    skills: ["Excel Solver", "Linear Programming", "Constraint Modeling"],
    description: "Use Excel Solver to minimize total delivery cost across 50+ nodes by optimizing route assignments, vehicle capacity, and time-window constraints.",
  },
  {
    id: 5,
    title: "Demand Forecasting Model",
    company: "Retail Chain Group",
    category: "Statistics",
    fitScore: 92,
    duration: "3 weeks",
    reward: "$2,500",
    skills: ["Excel", "Exponential Smoothing", "Moving Averages", "MAPE"],
    description: "Build a statistical demand forecast in Excel using Holt-Winters exponential smoothing, calculate MAPE accuracy, and recommend reorder points.",
  },
  {
    id: 6,
    title: "Monte Carlo Risk Simulation",
    company: "Infrastructure Partners",
    category: "Financial Modeling",
    fitScore: 85,
    duration: "2 weeks",
    reward: "$2,200",
    skills: ["Excel", "Monte Carlo Simulation", "NPV/IRR", "RAND Functions"],
    description: "Develop a Monte Carlo simulation in Excel using 10,000 random trials to stress-test project NPV under uncertain cost, timeline, and revenue inputs.",
  },
  {
    id: 7,
    title: "Customer Cohort & Churn Analysis",
    company: "E-Commerce Ventures",
    category: "Statistics",
    fitScore: 88,
    duration: "1 week",
    reward: "$1,200",
    skills: ["Excel", "Cohort Analysis", "Retention Curves", "COUNTIFS"],
    description: "Segment customers into monthly cohorts using Excel formulas, calculate retention rates, and visualize churn patterns with indexed heatmaps.",
  },
  {
    id: 8,
    title: "Pricing Elasticity Model",
    company: "Manufacturing Corp",
    category: "Financial Modeling",
    fitScore: 90,
    duration: "2 weeks",
    reward: "$2,000",
    skills: ["Excel", "Price-Demand Curves", "Goal Seek", "Scenario Manager"],
    description: "Model price-demand curves in Excel using historical data, apply Goal Seek to find margin-maximizing price points, and compare scenarios with Scenario Manager.",
  },
  {
    id: 9,
    title: "Working Capital Optimization",
    company: "Industrial Supplies Ltd",
    category: "Financial Modeling",
    fitScore: 86,
    duration: "2 weeks",
    reward: "$1,900",
    skills: ["Excel", "Cash Conversion Cycle", "Ratio Analysis", "What-If"],
    description: "Analyze DSO, DIO, and DPO in Excel to map the cash conversion cycle, then build what-if models to quantify the impact of payment term changes.",
  },
  {
    id: 10,
    title: "A/B Test Statistical Validation",
    company: "Digital Marketing Agency",
    category: "Statistics",
    fitScore: 93,
    duration: "1 week",
    reward: "$1,100",
    skills: ["Excel", "t-Test", "Chi-Square", "Confidence Intervals"],
    description: "Validate A/B test results in Excel using two-sample t-tests and chi-square tests, report p-values, confidence intervals, and minimum detectable effects.",
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
            className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3"
          >
            <Heart className="w-8 h-8 text-emerald-600 fill-current" />
          </motion.div>
          <h3 className="text-xl font-semibold text-foreground">It's a Match!</h3>
          <p className="text-muted-foreground text-sm mt-1">
            You've been matched with a challenge
          </p>
        </div>

        <Card className="p-5 bg-card border-2 border-emerald-200 shadow-md">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">{matchedChallenge.title}</h4>
              <p className="text-sm text-muted-foreground">{matchedChallenge.company}</p>
            </div>
            <Badge className={`${getFitScoreColor(matchedChallenge.fitScore)} border-0`}>
              <Zap className="w-3 h-3 mr-1" /> {matchedChallenge.fitScore}% Fit
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{matchedChallenge.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
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
                  <Badge className={`${getFitScoreColor(currentChallenge.fitScore)} border-0`}>
                    <Zap className="w-3 h-3 mr-1" /> {currentChallenge.fitScore}% Fit
                  </Badge>
                </div>

                <h4 className="font-semibold text-lg text-foreground mb-1">{currentChallenge.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{currentChallenge.company}</p>

                <p className="text-sm text-muted-foreground flex-1">{currentChallenge.description}</p>

                <div className="flex flex-wrap gap-1.5 my-3">
                  {currentChallenge.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
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
          className="w-14 h-14 rounded-full border-red-200 hover:bg-red-50 hover:text-red-600"
          onClick={() => handleSwipe("left")}
        >
          <X className="w-6 h-6" />
        </Button>
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700"
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
