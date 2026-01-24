import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LeadFormProps {
  onClose?: () => void;
}

const LeadForm = ({ onClose }: LeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    queries: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission - will connect to Supabase when Cloud is enabled
    await new Promise(resolve => setTimeout(resolve, 800));
    
    toast.success("Thank you! We'll be in touch soon.");
    setFormData({ name: "", email: "", company: "", role: "", queries: "" });
    setIsSubmitting(false);
    onClose?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-foreground">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-background border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Email <span className="text-primary">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-background border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-sm font-medium text-foreground">
          Company <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="company"
          type="text"
          placeholder="Your company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="bg-background border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-sm font-medium text-foreground">
          Role <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="role"
          type="text"
          placeholder="Your role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="bg-background border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="queries" className="text-sm font-medium text-foreground">
          Questions or Comments <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="queries"
          placeholder="Tell us more about what you're looking for..."
          rows={4}
          value={formData.queries}
          onChange={(e) => setFormData({ ...formData, queries: e.target.value })}
          className="bg-background border-border resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-medium py-6"
      >
        {isSubmitting ? "Submitting..." : "Sign Me Up"}
      </Button>
    </form>
  );
};

export default LeadForm;
