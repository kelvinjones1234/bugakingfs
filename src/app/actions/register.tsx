"use server";

import prisma from "../../../lib/data/prisma";
import bcrypt from "bcrypt";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;

  if (!email || !password || !firstName || !lastName) {
    return { error: "Required fields are missing." };
  }

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already in use." };
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create User and Profile in a Transaction
    // This ensures both succeed or both fail (no "orphaned" users without profiles)
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phoneNumber,
          // Initialize the profile at the same time
          profile: {
            create: {} 
          }
        },
      });
      return user;
    });

    return { success: true };
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return { error: "Something went wrong. Please try again." };
  }
}