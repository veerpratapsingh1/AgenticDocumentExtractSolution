import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Phone, X } from "lucide-react";
import heroImage from "@/assets/hero-document-parsing.jpg";
import DemoForm from "@/components/DemoForm";

const Hero = () => {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background pt-20 md:pt-16">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-primary" />
              <span className="text-sm md:text-base text-primary font-semibold">AI-powered document intelligence</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              Agentic Document Extract Solution
            </h1>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground/80">
              Beyond OCR. Beyond Text.
            </h2>
            
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              Next Gen Document Understanding with Visual Intelligence. You can transform decades of archives into LLM-ready data within hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 group w-full sm:w-auto" onClick={() => setIsDemoFormOpen(true)}>
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto" onClick={() => setIsCallDialogOpen(true)}>
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Call Us
              </Button>
            </div>
            
            <DemoForm open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen} />
            
            {/* Call Dialog */}
            {isCallDialogOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsCallDialogOpen(false)}>
                <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setIsCallDialogOpen(false)}
                    className="absolute top-4 right-4 text-red-500 hover:bg-red-50 rounded-full p-2 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  
                  <h3 className="text-3xl font-bold text-center mb-8 text-black">Call Now</h3>
                  
                  <div className="space-y-4">
                    <a 
                      href="tel:+16262132602"
                      className="flex items-center justify-center gap-3 bg-[#FF8B6A] hover:bg-[#FF7A59] text-white rounded-xl px-6 py-4 transition-colors font-medium text-lg"
                    >
                      <Phone className="h-5 w-5" />
                      USA +1 6262132602
                    </a>
                    
                    <a 
                      href="tel:+919321252212"
                      className="flex items-center justify-center gap-3 bg-black hover:bg-gray-800 text-white rounded-xl px-6 py-4 transition-colors font-medium text-lg"
                    >
                      <Phone className="h-5 w-5" />
                      India +91 9321252212
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-8">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="text-2xl md:text-4xl font-bold text-primary mb-1">98%</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Accuracy</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="text-2xl md:text-4xl font-bold text-primary mb-1">80%</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Time Saved</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 border border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                <div className="text-2xl md:text-4xl font-bold text-primary mb-1">Zero</div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">Setup Time</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in order-first lg:order-last">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
              <img 
                src={heroImage} 
                alt="Document parsing and structured output visualization" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;