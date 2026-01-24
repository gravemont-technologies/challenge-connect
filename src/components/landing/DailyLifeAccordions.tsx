import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const corporationItems = [
  "Post a challenge in minutes—just describe the business problem or task",
  "AI matches you with pre-vetted students whose skills fit your needs",
  "Review anonymized submissions, ensuring unbiased evaluation",
  "Provide feedback and scores; top performers rise to the top",
  "Offer internships or project extensions to proven talent",
  "Track KPIs and outcomes through a clean dashboard",
];

const studentItems = [
  "Browse challenges tailored to your skills and interests",
  "Apply with one click—your profile does the talking",
  "Work on real business problems, building portfolio-worthy experience",
  "Receive actionable feedback from industry professionals",
  "Earn points, badges, and climb the leaderboard",
  "Get discovered for internships and job opportunities",
];

const DailyLifeAccordions = () => {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center mb-10">
        What your daily life looks like with it
      </h2>
      
      <div className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="corporation" className="bg-card rounded-lg shadow-sm border-0 px-6">
            <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline py-5">
              For Corporations
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <ul className="space-y-3">
                {corporationItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="student" className="bg-card rounded-lg shadow-sm border-0 px-6">
            <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline py-5">
              For Students
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <ul className="space-y-3">
                {studentItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default DailyLifeAccordions;
