const HeroSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
      <p className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4">
        Operational Excellence Platform
      </p>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-8 leading-tight">
        Discover Tahqeeq: Unlock Efficient Ops with Local Talent
      </h1>
      <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-4xl mx-auto mb-6">
        Imagine a world where your routine operational tasks — like data cleanup, basic reporting, 
        compliance checks, or route tweaks — get handled faster and cheaper than outsourcing, 
        while building a pipeline of committed, local talent that sticks around.
      </p>
      <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-4xl mx-auto mb-6">
        Tahqeeq is a simple PaaS that turns those subtasks into short, targeted challenges for 
        GCC university students. No more endless freelancer ramps or compliance headaches — just 
        quick, validated outputs that save you <span className="font-semibold text-primary">20–40% on costs and time</span>.
      </p>
      <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto italic">
        It's not magic — it's a repeatable system that delivers reliable results for narrow tasks, 
        with built-in checks for quality and fit.
      </p>
    </section>
  );
};

export default HeroSection;
