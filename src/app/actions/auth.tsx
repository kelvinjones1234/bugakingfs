"use server";

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendNotificationEmail } from "./email"; // Your nodemailer action
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export async function requestPasswordReset(email: string) {
  try {
    // 1. Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Security Best Practice: Do not reveal if an email exists in the DB.
      // Always return a generic success message.
      return {
        success: true,
        message: "If an account exists, a reset link was sent.",
      };
    }

    // 2. Generate a secure, random token
    const token = crypto.randomBytes(32).toString("hex");

    // 3. Set expiration time (e.g., 1 hour from now)
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // 4. Delete any existing reset tokens for this user to prevent clutter
    await prisma.passwordResetToken.deleteMany({
      where: { email },
    });

    // 5. Save the new token to the database
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    // 6. Construct the reset link
    // Make sure NEXT_PUBLIC_APP_URL is in your .env (e.g., http://localhost:3000)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/authentication";
    const resetLink = `${appUrl}/reset-password?token=${token}`;

    // 7. Send the email using your Gmail configuration
    const emailResult = await sendNotificationEmail(
      email,
      "Reset Your Password - Secure Investment Portal",
      `
        <div style="font-family: sans-serif; color: #171512; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #d0a539; font-style: italic;">Password Reset Request</h2>
          <p>Hello ${user.firstName},</p>
          <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
          <p>Click the button below to securely reset your password. This link will expire in 1 hour.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #d0a539; color: #171512; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px; text-transform: uppercase; letter-spacing: 1px;">
              Reset Password
            </a>
          </div>
          <p style="font-size: 12px; color: #666;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="font-size: 12px; color: #666; word-break: break-all;">${resetLink}</p>
        </div>
      `,
    );

    if (!emailResult.success) {
      return {
        success: false,
        error: "Failed to send the email. Please try again later.",
      };
    }

    return { success: true, message: "Check your email for a reset link." };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}




export async function resetPassword(token: string, newPassword: string) {
  try {
    // 1. Find the token in the database
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!resetToken) {
      return { success: false, error: "Invalid or expired reset link." };
    }

    // 2. Check if the token has expired
    if (new Date() > resetToken.expires) {
      await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });
      return { success: false, error: "Reset link has expired. Please request a new one." };
    }

    // 3. Hash the new password securely
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update the user's password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword }
    });

    // 5. Delete the token so it cannot be reused
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id }
    });

    return { success: true, message: "Password updated successfully." };

  } catch (error) {
    console.error("Failed to reset password:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}