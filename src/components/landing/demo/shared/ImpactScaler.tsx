import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Clock, Users } from "lucide-react";

interface ImpactScalerProps {
  baseMetrics: {
    costReduction: number;
    timesSaved: number;
    studentsEngaged: number;
  };
}

const ImpactScaler = ({ baseMetrics }: ImpactScalerProps) => {
  const [timeHorizon, setTimeHorizon] = useState(6); // months
  const [roiYears, setRoiYears] = useState(3);

  const calculateProjectedSavings = useCallback(() => {
    const monthlySavings = baseMetrics.costReduction * 1000; // Base $1000/month unit
    return monthlySavings * timeHorizon;
  }, [baseMetrics.costReduction, timeHorizon]);

  const calculateROI = useCallback(() => {
    const annualSavings = baseMetrics.costReduction * 12000;
    const investmentCost = 5000; // Platform cost assumption
    return ((annualSavings * roiYears - investmentCost) / investmentCost * 100).toFixed(0);
  }, [baseMetrics.costReduction, roiYears]);

  const metrics = [
    {
      icon: DollarSign,
      label: "Projected Savings",
      value: `$${calculateProjectedSavings().toLocaleString()}`,
      sublabel: `over ${timeHorizon} months`,
      color: "text-emerald-600",
    },
    {
      icon: TrendingUp,
      label: "ROI",
      value: `${calculateROI()}%`,
      sublabel: `${roiYears}-year projection`,
      color: "text-primary",
    },
    {
      icon: Clock,
      label: "Hours Saved",
      value: `${Math.round(baseMetrics.timesSaved * timeHorizon * 4)}`,
      sublabel: "management hours",
      color: "text-blue-600",
    },
    {
      icon: Users,
      label: "Talent Pool",
      value: `${baseMetrics.studentsEngaged * Math.ceil(timeHorizon / 3)}`,
      sublabel: "students engaged",
      color: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-3 bg-card border-0 shadow-sm text-center">
              <metric.icon className={`w-5 h-5 mx-auto mb-1 ${metric.color}`} />
              <p className={`text-lg sm:text-xl font-bold ${metric.color}`}>{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <p className="text-[10px] text-muted-foreground/70">{metric.sublabel}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Savings Timeline</label>
            <span className="text-sm text-primary font-semibold">{timeHorizon} months</span>
          </div>
          <Slider
            value={[timeHorizon]}
            onValueChange={([v]) => setTimeHorizon(v)}
            min={1}
            max={12}
            step={1}
            className="cursor-grab active:cursor-grabbing"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 mo</span>
            <span>6 mo</span>
            <span>12 mo</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">ROI Projection</label>
            <span className="text-sm text-primary font-semibold">{roiYears} years</span>
          </div>
          <Slider
            value={[roiYears]}
            onValueChange={([v]) => setRoiYears(v)}
            min={1}
            max={10}
            step={1}
            className="cursor-grab active:cursor-grabbing"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 yr</span>
            <span>5 yr</span>
            <span>10 yr</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground italic">
        Drag the sliders to see projected impact over time
      </p>
    </div>
  );
};

export default ImpactScaler;
