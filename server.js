import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env.local file
dotenv.config({ path: path.join(__dirname, ".env.local") });

const app = express();

// ✅ Environment variables
const baseUrl = process.env.VITE_BASE_URL || "http://localhost:5000";
const clientBaseUrl = process.env.VITE_CLIENT_BASE_URL || "http://localhost:5173";
const websiteUrl = process.env.VITE_WEBSITE_URL || "https://agenticdocextract.featsystems.ai";
const clientOrigin = process.env.VITE_CLIENT_ORIGIN || "http://localhost:8080";

// ✅ Allow both local and UAT origins
app.use(
  cors({
    origin: [
      clientBaseUrl,
      clientOrigin,
      websiteUrl,
      "http://192.168.1.137:8011", // ✅ UAT URL
      "http://localhost:5173",     // ✅ Local frontend
      "http://localhost:8080",     // ✅ Another dev port
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ✅ Configure mail transporter
const transporter = nodemailer.createTransport({
  host: process.env.VITE_SMTP_HOST,
  port: parseInt(process.env.VITE_SMTP_PORT) || 587,
  secure: parseInt(process.env.VITE_SMTP_PORT) === 465,
  auth: {
    user: process.env.VITE_EMAIL_USER,
    pass: process.env.VITE_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Verify SMTP connection
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP Configuration Error:", error.message);
  } else {
    console.log("📧 SMTP Connection Successful");
    console.log(`Configured for: ${process.env.VITE_EMAIL_USER}`);
  }
});

// ✅ Test route
app.get("/test", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    emailConfigured: !!process.env.VITE_EMAIL_USER,
    baseUrl,
    clientBaseUrl,
    websiteUrl,
  });
});

// ✅ Send email endpoint
app.post("/send-email", async (req, res) => {
  console.log("\n📩 Processing email request...");

  const { firstName, lastName, email, phone, pageUrl, submissionTime } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({
      success: false,
      error: "All fields (firstName, lastName, email, phone) are required",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email format",
    });
  }

  try {
    const formattedTime = submissionTime
      ? new Date(submissionTime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      : new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const textContent = `
AgenticDocExtract Demo Request

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Page URL: ${pageUrl || "N/A"}
Submitted At: ${formattedTime}
`;

    const info = await transporter.sendMail({
      from: `"Demo Form" <${process.env.VITE_EMAIL_USER}>`,
      to: process.env.VITE_EMAIL_USER,
      subject: `AgenticDocExtract Demo Request - ${firstName} ${lastName}`,
      text: textContent,
    });

    console.log("✅ Email sent successfully:", info.messageId);

    return res.json({
      success: true,
      messageId: info.messageId,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send email",
    });
  }
});

// ✅ Handle 404
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    availableRoutes: ["GET /test", "POST /send-email"],
  });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: err.message,
  });
});

// ✅ Start the server
const PORT = process.env.VITE_PORT || 5000;
app.listen(PORT, () => {
  console.log("\n🚀 Server running...");
  console.log(`🌐 Base URL: ${baseUrl}`);
  console.log(`🧪 Test URL: ${baseUrl}/test`);
  console.log(`📨 Send Email URL: ${baseUrl}/send-email`);
  console.log(`📧 Email To: ${process.env.VITE_EMAIL_USER}`);
  console.log("====================================\n");
});
