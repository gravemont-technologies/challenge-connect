import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChallengeSwiper from "./ChallengeSwiper";
import SubmissionStep from "./SubmissionStep";
import FeedbackStep from "./FeedbackStep";
import PortfolioStep from "./PortfolioStep";
import AIMentorChat from "./AIMentorChat";

// Profile step component
import { GraduationCap, Code, Users, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserProfile {
  skills: string[];
  major: string;
  teamPlayer: string;
}

interface StudentFlowProps {
  onReset: () => void;
  onComplete: () => void;
}

type FlowStep = "profile" | "swipe" | "briefing" | "submit" | "feedback" | "portfolio";

const skillOptions = [
  { id: "python", label: "Python", icon: Code },
  { id: "sql", label: "SQL/Databases", icon: Code },
  { id: "visualization", label: "Data Visualization", icon: Code },
  { id: "ml", label: "Machine Learning", icon: Code },
  { id: "excel", label: "Excel/Sheets", icon: Code },
  { id: "communication", label: "Communication", icon: Users },
];

const StudentFlow = ({ onReset, onComplete }: StudentFlowProps) => {
  const [step, setStep] = useState<FlowStep>("profile");
  const [profile, setProfile] = useState<UserProfile>({
    skills: [],
    major: "",
    teamPlayer: "",
  });
  const [matchedChallenge, setMatchedChallenge] = useState<{
    title: string;
    company: string;
    fitScore: number;
  } | null>(null);
  const [submission, setSubmission] = useState<{ content: string; score: number } | null>(null);
  const [showMentor, setShowMentor] = useState(false);

  const stepLabels = ["Profile", "Match", "Submit", "Feedback", "Portfolio"];
  const getStepIndex = () => {
    switch (step) {
      case "profile": return 0;
      case "swipe": case "briefing": return 1;
      case "submit": return 2;
      case "feedback": return 3;
      case "portfolio": return 4;
      default: return 0;
    }
  };
  const currentStepIndex = getStepIndex();

  const toggleSkill = (skillId: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter((s) => s !== skillId)
        : [...prev.skills, skillId],
    }));
  };

  const isProfileComplete = profile.skills.length > 0 && profile.major && profile.teamPlayer;

  const handleMatch = (challenge: { title: string; company: string; fitScore: number }) => {
    setMatchedChallenge(challenge);
    setShowMentor(true);
    setStep("submit");
  };

  const handleSubmit = (sub: { content: string; score: number }) => {
    setSubmission(sub);
    setStep("feedback");
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {stepLabels.map((label, index) => (
            <div
              key={index}
              className={`flex flex-col items-center flex-1 ${
                index <= currentStepIndex ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  index < currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : index === currentStepIndex
                    ? "bg-primary/20 text-primary border-2 border-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs mt-1 hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 px-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i < currentStepIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {step === "profile" && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Build Your Profile</h3>
              <p className="text-muted-foreground text-sm mt-1">Help us match you with the right challenges</p>
            </div>

            {/* Skills multi-select */}
            <div className="space-y-3">
              <Label>Your Skills (select multiple)</Label>
              <div className="grid grid-cols-2 gap-2">
                {skillOptions.map((skill) => (
                  <Card
                    key={skill.id}
                    onClick={() => toggleSkill(skill.id)}
                    className={`p-3 cursor-pointer transition-all border-0 ${
                      profile.skills.includes(skill.id)
                        ? "bg-primary/10 ring-2 ring-primary"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <skill.icon className={`w-4 h-4 ${
                        profile.skills.includes(skill.id) ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <span className="text-sm">{skill.label}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Major dropdown */}
            <div className="space-y-2">
              <Label>Major/Field of Study</Label>
              <Select value={profile.major} onValueChange={(v) => setProfile({ ...profile, major: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your major" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="business">Business Administration</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="economics">Economics</SelectItem>
                  <SelectItem value="math">Mathematics/Statistics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Team player radio */}
            <div className="space-y-2">
              <Label>Collaboration Style</Label>
              <RadioGroup
                value={profile.teamPlayer}
                onValueChange={(v) => setProfile({ ...profile, teamPlayer: v })}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="team" id="team" />
                  <Label htmlFor="team" className="font-normal cursor-pointer">
                    I thrive in team environments
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo" className="font-normal cursor-pointer">
                    I prefer working independently
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hybrid" id="hybrid" />
                  <Label htmlFor="hybrid" className="font-normal cursor-pointer">
                    I'm flexible with both
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {profile.skills.map((skillId) => {
                  const skill = skillOptions.find((s) => s.id === skillId);
                  return skill ? (
                    <Badge key={skillId} variant="secondary" className="text-xs">
                      {skill.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            )}

            <Button
              onClick={() => setStep("swipe")}
              disabled={!isProfileComplete}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Find Challenges
            </Button>
          </motion.div>
        )}

        {step === "swipe" && (
          <motion.div key="swipe" exit={{ opacity: 0, x: -20 }}>
            <ChallengeSwiper
              userProfile={{
                skills: profile.skills.map((id) => skillOptions.find((s) => s.id === id)?.label || id),
                major: profile.major,
              }}
              onMatch={handleMatch}
              onBack={() => setStep("profile")}
            />
          </motion.div>
        )}

        {step === "submit" && matchedChallenge && (
          <motion.div
            key="submit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <SubmissionStep
              challenge={matchedChallenge}
              onSubmit={handleSubmit}
              onBack={() => setStep("swipe")}
            />
          </motion.div>
        )}

        {step === "feedback" && submission && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FeedbackStep
              submission={submission}
              onContinue={() => setStep("portfolio")}
              onBack={() => setStep("submit")}
            />
          </motion.div>
        )}

        {step === "portfolio" && matchedChallenge && submission && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <PortfolioStep
              completedChallenges={[{ title: matchedChallenge.title, score: submission.score }]}
              onComplete={onComplete}
              onBack={() => setStep("feedback")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Mentor Chat */}
      <AIMentorChat
        isOpen={showMentor}
        onToggle={() => setShowMentor(!showMentor)}
        challengeContext={matchedChallenge?.title || "your challenge"}
      />

      {/* Reset button */}
      <div className="mt-6 text-center">
        <Button variant="ghost" onClick={onReset} className="text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change Role
        </Button>
      </div>
    </div>
  );
};

export default StudentFlow;
