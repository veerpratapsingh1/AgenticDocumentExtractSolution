import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allow CORS for your frontend domain
app.use(
  cors({
    origin: ["https://agenticdoc.netlify.app", "http://localhost:5173"], // allowed origins
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully ✅");
});

// ✅ Email sending route
app.post("/send-email", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, pageUrl, submissionTime } = req.body;

    if (!email || !firstName || !lastName || !phone) {
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
      to: "veer.pratapsingh@featsystems.com",
      subject: "📩 New Demo Request",
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Page: ${pageUrl}
        Time: ${submissionTime}
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

// ✅ For Render dynamic port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
