// "use server";

// import prisma from "../../../lib/data/prisma";
// import { revalidatePath } from "next/cache";
// import bcrypt from "bcryptjs";
// // --- TYPES ---

// export interface UIUser {
//   id: string;
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   role: "STAFF" | "USER";
//   status: "ACTIVE" | "INACTIVE";
//   isActive: boolean;
//   isApproved: boolean;
//   investmentCount: number;
//   profileImage: string | null;
//   joinedAt: string;
// }
 
// // --- FETCH USERS ---

// // app/actions/userActions.ts

// export async function getAllUsers(): Promise<UIUser[]> {
//   const users = await prisma.user.findMany({
//     orderBy: { createdAt: "desc" },
//     include: {
//       profile: {
//         select: { profilePicture: true },
//       },
//       _count: {
//         select: {
//           // 👇 CHANGE THIS to match your schema exactly
//           clientInvestments: true, 
//         },
//       },
//     },
//   });

//   return users.map((user) => ({
//     id: user.id,
//     fullName: `${user.firstName} ${user.lastName}`,
//     email: user.email,
//     phoneNumber: user.phoneNumber || "N/A",
//     role: user.isStaff ? "STAFF" : "USER",
//     status: user.isActive ? "ACTIVE" : "INACTIVE",
//     isActive: user.isActive,
//     isApproved: user.isApproved,
//     // 👇 Update how you access the count
//     investmentCount: user._count.clientInvestments, 
//     profileImage: user.profile?.profilePicture || null,
//     joinedAt: user.createdAt.toISOString().split("T")[0],
//   }));
// }

// // --- TOGGLE ACTIVE STATUS ---

// export async function toggleUserActive(userId: string, currentStatus: boolean) {
//   try {
//     await prisma.user.update({
//       where: { id: userId },
//       data: { isActive: !currentStatus },
//     });

//     revalidatePath("/admin/users");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ TOGGLE USER ERROR:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown Error",
//     };
//   }
// }

// // --- DELETE USER ---

// export async function deleteUser(userId: string) {
//   try {
//     await prisma.user.delete({
//       where: { id: userId },
//     });

//     revalidatePath("/admin/users");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ DELETE USER ERROR:", error);
//     return {
//       success: false,
//       error: "Cannot delete user. They may have active records.",
//     };
//   }
// }







// export async function createUser(formData: FormData) {
//   try {
//     const firstName = formData.get("firstName") as string;
//     const lastName = formData.get("lastName") as string;
//     const email = formData.get("email") as string;
//     const phoneNumber = formData.get("phoneNumber") as string;
//     const password = formData.get("password") as string;
//     const role = formData.get("role") as string; // "STAFF" or "USER"
//     const isActive = formData.get("isActive") === "true";

