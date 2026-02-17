"use server";

import { uploadImage } from "@/lib/cloudinary";
import prisma from "../../../lib/data/prisma";
import { revalidatePath } from "next/cache";

export type DocumentResponse = {
  success: boolean;
  error?: string;
};

/**
 * Create a new document and link it to a user
 */
export async function createDocument(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const userId = formData.get("userId") as string;

    if (!file || file.size === 0) {
      return { success: false, error: "No file provided" };
    }

    // 1. Use your existing helper (folder: 'documents')
    const uploadRes = await uploadImage(file, "bugaking_documents");

    // 2. Save to MongoDB
    await prisma.document.create({
      data: {
        title: title,
        fileUrl: uploadRes.url, // Using the url returned by your helper
        userId: userId,
      },
    });

    revalidatePath("/admin/documents");
    return { success: true };
  } catch (error) {
    console.error("Document Creation Error:", error);
    return { success: false, error: "Failed to upload document" };
  }
}

/**
 * Update an existing document
 */
export async function updateDocument(
  id: string,
  formData: FormData,
): Promise<DocumentResponse> {
  try {
    const title = formData.get("title") as string;
    const userId = formData.get("userId") as string;

    await prisma.document.update({
      where: { id },
      data: {
        title,
        userId,
      },
    });

    revalidatePath("/admin/documents");
    return { success: true };
  } catch (error) {
    console.error("UPDATE_DOCUMENT_ERROR", error);
    return { success: false, error: "Failed to update document." };
  }
}

/**
 * Delete a document
 */
export async function deleteDocument(id: string): Promise<DocumentResponse> {
  try {
    await prisma.document.delete({
      where: { id },
    });

    revalidatePath("/admin/documents");
    return { success: true };
  } catch (error) {
    console.error("DELETE_DOCUMENT_ERROR", error);
    return { success: false, error: "Failed to delete document." };
  }
}

/**
 * Fetch all documents with owner details for the Main.tsx table
 */
export async function getDocuments() {
  try {
    const docs = await prisma.document.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      ownerName: `${doc.user.firstName} ${doc.user.lastName}`,
      ownerEmail: doc.user.email,
      ownerId: doc.userId,
      createdAt: doc.createdAt.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    }));
  } catch (error) {
    console.error("GET_DOCUMENTS_ERROR", error);
    return [];
  }
}

export async function getUserDocuments(userId: string) {
  try {
    const docs = await prisma.document.findMany({
      where: {
        userId: userId, // 👈 Only fetch docs for this specific user
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      ownerName: `${doc.user.firstName} ${doc.user.lastName}`,
      ownerEmail: doc.user.email,
      ownerId: doc.userId,
      file_url: doc.fileUrl,
      upload_date: doc.createdAt.toISOString(),
      category: "other" as "other" | "agreement" | "deed" | "report",
      file_type: "pdf",
      file_size: "---",
    }));
  } catch (error) {
    console.error("GET_DOCUMENTS_ERROR", error);
    return [];
  }
}
