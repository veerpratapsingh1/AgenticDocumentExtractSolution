import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// ✅ Get Base URL from .env (VITE_BASE_URL)
const getBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (!baseUrl || baseUrl === "undefined") {
    console.warn("⚠️ VITE_BASE_URL missing in .env, using fallback → http://localhost:5000");
    return "http://localhost:5000";
  }
  return baseUrl;
};

const baseUrl = getBaseUrl();

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
    submissionTime: "",
  });
  const [errors, setErrors] = useState({ phone: "" });

  // ✅ Auto-set URL and submission time when dialog opens
  useEffect(() => {
    if (open) {
      setFormData((prev) => ({
        ...prev,
        pageUrl: window.location.href,
        submissionTime: new Date().toISOString(),
      }));
    }
  }, [open]);

  // ✅ Phone Validation
  const validatePhone = (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    if (!clean) return "Phone number is required";
    if (clean.length < 10) return "Phone number must be at least 10 digits";
    if (!/^[6-9]\d{9,}$/.test(clean)) return "Enter a valid phone number starting with 6-9";
    return "";
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: value });
    setErrors({ phone: validatePhone(value) });
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setErrors({ phone: phoneError });
      toast({
        title: "Validation Error",
        description: phoneError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const apiUrl = `${baseUrl}/send-email`;
    console.log("📤 Sending request to:", apiUrl);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submissionTime: new Date().toISOString(),
        }),
      });

      const result = await res.json();

      if (result.success) {
        toast({
          title: "✅ Success",
          description: "Your demo request was sent successfully.",
        });
        onOpenChange(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          pageUrl: "",
          submissionTime: "",
        });
      } else {
        toast({
          title: "❌ Failed",
          description: result.error || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      toast({
        title: "❌ Server Error",
        description: `Cannot connect to ${baseUrl}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Book Demo</DialogTitle>
          <DialogDescription>
            Fill in your details below to request a demo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Label>First Name *</Label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label>Last Name *</Label>
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label>Phone *</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit number"
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DemoForm;
