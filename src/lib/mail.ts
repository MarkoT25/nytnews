"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_SMPT_PASSWORD,
  },
});

async function verifyConnection() {
  try {
    const testResult = await transporter.verify();
    console.log("Connected to SMTP server:", testResult);
    return testResult;
  } catch (error) {
    console.error("Error connecting to SMTP server:", error);
    return false;
  }
}

export async function sendVerificationEmail(email: string, token: string) {
  await verifyConnection();

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #1a73e8;
        color: white;
        padding: 20px;
        text-align: center;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
      }
      .button {
        display: inline-block;
        background-color: #1a73e8;
        color: white;
        text-decoration: none;
        padding: 12px 30px;
        border-radius: 4px;
        margin: 20px 0;
        font-weight: bold;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Email Verification</h1>
      </div>
      <div class="content">
        <h2>Welcome to News App!</h2>
        <p>Thank you for signing up. To complete your registration and access all features, please verify your email address.</p>
        <p style="text-align: center;">
          <a href="${verifyUrl}" class="button">Verify Email Address</a>
        </p>
        <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
        <p>If you didn't create an account with us, you can safely ignore this email.</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} News App. All rights reserved.</p>
        <p>This is an automated message, please do not reply.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"News App" <${process.env.NEXT_PUBLIC_EMAIL_USER}>`,
    to: email,
    subject: "Verify your email address for News App",
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
