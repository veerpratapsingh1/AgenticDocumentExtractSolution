const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const phoneError = validatePhone(formData.phone);
  if (phoneError) {
    toast({
      title: "Validation Error",
      description: phoneError,
      variant: "destructive",
    });
    return;
  }

  const sendingData = {
    ...formData,
    submissionTime: new Date().toISOString(),   // ✅ Actual time
  };

  console.log("✅ Sending data:", sendingData);

  try {
    const res = await fetch("http://localhost:5000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sendingData)
    });

    const result = await res.json();
    console.log("✅ Backend Response:", result);

    if (result.success) {
      toast({
        title: "✅ Email Sent",
        description: "Form submitted successfully.",
      });
      onOpenChange(false);
    } else {
      toast({
        title: "❌ Failed",
        description: result.error,
        variant: "destructive",
      });
    }

  } catch (error) {
    console.error("❌ Error:", error);
    toast({
      title: "❌ Connection Error",
      description: "Cannot connect to backend.",
      variant: "destructive",
    });
  }
};
