import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();



const baseUrl = process.env.BASE_URL || "http://localhost:5000";

// ✅ CORS
app.use(
  cors({
    origin: [
      process.env.CLIENT_ORIGIN || "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:8080",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ✅ Mail Transport
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
});

transporter.verify((error) => {
  if (error) console.error("❌ SMTP Config Error:", error.message);
  else console.log("✅ SMTP Connection Successful");
});

// ✅ Health check
app.get("/test", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    emailConfigured: !!process.env.EMAIL_USER,
  });
});

// ✅ Send email route
app.post("/send-email", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, pageUrl, submissionTime } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const recipient = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER;
    if (!recipient) {
      console.error("❌ No recipient email defined in .env");
      return res.status(500).json({ success: false, error: "Recipient email not configured" });
    }

    const formattedTime = new Date(submissionTime || new Date()).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const textContent = `New Demo Request

First Name: ${firstName}
Last Name: ${lastName}
Email: ${email}
Phone: ${phone}
Page URL: ${pageUrl || "N/A"}
Submitted At: ${formattedTime}
`;

    console.log("📨 Sending email to:", recipient);

    const info = await transporter.sendMail({
      from: `"Demo Form" <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: `AgenticDocExtract Demo Request from ${firstName} ${lastName}`,
      text: textContent,
    });

    console.log("✅ Email Sent - ID:", info.messageId);
    return res.json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
    return res.status(500).json({
      success: false,
      error: err.message || "Internal Server Error",
    });
  }
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
====================================
🚀 Server running on port ${PORT}
🌐 Base URL: ${baseUrl}
📩 Email endpoint: ${baseUrl}/send-email
====================================
`);
});
