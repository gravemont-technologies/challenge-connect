const HeroSection = () => {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-8 leading-tight">
        Discover Tahqeeq
      </h1>
      <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-4xl mx-auto">
        Unlock Efficient Ops with Local Talent. Tahqeeq is an AI-powered matching platform 
        connecting businesses with top university students for real-world challenges. 
        By leveraging local talent and smart automation, we help you achieve better outcomes 
        faster—saving you <span className="font-semibold text-primary">20–40% on costs and time</span>.
      </p>
    </section>
  );
};

export default HeroSection;
