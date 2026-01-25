import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Trophy, Star, Target, Flame, Award, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface GamificationPanelProps {
  initialPoints?: number;
  onLevelUp?: (level: number) => void;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  unlocked: boolean;
  progress?: number;
}

const GamificationPanel = ({ initialPoints = 150, onLevelUp }: GamificationPanelProps) => {
  const [points, setPoints] = useState(initialPoints);
  const [level, setLevel] = useState(2);
  const [streak, setStreak] = useState(3);
  const [showBoost, setShowBoost] = useState(false);
  const [boosting, setBoosting] = useState(false);

  const pointsForNextLevel = level * 100;
  const levelProgress = (points % 100) / (pointsForNextLevel / level) * 100;

  const achievements: Achievement[] = [
    { id: "first", name: "First Steps", description: "Complete your first submission", icon: Star, unlocked: true },
    { id: "streak", name: "On Fire", description: "3-day submission streak", icon: Flame, unlocked: streak >= 3 },
    { id: "quality", name: "Quality Work", description: "Score above 85%", icon: Trophy, unlocked: false, progress: 75 },
    { id: "mentor", name: "Team Player", description: "Help 3 peers", icon: Award, unlocked: false, progress: 33 },
  ];

  const addPoints = (amount: number, reason: string) => {
    setPoints((prev) => {
      const newPoints = prev + amount;
      if (Math.floor(newPoints / 100) > Math.floor(prev / 100)) {
        setLevel((l) => {
          const newLevel = l + 1;
          onLevelUp?.(newLevel);
          return newLevel;
        });
      }
      return newPoints;
    });
  };

  const handleBoost = () => {
    setBoosting(true);
    setShowBoost(true);
    
    // Simulate intensive work session
    let boostPoints = 0;
    const interval = setInterval(() => {
      boostPoints += 25;
      addPoints(25, "Boost bonus");
      setStreak((s) => s + 1);
      
      if (boostPoints >= 150) {
        clearInterval(interval);
        setBoosting(false);
      }
    }, 500);
  };

  return (
    <div className="space-y-4">
      {/* Level & Points Header */}
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              {level}
            </div>
            <div>
              <p className="font-semibold text-foreground">Level {level}</p>
              <p className="text-sm text-muted-foreground">{points} XP total</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-orange-600">{streak} day streak</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress to Level {level + 1}</span>
            <span>{Math.round(levelProgress)}%</span>
          </div>
          <Progress value={levelProgress} className="h-2" />
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex flex-col h-auto py-3"
          onClick={() => addPoints(10, "Draft saved")}
        >
          <Target className="w-4 h-4 mb-1" />
          <span className="text-xs">Save Draft</span>
          <span className="text-[10px] text-primary">+10 XP</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex flex-col h-auto py-3"
          onClick={() => addPoints(25, "Feedback given")}
        >
          <TrendingUp className="w-4 h-4 mb-1" />
          <span className="text-xs">Add Insights</span>
          <span className="text-[10px] text-primary">+25 XP</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex flex-col h-auto py-3"
          onClick={() => addPoints(50, "Submission made")}
        >
          <Zap className="w-4 h-4 mb-1" />
          <span className="text-xs">Submit</span>
          <span className="text-[10px] text-primary">+50 XP</span>
        </Button>
      </div>

      {/* Boost Button */}
      {!showBoost ? (
        <Button
          onClick={handleBoost}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
        >
          <Flame className="w-4 h-4 mr-2" />
          Extra Effort: 3-Day Sprint
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={boosting ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                <Flame className="w-6 h-6 text-orange-500" />
              </motion.div>
              <div>
                <p className="font-semibold text-orange-700">
                  {boosting ? "Boosting..." : "Sprint Complete!"}
                </p>
                <p className="text-xs text-orange-600">
                  {boosting ? "Maximizing your level" : "+150 XP earned!"}
                </p>
              </div>
            </div>
            {boosting && (
              <Progress value={((points - initialPoints) / 150) * 100} className="h-1.5" />
            )}
          </Card>
        </motion.div>
      )}

      {/* Achievements */}
      <Card className="p-4 bg-card border-0 shadow-sm">
        <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" /> Achievements
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={false}
              animate={achievement.unlocked ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg border ${
                achievement.unlocked
                  ? "bg-primary/5 border-primary/20"
                  : "bg-muted/30 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <achievement.icon
                  className={`w-4 h-4 ${
                    achievement.unlocked ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {achievement.name}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">{achievement.description}</p>
              {!achievement.unlocked && achievement.progress !== undefined && (
                <Progress value={achievement.progress} className="h-1 mt-2" />
              )}
              {achievement.unlocked && (
                <Badge variant="outline" className="mt-2 text-[10px] border-primary/30 text-primary">
                  Unlocked!
                </Badge>
              )}
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default GamificationPanel;
