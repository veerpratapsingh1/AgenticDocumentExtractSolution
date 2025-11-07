import { FileSearch, Sparkles, Database, Shield } from "lucide-react";

const CoreFeatures = () => {
  const features = [
    {
      icon: FileSearch,
      title: "Parsing",
      description: "Transforms raw documents into structured, actionable data for faster analysis and processing"
    },
    {
      icon: Sparkles,
      title: "Enrichment",
      description: "Adds context and insights to make data smarter and more discoverable."
    },
    {
      icon: Database,
      title: "Field Extraction",
      description: "Intelligently capture structured data, consistently extract fields across all your documents."
    },
    {
      icon: Shield,
      title: "Enterprise-grade Security",
      description: "Zero-data retention and GDPR-compliant protection for sensitive information."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-black">Core</span> Features
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground px-4">
              Advanced capabilities that power intelligent document extraction
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-xl md:rounded-2xl p-5 md:p-6 border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 text-center group"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 mx-auto group-hover:bg-primary/20 transition-colors group-hover:scale-110 transform duration-300">
                    <Icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-black">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
