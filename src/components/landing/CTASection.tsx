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
import InteractiveDemo from "./InteractiveDemo";

const CTASection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center mb-10">
        Ready to see more?
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Button
          onClick={() => setIsFormOpen(true)}
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium px-8 py-6 text-base w-full sm:w-auto"
        >
          I'm interested, sign me up!
        </Button>

        <Button
          onClick={() => setShowDemo(!showDemo)}
          size="lg"
          variant="outline"
          className="border-primary text-primary hover:bg-primary/5 font-medium px-8 py-6 text-base w-full sm:w-auto"
        >
          {showDemo ? "Hide the walkthrough" : "Walk me thru the process"}
        </Button>
      </div>

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
            <Card className="bg-background border border-border p-6 md:p-10">
              <h3 className="text-lg font-medium text-center text-foreground mb-6">
                Choose your perspective
              </h3>
              <InteractiveDemo onClose={() => setShowDemo(false)} />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-primary">
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
