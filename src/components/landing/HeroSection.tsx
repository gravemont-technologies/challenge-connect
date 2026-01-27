import { motion } from "framer-motion";
import BrandedText from "@/components/brand/BrandedText";

const HeroSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-medium text-primary/70 uppercase tracking-[0.2em] mb-6"
      >
        Operational Excellence Platform
      </motion.p>
      
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-10 leading-[1.15] tracking-tight"
      >
        Discover <BrandedText className="text-3xl md:text-4xl lg:text-5xl" />: Unlock Efficient Ops with Local Talent
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6"
      >
        Imagine a world where your routine operational tasks — like data cleanup, basic reporting, 
        compliance checks, or route tweaks — get handled faster and cheaper than outsourcing, 
        while building a pipeline of committed, local talent that sticks around.
      </motion.p>
      
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8"
      >
        <BrandedText /> is a simple PaaS that turns those subtasks into short, targeted challenges for 
        GCC university students. No more endless freelancer ramps or compliance headaches — just 
        quick, validated outputs that save you{" "}
        <span className="font-semibold text-primary">20–40% on costs and time</span>.
      </motion.p>
      
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-base text-muted-foreground/70 leading-relaxed max-w-2xl mx-auto italic"
      >
        It's not magic — it's a repeatable system that delivers reliable results for narrow tasks, 
        with built-in checks for quality and fit.
      </motion.p>
    </section>
  );
};

export default HeroSection;