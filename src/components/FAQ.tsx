import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How is this different from traditional OCR?",
      answer: "Traditional OCR only extracts text without understanding context or layout. Our agentic document extract uses AI to understand visual context, document structure, and semantic meaning, enabling accurate extraction from complex layouts, tables, and forms."
    },
    {
      question: "What file types are supported?",
      answer: "We support PDFs, images (JPG, PNG, TIFF), scanned documents, and common business document formats. Our AI can handle multi-page documents, complex layouts, handwritten text, and documents in multiple languages."
    },
    {
      question: "How accurate is the extraction?",
      answer: "Our extraction accuracy averages 98% across various document types. Each extracted field includes a confidence score, and our visual grounding feature lets you verify exactly where data was extracted from."
    },
    {
      question: "How long does onboarding take?",
      answer: "Most customers are up and running within 24-48 hours. Our REST API and comprehensive SDKs make integration straightforward, and our dedicated onboarding team provides hands-on support throughout the process."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. Your data is fully protected with zero-data retention and GDPR-compliant safeguards for all sensitive information. We never train on customer data and also provide on-premise deployment options to ensure maximum security and control."
    },
    {
      question: "Can I customize the extraction schema?",
      answer: "Yes! Our schema-flexible extraction adapts to your specific data models. You can define custom fields, nested structures, and validation rules without rigid templates or manual configuration."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-black">Frequently Asked</span> Questions
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground px-4">
              Everything you need to know about Agentic Document Extract
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl md:rounded-2xl border border-border px-4 md:px-6 hover:border-primary/50 transition-all"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-black hover:text-[#ff825c] py-4 md:py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-4 md:pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
