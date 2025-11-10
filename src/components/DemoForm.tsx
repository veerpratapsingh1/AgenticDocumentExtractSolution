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
    submissionTime: "",
  });
  const [errors, setErrors] = useState({ phone: "" });

  const baseUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (open) {
      setFormData(prev => ({
        ...prev,
        pageUrl: window.location.href,
        submissionTime: new Date().toISOString(),
      }));
    }
  }, [open]);

  const validatePhone = (phone: string) => {
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 10) return "Phone must be at least 10 digits";
    if (!/^[6-9]\d{9,}$/.test(clean)) return "Invalid phone number";
    return "";
  };

  const handlePhoneChange = (e: any) => {
    const val = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: val });
    setErrors({ phone: validatePhone(val) });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) {
      setErrors({ phone: phoneErr });
      toast({ title: "Error", description: phoneErr, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${baseUrl}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (result.success) {
        toast({ title: "Success", description: "Email sent successfully!" });
        onOpenChange(false);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", pageUrl: "", submissionTime: "" });
      } else {
        toast({ title: "Failed", description: result.error || "Error occurred", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Server Error", description: "Failed to connect to server", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book Demo</DialogTitle>
          <DialogDescription>Fill your details below</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {["firstName", "lastName", "email"].map(field => (
            <div className="space-y-2" key={field}>
              <Label htmlFor={field}>{field.replace(/^\w/, c => c.toUpperCase())} *</Label>
              <Input
                id={field}
                required
                value={(formData as any)[field]}
                onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                placeholder={`Enter your ${field}`}
                disabled={isSubmitting}
              />
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              className={errors.phone ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
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
