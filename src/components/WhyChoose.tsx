import { FileText, Table, Target, Database } from "lucide-react";

const WhyChoose = () => {
  const features = [
    {
      icon: FileText,
      title: "Extract Complex Layout",
      description: "Intelligently parse PDFs, scans, and tables into structured, semantic chunks ready for RAG and downstream LLM applications."
    },
    {
      icon: Table,
      title: "Extract Tables & Charts",
      description: "Extracts data from complex visual layouts, eliminating errors and enabling precise, industry-wide analysis."
    },
    {
      icon: Target,
      title: "Visual Grounding",
      description: "Links every AI answer to its exact spot in the document, ensuring accuracy, traceability, and trust."
    },
    {
      icon: Database,
      title: "Intelligently Extract Fields",
      description: "Automatically capture key fields from any document type with precision. Ensure accuracy, consistency, and full traceability through visual grounding."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-black">Why Choose</span> AgenticDocExtract
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Enterprise-grade document extraction that intelligently captures every detail — from form fields and tables to checkboxes and understands them in context.
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
              You get precise, layout-aware data ready for seamless integration into downstream applications.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-xl md:rounded-2xl p-6 md:p-8 border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-black">{feature.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
