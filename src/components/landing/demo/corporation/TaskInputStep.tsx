import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Sparkles, DollarSign, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface TaskInputStepProps {
  onSubmit: (task: TaskData) => void;
}

export interface TaskData {
  description: string;
  kpi: string;
  budget: string;
  timeline: string;
  category: string;
}

const TaskInputStep = ({ onSubmit }: TaskInputStepProps) => {
  const [task, setTask] = useState<TaskData>({
    description: "",
    kpi: "",
    budget: "",
    timeline: "",
    category: "",
  });
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAutoSuggest = () => {
    const desc = task.description.toLowerCase();
    setShowSuggestions(true);
    
    if (desc.includes("logistics") || desc.includes("delivery") || desc.includes("route")) {
      setSuggestion("Target 20% cost reduction in delivery operations");
    } else if (desc.includes("marketing") || desc.includes("campaign")) {
      setSuggestion("Target 15% engagement increase with 25% budget efficiency");
    } else if (desc.includes("data") || desc.includes("analysis")) {
      setSuggestion("Target 95% accuracy rate with 30% time reduction");
    } else if (desc.includes("inventory") || desc.includes("stock")) {
      setSuggestion("Target 18% inventory holding cost reduction");
    } else if (desc.includes("customer") || desc.includes("support")) {
      setSuggestion("Target 40% response time improvement");
    } else {
      setSuggestion("Define measurable outcomes for optimal matching");
    }
  };

  const applySuggestion = () => {
    if (suggestion) {
      setTask((prev) => ({ ...prev, kpi: suggestion }));
      setSuggestion(null);
      setShowSuggestions(false);
    }
  };

  const isValid = task.description && task.kpi && task.budget && task.timeline && task.category;

  const taskTemplates = [
    { label: "Financial Model", desc: "Build Excel-based financial projections and scenario analysis for business planning", category: "finance" },
    { label: "Statistical Analysis", desc: "Perform regression analysis on sales data to identify growth drivers", category: "analytics" },
    { label: "Route Optimization", desc: "Optimize delivery routes for regional logistics using Excel Solver", category: "operations" },
    { label: "Budget Forecast", desc: "Create dynamic Excel budget templates with variance analysis", category: "finance" },
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
          <Lightbulb className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">Create a Mini Hackathon</h3>
        <p className="text-muted-foreground text-sm mt-1">
          Transform your operational KPIs into focused student challenges
        </p>
        <p className="text-xs text-muted-foreground/70 mt-2 max-w-sm mx-auto">
          Students use tools like Excel, Python & specialized software to deliver tailored solutions for your business needs
        </p>
      </div>

      {/* Quick Templates */}
      <div className="flex flex-wrap gap-2 justify-center">
        {taskTemplates.map((template) => (
          <Badge
            key={template.label}
            variant="outline"
            className="cursor-pointer hover:bg-primary/10 transition-colors"
            onClick={() => setTask({ ...task, description: template.desc, category: template.category })}
          >
            {template.label}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Subtask Description</Label>
          <Textarea
            id="description"
            placeholder="e.g., Optimize delivery routes for our regional logistics network to reduce fuel costs and delivery times..."
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={task.category} onValueChange={(v) => setTask({ ...task, category: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operations">Operations & Logistics</SelectItem>
                <SelectItem value="analytics">Data & Analytics</SelectItem>
                <SelectItem value="marketing">Marketing & Growth</SelectItem>
                <SelectItem value="finance">Finance & Planning</SelectItem>
                <SelectItem value="tech">Technology & Dev</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline" className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Timeline
            </Label>
            <Select value={task.timeline} onValueChange={(v) => setTask({ ...task, timeline: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-week">1 Week Sprint</SelectItem>
                <SelectItem value="2-weeks">2 Weeks</SelectItem>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" /> Budget Range
          </Label>
          <Select value={task.budget} onValueChange={(v) => setTask({ ...task, budget: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="500-1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
              <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
              <SelectItem value="5000+">$5,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="kpi" className="flex items-center gap-1">
            <Target className="w-3.5 h-3.5" /> Key Performance Indicator (KPI)
          </Label>
          <div className="flex gap-2">
            <Input
              id="kpi"
              placeholder="e.g., Reduce costs by 20%"
              value={task.kpi}
              onChange={(e) => setTask({ ...task, kpi: e.target.value })}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAutoSuggest}
              className="shrink-0"
              disabled={!task.description}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Suggest
            </Button>
          </div>
        </div>

        {showSuggestions && suggestion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="p-3 bg-accent/30 border-accent/50">
              <p className="text-sm text-foreground flex items-center gap-2 flex-wrap">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">AI Suggestion:</span>
                <span className="font-medium">{suggestion}</span>
                <Button size="sm" variant="ghost" onClick={applySuggestion} className="ml-auto">
                  Apply
                </Button>
              </p>
            </Card>
          </motion.div>
        )}
      </div>

      <Button
        onClick={() => onSubmit(task)}
        disabled={!isValid}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        size="lg"
      >
        Launch Challenge
      </Button>
    </motion.div>
  );
};

export default TaskInputStep;
