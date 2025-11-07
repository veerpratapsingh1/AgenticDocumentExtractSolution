import { FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          <div className="flex items-center justify-center">
             <img 
              src="/agenticdocextractwhitelogo.svg" 
              alt="agenticdocextractwhitelogo Logo"
              className="h-10 w-10 md:h-12 md:w-12"
              />
            <span className="text-xl md:text-2xl font-bold text-white">AgenticDocExtract</span>
          </div>
          
          <p className="text-sm md:text-base text-gray-400 text-center px-4">
            Agentic Document Extraction powered by advanced AI
          </p>
          
          <div className="pt-4 md:pt-6 border-t border-gray-800">
            <p className="text-xs md:text-sm text-gray-400 text-center px-4">
              © 2025 agenticdocextract.featsystems.ai. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
