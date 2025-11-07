import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Sparkles, X } from "lucide-react";
import DemoForm from "@/components/DemoForm";

const CTA = () => {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/20 to-background relative">
      {/* Shadow/Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 bg-card/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 md:p-12 border border-primary/20 shadow-2xl shadow-primary/10">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              <p className="text-primary text-base md:text-lg font-semibold">Start Processing Today</p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-black">Ready to Transform Your</span><br className="hidden sm:block" />Documents?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Using our Intelligent document understanding solution, you unlock valuable insights hidden within your documents.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-2 md:pt-4">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 group w-full sm:w-auto" onClick={() => setIsDemoFormOpen(true)}>
              Schedule a Demo
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
        </div>
      </div>
    </section>
  );
};

export default CTA;