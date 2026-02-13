"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import prisma from "../../../lib/data/prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/cloudinary";

// ----------------------------------------------------------------------
// TYPE DEFINITIONS
// ----------------------------------------------------------------------
export interface UserProfile {
  id: string;
  email: string;
  isApproved: boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  profile_picture: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UpdateProfileResponse {
  success: boolean;
  user?: UserProfile;
  error?: string;
}

// ----------------------------------------------------------------------
// 1. GET USER PROFILE
// ----------------------------------------------------------------------
export async function getUserProfile(): Promise<UserProfile | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  try {
    const userId = (session.user as any).id;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      isApproved: user.isApproved,
      first_name: user.firstName ?? "",
      last_name: user.lastName ?? "",
      phone_number: user.phoneNumber ?? "",
      address: user.profile?.address ?? "",
      profile_picture: user.profile?.profilePicture ?? null,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Profile fetch error:", error);
    return null;
  }
}

// ----------------------------------------------------------------------
// 2. UPDATE USER PROFILE
// ----------------------------------------------------------------------
export async function updateProfile(formData: FormData): Promise<UpdateProfileResponse> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return { success: false, error: "Unauthorized" };
  }

  // 1. Resolve User ID
  let userId = (session.user as any).id;

  if (!userId) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) return { success: false, error: "User not found" };
    userId = user.id;
  }

  // 2. Extract Data from FormData
  const firstName = formData.get("first_name") as string | null;
  const lastName = formData.get("last_name") as string | null;
  const phoneNumber = formData.get("phone_number") as string | null;
  const address = formData.get("address") as string | null;
  const imageFile = formData.get("profile_picture") as File | null;

  let profilePictureUrl: string | undefined;

  try {
    // 3. Handle Image Upload (if exists)
    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadImage(imageFile, "bugah-king-profiles");
      profilePictureUrl = uploadResult.url;
    }

    // 4. Build update data objects
    const userUpdateData: any = {};
    const profileUpdateData: any = {};
    const profileCreateData: any = {};

    // Only update fields that were provided
    if (firstName) {
      userUpdateData.firstName = firstName;
    }
    if (lastName) {
      userUpdateData.lastName = lastName;
    }
    if (phoneNumber) {
      userUpdateData.phoneNumber = phoneNumber;
    }
    
    if (address) {
      profileUpdateData.address = address;
      profileCreateData.address = address;
    }
    
    if (profilePictureUrl) {
      profileUpdateData.profilePicture = profilePictureUrl;
      profileCreateData.profilePicture = profilePictureUrl;
    }

    // 5. Update Database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...userUpdateData,
        profile: {
          upsert: {
            create: profileCreateData,
            update: profileUpdateData,
          },
        },
      },
      include: { profile: true },
    });

    // 6. Revalidate cache
    revalidatePath("/dashboard");
    revalidatePath("/profile");

    // 7. Return Clean Data in the same format as getUserProfile
    return {
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        isApproved: updatedUser.isApproved,
        first_name: updatedUser.firstName ?? "",
        last_name: updatedUser.lastName ?? "",
        phone_number: updatedUser.phoneNumber ?? "",
        address: updatedUser.profile?.address ?? "",
        profile_picture: updatedUser.profile?.profilePicture ?? null,
        createdAt: updatedUser.createdAt.toISOString(),
        updatedAt: updatedUser.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Profile Update Error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to update profile details." 
    };
  }
}