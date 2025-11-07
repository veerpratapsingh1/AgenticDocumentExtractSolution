import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import DemoForm from "@/components/DemoForm";

const Navbar = () => {
  const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center justify-center">
             <img 
              src="/AgenticDocExtractLogo.svg" 
              alt="AgenticDocExtractLogo Logo"
              className="h-10 w-10 md:h-12 md:w-12"
              />
            <span className="text-xl md:text-2xl font-bold">AgenticDocExtract</span>
          </div>

          {/* Book a Demo Button */}
          <Button
            size="lg"
            className="text-xs xs:text-sm sm:text-base px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 h-8 xs:h-9 sm:h-10 md:h-11 lg:h-12"
            onClick={() => setIsDemoFormOpen(true)}
          >
            Book a Demo
          </Button>

          {/* Demo Form Modal */}
          <DemoForm open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;