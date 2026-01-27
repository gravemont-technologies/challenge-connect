import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LeadForm from "./LeadForm";
import EnhancedDemo from "./demo/EnhancedDemo";

const CTASection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-semibold text-foreground text-center mb-12 tracking-tight"
      >
        Ready to see more?
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
      >
        <Button
          onClick={() => setIsFormOpen(true)}
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium px-8 py-6 text-sm tracking-wide w-full sm:w-auto rounded-md shadow-elite hover:shadow-elegant transition-all"
        >
          I'm interested, sign me up!
        </Button>

        <Button
          onClick={() => setShowDemo(!showDemo)}
          size="lg"
          variant="outline"
          className="border-border hover:border-primary/30 text-foreground hover:bg-muted/50 font-medium px-8 py-6 text-sm tracking-wide w-full sm:w-auto rounded-md transition-all"
        >
          {showDemo ? "Hide the walkthrough" : "Walk me thru the process"}
        </Button>
      </motion.div>

      {/* Interactive Demo Section */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="bg-background border border-border/30 p-8 md:p-12 rounded-md shadow-elite">
              <EnhancedDemo onClose={() => setShowDemo(false)} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md bg-background border-border/50 rounded-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground tracking-tight">
              Join the Waitlist
            </DialogTitle>
          </DialogHeader>
          <LeadForm onClose={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CTASection;