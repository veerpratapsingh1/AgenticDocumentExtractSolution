import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: [
      process.env.CLIENT_ORIGIN || "http://localhost:8080",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// Request Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Zimbra Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: parseInt(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verify Email Configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Configuration Error:", error.message);
  } else {
    console.log("SMTP Connection Successful");
    console.log(`Email configured for: ${process.env.EMAIL_USER}`);
  }
});

// Health Check Route
app.get("/test", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    emailConfigured: !!process.env.EMAIL_USER,
  });
});

// Send Email Route - Plain Text Only
app.post("/send-email", async (req, res) => {
  console.log("\nProcessing email request...");

  const { firstName, lastName, email, phone, pageUrl, submissionTime } =
    req.body;

  // Validation
  if (!firstName || !lastName || !email || !phone) {
    console.log("Validation failed: Missing required fields");
    return res.status(400).json({
      success: false,
      error: "All fields (firstName, lastName, email, phone) are required",
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Validation failed: Invalid email format");
    return res.status(400).json({
      success: false,
      error: "Invalid email format",
    });
  }

  try {
    // Format submission time for IST
    const formattedTime = submissionTime
      ? new Date(submissionTime).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

    // Simple Plain Text Email Content
    const textContent = `AgenticDocExtract Demo Request

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Page URL: ${pageUrl || "N/A"}
Submitted At: ${formattedTime}
`;

    console.log("Sending email to:", process.env.EMAIL_USER);

    const info = await transporter.sendMail({
      from: `"Demo Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `AgenticDocExtract Demo Request from ${firstName} ${lastName}`,
      text: textContent,
    });

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);

    return res.json({
      success: true,
      messageId: info.messageId,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email sending failed:");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send email",
      errorCode: error.code,
    });
  }
});

// 404 Handler
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: "Route not found",
    availableRoutes: ["GET /test", "POST /send-email"],
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: err.message,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("\n====================================");
  console.log(`Server running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/test`);
  console.log(`Email endpoint: http://localhost:${PORT}/send-email`);
  console.log(`Emails will be sent to: ${process.env.EMAIL_USER}`);
  console.log("====================================\n");
});