//     // 1. Check if email exists
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) {
//       return { success: false, error: "User with this email already exists." };
//     }

//     // 2. Hash Password
//     const hashedPassword = await bcrypt.hash(password, 12);

//     // 3. Create User
//     await prisma.user.create({
//       data: {
//         firstName,
//         lastName,
//         email,
//         phoneNumber,
//         password: hashedPassword,
//         isStaff: role === "STAFF",
//         isActive,
//         isApproved: true, // Auto-approve manually created users
//         profile: {
//             create: {
//                 // Create empty profile link
//             }
//         }
//       },
//     });

//     revalidatePath("/admin/users");
//     return { success: true };
//   } catch (error) {
//     console.error("Create User Error:", error);
//     return { success: false, error: "Failed to create user." };
//   }
// }

// // --- UPDATE USER ---
// export async function updateUser(userId: string, formData: FormData) {
//   try {
//     const firstName = formData.get("firstName") as string;
//     const lastName = formData.get("lastName") as string;
//     const email = formData.get("email") as string;
//     const phoneNumber = formData.get("phoneNumber") as string;
//     const role = formData.get("role") as string;
//     const isActive = formData.get("isActive") === "true";
    
//     // Check if password is being updated (optional)
//     const password = formData.get("password") as string;
    
//     const updateData: any = {
//       firstName,
//       lastName,
//       email,
//       phoneNumber,
//       isStaff: role === "STAFF",
//       isActive,
//     };

//     // Only update password if a new one was provided
//     if (password && password.trim() !== "") {
//         updateData.password = await bcrypt.hash(password, 12);
//     }

//     await prisma.user.update({
//       where: { id: userId },
//       data: updateData,
//     });

//     revalidatePath("/admin/users");
//     return { success: true };
//   } catch (error) {
//     console.error("Update User Error:", error);
//     return { success: false, error: "Failed to update user." };
//   }
// }




// export async function toggleUserApproved(userId: string, currentStatus: boolean) {
//   try {
//     await prisma.user.update({
//       where: { id: userId },
//       data: { isApproved: !currentStatus }, // Toggle the value
//     });

//     revalidatePath("/admin/users");
//     return { success: true };
//   } catch (error) {
//     console.error("❌ TOGGLE APPROVED ERROR:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown Error",
//     };
//   }
// }


"use server";

import prisma from "../../../lib/data/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// --- TYPES ---

export interface UIUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "STAFF" | "USER";
  status: "ACTIVE" | "INACTIVE";
  isActive: boolean;
  isApproved: boolean;
  isStaff: boolean; // Added isStaff property
  investmentCount: number;
  profileImage: string | null;
  joinedAt: string;
}
 
// --- FETCH USERS ---

export async function getAllUsers(): Promise<UIUser[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      profile: {
        select: { profilePicture: true },
      },
      _count: {
        select: {
          clientInvestments: true, 
        },
      },
    },
  });

  return users.map((user) => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phoneNumber: user.phoneNumber || "N/A",
    role: user.isStaff ? "STAFF" : "USER",
    status: user.isActive ? "ACTIVE" : "INACTIVE",
    isActive: user.isActive,
    isApproved: user.isApproved,
    isStaff: user.isStaff, // Mapped isStaff property
    investmentCount: user._count.clientInvestments, 
    profileImage: user.profile?.profilePicture || null,
    joinedAt: user.createdAt.toISOString().split("T")[0],
  }));
}

// --- TOGGLE ACTIVE STATUS ---

export async function toggleUserActive(userId: string, currentStatus: boolean) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: !currentStatus },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("❌ TOGGLE USER ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    };
  }
}

// --- TOGGLE APPROVED STATUS ---

export async function toggleUserApproved(userId: string, currentStatus: boolean) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isApproved: !currentStatus },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("❌ TOGGLE APPROVED ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    };
  }
}

// --- TOGGLE STAFF STATUS ---

export async function toggleUserStaff(userId: string, currentStatus: boolean) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isStaff: !currentStatus }, 
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("❌ TOGGLE STAFF ERROR:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    };
  }
}

// --- DELETE USER ---

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("❌ DELETE USER ERROR:", error);
    return {
      success: false,
      error: "Cannot delete user. They may have active records.",
    };
  }
}

// --- CREATE USER ---

export async function createUser(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string; // "STAFF" or "USER"
    const isActive = formData.get("isActive") === "true";

    // 1. Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, error: "User with this email already exists." };
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Create User
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        isStaff: role === "STAFF",
        isActive,
        isApproved: true, // Auto-approve manually created users
        profile: {
            create: {} // Create empty profile link
        }
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Create User Error:", error);
    return { success: false, error: "Failed to create user." };
  }
}

// --- UPDATE USER ---

export async function updateUser(userId: string, formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const role = formData.get("role") as string;
    const isActive = formData.get("isActive") === "true";
    
    // Check if password is being updated (optional)
    const password = formData.get("password") as string;
    
    const updateData: any = {
      firstName,
      lastName,
      email,
      phoneNumber,
      isStaff: role === "STAFF",
      isActive,
    };

    // Only update password if a new one was provided
    if (password && password.trim() !== "") {
        updateData.password = await bcrypt.hash(password, 12);
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Update User Error:", error);
    return { success: false, error: "Failed to update user." };
  }
}