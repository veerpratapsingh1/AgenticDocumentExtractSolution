import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface DemoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DemoForm = ({ open, onOpenChange }: DemoFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pageUrl: "",
    submissionTime: ""
  });

  const [errors, setErrors] = useState({
    phone: ""
  });

  useEffect(() => {
    if (open) {
      const currentPageUrl = window.location.href;
      const currentDateTime = new Date().toISOString();

      setFormData(prev => ({
        ...prev,
        pageUrl: currentPageUrl,
        submissionTime: currentDateTime
      }));
    }
  }, [open]);

  // ✅ Corrected Phone Validation
  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length === 0) {
      return "Phone number is required";
    } 
    else if (cleanPhone.length < 10) {
      return "Phone number must be at least 10 digits";
    }
    else if (!/^[6-9]\d{9,}$/.test(cleanPhone)) {
      return "Please enter a valid phone number (starting with 6-9)";
    }

    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, "");

    setFormData({ ...formData, phone: formattedValue });
    const error = validatePhone(formattedValue);
    setErrors({ ...errors, phone: error });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhone(formData.phone);

    if (phoneError) {
      setErrors({ ...errors, phone: phoneError });
      toast({
        title: "Validation Error",
        description: phoneError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const finalFormData = {
      ...formData,
      submissionTime: new Date().toISOString()
    };

    console.log("📤 Sending form data:", finalFormData);

    try {
      console.log("🔗 Connecting to: http://localhost:5000/send-email");

      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalFormData),
      });

      const result = await response.json();
      console.log("📦 Backend response:", result);

      if (result.success) {
        toast({
          title: "✅ Success!",
          description: "Your demo request has been sent successfully.",
        });

        onOpenChange(false);

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          pageUrl: "",
          submissionTime: ""
        });

        setErrors({ phone: "" });
      } else {
        toast({
          title: "❌ Failed",
          description: result.error || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("❌ Complete error object:", error);
      toast({
        title: "❌ Connection Error",
        description: "Could not connect to server. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Updated submit button disabling logic
  const isSubmitDisabled = () => {
    return (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      formData.phone.length < 10 ||
      errors.phone !== "" ||
      isSubmitting
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book Demo</DialogTitle>
          <DialogDescription className="text-base">
            Fill in your details below to request a demo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              placeholder="Enter your first name"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              placeholder="Enter your last name"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
              className={errors.phone ? "border-red-500" : ""}
              disabled={isSubmitting}
            />

            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}

            <p className="text-xs text-gray-500 mt-1">
              {formData.phone.length} digits
              {!errors.phone && formData.phone.length >= 10 && (
                <span className="text-green-600 ml-2">✓ Valid</span>
              )}
            </p>
          </div>

          <div style={{ display: 'none' }}>
            <Input id="pageUrl" value={formData.pageUrl} readOnly />
            <Input id="submissionTime" value={formData.submissionTime} readOnly />
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitDisabled()}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DemoForm;
