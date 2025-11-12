import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allow your frontend domain (Netlify)
app.use(
  cors({
    origin: ["https://agenticdoc.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Root route for Render check
app.get("/", (req, res) => {
  res.send("✅ Agentic Backend is running successfully on Render!");
});

// ✅ Email sending API
app.post("/send-email", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, pageUrl, submissionTime } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "veer.pratapsingh@featsystems.com", // 🔧 Change to your receiving email
      subject: "New Demo Request from Agentic Website",
      text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Page URL: ${pageUrl}
      Submission Time: ${submissionTime}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "✅ Email sent successfully" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

// ✅ Dynamic PORT for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
