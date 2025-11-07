import { Upload, Brain, CheckCircle, Send } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Ingest Documents",
      description: "Upload PDFs, images, or forms in any format",
    },
    {
      icon: Brain,
      title: "Parse Layout",
      description: "AI analyzes visual structure and layout",
    },
    {
      icon: CheckCircle,
      title: "Understand Semantics",
      description: "Comprehend document meaning and context",
    },
    {
      icon: Send,
      title: "Extract & Map Data",
      description: "Pull data and map to your schema",
    },
    {
      icon: CheckCircle,
      title: "Validate",
      description: "Apply validation rules and confidence scoring",
    },
    {
      icon: Send,
      title: "Output & Integrate",
      description: "Structured data via API or RAG pipelines",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-20 space-y-2 md:space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-black">How it </span>
              <span style={{ color: "#ff825c" }}>Works</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground px-4">
              Six simple steps from raw documents to structured data
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line - Hidden on mobile, visible on desktop */}
            <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#ff825c]/30 md:-translate-x-1/2" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={index} className="relative mb-12 md:mb-16 last:mb-0">
                  {/* Numbered Dot */}
                  <div
                    className="absolute left-0 md:left-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-white z-10 shadow-lg text-sm sm:text-base transform md:-translate-x-1/2"
                    style={{ backgroundColor: "#ff825c" }}
                  >
                    {index + 1}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-14 sm:ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                      isEven
                        ? "md:ml-0 md:mr-auto md:pr-12 lg:pr-16"
                        : "md:ml-auto md:mr-0 md:pl-12 lg:pl-16"
                    }`}
                  >
                    <div className="bg-white rounded-lg md:rounded-xl p-5 sm:p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4 sm:gap-5">
                        {/* Icon Container */}
                        <div
                          className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: "#FFE6DE" }}
                        >
                          <Icon
                            className="h-6 w-6 sm:h-7 sm:w-7"
                            style={{ color: "#ff825c" }}
                          />
                        </div>
                        
                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold mb-2 text-black">
                            {step.title}
                          </h3>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;