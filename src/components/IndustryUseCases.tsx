import { Building2, FileHeart, Heart, Scale, Truck } from "lucide-react";

const IndustryUseCases = () => {
  const industries = [
    {
      icon: Building2,
      title: "Finance",
      description: "Extraction of key information from invoices, statements, financial reports, and transaction records. Gain real-time visibility into financial data, reduce manual errors, and accelerate reconciliation and auditing processes."
    },
    {
      icon: FileHeart,
      title: "Insurance",
      description: "Simplify claims and policy management by processing claims forms, policy documents, and underwriting materials automatically. Speed up claim approvals, improve accuracy, and enhance customer satisfaction through faster document turnaround."
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Digitize and organize critical medical information from patient intake forms, medical records, and lab results. Enable faster diagnosis, secure data sharing, and improved patient experience with AI-driven document intelligence."
    },
    {
      icon: Scale,
      title: "Legal",
      description: "Extract and analyze key clauses from contracts, legal briefs, and court documents in seconds. Enhance due diligence, reduce review time, and ensure compliance with precise, searchable legal document data."
    },
    {
      icon: Truck,
      title: "Logistics",
      description: "Streamline operations by automating data capture from bills of lading, customs documents, and shipping manifests. Ensure faster clearance, accurate record-keeping, and better supply chain visibility with intelligent document understanding."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-black">Industry</span> Use Cases
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground px-4">
              Can be used across multiple industries
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-xl md:rounded-2xl p-6 md:p-8 border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-black">{industry.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryUseCases;
