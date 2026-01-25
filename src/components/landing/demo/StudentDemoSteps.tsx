import { useState } from "react";
import { motion } from "framer-motion";
import { User, Target, Users, Star, Briefcase, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StepProps {
  onNext: () => void;
  onPrev?: () => void;
}

// Step 1: Build Profile
export const StudentStep1 = ({ onNext }: StepProps) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [major, setMajor] = useState("");
  const [teamPlayer, setTeamPlayer] = useState("");

  const allSkills = ["Python", "Data Analysis", "Excel", "SQL", "JavaScript", "Machine Learning"];

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const canProceed = skills.length > 0 && major && teamPlayer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <User className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Step 1: Build Your Profile</h3>
        <p className="text-muted-foreground text-sm mt-1">Tell us about your skills and interests</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Select Your Skills (multi-select)</Label>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <Badge
                key={skill}
                variant={skills.includes(skill) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  skills.includes(skill) ? "bg-primary" : "hover:bg-muted"
                }`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Your Major</Label>
          <Select value={major} onValueChange={setMajor}>
            <SelectTrigger>
              <SelectValue placeholder="Select your major" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cs">Computer Science</SelectItem>
              <SelectItem value="business">Business Administration</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="economics">Economics</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Are you a team player?</Label>
          <RadioGroup value={teamPlayer} onValueChange={setTeamPlayer} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="team-yes" />
              <Label htmlFor="team-yes" className="font-normal cursor-pointer">Yes, I thrive in teams</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="solo" id="team-solo" />
              <Label htmlFor="team-solo" className="font-normal cursor-pointer">I prefer solo work</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Complete Profile
      </Button>
    </motion.div>
  );
};

// Step 2: Get Matched
export const StudentStep2 = ({ onNext, onPrev }: StepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Target className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Step 2: Get Matched</h3>
        <p className="text-muted-foreground text-sm mt-1">AI finds challenges that fit your profile</p>
      </div>

      <Card className="p-4 bg-accent/30 border-accent border shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-foreground">New Challenge Available!</span>
              <Badge variant="secondary" className="text-xs">New</Badge>
            </div>
            <p className="text-sm font-medium text-foreground mb-1">Logistics Data Preparation</p>
            <p className="text-sm text-muted-foreground">
              Analyze delivery routes and prepare datasets for optimization model.
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="text-muted-foreground">Fit Score:</span>
              <Badge variant="default" className="bg-primary">82% Match</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Matched based on: CS major, Python skills, Data Analysis
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card border-0 shadow-sm">
        <h4 className="font-medium text-foreground mb-2">Other Available Challenges</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex justify-between">
            <span>Marketing Campaign Analysis</span>
            <Badge variant="outline">68% fit</Badge>
          </li>
          <li className="flex justify-between">
            <span>Financial Forecasting Model</span>
            <Badge variant="outline">74% fit</Badge>
          </li>
        </ul>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
          Accept Challenge
        </Button>
      </div>
    </motion.div>
  );
};

// Step 3: Collaborate & Submit
export const StudentStep3 = ({ onNext, onPrev }: StepProps) => {
  const [submitted, setSubmitted] = useState(false);

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
        <h3 className="text-xl font-semibold text-foreground">Step 3: Collaborate & Submit</h3>
        <p className="text-muted-foreground text-sm mt-1">Work with your team and submit your solution</p>
      </div>

      <Card className="p-4 bg-muted/50 border-0">
        <h4 className="font-medium text-foreground mb-3">Team Channel Preview</h4>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium">TM</span>
            </div>
            <div className="bg-card rounded-lg p-2 flex-1">
              <p className="font-medium text-foreground text-xs">Team Member</p>
              <p className="text-muted-foreground">I've started the data cleaning, can you handle the route analysis?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium">You</span>
            </div>
            <div className="bg-accent/20 rounded-lg p-2 flex-1">
              <p className="font-medium text-foreground text-xs">You</p>
              <p className="text-muted-foreground">On it! I'll have the analysis ready by tomorrow.</p>
            </div>
          </div>
        </div>
      </Card>

      {!submitted ? (
        <Card className="p-4 bg-card border-0 shadow-sm">
          <h4 className="font-medium text-foreground mb-2">Your Submission</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Upload your analysis files and documentation.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>route_analysis.py uploaded</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>documentation.pdf uploaded</span>
          </div>
          <Button 
            onClick={() => setSubmitted(true)} 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Submit Solution
          </Button>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-4 bg-accent/20 border-accent border">
            <div className="text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="font-medium text-foreground">Submission Received!</p>
              <p className="text-sm text-muted-foreground">Your solution is being reviewed.</p>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!submitted}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          View Feedback
        </Button>
      </div>
    </motion.div>
  );
};

// Step 4: Get Feedback
export const StudentStep4 = ({ onNext, onPrev }: StepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Star className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Step 4: Get Feedback</h3>
        <p className="text-muted-foreground text-sm mt-1">Receive your AI score and expert feedback</p>
      </div>

      <Card className="p-6 bg-card border-0 shadow-sm">
        <div className="text-center mb-4">
          <p className="text-4xl font-bold text-primary mb-1">85/100</p>
          <p className="text-sm text-muted-foreground">AI Score</p>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Technical Accuracy</span>
            <span className="font-medium">90%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Documentation Quality</span>
            <span className="font-medium">82%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Innovation</span>
            <span className="font-medium">78%</span>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-accent/20 border-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
            <Star className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">Badge Earned!</p>
            <p className="text-sm text-muted-foreground">Efficient Optimizer</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card border-0 shadow-sm">
        <h4 className="font-medium text-foreground mb-2">Expert Feedback</h4>
        <p className="text-sm text-muted-foreground">
          "Excellent approach to route optimization. Your use of clustering algorithms was particularly effective. 
          Consider adding error handling for edge cases in production scenarios."
        </p>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
          View Portfolio
        </Button>
      </div>
    </motion.div>
  );
};

// Step 5: Build & Convert
export const StudentStep5 = ({ onPrev }: StepProps & { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Step 5: Build & Convert</h3>
        <p className="text-muted-foreground text-sm mt-1">Showcase your work and receive opportunities</p>
      </div>

      <Card className="p-4 bg-card border-0 shadow-sm">
        <h4 className="font-medium text-foreground mb-3">Your ePortfolio</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Challenges Completed</span>
            <span className="font-medium">3</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average Score</span>
            <span className="font-medium">87/100</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Badges Earned</span>
            <span className="font-medium">5</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Leaderboard Rank</span>
            <span className="font-medium text-primary">#12</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-accent/30 border-accent border">
        <div className="text-center">
          <Briefcase className="w-10 h-10 text-primary mx-auto mb-3" />
          <h4 className="font-semibold text-foreground mb-2">Internship Offer Received!</h4>
          <p className="text-sm text-muted-foreground">
            Based on your performance, a company has extended an internship offer.
          </p>
          <Badge className="mt-3 bg-primary">Operations Intern - Logistics Company</Badge>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
      </div>
    </motion.div>
  );
};
