import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  Info,
  HelpCircle,
  Trophy,
  Mail,
  Phone,
  Github,
  Globe,
  ExternalLink,
  Filter,
  Users,
  CheckCircle2,
  Zap,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function PilotDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [role, setRole] = useState<"corp" | "student">("corp");
  const [prize, setPrize] = useState({ amount: "1000", currency: "USD" });
  const [expandedProfile, setExpandedProfile] = useState<number | null>(null);
  const [filterBy, setFilterBy] = useState("score");

  const mockStudents = [
    { 
      id: 1, 
      name: "Saleh Al-Farsi", 
      score: 94, 
      totalWins: 12, 
      corpWins: 3, 
      role: "Full-stack Dev", 
      email: "saleh@example.com", 
      phone: "+968 9123 4567",
      portfolio: "saleh.dev",
      github: "github.com/saleh"
    },
    { 
      id: 2, 
      name: "Fatima Al-Raisi", 
      score: 89, 
      totalWins: 8, 
      corpWins: 1, 
      role: "UI/UX Designer", 
      email: "fatima@example.com", 
      phone: "+968 9123 4568",
      portfolio: "fatima.design",
      github: "github.com/fatima"
    },
    { 
      id: 3, 
      name: "Ahmed Al-Balushi", 
      score: 85, 
      totalWins: 15, 
      corpWins: 5, 
      role: "Backend Engineer", 
      email: "ahmed@example.com", 
      phone: "+968 9123 4569",
      portfolio: "ahmed.tech",
      github: "github.com/ahmed"
    },
  ];

  const filteredStudents = [...mockStudents].sort((a, b) => {
    if (filterBy === "totalWins") return b.totalWins - a.totalWins;
    if (filterBy === "corpWins") return b.corpWins - a.corpWins;
    return b.score - a.score;
  });

  return (
    <div className="max-w-4xl mx-auto my-8">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Pilot-Only Demos</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                    onClick={() => setShowExplanation(!showExplanation)}
                  >
                    <span className="text-xs underline">(what's this?)</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Specific walkthroughs and settings reserved for pilot partners to test operational flows.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-4">
          <Card className="border-border/30 bg-card">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/30 pb-4">
              <CardTitle className="text-base font-medium">Demo Control Center</CardTitle>
              <div className="flex bg-muted rounded-md p-1">
                <Button 
                  size="sm" 
                  variant={role === "corp" ? "default" : "ghost"}
                  onClick={() => setRole("corp")}
                  className="h-8"
                >
                  Corporate
                </Button>
                <Button 
                  size="sm" 
                  variant={role === "student" ? "default" : "ghost"}
                  onClick={() => setRole("student")}
                  className="h-8"
                >
                  Student
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <AnimatePresence mode="wait">
                {role === "corp" ? (
                  <motion.div
                    key="corp"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-8"
                  >
                    {/* Prize Configuration */}
                    <div className="space-y-4 p-4 rounded-md border border-border/50 bg-muted/20">
                      <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Flexible Prize Pool
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Input 
                            type="number" 
                            value={prize.amount} 
                            onChange={(e) => setPrize({ ...prize, amount: e.target.value })}
                            placeholder="Amount"
                          />
                        </div>
                        <Select 
                          value={prize.currency} 
                          onValueChange={(v) => setPrize({ ...prize, currency: v })}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="OMR">OMR</SelectItem>
                            <SelectItem value="SAR">SAR</SelectItem>
                            <SelectItem value="QAR">QAR</SelectItem>
                            <SelectItem value="AED">AED</SelectItem>
                            <SelectItem value="BHD">BHD</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-[10px] text-muted-foreground italic">Prize will be automatically distributed among top performers.</p>
                    </div>

                    {/* Talent Management */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <Users className="w-4 h-4" /> 
                          Post-Operation Talent Management
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Filter by:</span>
                          <Select value={filterBy} onValueChange={setFilterBy}>
                            <SelectTrigger className="w-40 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="score">Hackathon Score</SelectItem>
                              <SelectItem value="totalWins">Total Overall Wins</SelectItem>
                              <SelectItem value="corpWins">Company-Specific Wins</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {filteredStudents.map((student) => (
                          <div key={student.id} className="border border-border/50 rounded-md overflow-hidden bg-background">
                            <div 
                              className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/30"
                              onClick={() => setExpandedProfile(expandedProfile === student.id ? null : student.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                  {student.name[0]}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold">{student.name}</div>
                                  <div className="text-[10px] text-muted-foreground">Score: {student.score}% • Wins: {student.totalWins}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px] h-5">
                                  {prize.currency} {(Number(prize.amount) / 3).toFixed(0)}
                                </Badge>
                                {expandedProfile === student.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              </div>
                            </div>

                            <AnimatePresence>
                              {expandedProfile === student.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="border-t border-border/30 bg-muted/5 p-4 space-y-4 overflow-hidden"
                                >
                                  <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div className="space-y-1">
                                      <div className="text-muted-foreground font-medium uppercase text-[10px]">Self-Set Role</div>
                                      <div>{student.role}</div>
                                    </div>
                                    <div className="space-y-1">
                                      <div className="text-muted-foreground font-medium uppercase text-[10px]">Company Affinity</div>
                                      <div>{student.corpWins} challenges won with you</div>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-2 pt-2">
                                    <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1">
                                      <Globe className="w-3 h-3" /> Portfolio
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1">
                                      <Github className="w-3 h-3" /> GitHub
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={() => window.open(`mailto:${student.email}`)}>
                                      <Mail className="w-3 h-3" /> {student.email}
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1">
                                      <Phone className="w-3 h-3" /> {student.phone}
                                    </Button>
                                  </div>

                                  <div className="pt-2 border-t border-border/30">
                                    <Button className="w-full h-8 text-xs gap-2">
                                      <Zap className="w-3 h-3" /> Convert to Intern
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="student"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center py-12 space-y-4">
                      <GraduationCap className="w-12 h-12 mx-auto text-primary opacity-20" />
                      <h4 className="text-lg font-semibold italic">"Student-side pilot view reflects real-time mission availability based on company currency & prize settings."</h4>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Switching to Student role mid-operation allows you to see how your challenge is perceived by local talent in {prize.currency}.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
