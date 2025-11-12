import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://agenticdoc.netlify.app", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ✅ Root Route (for testing)
app.get("/", (req, res) => {
  res.status(200).send("✅ Agentic Backend is running successfully on Render!");
});

// ✅ Email API Route
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
      to: "veer.pratapsingh@featsystems.com", // 👈 change to your email
      subject: "New Demo Request",
      text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Page URL: ${pageUrl}
      Submitted At: ${submissionTime}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

// ✅ Dynamic Port (Render uses random port)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
