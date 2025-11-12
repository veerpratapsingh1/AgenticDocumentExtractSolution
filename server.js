import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, pageUrl, submissionTime } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail ID
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "veer.pratapsingh@featsystems.com", // Change this to your company email
      subject: "New Demo Request",
      text: `
      ✅ New Demo Request Received!

      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      Page: ${pageUrl}
      Submitted at: ${submissionTime}
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("📩 Email sent successfully!");
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
